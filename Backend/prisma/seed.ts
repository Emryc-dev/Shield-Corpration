import "dotenv/config";
import bcrypt from "bcrypt";
import slugify from "slugify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const categories = [
  { name: "Smartphones", description: "Smartphones pour communiquer, travailler et rester connecté." },
  { name: "Ordinateurs", description: "Ordinateurs portables pour la productivité et les usages professionnels." },
  { name: "Audio", description: "Casques, écouteurs et enceintes pour le travail et le divertissement." },
  { name: "Accessoires", description: "Câbles, stockage et accessoires électroniques utiles au quotidien." },
  { name: "Mobilité", description: "Solutions de recharge et accessoires conçus pour les déplacements." },
  { name: "Connectivité", description: "Équipements pour les appels, réunions et connexions numériques." },
];
const products = [
  { name: "Smartphone Pro Series", sku: "SH-SMART-PRO-001", brand: "Sélection Shield", category: "Smartphones", price: 125000, stock: 12, featured: true, fresh: false, short: "Un smartphone Android 256 Go polyvalent pour les usages quotidiens et professionnels.", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=85" },
  { name: "Casque Audio Studio", sku: "SH-AUDIO-HS-001", brand: "Sélection Shield", category: "Audio", price: 15500, stock: 18, featured: true, fresh: true, short: "Un casque Bluetooth confortable pour les appels et l'écoute prolongée.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85" },
  { name: "Écouteurs True Wireless", sku: "SH-AUDIO-TWS-001", brand: "Sélection Shield", category: "Audio", price: 13900, stock: 24, featured: true, fresh: false, short: "Des écouteurs sans fil compacts pour les appels et les déplacements.", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=85" },
  { name: "Mini Enceinte Bluetooth", sku: "SH-AUDIO-SPK-001", brand: "Sélection Shield", category: "Audio", price: 35000, stock: 10, featured: true, fresh: true, short: "Une enceinte Bluetooth compacte pour le bureau, la maison et les déplacements.", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=85" },
  { name: "Laptop Business", sku: "SH-PC-BUS-001", brand: "Sélection Shield", category: "Ordinateurs", price: 425000, stock: 6, featured: false, fresh: false, short: "Un ordinateur portable fiable pour le travail, les études et la productivité.", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85" },
  { name: "Power Bank Compact", sku: "SH-MOB-PWR-001", brand: "Sélection Shield", category: "Mobilité", price: 18000, stock: 20, featured: false, fresh: true, short: "Une batterie externe compacte pour garder vos appareils chargés.", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1200&q=85" },
  { name: "Câble USB-C Renforcé", sku: "SH-ACC-USBC-001", brand: "Sélection Shield", category: "Accessoires", price: 3900, stock: 40, featured: false, fresh: false, short: "Un câble robuste pour la recharge et le transfert de données.", image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?auto=format&fit=crop&w=1200&q=85" },
  { name: "Webcam HD", sku: "SH-CON-WEB-001", brand: "Sélection Shield", category: "Connectivité", price: 28000, stock: 8, featured: false, fresh: false, short: "Une webcam HD pour les réunions et la collaboration à distance.", image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=1200&q=85" },
  { name: "Stockage Externe SSD", sku: "SH-ACC-SSD-001", brand: "Sélection Shield", category: "Accessoires", price: 65000, stock: 7, featured: false, fresh: false, short: "Un SSD portable pour les sauvegardes, documents et projets.", image: "https://images.unsplash.com/photo-1597138804456-e7dca7f59d21?auto=format&fit=crop&w=1200&q=85" },
];

async function main() {
  const categoryIds = new Map<string, string>();
  for (const category of categories) {
    const slug = slugify(category.name, { lower: true, strict: true });
    const saved = await prisma.category.upsert({ where: { slug }, update: { name: category.name, description: category.description, isActive: true }, create: { ...category, slug } });
    categoryIds.set(category.name, saved.id);
  }
  for (const item of products) {
    const slug = slugify(item.name, { lower: true, strict: true });
    const data = { name: item.name, slug, sku: item.sku, brand: item.brand, shortDescription: item.short, description: item.short, price: item.price, stock: item.stock, status: "ACTIVE" as const, isFeatured: item.featured, isNew: item.fresh, categoryId: categoryIds.get(item.category)! };
    const product = await prisma.product.upsert({ where: { slug }, update: data, create: data });
    await prisma.productImage.deleteMany({ where: { productId: product.id, publicId: null } });
    await prisma.productImage.create({ data: { productId: product.id, url: item.image, alt: item.name, position: 0 } });
  }
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    await prisma.user.upsert({ where: { email: process.env.ADMIN_EMAIL.toLowerCase() }, update: { role: "ADMIN", isActive: true }, create: { email: process.env.ADMIN_EMAIL.toLowerCase(), passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12), firstName: "Store", lastName: "Admin", role: "ADMIN" } });
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
