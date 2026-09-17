import { useSyncExternalStore } from 'react';

const key = 'shield-store-favorites';
const event = 'shield-store-favorites-change';
function snapshot() {
  try { return localStorage.getItem(key) ?? '[]'; } catch { return '[]'; }
}
function subscribe(listener: () => void) {
  window.addEventListener('storage', listener);
  window.addEventListener(event, listener);
  return () => { window.removeEventListener('storage', listener); window.removeEventListener(event, listener); };
}

export function useFavorite(productId: string) {
  const stored = useSyncExternalStore(subscribe, snapshot, () => '[]');
  let ids: string[] = [];
  try { const parsed: unknown = JSON.parse(stored); if (Array.isArray(parsed)) ids = parsed.filter((id): id is string => typeof id === 'string'); } catch { /* Ignore stale browser data. */ }
  const favorite = ids.includes(productId);
  return { favorite, toggle: () => {
    const next = favorite ? ids.filter((id) => id !== productId) : [...ids, productId];
    try { localStorage.setItem(key, JSON.stringify(next)); window.dispatchEvent(new Event(event)); } catch { /* Browser storage may be unavailable. */ }
  } };
}
