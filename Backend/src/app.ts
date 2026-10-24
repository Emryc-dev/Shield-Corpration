import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { authRouter } from "./modules/auth/auth.routes";
import { usersRouter } from "./modules/users/users.routes";
import { productsRouter } from "./modules/products/products.routes";
import { categoriesRouter } from "./modules/categories/categories.routes";
import { favoritesRouter } from "./modules/favorites/favorites.routes";
import { cartRouter } from "./modules/cart/cart.routes";
import { ordersRouter } from "./modules/orders/orders.routes";
import { paymentsRouter } from "./modules/payments/payments.routes";
import { adminRouter } from "./modules/admin/admin.routes";
import { reviewsRouter } from "./modules/reviews/reviews.routes";
import { errorHandler, notFound } from "./middleware/error";
import { openapi } from "./docs/openapi";

export const createApp = () => {
  const app = express();
  const configuredOrigins = new Set(env.FRONTEND_URL.split(",").map(item => item.trim()).filter(Boolean));
  const isAllowedNgrokOrigin = (origin: string) => {
    if (!env.ALLOW_NGROK_ORIGINS) return false;
    try {
      const hostname = new URL(origin).hostname.toLowerCase();
      return ["ngrok-free.app", "ngrok-free.dev", "ngrok.io"].some(domain => hostname === domain || hostname.endsWith(`.${domain}`));
    } catch {
      return false;
    }
  };
  app.set("trust proxy", 1);
  app.use(pinoHttp({ logger }), helmet());
  app.use(cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || configuredOrigins.has(origin) || isAllowedNgrokOrigin(origin)) return callback(null, true);
      return callback(null, false);
    },
  }));
  app.use(rateLimit({ windowMs: 15 * 60_000, limit: env.NODE_ENV === "test" ? 10_000 : 300, standardHeaders: "draft-8", legacyHeaders: false }));
  app.use("/api/payments/webhook/notchpay", express.raw({ type: "application/json", limit: "256kb" }));
  app.use(express.json({ limit: "1mb" }));
  app.get("/api/health", (_req, res) => res.json({ success: true, data: { status: "ok", timestamp: new Date().toISOString() } }));
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi));
  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/favorites", favoritesRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/orders", ordersRouter);
  app.use("/api/payments", paymentsRouter);
  app.use("/api/reviews", reviewsRouter);
  app.use("/api/admin", adminRouter);
  app.use(notFound, errorHandler);
  return app;
};
