import { Router } from "express";
import { z } from "zod";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { asyncHandler } from "../../utils/async-handler";
import { ok } from "../../utils/response";
import { reviewsService } from "./reviews.service";

const reviewBody = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(2000).optional(),
});
const updateBody = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().trim().max(2000).nullable().optional(),
}).refine((value) => Object.keys(value).length > 0, "Aucune modification fournie.");

export const reviewsRouter = Router();
reviewsRouter.get("/product/:productId", asyncHandler(async (req, res) => ok(res, await reviewsService.list(String(req.params.productId), req.query))));
reviewsRouter.get("/mine", authenticate, asyncHandler(async (req, res) => ok(res, await reviewsService.mine(req.user!.id))));
reviewsRouter.post("/", authenticate, validate(z.object({ body: reviewBody })), asyncHandler(async (req, res) => ok(res, await reviewsService.create(req.user!.id, req.body), 201)));
reviewsRouter.patch("/:id", authenticate, validate(z.object({ params: z.object({ id: z.string() }), body: updateBody })), asyncHandler(async (req, res) => ok(res, await reviewsService.update(req.user!.id, String(req.params.id), req.body))));
reviewsRouter.delete("/:id", authenticate, asyncHandler(async (req, res) => ok(res, await reviewsService.remove(req.user!.id, String(req.params.id)))));

