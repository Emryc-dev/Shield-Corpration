import { env } from "../../config/env";
import { ApiError } from "../../utils/api-error";
const request = async (path: string, init?: RequestInit) => {
  const response = await fetch(`${env.NOTCHPAY_BASE_URL}${path}`, { ...init, headers: { "Content-Type": "application/json", Authorization: env.NOTCHPAY_PUBLIC_KEY, ...(init?.headers ?? {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(502, "Le service de paiement est indisponible.", "PAYMENT_PROVIDER_ERROR", payload);
  return payload as any;
};
export const notchPay = {
  initialize(input: { amount: number; currency: string; email: string; name: string; reference: string; description: string }) {
    const { email, name, ...payment } = input;
    return request("/payments", {
      method: "POST",
      body: JSON.stringify({ ...payment, customer: { email, name }, callback: env.PAYMENT_CALLBACK_URL }),
    });
  },
  verify(reference: string) { return request(`/payments/${encodeURIComponent(reference)}`); }
};
