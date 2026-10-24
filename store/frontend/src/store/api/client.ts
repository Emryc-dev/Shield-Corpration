declare const __PUBLIC_API_BASE_URL__: string;

const API_BASE_URL = __PUBLIC_API_BASE_URL__ || import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_DJANGO_API_BASE_URL || "";
const TOKEN_KEY = "shield-store-access-token";
const REFRESH_TOKEN_KEY = "shield-store-refresh-token";

export class StoreApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "StoreApiError";
    this.status = status;
    this.code = code;
  }
}

interface RequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined | null>;
}

function buildUrl(path: string, query?: RequestOptions["query"]) {
  const base = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const pathname = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${pathname}`, window.location.origin);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  });

  return url.toString();
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { query, headers, ...requestOptions } = options;
  const token = typeof window !== "undefined" ? window.localStorage.getItem(TOKEN_KEY) : null;
  const isFormData = requestOptions.body instanceof FormData;
  const hasBody = requestOptions.body !== undefined && requestOptions.body !== null;
  const response = await fetch(buildUrl(path, query), {
    credentials: "include",
    headers: {
      ...(hasBody && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...requestOptions,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: { code?: string; message?: string } } | null;
    throw new StoreApiError(
      payload?.error?.message || "Nous rencontrons un problème lors du chargement des données.",
      response.status,
      payload?.error?.code,
    );
  }

  if (response.status === 204) return undefined as T;

  const payload = await response.json();
  return (payload && typeof payload === "object" && "data" in payload ? payload.data : payload) as T;
}

export const storeSession = {
  set(accessToken: string, refreshToken?: string) {
    window.localStorage.setItem(TOKEN_KEY, accessToken);
    if (refreshToken) window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    window.dispatchEvent(new Event('shield-store-session-change'));
  },
  clear() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.dispatchEvent(new Event('shield-store-session-change'));
  },
  hasToken() { return Boolean(window.localStorage.getItem(TOKEN_KEY)); },
  getRefreshToken() { return window.localStorage.getItem(REFRESH_TOKEN_KEY); },
};
