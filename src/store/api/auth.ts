import type { Customer } from "../types";
import { apiRequest, storeSession } from "./client";

function normalizeCustomer(user: any): Customer | null {
  return user ? ({ ...user, fullName: `${user.firstName} ${user.lastName}`.trim() }) : null;
}

export function getCurrentCustomer() {
  return apiRequest<any>("/api/users/me").then(normalizeCustomer);
}

export async function login(email: string, password: string) {
  const session = await apiRequest<any>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  storeSession.set(session.accessToken, session.refreshToken);
  return session;
}

export async function register(input: { firstName: string; lastName: string; email: string; phone?: string; password: string }) {
  const session = await apiRequest<any>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
  storeSession.set(session.accessToken, session.refreshToken);
  return session;
}

export async function loginWithGoogle(credential: string) {
  const session = await apiRequest<any>("/api/auth/google", { method: "POST", body: JSON.stringify({ credential }) });
  storeSession.set(session.accessToken, session.refreshToken);
  return session;
}

export function updateCurrentCustomer(input: { firstName: string; lastName: string; phone: string; address: string; city: string; country: string }) {
  return apiRequest<any>("/api/users/me", { method: "PATCH", body: JSON.stringify(input) }).then(normalizeCustomer);
}

export async function logout() {
  const refreshToken = storeSession.getRefreshToken();
  try {
    if (refreshToken) await apiRequest("/api/auth/logout", { method: "POST", body: JSON.stringify({ refreshToken }) });
  } finally {
    storeSession.clear();
  }
}
