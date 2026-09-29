import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { pagination } from "../../utils/pagination";

const include = { items: true, payments: { orderBy: { createdAt: "desc" as const } } };
export const ordersService = {
  async create(userId: string, shipping: { recipientName: string; recipientEmail: string; recipientPhone: string; address: string; city: string; country: string; shippingMethod: string }) {
    return prisma.$transaction(async tx => {
      const cart = await tx.cart.findUnique({ where: { userId }, include: { items: { include: { product: { include: { images: { orderBy: { position: "asc" }, take: 1 } } } } } } });
      if (!cart?.items.length) throw new ApiError(400, "Votre panier est vide.", "EMPTY_CART");
      for (const item of cart.items) {
        if (item.product.status !== "ACTIVE" || item.quantity > item.product.stock) throw new ApiError(409, `Stock insuffisant pour ${item.product.name}.`, "INSUFFICIENT_STOCK", { productId: item.productId, available: item.product.stock });
        const updated = await tx.product.updateMany({ where: { id: item.productId, stock: { gte: item.quantity } }, data: { stock: { decrement: item.quantity } } });
        if (!updated.count) throw new ApiError(409, `Stock insuffisant pour ${item.product.name}.`, "INSUFFICIENT_STOCK");
      }
      const subtotal = cart.items.reduce((sum, item) => sum.plus(item.product.price.mul(item.quantity)), new Prisma.Decimal(0));
      const order = await tx.order.create({ data: {
        number: `TSC-${Date.now()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`, userId, subtotal, total: subtotal, ...shipping,
        items: { create: cart.items.map(item => ({ productId: item.productId, productName: item.product.name, productSlug: item.product.slug, productImageUrl: item.product.images[0]?.url, quantity: item.quantity, priceAtPurchase: item.product.price })) }
      }, include });
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return order;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  },
  async list(userId: string, query: Record<string, unknown>) {
    const { page, limit, skip } = pagination(query);
    const where = { userId };
    const [items, total] = await prisma.$transaction([prisma.order.findMany({ where, include, orderBy: { createdAt: "desc" }, skip, take: limit }), prisma.order.count({ where })]);
    return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  },
  async one(userId: string, id: string) {
    const order = await prisma.order.findFirst({ where: { id, userId }, include });
    if (!order) throw new ApiError(404, "Commande introuvable.", "ORDER_NOT_FOUND");
    return order;
  }
};
