import React from "react";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import StoreHeader from "../components/StoreHeader";
import ProductCard from "../components/ProductCard";
import { EmptyState, StoreSkeletonGrid } from "../components/StoreStates";
import { getCategory, getProducts } from "../api/products";
import type { Category, Product, ProductFilters } from "../types";

interface CategoryPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function CategoryPage({ slug, onNavigate }: CategoryPageProps) {
  const [category, setCategory] = React.useState<Category | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [filters, setFilters] = React.useState<ProductFilters | undefined>();
  const [search, setSearch] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [availability, setAvailability] = React.useState("");
  const [ordering, setOrdering] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const loadProducts = React.useCallback(() => {
    setLoading(true);
    Promise.all([
      getCategory(slug),
      getProducts({ category: slug, search, brand, availability: availability as never, ordering }),
    ])
      .then(([categoryResult, productResults]) => {
        setCategory(categoryResult);
        setProducts(productResults.results);
        setFilters(productResults.filters);
        document.title = `The Shield Corporation | ${categoryResult?.name || "Store"}`;
      })
      .finally(() => setLoading(false));
  }, [availability, brand, ordering, search, slug]);

  React.useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="min-h-screen bg-bg-global font-sans text-navy">
      <StoreHeader onNavigate={onNavigate} title={category?.name || "Store"} />
      <main className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 md:px-8 md:pb-24">
        <button onClick={() => onNavigate("/store")} className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-slate-text hover:text-[#0b7c9e]">
          <ArrowLeft className="h-4 w-4" />
          Store
        </button>

        <section className="rounded-[40px] border border-slate-200/60 bg-white p-6 shadow-[0_26px_80px_-55px_rgba(10,27,51,0.4)] md:p-10">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#0b7c9e]">Catégorie</p>
          <h1 className="mt-3 font-display text-[40px] font-medium leading-tight tracking-tight md:text-[64px]">{category?.name || "Produits"}</h1>
          <p className="mt-4 max-w-[680px] text-[15px] leading-relaxed text-slate-text">{category?.description || "Découvrez les produits disponibles dans cette sélection."}</p>
          <p className="mt-5 text-[13px] font-semibold text-navy">{products.length} produit{products.length > 1 ? "s" : ""}</p>
        </section>

        <section className="mt-8 rounded-[30px] border border-slate-200/70 bg-white p-4 md:p-5" aria-label="Recherche et filtres produits">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
            <label className="relative">
              <span className="sr-only">Rechercher un produit</span>
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un produit..." className="w-full rounded-full border border-slate-200 bg-slate-50 px-11 py-3 text-[13px] outline-none transition-all focus:border-[#0b7c9e] focus:bg-white" />
            </label>
            <select value={brand} onChange={(event) => setBrand(event.target.value)} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] outline-none focus:border-[#0b7c9e]">
              <option value="">Toutes les marques</option>
              {filters?.brands?.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={availability} onChange={(event) => setAvailability(event.target.value)} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] outline-none focus:border-[#0b7c9e]">
              <option value="">Disponibilité</option>
              <option value="in_stock">Disponible</option>
              <option value="limited">Stock limité</option>
              <option value="preorder">Sur commande</option>
              <option value="out_of_stock">Indisponible</option>
            </select>
            <select value={ordering} onChange={(event) => setOrdering(event.target.value)} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] outline-none focus:border-[#0b7c9e]">
              <option value="">Tri recommandé</option>
              <option value="name">Nom</option>
            </select>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[12px] text-slate-text">
            <SlidersHorizontal className="h-4 w-4 text-[#0b7c9e]" />
            Les filtres avancés seront enrichis automatiquement selon les données envoyées par Django.
          </div>
        </section>

        <section className="mt-8">
          {loading ? (
            <StoreSkeletonGrid />
          ) : products.length === 0 ? (
            <EmptyState title="Aucun produit ne correspond à votre recherche." text="Essayez de modifier votre recherche ou vos filtres." actionLabel="Réinitialiser" onAction={() => { setSearch(""); setBrand(""); setAvailability(""); setOrdering(""); }} />
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} />)}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
