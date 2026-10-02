import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  FRONTEND_URL: z.string().default("http://localhost:5173"),
  ALLOW_NGROK_ORIGINS: z.string().default("false").transform(value => value === "true"),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  GOOGLE_CLIENT_ID: z.string().default(""),
  CLOUDINARY_CLOUD_NAME: z.string().default(""),
  CLOUDINARY_API_KEY: z.string().default(""),
  CLOUDINARY_API_SECRET: z.string().default(""),
  NOTCHPAY_PUBLIC_KEY: z.string().default(""),
  NOTCHPAY_PRIVATE_KEY: z.string().default(""),
  NOTCHPAY_WEBHOOK_SECRET: z.string().default(""),
  NOTCHPAY_BASE_URL: z.url().default("https://api.notchpay.co"),
  PAYMENT_CALLBACK_URL: z.url().default("http://localhost:5173/store/payment/callback"),
  LOG_LEVEL: z.string().default("info")
});

export const env = schema.parse(process.env);
