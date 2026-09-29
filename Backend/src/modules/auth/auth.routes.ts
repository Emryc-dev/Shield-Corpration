import { Router } from "express";
import { validate } from "../../middleware/validate";
import { asyncHandler } from "../../utils/async-handler";
import { ok } from "../../utils/response";
import { authService } from "./auth.service";
import { loginSchema, refreshSchema, registerSchema } from "./auth.schemas";

export const authRouter = Router();
authRouter.post("/register", validate(registerSchema), asyncHandler(async (req, res) => ok(res, await authService.register(req.body), 201)));
authRouter.post("/login", validate(loginSchema), asyncHandler(async (req, res) => ok(res, await authService.login(req.body.email, req.body.password))));
authRouter.post("/refresh", validate(refreshSchema), asyncHandler(async (req, res) => ok(res, await authService.refresh(req.body.refreshToken))));
authRouter.post("/logout", validate(refreshSchema), asyncHandler(async (req, res) => { await authService.logout(req.body.refreshToken); return ok(res, { message: "Session fermée." }); }));
