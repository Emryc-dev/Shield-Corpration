import { Router } from "express";
import { prisma } from "../../config/prisma";
import { authenticate } from "../../middleware/auth";
import { asyncHandler } from "../../utils/async-handler";
import { ok } from "../../utils/response";
export const usersRouter = Router();
usersRouter.get("/me", authenticate, asyncHandler(async (req, res) => ok(res, await prisma.user.findUnique({ where: { id: req.user!.id }, select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, isActive: true, createdAt: true, updatedAt: true } }))));
