import { motion } from "motion/react";
import { ArrowUpRight, Heart, ShoppingCart } from "lucide-react";
import { useFavorite } from '../utils/favorites';
import type { Product } from "../types";
import { canAddToCart, formatAvailability, formatMoney } from "../utils/format";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  const { addItem } = useCart();
  const { favorite, toggle } = useFavorite(product.id);
  const available = canAddToCart(product.availability);
  const badge = product.isNew ? "Nouveau" : product.isPopular ? "Populaire" : product.isFeatured ? "Sélection" : undefined;

  return (
    <motion.article
      whileHover={{ y: -7 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-slate-200/70 bg-white shadow-sm transition-colors hover:border-[#0b7c9e]/28"
    >
      <button
        type="button"
        onClick={() => onNavigate(`/store/product/${product.slug}`)}
        className="relative aspect-[4/3] overflow-hidden bg-slate-100 text-left"
      >
        <img
          src={product.images[0]?.url}
          alt={product.images[0]?.alt || product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(10,27,51,0.34))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute left-2 right-14 top-3 flex items-center gap-2">
          {badge && (
            <span className="rounded-full bg-navy px-3 py-1 text-[11px] font-bold text-white shadow-sm">
              {badge}
            </span>
          )}
        </div>
      </button>
      <button type="button" onClick={toggle} aria-label={`${favorite ? 'Retirer' : 'Ajouter'} ${product.name} ${favorite ? 'des' : 'aux'} favoris`} aria-pressed={favorite} className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-navy shadow-sm focus-visible:outline-2 focus-visible:outline-[#0b7c9e]"><Heart className="h-4 w-4" fill={favorite ? 'currentColor' : 'none'} /></button>

      <div className="flex flex-1 flex-col p-3 md:p-4">
        <button
          type="button"
          onClick={() => onNavigate(`/store/product/${product.slug}`)}
          className="text-left"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0b7c9e]">{product.brand || "The Shield Store"}</p>
          <h3 className="mt-2 font-display text-[15px] font-semibold leading-tight text-navy md:text-[17px]">{product.name}</h3>
          {product.shortDescription && (
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slate-text">{product.shortDescription}</p>
          )}
        </button>

        <p className="mt-3 text-xs text-slate-text">{formatAvailability(product.availability)}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-4">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">Prix</p>
            <p className="font-display text-[15px] font-bold text-navy md:text-[17px]">{formatMoney(product.price)}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate(`/store/product/${product.slug}`)}
              className="hidden h-11 items-center justify-center rounded-full border border-slate-200 px-3 text-[12px] font-bold text-navy transition-all hover:border-[#0b7c9e]/35 hover:text-[#0b7c9e] 2xl:inline-flex"
            >
              Voir
            </button>
            <button
              type="button"
              disabled={!available}
              onClick={() => addItem(product)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white transition-all hover:bg-[#0b7c9e] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"
              aria-label={`Ajouter ${product.name} au panier`}
            >
              {available ? <ShoppingCart className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
