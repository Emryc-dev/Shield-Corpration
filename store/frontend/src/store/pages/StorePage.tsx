import React from "react";
import { ArrowRight } from "lucide-react";
import StoreHeader from "../components/StoreHeader";
import StoreHeroSlider from "../components/StoreHeroSlider";
import StoreCatalog from "../components/StoreCatalog";
import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../api/products";
import type { Category, Product } from "../types";

declare const __PUBLIC_CORPORATE_URL__: string;

interface StorePageProps {
  onNavigate: (path: string) => void;
}

export default function StorePage({ onNavigate }: StorePageProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [reload, setReload] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    document.title = "The Shield Store | Technologie & accessoires";
    Promise.all([getCategories(), getProducts()])
      .then(([categoryResults, productResults]) => {
        if (cancelled) return;
        setCategories(categoryResults);
        setProducts(productResults.results);
      })
      .catch(() => { if (!cancelled) setError('Veuillez réessayer dans quelques instants.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [reload]);

  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  const newest = products.filter((product) => product.isNew).slice(0, 4);
  const popular = products.filter((product) => product.isPopular).slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-global font-sans text-navy">
      <StoreHeader onNavigate={onNavigate} />
      <main className="px-4 pb-16 pt-6 md:px-8 md:pb-24">
        <StoreHeroSlider onNavigate={onNavigate} />

        <StoreCatalog categories={categories} products={products} loading={loading} error={error} onRetry={() => setReload((value) => value + 1)} onNavigate={onNavigate} />
        {!loading && !error && <>
            <ProductRail title="Nos recommandations" products={featured} onNavigate={onNavigate} />
            <ProductRail id="store-newest" title="Nouveautés" products={newest} onNavigate={onNavigate} compact />
            <ProductRail title="Les plus recherchés" products={popular} onNavigate={onNavigate} compact />
          </>
        }

        <section className="mx-auto mt-14 max-w-[1400px] overflow-hidden rounded-[36px] bg-navy p-7 text-white md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-[28px] font-semibold tracking-tight md:text-[36px]">
                Un doute avant d'acheter ?
              </h2>
              <p className="mt-2 max-w-[680px] text-[14px] leading-relaxed text-white/68">
                Dites-nous ce dont vous avez besoin et votre budget : nous vous conseillons le bon modèle, sans engagement.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { window.location.href = __PUBLIC_CORPORATE_URL__ + "/#contact"; }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-navy transition-all hover:bg-cyan-accent hover:text-white active:scale-95"
            >
              Parler à un conseiller
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProductRail({
  id,
  title,
  products,
  onNavigate,
  compact = false,
}: {
  id?: string;
  title: string;
  products: Product[];
  onNavigate: (path: string) => void;
  compact?: boolean;
}) {
  if (products.length === 0 && !id) return null;

  return (
    <section id={id} className={`mx-auto max-w-[1400px] scroll-mt-28 ${compact ? "mt-10" : "mt-14"}`} aria-labelledby={`${title}-title`}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 id={`${title}-title`} className="font-display text-[28px] font-semibold tracking-tight md:text-[38px]">
            {title}
          </h2>
          {!compact && <p className="mt-2 text-[14px] text-slate-text">Les produits que notre équipe conseille en priorité.</p>}
        </div>
        <button
          type="button"
          onClick={() => document.getElementById("store-catalog")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="hidden items-center gap-2 text-[13px] font-bold text-[#0b7c9e] hover:text-navy sm:inline-flex"
        >
          Voir tous les produits
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {products.length === 0 && <p className="text-sm text-slate-text">Les nouveautés seront présentées ici dès leur disponibilité.</p>}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
