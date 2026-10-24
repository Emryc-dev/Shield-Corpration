import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { pagination } from "../../utils/pagination";

const paidStatuses = ["PAYMENT_CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"] as const;
const authorSelect = { id: true, firstName: true, lastName: true } as const;

async function refreshProductRating(productId: string) {
  const rating = await prisma.review.aggregate({ where: { productId, status: "PUBLISHED" }, _avg: { rating: true }, _count: { rating: true } });
  await prisma.product.update({ where: { id: productId }, data: { averageRating: rating._avg.rating ?? 0, ratingCount: rating._count.rating } });
}

export const reviewsService = {
  async list(productId: string, query: Record<string, unknown>) {
    const { page, limit, skip } = pagination(query);
    const where = { productId, status: "PUBLISHED" as const };
    const [items, total, rating] = await prisma.$transaction([
      prisma.review.findMany({ where, include: { user: { select: authorSelect } }, orderBy: { createdAt: "desc" }, skip, take: limit }),
      prisma.review.count({ where }),
      prisma.review.aggregate({ where, _avg: { rating: true }, _count: { rating: true } }),
    ]);
    return { items, averageRating: Number(rating._avg.rating ?? 0), ratingCount: rating._count.rating, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  },

  async mine(userId: string) {
    return prisma.review.findMany({ where: { userId }, include: { product: { include: { images: { orderBy: { position: "asc" } } } }, order: { select: { id: true, number: true } } }, orderBy: { updatedAt: "desc" } });
  },

  async create(userId: string, input: { productId: string; rating: number; comment?: string }) {
    const existing = await prisma.review.findUnique({ where: { userId_productId: { userId, productId: input.productId } } });
    if (existing) throw new ApiError(409, "Vous avez deja publie un avis pour ce produit.", "REVIEW_ALREADY_EXISTS");
    const purchasedItem = await prisma.orderItem.findFirst({
      where: { productId: input.productId, order: { userId, status: { in: [...paidStatuses] } } },
      orderBy: { order: { createdAt: "desc" } },
      select: { orderId: true },
    });
    if (!purchasedItem) throw new ApiError(403, "Seuls les clients ayant achete ce produit peuvent publier un avis.", "PURCHASE_REQUIRED");
    const review = await prisma.review.create({ data: { ...input, userId, orderId: purchasedItem.orderId }, include: { user: { select: authorSelect } } });
    await refreshProductRating(input.productId);
    return review;
  },

  async update(userId: string, id: string, input: { rating?: number; comment?: string | null }) {
    const review = await prisma.review.findFirst({ where: { id, userId } });
    if (!review) throw new ApiError(404, "Avis introuvable.", "REVIEW_NOT_FOUND");
    const updated = await prisma.review.update({ where: { id }, data: input, include: { user: { select: authorSelect } } });
    await refreshProductRating(review.productId);
    return updated;
  },

  async remove(userId: string, id: string) {
    const review = await prisma.review.findFirst({ where: { id, userId }, select: { productId: true } });
    const result = await prisma.review.deleteMany({ where: { id, userId } });
    if (!result.count) throw new ApiError(404, "Avis introuvable.", "REVIEW_NOT_FOUND");
    await refreshProductRating(review!.productId);
    return { removed: true };
  },
};

