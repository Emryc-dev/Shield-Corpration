import React from "react";
import { Loader2 } from "lucide-react";
import { getCurrentCustomer } from "../api/auth";
import { storeSession } from "../api/client";

export default function RequireAdminAuth({ currentPath, onNavigate, children }: { currentPath: string; onNavigate: (path: string) => void; children: React.ReactNode }) {
  const [allowed, setAllowed] = React.useState(false);
  React.useEffect(() => {
    let active = true;
    if (!storeSession.hasToken()) { onNavigate(`/admin/login?returnTo=${encodeURIComponent(currentPath)}`); return; }
    getCurrentCustomer().then((user) => {
      if (!active) return;
      if (user?.role === "ADMIN") setAllowed(true);
      else { storeSession.clear(); onNavigate("/admin/login"); }
    }).catch(() => { if (active) { storeSession.clear(); onNavigate("/admin/login"); } });
    return () => { active = false; };
  }, [currentPath, onNavigate]);
  if (!allowed) return <div className="grid min-h-screen place-items-center bg-slate-50"><Loader2 className="h-7 w-7 animate-spin text-navy" aria-label="Vérification de la session" /></div>;
  return <>{children}</>;
}
