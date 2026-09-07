import type { Customer } from "../types";
import { apiRequest } from "./client";

export function getCurrentCustomer() {
  return apiRequest<Customer | null>("/api/store/auth/me/");
}
