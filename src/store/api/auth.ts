import type { Customer } from "../types";
import { apiRequest, storeSession } from "./client";

export function getCurrentCustomer() {
  return apiRequest<any>("/api/users/me").then((user) => user ? ({ ...user, fullName: `${user.firstName} ${user.lastName}` }) : null);
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
