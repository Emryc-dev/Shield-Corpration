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
  const trendStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 29));
  const paidStatuses = ["PAYMENT_CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"] as const;
  const [users, products, orders, pendingOrders, monthlyRevenue, apiCosts, lowStock, recentOrders, categoryBreakdown, bestSellerRows, bestCustomerRows, trendOrders, trendCustomers, trendApiCosts] = await prisma.$transaction([
    prisma.user.count({ where: { role: "CUSTOMER" } }), prisma.product.count({ where: { status: "ACTIVE" } }), prisma.order.count(),
    prisma.order.count({ where: { status: { in: ["PENDING_PAYMENT", "PAYMENT_CONFIRMED", "PROCESSING"] } } }),
    prisma.order.aggregate({ where: { status: { in: ["PAYMENT_CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"] }, createdAt: { gte: monthStart, lt: nextMonth } }, _sum: { total: true } }),
    prisma.apiCost.aggregate({ where: { incurredAt: { gte: monthStart, lt: nextMonth }, currency: "XAF" }, _sum: { amount: true } }),
    prisma.product.count({ where: { status: "ACTIVE", stock: { lte: 5 } } }),
    prisma.order.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { items: true } }),
    prisma.category.findMany({ where: { isActive: true }, select: { name: true, _count: { select: { products: { where: { status: "ACTIVE" } } } } } }),
    prisma.orderItem.groupBy({ by: ["productId"], where: { order: { status: { in: [...paidStatuses] } } }, _sum: { quantity: true }, _count: { orderId: true }, orderBy: { _sum: { quantity: "desc" } }, take: 5 }),
    prisma.order.groupBy({ by: ["userId"], where: { status: { in: [...paidStatuses] } }, _sum: { total: true }, _count: { id: true }, orderBy: { _sum: { total: "desc" } }, take: 5 }),
    prisma.order.findMany({ where: { createdAt: { gte: trendStart } }, select: { createdAt: true, status: true, total: true } }),
    prisma.user.findMany({ where: { role: "CUSTOMER", createdAt: { gte: trendStart } }, select: { createdAt: true } }),
    prisma.apiCost.findMany({ where: { currency: "XAF", incurredAt: { gte: trendStart } }, select: { incurredAt: true, amount: true } })
  ]);
  const [bestSellerProducts, bestCustomerUsers] = await Promise.all([
    prisma.product.findMany({ where: { id: { in: bestSellerRows.map(item => item.productId) } }, include: { category: true, images: { orderBy: { position: "asc" } } } }),
    prisma.user.findMany({ where: { id: { in: bestCustomerRows.map(item => item.userId) }, role: "CUSTOMER" }, select: { id: true, email: true, firstName: true, lastName: true, phone: true, isActive: true, createdAt: true } })
  ]);
  const bestSellers = bestSellerRows.map(row => ({ ...bestSellerProducts.find(product => product.id === row.productId), unitsSold: Number((row._sum as any)?.quantity ?? 0), orderCount: Number((row._count as any)?.orderId ?? 0) })).filter(item => item.id);
  const bestCustomers = bestCustomerRows.map(row => ({ ...bestCustomerUsers.find(user => user.id === row.userId), totalSpent: Number((row._sum as any)?.total ?? 0), orderCount: Number((row._count as any)?.id ?? 0) })).filter(item => item.id);
  const gross = Number(monthlyRevenue._sum.total ?? 0);
  const costs = Number(apiCosts._sum.amount ?? 0);
  const dayKeys = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(trendStart);
    date.setUTCDate(date.getUTCDate() + index);
    return date.toISOString().slice(0, 10);
  });
  const revenueTrend = dayKeys.map(date => ({ date, gross: 0, costs: 0, net: 0 }));
  const orderTrend = dayKeys.map(date => ({ date, paid: 0, pending: 0, cancelled: 0 }));
  const customerTrend = dayKeys.map(date => ({ date, customers: 0 }));
  const revenueByDate = new Map(revenueTrend.map(item => [item.date, item]));
  const ordersByDate = new Map(orderTrend.map(item => [item.date, item]));
  const customersByDate = new Map(customerTrend.map(item => [item.date, item]));

  trendOrders.forEach(order => {
    const date = order.createdAt.toISOString().slice(0, 10);
    const orderPoint = ordersByDate.get(date);
    if (orderPoint) {
      if (paidStatuses.includes(order.status as typeof paidStatuses[number])) orderPoint.paid += 1;
      else if (order.status === "CANCELLED") orderPoint.cancelled += 1;
      else orderPoint.pending += 1;
    }
    if (paidStatuses.includes(order.status as typeof paidStatuses[number])) {
      const revenuePoint = revenueByDate.get(date);
      if (revenuePoint) revenuePoint.gross += Number(order.total);
    }
  });
  trendApiCosts.forEach(cost => {
    const point = revenueByDate.get(cost.incurredAt.toISOString().slice(0, 10));
    if (point) point.costs += Number(cost.amount);
  });
  revenueTrend.forEach(point => { point.net = point.gross - point.costs; });
  trendCustomers.forEach(customer => {
    const point = customersByDate.get(customer.createdAt.toISOString().slice(0, 10));
    if (point) point.customers += 1;
  });

  return ok(res, { users, products, orders, pendingOrders, lowStock, monthlyGrossRevenue: gross, monthlyApiCosts: costs, monthlyNetRevenue: gross - costs, currency: "XAF", period: monthStart.toISOString().slice(0, 7), recentOrders, bestSellers, bestCustomers, categoryBreakdown: categoryBreakdown.map(item => ({ name: item.name, count: item._count.products })), revenueTrend, orderTrend, customerTrend });
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
  const where = { role: "CUSTOMER" as const };
  const [items, total] = await prisma.$transaction([prisma.user.findMany({ where, select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, isActive: true, createdAt: true, updatedAt: true, _count: { select: { orders: true } }, orders: { where: { status: { in: ["PAYMENT_CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"] } }, select: { total: true } } }, orderBy: { createdAt: "desc" }, skip, take: limit }), prisma.user.count({ where })]);
  const normalized = items.map(({ orders, ...user }) => ({ ...user, orderCount: user._count.orders, totalSpent: orders.reduce((sum, order) => sum + Number(order.total), 0) }));
  return ok(res, { items: normalized, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}));
adminRouter.get("/users/:id", asyncHandler(async (req, res) => {
  const user = await prisma.user.findFirst({ where: { id: String(req.params.id), role: "CUSTOMER" }, select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, isActive: true, createdAt: true, updatedAt: true, orders: { include: { items: true }, orderBy: { createdAt: "desc" } } } });
  if (!user) throw new ApiError(404, "Client introuvable.", "CUSTOMER_NOT_FOUND");
  return ok(res, { ...user, orderCount: user.orders.length, totalSpent: user.orders.filter(order => ["PAYMENT_CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"].includes(order.status)).reduce((sum, order) => sum + Number(order.total), 0) });
}));
adminRouter.patch("/users/:id/status", validate(z.object({ params: z.object({ id: z.string() }), body: z.object({ isActive: z.boolean() }) })), asyncHandler(async (req, res) => {
  const user = await prisma.user.findFirst({ where: { id: String(req.params.id), role: "CUSTOMER" } });
  if (!user) throw new ApiError(404, "Client introuvable.", "CUSTOMER_NOT_FOUND");
  if (!req.body.isActive) await prisma.refreshToken.updateMany({ where: { userId: user.id, revokedAt: null }, data: { revokedAt: new Date() } });
  return ok(res, await prisma.user.update({ where: { id: user.id }, data: { isActive: req.body.isActive }, select: { id: true, email: true, firstName: true, lastName: true, phone: true, isActive: true, createdAt: true, updatedAt: true } }));
}));
adminRouter.delete("/users/:id", asyncHandler(async (req, res) => {
  const id = String(req.params.id);
  const user = await prisma.user.findFirst({ where: { id, role: "CUSTOMER" }, include: { _count: { select: { orders: true } } } });
  if (!user) throw new ApiError(404, "Client introuvable.", "CUSTOMER_NOT_FOUND");
  if (user._count.orders) throw new ApiError(409, "Ce client possède un historique de commandes et ne peut pas être supprimé. Bloquez plutôt son compte.", "CUSTOMER_HAS_ORDERS");
  await prisma.user.delete({ where: { id } });
  return ok(res, { removed: true });
}));

adminRouter.get("/reviews", asyncHandler(async (req, res) => {
  const { page, limit, skip } = pagination(req.query);
  const where = req.query.status ? { status: String(req.query.status) as any } : {};
  const [items, total] = await prisma.$transaction([
    prisma.review.findMany({ where, include: { user: { select: { id: true, firstName: true, lastName: true, email: true } }, product: { select: { id: true, name: true, slug: true } }, order: { select: { id: true, number: true } } }, orderBy: { createdAt: "desc" }, skip, take: limit }),
    prisma.review.count({ where }),
  ]);
  return ok(res, { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}));

adminRouter.patch("/reviews/:id/status", validate(z.object({ params: z.object({ id: z.string() }), body: z.object({ status: z.enum(["PUBLISHED", "HIDDEN"]) }) })), asyncHandler(async (req, res) => {
  const review = await prisma.review.findUnique({ where: { id: String(req.params.id) } });
  if (!review) throw new ApiError(404, "Avis introuvable.", "REVIEW_NOT_FOUND");
  const updated = await prisma.review.update({ where: { id: review.id }, data: { status: req.body.status } });
  const rating = await prisma.review.aggregate({ where: { productId: review.productId, status: "PUBLISHED" }, _avg: { rating: true }, _count: { rating: true } });
  await prisma.product.update({ where: { id: review.productId }, data: { averageRating: rating._avg.rating ?? 0, ratingCount: rating._count.rating } });
  await prisma.auditLog.create({ data: { actorId: req.user!.id, action: "REVIEW_STATUS_CHANGED", entityType: "Review", entityId: review.id, metadata: { status: req.body.status } } });
  return ok(res, updated);
}));

adminRouter.get("/inventory", asyncHandler(async (req, res) => {
  const { page, limit, skip } = pagination(req.query);
  const [items, total] = await prisma.$transaction([
    prisma.inventoryMovement.findMany({ include: { product: { select: { id: true, name: true, sku: true, stock: true } }, actor: { select: { id: true, firstName: true, lastName: true } } }, orderBy: { createdAt: "desc" }, skip, take: limit }),
    prisma.inventoryMovement.count(),
  ]);
  return ok(res, { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}));

adminRouter.post("/inventory/adjust", validate(z.object({ body: z.object({ productId: z.string(), quantity: z.number().int().refine(value => value !== 0), reason: z.string().min(3).max(300) }) })), asyncHandler(async (req, res) => {
  const result = await prisma.$transaction(async tx => {
    const product = await tx.product.findUnique({ where: { id: req.body.productId } });
    if (!product) throw new ApiError(404, "Produit introuvable.", "PRODUCT_NOT_FOUND");
    const nextStock = product.stock + req.body.quantity;
    if (nextStock < 0) throw new ApiError(409, "Le stock ne peut pas devenir negatif.", "NEGATIVE_STOCK");
    const updated = await tx.product.update({ where: { id: product.id }, data: { stock: nextStock } });
    const movement = await tx.inventoryMovement.create({ data: { productId: product.id, actorId: req.user!.id, type: req.body.quantity > 0 ? "RESTOCK" : "ADJUSTMENT", quantity: req.body.quantity, reason: req.body.reason } });
    await tx.auditLog.create({ data: { actorId: req.user!.id, action: "INVENTORY_ADJUSTED", entityType: "Product", entityId: product.id, metadata: { previousStock: product.stock, nextStock, quantity: req.body.quantity } } });
    return { product: updated, movement };
  });
  return ok(res, result, 201);
}));

adminRouter.get("/payments", asyncHandler(async (req, res) => {
  const { page, limit, skip } = pagination(req.query);
  const where = req.query.status ? { status: String(req.query.status) as any } : {};
  const [items, total] = await prisma.$transaction([
    prisma.payment.findMany({ where, include: { order: { select: { id: true, number: true, user: { select: { id: true, email: true, firstName: true, lastName: true } } } } }, orderBy: { createdAt: "desc" }, skip, take: limit }),
    prisma.payment.count({ where }),
  ]);
  return ok(res, { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}));
