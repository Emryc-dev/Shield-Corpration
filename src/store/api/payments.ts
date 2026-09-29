import { apiRequest } from "./client";

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED" | "EXPIRED";

export interface StorePayment {
  id: string;
  orderId: string;
  reference: string;
  status: PaymentStatus;
  authorizationUrl?: string | null;
  amount: string | number;
  currency: string;
}

export function initializePayment(orderId: string) {
  return apiRequest<StorePayment>("/api/payments", {
    method: "POST",
    body: JSON.stringify({ orderId }),
  });
}

export function verifyPayment(paymentId: string) {
  return apiRequest<{ processed: boolean; status: PaymentStatus; paymentId: string; orderId: string }>(
    `/api/payments/${encodeURIComponent(paymentId)}/verify`,
    { method: "POST" },
  );
}
