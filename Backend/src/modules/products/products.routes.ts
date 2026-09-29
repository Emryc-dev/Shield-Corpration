import { Router } from "express";
import { productsService } from "./products.service";
import { asyncHandler } from "../../utils/async-handler";
import { ok } from "../../utils/response";
export const productsRouter = Router();
productsRouter.get("/", asyncHandler(async (req, res) => ok(res, await productsService.list(req.query))));
productsRouter.get("/:slug", asyncHandler(async (req, res) => ok(res, await productsService.bySlug(String(req.params.slug)))));
