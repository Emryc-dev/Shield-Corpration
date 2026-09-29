import React from "react";
import { Loader2 } from "lucide-react";
import { getCurrentCustomer } from "../api/auth";
import { storeSession } from "../api/client";

interface RequireStoreAuthProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function RequireStoreAuth({ children, currentPath, onNavigate }: RequireStoreAuthProps) {
  const [authorized, setAuthorized] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    if (!storeSession.hasToken()) {
      onNavigate(`/account/login?returnTo=${encodeURIComponent(currentPath)}`);
      return;
    }
    getCurrentCustomer()
      .then(() => {
        if (active) setAuthorized(true);
      })
      .catch(() => {
        storeSession.clear();
        if (active) onNavigate(`/account/login?returnTo=${encodeURIComponent(currentPath)}`);
      });
    return () => {
      active = false;
    };
  }, [currentPath, onNavigate]);

  if (!authorized) {
    return (
      <main className="grid min-h-screen place-items-center bg-bg-global" aria-label="Vérification de la session">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#0b7c9e]" />
          <p className="mt-3 text-sm font-semibold text-slate-text">Vérification de votre session...</p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
