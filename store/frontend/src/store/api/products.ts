import { fallbackCategories, fallbackProducts } from "../data/fallbackCatalog";
import type { Category, Product, ProductListResponse, ProductQuery } from "../types";

function toApiQuery(query: ProductQuery) {
  return {
    category: query.category,
    search: query.search,
    sort: query.ordering,
    page: query.page,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    brand: query.brand,
    available: query.availability && query.availability !== "out_of_stock" ? true : undefined,
  };
}
import { apiRequest } from "./client";

function normalizeProduct(product: any): Product {
  const stock = Number(product.stock ?? 0);
  return {
    ...product,
    shortDescription: product.shortDescription,
    price: product.price == null ? undefined : { amount: Number(product.price), currency: "XAF" },
    oldPrice: product.compareAtPrice == null ? undefined : { amount: Number(product.compareAtPrice), currency: "XAF" },
    averageRating: Number(product.averageRating ?? 0),
    ratingCount: Number(product.ratingCount ?? 0),
    availability: stock <= 0 ? "out_of_stock" : stock <= 5 ? "limited" : "in_stock",
    images: (product.images || []).map((image: any) => ({ ...image, alt: image.alt || product.name })),
    features: product.attributes ? Object.entries(product.attributes).map(([name, value]) => ({ name, value: String(value) })) : [],
  };
}

function filterFallbackProducts(query: ProductQuery = {}): ProductListResponse {
  let results = [...fallbackProducts];

  if (query.category) {
    results = results.filter((product) => product.category.slug === query.category);
  }

  if (query.search) {
    const search = query.search.toLowerCase();
    results = results.filter((product) =>
      [product.name, product.brand, product.shortDescription]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(search))
    );
  }

  if (query.brand) {
    results = results.filter((product) => product.brand === query.brand);
  }

  if (query.availability) {
    results = results.filter((product) => product.availability === query.availability);
  }

  if (query.ordering === "name") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  const brands = Array.from(new Set(results.map((product) => product.brand).filter(Boolean))) as string[];

  return {
    results,
    count: results.length,
    next: null,
    previous: null,
    filters: {
      brands,
      availability: Array.from(new Set(results.map((product) => product.availability))),
    },
  };
}

export async function getProducts(query: ProductQuery = {}): Promise<ProductListResponse> {
  try {
    const response = await apiRequest<any>("/api/products", { query: toApiQuery(query) });
    return { results: (response.items || []).map(normalizeProduct), count: response.pagination?.total || 0, next: null, previous: null };
  } catch {
    return filterFallbackProducts(query);
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    return normalizeProduct(await apiRequest<any>(`/api/products/${slug}`));
  } catch {
    return fallbackProducts.find((product) => product.slug === slug) || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return (await apiRequest<any[]>("/api/categories")).map((category) => ({ ...category, image: category.imageUrl, productCount: category._count?.products }));
  } catch {
    return fallbackCategories;
  }
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const category = await apiRequest<any>(`/api/categories/${slug}`);
    return { ...category, image: category.imageUrl, productCount: category._count?.products };
  } catch {
    return fallbackCategories.find((category) => category.slug === slug) || null;
  }
}
