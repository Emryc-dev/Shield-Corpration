const API_BASE_URL = import.meta.env.VITE_DJANGO_API_BASE_URL || "";

export class StoreApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "StoreApiError";
    this.status = status;
  }
}

interface RequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined | null>;
}

function buildUrl(path: string, query?: RequestOptions["query"]) {
  const base = API_BASE_URL.replace(/\/$/, "");
  const pathname = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${pathname}`, window.location.origin);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return base ? `${url.pathname}${url.search}`.replace(pathname, `${base}${pathname}`) : `${url.pathname}${url.search}`;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { query, headers, ...requestOptions } = options;
  const response = await fetch(buildUrl(path, query), {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...requestOptions,
  });

  if (!response.ok) {
    throw new StoreApiError("Nous rencontrons un problème lors du chargement des données.", response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
