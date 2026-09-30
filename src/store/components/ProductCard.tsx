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
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-slate-200/70 bg-white shadow-sm transition-colors hover:border-[#0b7c9e]/28 sm:rounded-[24px]"
    >
      <button
        type="button"
        onClick={() => onNavigate(`/store/product/${product.slug}`)}
        className="relative aspect-square overflow-hidden bg-slate-100 text-left sm:aspect-[4/3]"
      >
        <img
          src={product.images[0]?.url}
          alt={product.images[0]?.alt || product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(10,27,51,0.34))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute left-1.5 right-10 top-1.5 flex items-center gap-2 sm:left-2 sm:right-14 sm:top-3">
          {badge && (
            <span className="max-w-full truncate rounded-full bg-navy px-2 py-0.5 text-[8px] font-bold text-white shadow-sm sm:px-3 sm:py-1 sm:text-[11px]">
              {badge}
            </span>
          )}
        </div>
      </button>
      <button type="button" onClick={toggle} aria-label={`${favorite ? 'Retirer' : 'Ajouter'} ${product.name} ${favorite ? 'des' : 'aux'} favoris`} aria-pressed={favorite} className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-navy shadow-sm focus-visible:outline-2 focus-visible:outline-[#0b7c9e] sm:right-2 sm:top-2 sm:h-11 sm:w-11"><Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill={favorite ? 'currentColor' : 'none'} /></button>

      <div className="flex flex-1 flex-col p-2 sm:p-3 md:p-4">
        <button
          type="button"
          onClick={() => onNavigate(`/store/product/${product.slug}`)}
          className="text-left"
        >
          <p className="truncate text-[8px] font-semibold uppercase tracking-[0.08em] text-[#0b7c9e] sm:text-[11px] sm:tracking-[0.16em]">{product.brand || "The Shield Store"}</p>
          <h3 className="mt-1 line-clamp-2 min-h-[2.25rem] font-display text-[12px] font-semibold leading-[1.15] text-navy sm:mt-2 sm:min-h-0 sm:text-[15px] sm:leading-tight md:text-[17px]">{product.name}</h3>
          {product.shortDescription && (
            <p className="mt-2 hidden line-clamp-2 text-[13px] leading-relaxed text-slate-text sm:block">{product.shortDescription}</p>
          )}
        </button>

        <p className="mt-3 hidden text-xs text-slate-text sm:block">{formatAvailability(product.availability)}</p>
        <div className="mt-auto flex items-end justify-between gap-1 pt-2 sm:flex-wrap sm:gap-2 sm:pt-4">
          <div className="min-w-0">
            <p className="hidden text-[11px] font-semibold text-slate-400 sm:block">Prix</p>
            <p className="truncate font-display text-[10px] font-bold text-navy min-[375px]:text-[11px] sm:text-[15px] md:text-[17px]">{formatMoney(product.price)}</p>
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
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-all hover:bg-[#0b7c9e] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 sm:h-11 sm:w-11"
              aria-label={`Ajouter ${product.name} au panier`}
            >
              {available ? <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
