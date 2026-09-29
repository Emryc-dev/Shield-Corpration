import type { Cart } from "../types";
import { apiRequest } from "./client";

export function getServerCart() {
  return apiRequest<Cart>("/api/cart");
}

export function addServerCartItem(productId: string, quantity: number) {
  return apiRequest<Cart>("/api/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}

export function updateServerCartItem(itemId: string, quantity: number) {
  return apiRequest<Cart>(`/api/cart/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
}

export function removeServerCartItem(itemId: string) {
  return apiRequest<Cart>(`/api/cart/items/${itemId}`, {
    method: "DELETE",
  });
}

export function clearServerCart() {
  return apiRequest<Cart>("/api/cart", { method: "DELETE" });
}
