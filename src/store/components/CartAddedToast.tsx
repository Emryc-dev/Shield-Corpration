import { motion, useReducedMotion } from "motion/react";
import { Check, ShoppingBag, X } from "lucide-react";
import type { Product } from "../types";
import { formatMoney } from "../utils/format";

interface CartAddedToastProps {
  product: Product;
  quantity: number;
  onClose: () => void;
  onViewCart: () => void;
}

export default function CartAddedToast({ product, quantity, onClose, onViewCart }: CartAddedToastProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      role="status"
      aria-live="polite"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -96, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto relative w-full max-w-[430px] overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/95 shadow-[0_24px_70px_-22px_rgba(10,27,51,0.38)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 p-3.5 pr-11 sm:p-4 sm:pr-12">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-16 sm:w-16">
          {product.images[0]?.url && <img src={product.images[0].url} alt="" className="h-full w-full object-cover" />}
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.18, duration: 0.35, ease: [0.34, 1.36, 0.64, 1] }}
            className="absolute bottom-1 right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-[#0b7c9e] text-white shadow-sm"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </motion.span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b7c9e]">Ajouté au panier</p>
          <p className="mt-1 truncate font-display text-[15px] font-semibold text-navy">{product.name}</p>
          <p className="mt-0.5 text-xs text-slate-text">{quantity > 1 ? `${quantity} articles · ` : ""}{formatMoney(product.price)}</p>
        </div>

        <button type="button" onClick={onViewCart} className="hidden shrink-0 items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0b7c9e] sm:inline-flex">
          <ShoppingBag className="h-3.5 w-3.5" />
          Voir le panier
        </button>
      </div>

      <button type="button" onClick={onViewCart} className="mx-3.5 mb-3.5 flex w-[calc(100%-1.75rem)] items-center justify-center gap-2 rounded-full bg-navy px-4 py-2.5 text-xs font-bold text-white sm:hidden">
        <ShoppingBag className="h-3.5 w-3.5" />
        Voir le panier
      </button>

      <button type="button" onClick={onClose} aria-label="Fermer la notification" className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-navy">
        <X className="h-4 w-4" />
      </button>

      {!reduceMotion && <motion.div className="h-1 origin-left bg-[#0b7c9e]" initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 4.6, ease: "linear" }} />}
    </motion.aside>
  );
}
