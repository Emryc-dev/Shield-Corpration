import type { ProductReview, ProductReviewsResponse } from "../types";
import { apiRequest } from "./client";

export function getProductReviews(productId: string, page = 1) {
  return apiRequest<ProductReviewsResponse>(`/api/reviews/product/${productId}`, { query: { page, limit: 10 } });
}

export function getMyReviews() {
  return apiRequest<ProductReview[]>("/api/reviews/mine");
}

export function createReview(input: { productId: string; rating: number; comment?: string }) {
  return apiRequest<ProductReview>("/api/reviews", { method: "POST", body: JSON.stringify(input) });
}

export function updateReview(id: string, input: { rating: number; comment?: string | null }) {
  return apiRequest<ProductReview>(`/api/reviews/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteReview(id: string) {
  return apiRequest<{ removed: boolean }>(`/api/reviews/${id}`, { method: "DELETE" });
}