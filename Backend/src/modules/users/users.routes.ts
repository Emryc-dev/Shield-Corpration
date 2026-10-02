import { Router } from "express";
import { prisma } from "../../config/prisma";
import { authenticate } from "../../middleware/auth";
import { asyncHandler } from "../../utils/async-handler";
import { ok } from "../../utils/response";
import { validate } from "../../middleware/validate";
import { z } from "zod";
export const usersRouter = Router();
const profileSelect = { id: true, email: true, firstName: true, lastName: true, phone: true, address: true, city: true, country: true, role: true, isActive: true, createdAt: true, updatedAt: true } as const;
const updateProfileSchema = z.object({ body: z.object({
  firstName: z.string().min(2).max(60).optional(),
  lastName: z.string().min(2).max(60).optional(),
  phone: z.string().min(6).max(30).nullable().optional(),
  address: z.string().min(5).max(300).nullable().optional(),
  city: z.string().min(2).max(100).nullable().optional(),
  country: z.string().min(2).max(100).nullable().optional(),
}) });
usersRouter.get("/me", authenticate, asyncHandler(async (req, res) => ok(res, await prisma.user.findUnique({ where: { id: req.user!.id }, select: profileSelect }))));
usersRouter.patch("/me", authenticate, validate(updateProfileSchema), asyncHandler(async (req, res) => ok(res, await prisma.user.update({ where: { id: req.user!.id }, data: req.body, select: profileSelect }))));
