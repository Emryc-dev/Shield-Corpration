import slugify from "slugify";
import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { pagination } from "../../utils/pagination";
import type { Prisma } from "@prisma/client";

const include = { category: true, images: { orderBy: { position: "asc" as const } } };
export const productsService = {
  async list(query: Record<string, unknown>, admin = false) {
    const { page, limit, skip } = pagination(query);
    const search = String(query.search ?? "").trim();
    const where: Prisma.ProductWhereInput = {
      ...(!admin ? { status: "ACTIVE" } : {}),
      ...(query.category ? { category: { slug: String(query.category) } } : {}),
      ...(query.brand ? { brand: { equals: String(query.brand), mode: "insensitive" } } : {}),
      ...(query.featured === "true" ? { isFeatured: true } : {}),
      ...(query.new === "true" ? { isNew: true } : {}),
      ...(query.available === "true" ? { stock: { gt: 0 } } : {}),
      ...(search ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { brand: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }] } : {}),
      ...((query.minPrice || query.maxPrice) ? { price: { ...(query.minPrice ? { gte: Number(query.minPrice) } : {}), ...(query.maxPrice ? { lte: Number(query.maxPrice) } : {}) } } : {})
    };
    const orderBy = query.sort === "price_asc" ? { price: "asc" as const } : query.sort === "price_desc" ? { price: "desc" as const } : { createdAt: "desc" as const };
    const [items, total] = await prisma.$transaction([prisma.product.findMany({ where, include, orderBy, skip, take: limit }), prisma.product.count({ where })]);
    return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  },
  async bySlug(slug: string) {
    const product = await prisma.product.findFirst({ where: { slug, status: "ACTIVE" }, include });
    if (!product) throw new ApiError(404, "Produit introuvable.", "PRODUCT_NOT_FOUND");
    return product;
  },
  async create(input: any) {
    const { images = [], ...data } = input;
    const slug = data.slug || slugify(data.name, { lower: true, strict: true });
    return prisma.product.create({ data: { ...data, slug, images: { create: images } }, include });
  },
  async update(id: string, input: any) {
    const { images, ...data } = input;
    try { return await prisma.product.update({ where: { id }, data: { ...data, ...(data.name && !data.slug ? { slug: slugify(data.name, { lower: true, strict: true }) } : {}), ...(images ? { images: { deleteMany: {}, create: images } } : {}) }, include }); }
    catch { throw new ApiError(404, "Produit introuvable.", "PRODUCT_NOT_FOUND"); }
  },
  async archive(id: string) {
    try { return await prisma.product.update({ where: { id }, data: { status: "ARCHIVED" }, include }); }
    catch { throw new ApiError(404, "Produit introuvable.", "PRODUCT_NOT_FOUND"); }
  }
};
