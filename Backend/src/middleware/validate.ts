import type { RequestHandler } from "express";
import type { ZodType } from "zod";
export const validate = (schema: ZodType): RequestHandler => (req, _res, next) => {
  const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
  if (!result.success) return next(result.error);
  const data = result.data as { body?: unknown; params?: unknown; query?: unknown };
  if (data.body !== undefined) req.body = data.body;
  if (data.params !== undefined) req.params = data.params as typeof req.params;
  next();
};
