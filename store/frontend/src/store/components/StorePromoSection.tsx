import { motion } from "motion/react";
import { ArrowRight, Headphones, Smartphone, Zap } from "lucide-react";
import ProductCard from "./ProductCard";
import { fallbackFeaturedProducts } from "../data/fallbackCatalog";
import type { Product } from "../types";

interface StorePromoSectionProps {
  onNavigate: (path: string) => void;
  products?: Product[];
}

export default function StorePromoSection({ onNavigate, products = fallbackFeaturedProducts.slice(0, 4) }: StorePromoSectionProps) {
  return (
    <section className="w-full border-t border-slate-200/45 bg-slate-50/50 px-4 py-16 md:py-20" aria-labelledby="store-promo-title">
      <div className="mx-auto max-w-[1400px] space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 rounded-[40px] border border-slate-200/60 bg-white p-6 shadow-[0_24px_80px_-50px_rgba(10,27,51,0.35)] md:grid-cols-[1fr_1.25fr] md:p-8"
        >
          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0b7c9e]/15 bg-[#0b7c9e]/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#0b7c9e]">
                Tech picks
              </div>
              <h2 id="store-promo-title" className="mt-5 max-w-[520px] font-display text-[32px] font-medium leading-[1.08] tracking-tight text-navy md:text-[44px]">
                Les essentiels technologiques, sélectionnés par notre équipe.
              </h2>
              <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed text-slate-text md:text-[15px]">
                Smartphones, audio, mobilité et accessoires utiles pour équiper votre quotidien sans quitter l’écosystème The Shield Corporation.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-[12px] font-semibold text-slate-text">
              {[
                { icon: Smartphone, label: "Mobilité" },
                { icon: Headphones, label: "Audio" },
                { icon: Zap, label: "Accessoires" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                  <Icon className="h-4 w-4 text-[#0b7c9e]" />
                  {label}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate("/store")}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white transition-all hover:bg-navy-dark active:scale-95"
            >
              Explorer le Store
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
