import type { CheckoutPayload, Order } from "../types";
import { apiRequest } from "./client";

export function createOrder(payload: CheckoutPayload) {
  return apiRequest<Order>("/api/store/orders/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getOrders() {
  return apiRequest<Order[]>("/api/store/orders/");
}
