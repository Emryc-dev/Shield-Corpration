import React from "react";
import { ArrowRight, Headphones, Laptop, Link, Smartphone, Watch, Zap } from "lucide-react";
import StoreHeader from "../components/StoreHeader";
import ProductCard from "../components/ProductCard";
import { EmptyState, StoreSkeletonGrid } from "../components/StoreStates";
import { getCategories, getProducts } from "../api/products";
import type { Category, Product } from "../types";

interface StorePageProps {
  onNavigate: (path: string) => void;
}

const categoryIcons = [Smartphone, Laptop, Headphones, Zap, Watch, Link];

export default function StorePage({ onNavigate }: StorePageProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    document.title = "The Shield Corporation Store | Technologie & accessoires";
    Promise.all([getCategories(), getProducts()])
      .then(([categoryResults, productResults]) => {
        setCategories(categoryResults);
        setProducts(productResults.results);
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  const newest = products.filter((product) => product.isNew).slice(0, 4);
  const popular = products.filter((product) => product.isPopular).slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-global font-sans text-navy">
      <StoreHeader onNavigate={onNavigate} />
      <main className="px-4 pb-16 pt-8 md:px-8 md:pb-24">
        <section className="mx-auto max-w-[1400px] overflow-hidden rounded-[44px] border border-slate-200/60 bg-white shadow-[0_35px_100px_-60px_rgba(10,27,51,0.4)]">
          <div className="grid gap-10 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-12 lg:p-16">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0b7c9e]/15 bg-[#0b7c9e]/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#0b7c9e]">
                The Shield Store
              </div>
              <h1 className="mt-5 max-w-[760px] font-display text-[42px] font-medium leading-[1.02] tracking-tight text-navy md:text-[68px]">
                Technologie, mobilité et accessoires sélectionnés pour votre quotidien.
              </h1>
              <p className="mt-5 max-w-[620px] text-[15px] leading-relaxed text-slate-text md:text-[17px]">
                Un espace complémentaire à nos services IT, pensé pour vous aider à choisir des équipements utiles, simples et adaptés à vos usages.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => onNavigate("/store/category/smartphones")} className="rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white transition-all hover:bg-navy-dark">
                  Voir la sélection
                </button>
                <button onClick={() => onNavigate("/#contact")} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-[13px] font-semibold text-navy transition-all hover:border-[#0b7c9e]/35 hover:text-[#0b7c9e]">
                  Demander conseil
                </button>
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[36px] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=82"
                alt="Espace de travail avec ordinateur et accessoires électroniques"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.05),rgba(10,27,51,0.65))]" />
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-[1400px]" aria-labelledby="store-categories">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 id="store-categories" className="font-display text-[30px] font-semibold tracking-tight md:text-[40px]">Catégories</h2>
              <p className="mt-2 text-[14px] text-slate-text">Une base extensible qui sera alimentée directement par Django.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];
              return (
                <button
                  key={category.id}
                  onClick={() => onNavigate(`/store/category/${category.slug}`)}
                  className="group rounded-[26px] border border-slate-200/70 bg-white p-4 text-left shadow-[0_12px_35px_-26px_rgba(10,27,51,0.4)] transition-all hover:-translate-y-1 hover:border-[#0b7c9e]/25"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0b7c9e]/8 text-[#0b7c9e] transition-colors group-hover:bg-navy group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[16px] font-semibold text-navy">{category.name}</h3>
                  <p className="mt-1 text-[12px] text-slate-text">{category.productCount ?? "Catalogue"} produits</p>
                </button>
              );
            })}
          </div>
        </section>

        {loading ? (
          <section className="mx-auto mt-12 max-w-[1400px]">
            <StoreSkeletonGrid />
          </section>
        ) : products.length === 0 ? (
          <section className="mx-auto mt-12 max-w-[1400px]">
            <EmptyState title="Cette sélection ne contient encore aucun produit." text="Le catalogue sera visible dès que les produits seront publiés depuis Django." actionLabel="Retour à l’accueil" onAction={() => onNavigate("/")} />
          </section>
        ) : (
          <>
            <ProductRail title="Nos sélections" products={featured} onNavigate={onNavigate} />
            <ProductRail title="Nouveautés" products={newest} onNavigate={onNavigate} />
            <ProductRail title="Les plus recherchés" products={popular} onNavigate={onNavigate} />
          </>
        )}

        <section className="mx-auto mt-12 max-w-[1400px] rounded-[36px] bg-navy p-7 text-white md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-[28px] font-semibold tracking-tight">Vous ne savez pas quel produit choisir ?</h2>
              <p className="mt-2 max-w-[680px] text-[14px] leading-relaxed text-white/65">
                Parlez à notre équipe. Nous pouvons vous orienter selon votre usage, votre budget et votre environnement de travail.
              </p>
            </div>
            <button onClick={() => onNavigate("/#contact")} className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-navy transition-all hover:bg-slate-100">
              Demander conseil
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProductRail({ title, products, onNavigate }: { title: string; products: Product[]; onNavigate: (path: string) => void }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto mt-12 max-w-[1400px]" aria-labelledby={`${title}-title`}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 id={`${title}-title`} className="font-display text-[30px] font-semibold tracking-tight md:text-[40px]">{title}</h2>
        <button onClick={() => onNavigate("/store/category/accessoires")} className="hidden items-center gap-2 text-[13px] font-bold text-[#0b7c9e] hover:text-navy sm:inline-flex">
          Voir tous les produits
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
