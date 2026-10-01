import type { CheckoutPayload, Order, OrderStatus } from "../types";
import { syncServerCart } from "./cart";
import { apiRequest } from "./client";

export interface OrdersPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface OrdersResponse {
  items: unknown[];
  pagination: OrdersPagination;
}

const statusMap: Record<string, OrderStatus> = {
  PENDING_PAYMENT: "received",
  PAYMENT_CONFIRMED: "payment_confirmed",
  PROCESSING: "preparing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

function normalizeOrder(rawOrder: unknown): Order {
  const order = rawOrder as Record<string, any>;
  const status = statusMap[order.status] ?? order.status ?? "received";

  return {
    ...order,
    id: String(order.id),
    reference: order.reference ?? order.number ?? String(order.id),
    status,
    createdAt: order.createdAt,
    items: Array.isArray(order.items) ? order.items : [],
    total: {
      amount: Number(order.total ?? 0),
      currency: order.currency || "XAF",
    },
  } as Order;
}

export async function createOrder(payload: CheckoutPayload) {
  await syncServerCart(payload.cartItems);
  const order = await apiRequest<unknown>("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      recipientName: payload.fullName,
      recipientEmail: payload.email,
      recipientPhone: payload.phone,
      address: payload.address,
      city: payload.city,
      country: payload.country,
      shippingMethod: payload.deliveryMethod,
    }),
  });

  return normalizeOrder(order);
}

export async function getOrders(page = 1, limit = 10) {
  const response = await apiRequest<OrdersResponse>("/api/orders", {
    query: { page, limit },
  });

  return {
    items: response.items.map(normalizeOrder),
    pagination: {
      ...response.pagination,
      page: response.pagination?.page || page,
      limit: response.pagination?.limit || limit,
      total: response.pagination?.total || 0,
      pages: Math.max(1, response.pagination?.pages || 1),
    },
  };
}
