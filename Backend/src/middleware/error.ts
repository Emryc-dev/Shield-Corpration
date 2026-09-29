import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/api-error";
import { logger } from "../config/logger";

export const notFound: RequestHandler = (req, _res, next) => next(new ApiError(404, `Route introuvable: ${req.method} ${req.originalUrl}`, "NOT_FOUND"));
export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof ZodError) return res.status(422).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Données invalides.", details: error.flatten() } });
  const apiError = error instanceof ApiError ? error : new ApiError(500, "Une erreur interne est survenue.", "INTERNAL_ERROR");
  if (apiError.status >= 500) logger.error({ err: error, path: req.path }, "request failed");
  res.status(apiError.status).json({ success: false, error: { code: apiError.code, message: apiError.message, ...(apiError.details ? { details: apiError.details } : {}) } });
};
