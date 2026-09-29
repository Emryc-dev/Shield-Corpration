import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { prisma } from "./config/prisma";
const server = createApp().listen(env.PORT, () => logger.info({ port: env.PORT }, "The Shield Store API started"));
const shutdown = async (signal: string) => { logger.info({ signal }, "shutdown"); server.close(async () => { await prisma.$disconnect(); process.exit(0); }); };
process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
