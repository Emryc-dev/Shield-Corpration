import type { Cart } from "../types";
import { apiRequest } from "./client";

export function getServerCart() {
  return apiRequest<Cart>("/api/store/cart/");
}

export function addServerCartItem(productId: string, quantity: number) {
  return apiRequest<Cart>("/api/store/cart/", {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity }),
  });
}

export function updateServerCartItem(itemId: string, quantity: number) {
  return apiRequest<Cart>("/api/store/cart/", {
    method: "PATCH",
    body: JSON.stringify({ item_id: itemId, quantity }),
  });
}

export function removeServerCartItem(itemId: string) {
  return apiRequest<Cart>("/api/store/cart/", {
    method: "DELETE",
    body: JSON.stringify({ item_id: itemId }),
  });
}
