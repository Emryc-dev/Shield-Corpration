import { ArrowLeft, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface StoreHeaderProps {
  onNavigate: (path: string) => void;
  title?: string;
}

export default function StoreHeader({ onNavigate, title = "The Shield Corporation Store" }: StoreHeaderProps) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-bg-global/85 px-4 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate("/")}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold text-navy shadow-sm transition-all hover:border-[#0b7c9e]/35 hover:text-[#0b7c9e] active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          Accueil
        </button>

        <button
          type="button"
          onClick={() => onNavigate("/store")}
          className="flex min-w-0 items-center gap-2 text-left"
        >
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-navy text-white md:flex">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-[15px] font-bold tracking-tight text-navy"><span className="sm:hidden">Shield Store</span><span className="hidden sm:inline">{title}</span></span>
            <span className="hidden text-[11px] font-semibold text-slate-text md:block">Technologie et accessoires</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("/store/cart")}
          className="relative inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-[12px] font-semibold text-white shadow-md transition-all hover:bg-navy-dark active:scale-95"
          aria-label={`Panier, ${itemCount} article${itemCount > 1 ? "s" : ""}`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Panier</span>
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0b7c9e] px-1 text-[10px] font-bold text-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
