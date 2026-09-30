import { Router } from "express";
import { z } from "zod";
import { env } from "../../config/env";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { verifyHmac } from "../../utils/crypto";
import { ApiError } from "../../utils/api-error";
import { asyncHandler } from "../../utils/async-handler";
import { ok } from "../../utils/response";
import { paymentsService } from "./payments.service";
export const paymentsRouter = Router();
paymentsRouter.post("/", authenticate, validate(z.object({ body: z.object({ orderId: z.string() }) })), asyncHandler(async (req, res) => ok(res, await paymentsService.initialize(req.user!.id, req.body.orderId), 201)));
paymentsRouter.get("/:id", authenticate, asyncHandler(async (req, res) => ok(res, await paymentsService.status(req.user!.id, String(req.params.id)))));
paymentsRouter.post("/:id/verify", authenticate, asyncHandler(async (req, res) => ok(res, await paymentsService.verify(req.user!.id, String(req.params.id)))));
paymentsRouter.post("/webhook/notchpay", asyncHandler(async (req, res) => {
  const raw = req.body instanceof Buffer ? req.body : Buffer.from(JSON.stringify(req.body));
  const signature = String(req.headers["x-notch-signature"] ?? req.headers["x-notchpay-signature"] ?? "");
  let payload: any = {};
  try {
    payload = raw.length ? JSON.parse(raw.toString("utf8")) : {};
  } catch {
    throw new ApiError(400, "Corps webhook invalide.", "INVALID_WEBHOOK_BODY");
  }
  const containsEvent = Boolean(payload.id || payload.event || payload.type || payload.data || payload.transaction);
  if (!signature && !containsEvent) {
    return ok(res, { verified: true, ...(payload.challenge ? { challenge: payload.challenge } : {}) });
  }
  if (!verifyHmac(raw, signature, env.NOTCHPAY_WEBHOOK_SECRET)) throw new ApiError(401, "Signature webhook invalide.", "INVALID_WEBHOOK_SIGNATURE");
  const eventId = String(payload.id ?? req.headers["x-notch-event-id"] ?? "");
  if (!eventId) throw new ApiError(400, "Identifiant webhook manquant.", "MISSING_EVENT_ID");
  return ok(res, await paymentsService.processWebhook(eventId, String(payload.event ?? payload.type ?? "unknown"), payload));
}));
