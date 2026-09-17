import { fallbackCategories, fallbackProducts } from '../data/fallbackCatalog';
import type { Category, Order, Product } from '../types';
import { apiRequest } from './client';

export interface AdminOverview {
  source?: 'demo' | 'api';
  revenueLabel: string;
  productsCount: number;
  ordersCount: number;
  lowStockCount: number;
  recentOrders: Order[];
  popularProducts: Product[];
  categoryBreakdown: Array<{ name: string; count: number }>;
}

function buildOverview(): AdminOverview {
  return {
    source: 'demo',
    revenueLabel: 'Non disponible',
    productsCount: fallbackProducts.length,
    ordersCount: 0,
    lowStockCount: fallbackProducts.filter((product) => product.availability === 'limited').length,
    recentOrders: [],
    popularProducts: fallbackProducts.filter((product) => product.isFeatured).slice(0, 4),
    categoryBreakdown: fallbackCategories.map((category) => ({ name: category.name, count: fallbackProducts.filter((product) => product.category.slug === category.slug).length })),
  };
}

export async function getAdminOverview(): Promise<AdminOverview> {
  try { return { ...await apiRequest<AdminOverview>('/api/store/admin/overview/'), source: 'api' }; }
  catch { return buildOverview(); }
}

export async function getAdminProducts(): Promise<Product[]> {
  try { return await apiRequest<Product[]>('/api/store/admin/products/'); }
  catch { return fallbackProducts; }
}

export async function getAdminOrders(): Promise<Order[]> {
  try { return await apiRequest<Order[]>('/api/store/admin/orders/'); }
  catch { return []; }
}

export async function getAdminCategories(): Promise<Category[]> {
  try { return await apiRequest<Category[]>('/api/store/admin/categories/'); }
  catch { return fallbackCategories; }
}
