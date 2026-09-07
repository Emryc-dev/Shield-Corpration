import { fallbackCategories, fallbackProducts } from "../data/fallbackCatalog";
import type { Category, Product, ProductListResponse, ProductQuery } from "../types";

function toApiQuery(query: ProductQuery) {
  return {
    category: query.category,
    search: query.search,
    ordering: query.ordering,
    page: query.page,
    min_price: query.minPrice,
    max_price: query.maxPrice,
    brand: query.brand,
    availability: query.availability,
  };
}
import { apiRequest } from "./client";

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
    return await apiRequest<ProductListResponse>("/api/store/products/", { query: toApiQuery(query) });
  } catch {
    return filterFallbackProducts(query);
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    return await apiRequest<Product>(`/api/store/products/${slug}/`);
  } catch {
    return fallbackProducts.find((product) => product.slug === slug) || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await apiRequest<Category[]>("/api/store/categories/");
  } catch {
    return fallbackCategories;
  }
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    return await apiRequest<Category>(`/api/store/categories/${slug}/`);
  } catch {
    return fallbackCategories.find((category) => category.slug === slug) || null;
  }
}
