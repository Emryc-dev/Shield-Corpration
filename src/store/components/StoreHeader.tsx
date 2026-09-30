import React from "react";
import { ArrowLeft, ChevronDown, LogIn, LogOut, Package, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getCurrentCustomer, logout } from "../api/auth";
import { storeSession } from "../api/client";
import type { Customer } from "../types";

export default function StoreHeader({ onNavigate, title = "The Shield Corporation Store" }: { onNavigate: (path: string) => void; title?: string }) {
  const { itemCount } = useCart();
  const [customer, setCustomer] = React.useState<(Customer & { firstName?: string; lastName?: string }) | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => { if (storeSession.hasToken()) getCurrentCustomer().then(setCustomer).catch(() => storeSession.clear()); }, []);
  const signOut = async () => { await logout(); setCustomer(null); setMenuOpen(false); onNavigate("/store"); };
  const initials = customer ? (customer.fullName || customer.email).split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() : "";
  return <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-bg-global/90 px-4 py-3 backdrop-blur-xl">
    <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
      <button onClick={() => onNavigate("/")} className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs font-semibold text-navy shadow-sm"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Accueil</span></button>
      <button onClick={() => onNavigate("/store")} className="flex min-w-0 items-center gap-2 text-left"><span className="hidden h-10 w-10 place-items-center rounded-2xl bg-navy text-white md:grid"><ShoppingBag className="h-5 w-5" /></span><span><span className="block truncate font-display text-[15px] font-bold text-navy"><span className="sm:hidden">Shield Store</span><span className="hidden sm:inline">{title}</span></span><span className="hidden text-[11px] font-semibold text-slate-text md:block">Technologie et accessoires</span></span></button>
      <div className="flex items-center gap-2">
        {customer ? <div className="relative"><button onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} className="flex items-center gap-2 rounded-full border bg-white p-1.5 pr-3 text-xs font-bold text-navy shadow-sm"><span className="grid h-8 w-8 place-items-center rounded-full bg-cyan-700 text-white">{initials}</span><ChevronDown className="h-3.5 w-3.5" /></button>{menuOpen && <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border bg-white p-2 shadow-xl"><div className="border-b px-3 py-2"><p className="truncate text-sm font-bold">{customer.fullName}</p><p className="truncate text-xs text-slate-text">{customer.email}</p></div><button onClick={() => { setMenuOpen(false); onNavigate("/account/orders"); }} className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm hover:bg-slate-50"><Package className="h-4 w-4" />Mes commandes</button><button onClick={() => void signOut()} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4" />Déconnexion</button></div>}</div> : <button onClick={() => onNavigate("/account/login?returnTo=/store")} className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-2.5 text-xs font-bold text-navy"><LogIn className="h-4 w-4" /><span className="hidden sm:inline">Connexion</span></button>}
        <button onClick={() => onNavigate("/store/cart")} className="relative inline-flex items-center gap-2 rounded-full bg-navy px-3 py-2.5 text-xs font-semibold text-white" aria-label={`Panier, ${itemCount} article(s)`}><ShoppingCart className="h-4 w-4" /><span className="hidden sm:inline">Panier</span>{itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cyan-700 px-1 text-[10px]">{itemCount}</span>}</button>
      </div>
    </div>
  </header>;
}
