import "dotenv/config";
import bcrypt from "bcrypt";
import slugify from "slugify";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const categories = ["Smartphones", "Ordinateurs", "Audio", "Accessoires", "Mobilité", "Connectivité"];
async function main() {
  for (const name of categories) await prisma.category.upsert({ where: { slug: slugify(name, { lower: true, strict: true }) }, update: {}, create: { name, slug: slugify(name, { lower: true, strict: true }) } });
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) await prisma.user.upsert({ where: { email: process.env.ADMIN_EMAIL.toLowerCase() }, update: { role: "ADMIN" }, create: { email: process.env.ADMIN_EMAIL.toLowerCase(), passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12), firstName: "Store", lastName: "Admin", role: "ADMIN" } });
}
main().finally(() => prisma.$disconnect());
