import { Router } from "express";
import { prisma } from "../../config/prisma";
import { asyncHandler } from "../../utils/async-handler";
import { ok } from "../../utils/response";
import { ApiError } from "../../utils/api-error";
export const categoriesRouter = Router();
categoriesRouter.get("/", asyncHandler(async (_req, res) => ok(res, await prisma.category.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, include: { _count: { select: { products: { where: { status: "ACTIVE" } } } } } }))));
categoriesRouter.get("/:slug", asyncHandler(async (req, res) => {
  const item = await prisma.category.findFirst({ where: { slug: String(req.params.slug), isActive: true }, include: { _count: { select: { products: { where: { status: "ACTIVE" } } } } } });
  if (!item) throw new ApiError(404, "Catégorie introuvable.", "CATEGORY_NOT_FOUND");
  return ok(res, item);
}));
