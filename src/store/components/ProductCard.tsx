import { motion } from "motion/react";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import type { Product } from "../types";
import { canAddToCart, formatAvailability, formatMoney } from "../utils/format";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  const { addItem } = useCart();
  const available = canAddToCart(product.availability);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-slate-200/60 bg-white shadow-[0_16px_45px_-28px_rgba(10,27,51,0.35)] transition-all hover:border-[#0b7c9e]/25 hover:shadow-[0_26px_60px_-30px_rgba(10,27,51,0.5)]"
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
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-navy shadow-sm">
          {formatAvailability(product.availability)}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <button
          type="button"
          onClick={() => onNavigate(`/store/product/${product.slug}`)}
          className="text-left"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b7c9e]">{product.brand || "The Shield Store"}</p>
          <h3 className="mt-1 font-display text-[18px] font-semibold leading-tight text-navy">{product.name}</h3>
          {product.shortDescription && (
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slate-text">{product.shortDescription}</p>
          )}
        </button>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">Prix</p>
            <p className="font-display text-[16px] font-bold text-navy">{formatMoney(product.price)}</p>
          </div>

          <button
            type="button"
            disabled={!available}
            onClick={() => addItem(product)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition-all hover:bg-[#0b7c9e] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            {available ? <ShoppingCart className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
