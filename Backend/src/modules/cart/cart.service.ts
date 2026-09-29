import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
const cartInclude = { items: { include: { product: { include: { images: { orderBy: { position: "asc" as const }, take: 1 } } } }, orderBy: { createdAt: "asc" as const } } };
const decorate = (cart: any) => ({ ...cart, subtotal: cart.items.reduce((sum: number, item: any) => sum + Number(item.product.price) * item.quantity, 0) });
export const cartService = {
  async get(userId: string) {
    const cart = await prisma.cart.upsert({ where: { userId }, create: { userId }, update: {}, include: cartInclude });
    return decorate(cart);
  },
  async add(userId: string, productId: string, quantity: number) {
    const product = await prisma.product.findFirst({ where: { id: productId, status: "ACTIVE" } });
    if (!product) throw new ApiError(404, "Produit introuvable.", "PRODUCT_NOT_FOUND");
    const cart = await prisma.cart.upsert({ where: { userId }, create: { userId }, update: {} });
    const current = await prisma.cartItem.findUnique({ where: { cartId_productId: { cartId: cart.id, productId } } });
    const nextQuantity = (current?.quantity ?? 0) + quantity;
    if (nextQuantity > product.stock) throw new ApiError(409, "Stock insuffisant.", "INSUFFICIENT_STOCK", { available: product.stock });
    await prisma.cartItem.upsert({ where: { cartId_productId: { cartId: cart.id, productId } }, create: { cartId: cart.id, productId, quantity }, update: { quantity: nextQuantity } });
    return this.get(userId);
  },
  async update(userId: string, itemId: string, quantity: number) {
    const item = await prisma.cartItem.findFirst({ where: { id: itemId, cart: { userId } }, include: { product: true } });
    if (!item) throw new ApiError(404, "Article du panier introuvable.", "CART_ITEM_NOT_FOUND");
    if (quantity > item.product.stock) throw new ApiError(409, "Stock insuffisant.", "INSUFFICIENT_STOCK", { available: item.product.stock });
    if (quantity === 0) await prisma.cartItem.delete({ where: { id: item.id } }); else await prisma.cartItem.update({ where: { id: item.id }, data: { quantity } });
    return this.get(userId);
  },
  async remove(userId: string, itemId: string) {
    await prisma.cartItem.deleteMany({ where: { id: itemId, cart: { userId } } });
    return this.get(userId);
  },
  async clear(userId: string) { await prisma.cartItem.deleteMany({ where: { cart: { userId } } }); return this.get(userId); }
};
