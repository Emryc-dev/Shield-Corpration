import { apiRequest } from "./client";

export interface FavoriteRecord {
  id: string;
  productId: string;
}

export function getFavorites() {
  return apiRequest<FavoriteRecord[]>("/api/favorites");
}

export function addFavorite(productId: string) {
  return apiRequest<FavoriteRecord>("/api/favorites", { method: "POST", body: JSON.stringify({ productId }) });
}

export function removeFavorite(productId: string) {
  return apiRequest<{ removed: boolean }>(`/api/favorites/${productId}`, { method: "DELETE" });
}