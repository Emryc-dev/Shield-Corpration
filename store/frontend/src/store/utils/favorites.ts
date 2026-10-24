import React from "react";
import { addFavorite, getFavorites, removeFavorite } from "../api/favorites";
import { storeSession } from "../api/client";

const listeners = new Set<() => void>();
let favoriteIds = new Set<string>();
let loaded = false;
let loading: Promise<void> | null = null;
let sessionVersion = 0;

window.addEventListener('shield-store-session-change', () => {
  sessionVersion += 1;
  favoriteIds = new Set();
  loaded = false;
  loading = null;
  emit();
  void ensureLoaded();
});

function emit() { listeners.forEach((listener) => listener()); }
function subscribe(listener: () => void) { listeners.add(listener); return () => listeners.delete(listener); }
function snapshot() { return Array.from(favoriteIds).sort().join(","); }

function ensureLoaded() {
  if (!storeSession.hasToken() || loaded) return Promise.resolve();
  if (!loading) {
    const version = sessionVersion;
    loading = getFavorites().then((favorites) => {
      if (version !== sessionVersion) return;
      favoriteIds = new Set(favorites.map((favorite) => favorite.productId));
      loaded = true;
      emit();
    }).catch(() => undefined).finally(() => { if (version === sessionVersion) loading = null; });
  }
  return loading;
}

export function useFavorite(productId: string, onAuthenticationRequired?: () => void) {
  const stored = React.useSyncExternalStore(subscribe, snapshot, () => "");
  const [busy, setBusy] = React.useState(false);
  React.useEffect(() => { void ensureLoaded(); }, []);
  const favorite = stored.split(",").filter(Boolean).includes(productId);

  const toggle = React.useCallback(async () => {
    if (!storeSession.hasToken()) {
      onAuthenticationRequired?.();
      return;
    }
    if (busy) return;
    setBusy(true);
    const wasFavorite = favorite;
    if (wasFavorite) favoriteIds.delete(productId); else favoriteIds.add(productId);
    emit();
    try {
      if (wasFavorite) await removeFavorite(productId); else await addFavorite(productId);
    } catch {
      if (wasFavorite) favoriteIds.add(productId); else favoriteIds.delete(productId);
      emit();
    } finally {
      setBusy(false);
    }
  }, [busy, favorite, onAuthenticationRequired, productId]);

  return { favorite, toggle, busy };
}
