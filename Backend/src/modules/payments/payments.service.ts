import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { notchPay } from "./notchpay.client";
import { mapPaymentStatus, type NormalizedPaymentStatus } from "./payment-status";

const providerPayment = (payload: any) => payload.payment ?? payload.transaction ?? payload;

const applyStatus = async (
  tx: any,
  payment: any,
  status: NormalizedPaymentStatus,
  data: any,
  providerPayload: any,
) => {
  await tx.payment.update({
    where: { id: payment.id },
    data: {
      status,
      transactionId: data.id ?? data.transaction_id ?? payment.transactionId,
      providerPayload,
    },
  });

  if (status === "SUCCESS" && payment.order.status === "PENDING_PAYMENT") {
    await tx.order.update({ where: { id: payment.orderId }, data: { status: "PAYMENT_CONFIRMED" } });
  }

  if (
    ["FAILED", "CANCELLED", "EXPIRED"].includes(status) &&
    payment.order.status === "PENDING_PAYMENT" &&
    !payment.order.stockReleasedAt
  ) {
    for (const item of payment.order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }
    await tx.order.update({
      where: { id: payment.orderId },
      data: { status: "CANCELLED", stockReleasedAt: new Date() },
    });
  }

  return { processed: true, status, paymentId: payment.id, orderId: payment.orderId };
};

export const paymentsService = {
  async initialize(userId: string, orderId: string) {
    const order = await prisma.order.findFirst({ where: { id: orderId, userId }, include: { user: true } });
    if (!order) throw new ApiError(404, "Commande introuvable.", "ORDER_NOT_FOUND");
    if (order.status !== "PENDING_PAYMENT") {
      throw new ApiError(409, "Cette commande ne peut plus être payée.", "ORDER_NOT_PAYABLE");
    }

    const existing = await prisma.payment.findFirst({
      where: { orderId, status: "PENDING", authorizationUrl: { not: null } },
      orderBy: { createdAt: "desc" },
    });
    if (existing) return existing;

    const merchantReference = `PAY-${order.number}-${crypto.randomUUID().slice(0, 8)}`;
    const provider = await notchPay.initialize({
      amount: Number(order.total),
      currency: order.currency,
      email: order.recipientEmail,
      name: order.recipientName,
      reference: merchantReference,
      description: `Commande ${order.number}`,
    });
    const transaction = provider.transaction ?? {};
    const providerReference = transaction.reference;
    const authorizationUrl = provider.authorization_url ?? transaction.authorization_url;
    if (!providerReference || !authorizationUrl) {
      throw new ApiError(502, "Réponse de paiement incomplète.", "INVALID_PAYMENT_RESPONSE");
    }

    return prisma.payment.create({
      data: {
        orderId,
        reference: providerReference,
        transactionId: transaction.id ?? null,
        amount: order.total,
        currency: order.currency,
        authorizationUrl,
        providerPayload: provider,
      },
    });
  },

  async status(userId: string, id: string) {
    const payment = await prisma.payment.findFirst({ where: { id, order: { userId } }, include: { order: true } });
    if (!payment) throw new ApiError(404, "Paiement introuvable.", "PAYMENT_NOT_FOUND");
    return payment;
  },

  async verify(userId: string, id: string) {
    const payment = await prisma.payment.findFirst({
      where: { id, order: { userId } },
      include: { order: { include: { items: true } } },
    });
    if (!payment) throw new ApiError(404, "Paiement introuvable.", "PAYMENT_NOT_FOUND");

    const provider = await notchPay.verify(payment.reference);
    const data = providerPayment(provider);
    const status = mapPaymentStatus(data.status ?? "");
    return prisma.$transaction(tx => applyStatus(tx, payment, status, data, provider));
  },

  async processWebhook(eventId: string, eventType: string, payload: any) {
    if (await prisma.webhookEvent.findUnique({ where: { eventId } })) return { duplicate: true };

    const notification = payload.data ?? payload.transaction ?? payload;
    const reference = notification.reference;
    if (!reference) throw new ApiError(400, "Référence de paiement manquante.", "MISSING_PAYMENT_REFERENCE");

    // The provider API, not the webhook body, is the source of truth.
    const provider = await notchPay.verify(reference);
    const data = providerPayment(provider);
    const status = mapPaymentStatus(data.status ?? "");

    return prisma.$transaction(async tx => {
      if (await tx.webhookEvent.findUnique({ where: { eventId } })) return { duplicate: true };
      const payment = await tx.payment.findUnique({
        where: { reference },
        include: { order: { include: { items: true } } },
      });
      await tx.webhookEvent.create({
        data: { provider: "NOTCHPAY", eventId, eventType, payload },
      });
      if (!payment) return { ignored: true };
      return applyStatus(tx, payment, status, data, provider);
    });
  },
};
