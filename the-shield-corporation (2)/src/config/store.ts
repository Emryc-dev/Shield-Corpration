declare const __PUBLIC_STORE_URL__: string;

const configuredStoreUrl = typeof __PUBLIC_STORE_URL__ === 'string' ? __PUBLIC_STORE_URL__ : '';

export const STORE_URL = configuredStoreUrl || import.meta.env.VITE_STORE_URL || 'http://localhost:3001';

export function openStore() {
  window.location.assign(STORE_URL);
}

