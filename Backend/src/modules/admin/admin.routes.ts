import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { prisma } from "../../config/prisma";
import { authenticate, requireRole } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { asyncHandler } from "../../utils/async-handler";
import { ok } from "../../utils/response";
import { pagination } from "../../utils/pagination";
import { productsService } from "../products/products.service";
import { createProductSchema, updateProductSchema } from "../products/product.schemas";
import { deleteImage, uploadImage } from "../media/media.service";
import { ApiError } from "../../utils/api-error";
import slugify from "slugify";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 8 }, fileFilter: (_req, file, cb) => cb(null, ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) });
export const adminRouter = Router();
adminRouter.use(authenticate, requireRole("ADMIN"));
adminRouter.get("/dashboard", asyncHandler(async (_req, res) => {
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const nextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  const [users, products, orders, pendingOrders, monthlyRevenue, apiCosts, lowStock, recentOrders, popularProducts, categoryBreakdown] = await prisma.$transaction([
    prisma.user.count({ where: { role: "CUSTOMER" } }), prisma.product.count({ where: { status: "ACTIVE" } }), prisma.order.count(),
    prisma.order.count({ where: { status: { in: ["PENDING_PAYMENT", "PAYMENT_CONFIRMED", "PROCESSING"] } } }),
    prisma.order.aggregate({ where: { status: { in: ["PAYMENT_CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"] }, createdAt: { gte: monthStart, lt: nextMonth } }, _sum: { total: true } }),
    prisma.apiCost.aggregate({ where: { incurredAt: { gte: monthStart, lt: nextMonth }, currency: "XAF" }, _sum: { amount: true } }),
    prisma.product.count({ where: { status: "ACTIVE", stock: { lte: 5 } } }),
    prisma.order.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { items: true } }),
    prisma.product.findMany({ where: { status: "ACTIVE", isFeatured: true }, take: 4, include: { category: true, images: { orderBy: { position: "asc" } } } }),
    prisma.category.findMany({ where: { isActive: true }, select: { name: true, _count: { select: { products: { where: { status: "ACTIVE" } } } } } })
  ]);
  const gross = Number(monthlyRevenue._sum.total ?? 0);
  const costs = Number(apiCosts._sum.amount ?? 0);
  return ok(res, { users, products, orders, pendingOrders, lowStock, monthlyGrossRevenue: gross, monthlyApiCosts: costs, monthlyNetRevenue: gross - costs, currency: "XAF", period: monthStart.toISOString().slice(0, 7), recentOrders, popularProducts, categoryBreakdown: categoryBreakdown.map(item => ({ name: item.name, count: item._count.products })) });
}));
adminRouter.get("/products", asyncHandler(async (req, res) => ok(res, await productsService.list(req.query, true))));
adminRouter.post("/products", validate(createProductSchema), asyncHandler(async (req, res) => ok(res, await productsService.create(req.body), 201)));
adminRouter.patch("/products/:id", validate(updateProductSchema), asyncHandler(async (req, res) => ok(res, await productsService.update(String(req.params.id), req.body))));
adminRouter.delete("/products/:id", asyncHandler(async (req, res) => ok(res, await productsService.archive(String(req.params.id)))));
adminRouter.post("/products/:id/images", upload.array("images", 8), asyncHandler(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files?.length) throw new ApiError(422, "Aucune image valide reçue.", "IMAGE_REQUIRED");
  const uploaded = await Promise.all(files.map(uploadImage));
  await prisma.productImage.createMany({ data: uploaded.map((image, position) => ({ ...image, productId: String(req.params.id), position })) });
  return ok(res, uploaded, 201);
}));
adminRouter.delete("/products/:productId/images/:imageId", asyncHandler(async (req, res) => {
  const image = await prisma.productImage.findFirst({ where: { id: String(req.params.imageId), productId: String(req.params.productId) } });
  if (!image) throw new ApiError(404, "Image introuvable.", "IMAGE_NOT_FOUND");
  if (image.publicId) await deleteImage(image.publicId);
  await prisma.productImage.delete({ where: { id: image.id } });
  return ok(res, { removed: true });
}));
adminRouter.get("/categories", asyncHandler(async (_req, res) => ok(res, await prisma.category.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { products: true } } } }))));
adminRouter.post("/categories", validate(z.object({ body: z.object({ name: z.string().min(2).max(120), slug: z.string().optional(), description: z.string().max(500).optional(), imageUrl: z.string().url().optional(), isActive: z.boolean().optional() }) })), asyncHandler(async (req, res) => {
  const slug = req.body.slug || slugify(req.body.name, { lower: true, strict: true });
  return ok(res, await prisma.category.create({ data: { ...req.body, slug } }), 201);
}));
adminRouter.patch("/categories/:id", validate(z.object({ params: z.object({ id: z.string() }), body: z.object({ name: z.string().min(2).max(120).optional(), slug: z.string().optional(), description: z.string().max(500).nullable().optional(), imageUrl: z.string().url().nullable().optional(), isActive: z.boolean().optional() }) })), asyncHandler(async (req, res) => {
  const data = { ...req.body, ...(req.body.name && !req.body.slug ? { slug: slugify(req.body.name, { lower: true, strict: true }) } : {}) };
  return ok(res, await prisma.category.update({ where: { id: String(req.params.id) }, data }));
}));
adminRouter.delete("/categories/:id", asyncHandler(async (req, res) => {
  const id = String(req.params.id);
  const products = await prisma.product.count({ where: { categoryId: id, status: { not: "ARCHIVED" } } });
  if (products) throw new ApiError(409, "Cette catégorie contient encore des produits.", "CATEGORY_NOT_EMPTY");
  return ok(res, await prisma.category.update({ where: { id }, data: { isActive: false } }));
}));
adminRouter.post("/categories/:id/image", upload.single("image"), asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(422, "Aucune image valide reçue.", "IMAGE_REQUIRED");
  const id = String(req.params.id);
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new ApiError(404, "Catégorie introuvable.", "CATEGORY_NOT_FOUND");
  const uploaded = await uploadImage(req.file);
  if (category.imagePublicId) await deleteImage(category.imagePublicId);
  return ok(res, await prisma.category.update({ where: { id }, data: { imageUrl: uploaded.url, imagePublicId: uploaded.publicId } }));
}));
adminRouter.get("/api-costs", asyncHandler(async (req, res) => {
  const { page, limit, skip } = pagination(req.query);
  const [items, total] = await prisma.$transaction([prisma.apiCost.findMany({ orderBy: { incurredAt: "desc" }, skip, take: limit }), prisma.apiCost.count()]);
  return ok(res, { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}));
adminRouter.post("/api-costs", validate(z.object({ body: z.object({ provider: z.string().min(2).max(100), amount: z.coerce.number().nonnegative(), currency: z.string().length(3).default("XAF"), description: z.string().max(300).optional(), incurredAt: z.coerce.date().optional(), metadata: z.record(z.string(), z.unknown()).optional() }) })), asyncHandler(async (req, res) => ok(res, await prisma.apiCost.create({ data: req.body }), 201)));
adminRouter.delete("/api-costs/:id", asyncHandler(async (req, res) => { await prisma.apiCost.delete({ where: { id: String(req.params.id) } }); return ok(res, { removed: true }); }));
adminRouter.get("/orders", asyncHandler(async (req, res) => {
  const { page, limit, skip } = pagination(req.query);
  const where = req.query.status ? { status: String(req.query.status) as any } : {};
  const [items, total] = await prisma.$transaction([prisma.order.findMany({ where, include: { items: true, user: { select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, isActive: true, createdAt: true, updatedAt: true } }, payments: true }, orderBy: { createdAt: "desc" }, skip, take: limit }), prisma.order.count({ where })]);
  return ok(res, { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}));
adminRouter.patch("/orders/:id/status", validate(z.object({ params: z.object({ id: z.string() }), body: z.object({ status: z.enum(["PAYMENT_CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]) }) })), asyncHandler(async (req, res) => {
  const id = String(req.params.id);
  if (!await prisma.order.findUnique({ where: { id } })) throw new ApiError(404, "Commande introuvable.", "ORDER_NOT_FOUND");
  return ok(res, await prisma.order.update({ where: { id }, data: { status: req.body.status } }));
}));
adminRouter.get("/users", asyncHandler(async (req, res) => {
  const { page, limit, skip } = pagination(req.query);
  const [items, total] = await prisma.$transaction([prisma.user.findMany({ select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, isActive: true, createdAt: true, updatedAt: true }, orderBy: { createdAt: "desc" }, skip, take: limit }), prisma.user.count()]);
  return ok(res, { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}));
