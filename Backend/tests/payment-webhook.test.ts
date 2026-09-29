import { prisma } from "../src/config/prisma";
import { paymentsService } from "../src/modules/payments/payments.service";
import { notchPay } from "../src/modules/payments/notchpay.client";
const payment = { id: "pay_1", orderId: "order_1", transactionId: null, order: { status: "PENDING_PAYMENT", stockReleasedAt: null, items: [{ productId: "p1", quantity: 2 }] } };
describe("payment webhook idempotency", () => {
  afterEach(() => jest.restoreAllMocks());
  const runWith = async (tx: any, payload: any, eventType = "payment.complete") => {
    jest.spyOn(prisma.webhookEvent, "findUnique").mockResolvedValue(null);
    jest.spyOn(notchPay, "verify").mockResolvedValue({ payment: payload.data } as never);
    jest.spyOn(prisma, "$transaction").mockImplementation((async (callback: any) => callback(tx)) as never);
    return paymentsService.processWebhook("evt_1", eventType, payload);
  };
  it("ignores a duplicate event", async () => {
    const providerSpy = jest.spyOn(notchPay, "verify");
    jest.spyOn(prisma.webhookEvent, "findUnique").mockResolvedValue({ id: "existing" } as never);
    await expect(paymentsService.processWebhook("evt_1", "payment.complete", { data: { reference: "ref" } })).resolves.toEqual({ duplicate: true });
    expect(providerSpy).not.toHaveBeenCalled();
  });
  it("confirms the order after a successful payment", async () => {
    const tx = { webhookEvent: { findUnique: jest.fn().mockResolvedValue(null), create: jest.fn() }, payment: { findUnique: jest.fn().mockResolvedValue(payment), update: jest.fn() }, order: { update: jest.fn() }, product: { update: jest.fn() } };
    await runWith(tx, { data: { reference: "ref", status: "complete" } });
    expect(tx.order.update).toHaveBeenCalledWith({ where: { id: "order_1" }, data: { status: "PAYMENT_CONFIRMED" } });
    expect(tx.product.update).not.toHaveBeenCalled();
  });
  it("releases reserved stock once after a failed payment", async () => {
    const tx = { webhookEvent: { findUnique: jest.fn().mockResolvedValue(null), create: jest.fn() }, payment: { findUnique: jest.fn().mockResolvedValue(payment), update: jest.fn() }, order: { update: jest.fn() }, product: { update: jest.fn() } };
    await runWith(tx, { data: { reference: "ref", status: "failed" } }, "payment.failed");
    expect(tx.product.update).toHaveBeenCalledWith({ where: { id: "p1" }, data: { stock: { increment: 2 } } });
    expect(tx.order.update).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ status: "CANCELLED" }) }));
  });
});
