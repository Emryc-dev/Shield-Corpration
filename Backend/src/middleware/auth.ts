import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/api-error";
import type { UserRole } from "@prisma/client";

type Claims = { sub: string; email: string; role: UserRole; type: "access" };
export const authenticate: RequestHandler = (req, _res, next) => {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
  if (!token)
    return next(
      new ApiError(401, "Authentification requise.", "UNAUTHENTICATED"),
    );
  try {
    const claims = jwt.verify(token, env.JWT_ACCESS_SECRET) as Claims;
    if (claims.type !== "access") throw new Error();
    req.user = { id: claims.sub, email: claims.email, role: claims.role };
    next();
  } catch {
    next(new ApiError(401, "Jeton invalide ou expiré.", "INVALID_TOKEN"));
  }
};
export const requireRole =
  (...roles: UserRole[]): RequestHandler =>
  (req, _res, next) =>
    req.user && roles.includes(req.user.role)
      ? next()
      : next(new ApiError(403, "Accès refusé.", "FORBIDDEN"));
