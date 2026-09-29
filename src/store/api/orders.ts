import type { CheckoutPayload, Order } from "../types";
import { apiRequest } from "./client";
import { addServerCartItem, clearServerCart } from "./cart";

export async function createOrder(payload: CheckoutPayload) {
  await clearServerCart();
  for (const item of payload.cartItems) {
    await addServerCartItem(item.productId, item.quantity);
  }
  return apiRequest<Order>("/api/orders", {
    method: "POST",
    body: JSON.stringify({ recipientName: payload.fullName, recipientEmail: payload.email, recipientPhone: payload.phone, address: payload.address, city: payload.city, country: payload.country, shippingMethod: payload.deliveryMethod }),
  });
}

export function getOrders() {
  return apiRequest<{ items: Order[] }>("/api/orders").then((response) => response.items);
}
