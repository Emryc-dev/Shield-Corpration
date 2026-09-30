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
  bestSellers: Array<Product & { unitsSold: number; orderCount: number }>;
  bestCustomers: AdminCustomer[];
  categoryBreakdown: Array<{ name: string; count: number }>;
  revenueTrend: Array<{ date: string; gross: number; costs: number; net: number }>;
  orderTrend: Array<{ date: string; paid: number; pending: number; cancelled: number }>;
  customerTrend: Array<{ date: string; customers: number }>;
  monthlyGrossRevenue?: number;
  monthlyApiCosts?: number;
  monthlyNetRevenue?: number;
  period?: string;
}

function emptyDailyTrend() {
  const now = new Date();
  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 29 + index));
    return date.toISOString().slice(0, 10);
  });
}

export interface AdminCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  orderCount: number;
  totalSpent: number;
  orders?: Order[];
}

function buildOverview(): AdminOverview {
  const dates = emptyDailyTrend();
  return {
    source: 'demo',
    revenueLabel: 'Non disponible',
    productsCount: fallbackProducts.length,
    ordersCount: 0,
    lowStockCount: fallbackProducts.filter((product) => product.availability === 'limited').length,
    recentOrders: [],
    popularProducts: fallbackProducts.filter((product) => product.isFeatured).slice(0, 4),
    bestSellers: [],
    bestCustomers: [],
    categoryBreakdown: fallbackCategories.map((category) => ({ name: category.name, count: fallbackProducts.filter((product) => product.category.slug === category.slug).length })),
    revenueTrend: dates.map((date) => ({ date, gross: 0, costs: 0, net: 0 })),
    orderTrend: dates.map((date) => ({ date, paid: 0, pending: 0, cancelled: 0 })),
    customerTrend: dates.map((date) => ({ date, customers: 0 })),
  };
}

export async function getAdminOverview(): Promise<AdminOverview> {
  try {
    const data = await apiRequest<any>('/api/admin/dashboard');
    const bestSellers = (data.bestSellers || []).map((product: any) => ({ ...normalizeAdminProduct(product), unitsSold: Number(product.unitsSold || 0), orderCount: Number(product.orderCount || 0) }));
    return { source: 'api', revenueLabel: `${Number(data.monthlyNetRevenue || 0).toLocaleString('fr-FR')} XAF`, productsCount: data.products, ordersCount: data.orders, lowStockCount: data.lowStock, recentOrders: data.recentOrders || [], popularProducts: bestSellers, bestSellers, bestCustomers: data.bestCustomers || [], categoryBreakdown: data.categoryBreakdown || [], revenueTrend: data.revenueTrend || [], orderTrend: data.orderTrend || [], customerTrend: data.customerTrend || [], monthlyGrossRevenue: data.monthlyGrossRevenue, monthlyApiCosts: data.monthlyApiCosts, monthlyNetRevenue: data.monthlyNetRevenue, period: data.period };
  }
  catch { return buildOverview(); }
}

export async function getAdminProducts(): Promise<Product[]> {
  try { return ((await apiRequest<any>('/api/admin/products')).items || []).map(normalizeAdminProduct); }
  catch { return fallbackProducts; }
}

export async function getAdminOrders(): Promise<Order[]> {
  try { return (await apiRequest<any>('/api/admin/orders')).items || []; }
  catch { return []; }
}

export async function getAdminCategories(): Promise<Category[]> {
  try { return (await apiRequest<any[]>('/api/admin/categories')).map((category) => ({ ...category, image: category.imageUrl, productCount: category._count?.products })); }
  catch { return fallbackCategories; }
}

function normalizeAdminProduct(product: any): Product {
  const stock = Number(product.stock || 0);
  return { ...product, price: { amount: Number(product.price), currency: 'XAF' }, oldPrice: product.compareAtPrice ? { amount: Number(product.compareAtPrice), currency: 'XAF' } : undefined, availability: stock <= 0 ? 'out_of_stock' : stock <= 5 ? 'limited' : 'in_stock', images: product.images || [], features: [] };
}

export type ProductAdminInput = { name: string; sku: string; brand?: string; categoryId: string; price: number; stock: number; description: string; status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED'; isFeatured?: boolean; isNew?: boolean };
export const createAdminProduct = (input: ProductAdminInput) => apiRequest<any>('/api/admin/products', { method: 'POST', body: JSON.stringify(input) });
export const updateAdminProduct = (id: string, input: Partial<ProductAdminInput>) => apiRequest<any>(`/api/admin/products/${id}`, { method: 'PATCH', body: JSON.stringify(input) });
export const deleteAdminProduct = (id: string) => apiRequest<any>(`/api/admin/products/${id}`, { method: 'DELETE' });
export const uploadProductImages = (id: string, files: File[]) => {
  const body = new FormData();
  files.forEach((file) => body.append('images', file));
  return apiRequest<any>(`/api/admin/products/${id}/images`, { method: 'POST', body });
};
export type CategoryAdminInput = { name: string; slug?: string; description?: string; isActive?: boolean };
export const createAdminCategory = (input: CategoryAdminInput) => apiRequest<any>('/api/admin/categories', { method: 'POST', body: JSON.stringify(input) });
export const updateAdminCategory = (id: string, input: Partial<CategoryAdminInput>) => apiRequest<any>(`/api/admin/categories/${id}`, { method: 'PATCH', body: JSON.stringify(input) });
export const deleteAdminCategory = (id: string) => apiRequest<any>(`/api/admin/categories/${id}`, { method: 'DELETE' });
export const uploadCategoryImage = (id: string, file: File) => {
  const body = new FormData();
  body.append('image', file);
  return apiRequest<any>(`/api/admin/categories/${id}/image`, { method: 'POST', body });
};
export interface ApiCost { id: string; provider: string; amount: string | number; currency: string; description?: string; incurredAt: string; }
export const getApiCosts = () => apiRequest<{ items: ApiCost[] }>('/api/admin/api-costs').then((data) => data.items);
export const createApiCost = (input: { provider: string; amount: number; description?: string; incurredAt?: string }) => apiRequest<ApiCost>('/api/admin/api-costs', { method: 'POST', body: JSON.stringify({ ...input, currency: 'XAF' }) });
export const deleteApiCost = (id: string) => apiRequest<any>(`/api/admin/api-costs/${id}`, { method: 'DELETE' });
export const getAdminCustomers = () => apiRequest<{ items: AdminCustomer[] }>('/api/admin/users').then((data) => data.items);
export const getAdminCustomer = (id: string) => apiRequest<AdminCustomer>(`/api/admin/users/${id}`);
export const setAdminCustomerStatus = (id: string, isActive: boolean) => apiRequest<AdminCustomer>(`/api/admin/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ isActive }) });
export const deleteAdminCustomer = (id: string) => apiRequest<{ removed: boolean }>(`/api/admin/users/${id}`, { method: 'DELETE' });
