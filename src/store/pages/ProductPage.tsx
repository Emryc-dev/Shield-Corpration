import React from "react";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart } from "lucide-react";
import StoreHeader from "../components/StoreHeader";
import ProductCard from "../components/ProductCard";
import { EmptyState, StoreSkeletonGrid } from "../components/StoreStates";
import { getProduct, getProducts } from "../api/products";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { canAddToCart, formatAvailability, formatMoney } from "../utils/format";

interface ProductPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function ProductPage({ slug, onNavigate }: ProductPageProps) {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [related, setRelated] = React.useState<Product[]>([]);
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const { addItem } = useCart();

  React.useEffect(() => {
    setLoading(true);
    getProduct(slug)
      .then(async (result) => {
        setProduct(result);
        document.title = result ? `The Shield Corporation | ${result.name}` : "The Shield Corporation | Produit";

        if (result) {
          const productResults = await getProducts({ category: result.category.slug });
          setRelated(productResults.results.filter((item) => item.slug !== result.slug).slice(0, 4));
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-global">
        <StoreHeader onNavigate={onNavigate} />
        <main className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
          <StoreSkeletonGrid count={2} />
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-bg-global">
        <StoreHeader onNavigate={onNavigate} />
        <main className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
          <EmptyState title="Produit introuvable." text="Ce produit n’est plus disponible ou n’a pas encore été publié." actionLabel="Retour au Store" onAction={() => onNavigate("/store")} />
        </main>
      </div>
    );
  }

  const available = canAddToCart(product.availability);

  const handleAddToCart = () => {
    addItem(product, quantity);
    onNavigate("/store/cart");
  };

  return (
    <div className="min-h-screen bg-bg-global font-sans text-navy">
      <StoreHeader onNavigate={onNavigate} title={product.name} />
      <main className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 md:px-8 md:pb-24">
        <button onClick={() => onNavigate(`/store/category/${product.category.slug}`)} className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-slate-text hover:text-[#0b7c9e]">
          <ArrowLeft className="h-4 w-4" />
          {product.category.name}
        </button>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[40px] border border-slate-200/60 bg-white p-4 shadow-[0_30px_90px_-60px_rgba(10,27,51,0.45)]">
            <div className="aspect-[4/3] overflow-hidden rounded-[32px] bg-slate-100">
              <img src={product.images[0]?.url} alt={product.images[0]?.alt || product.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((image) => (
                <img key={image.id} src={image.url} alt={image.alt} className="aspect-square rounded-2xl object-cover" />
              ))}
            </div>
          </div>

          <div className="rounded-[40px] border border-slate-200/60 bg-white p-6 shadow-[0_30px_90px_-65px_rgba(10,27,51,0.45)] md:p-10">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#0b7c9e]">{product.brand || product.category.name}</p>
            <h1 className="mt-3 font-display text-[38px] font-medium leading-[1.06] tracking-tight md:text-[58px]">{product.name}</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-text">{product.description || product.shortDescription}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-50 px-4 py-2 text-[13px] font-semibold text-navy">{formatAvailability(product.availability)}</span>
              {product.stock !== undefined && <span className="rounded-full bg-slate-50 px-4 py-2 text-[13px] font-semibold text-slate-text">{product.stock} en stock</span>}
            </div>

            <div className="mt-8 rounded-[28px] bg-slate-50 p-5">
              <p className="text-[12px] font-semibold text-slate-400">Prix</p>
              <div className="mt-1 flex items-end gap-3">
                <p className="font-display text-[30px] font-bold text-navy">{formatMoney(product.price)}</p>
                {product.oldPrice && <p className="pb-1 text-[14px] text-slate-400 line-through">{formatMoney(product.oldPrice)}</p>}
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-text">
                Les prix, stocks et disponibilités seront confirmés par le backend Django avant validation de commande.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <div className="flex w-full items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 sm:w-36">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-full p-2 hover:bg-slate-50" aria-label="Réduire la quantité">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-semibold">{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)} className="rounded-full p-2 hover:bg-slate-50" aria-label="Augmenter la quantité">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button disabled={!available} onClick={handleAddToCart} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-navy px-5 py-3.5 text-[13px] font-semibold text-white transition-all hover:bg-navy-dark disabled:cursor-not-allowed disabled:bg-slate-300">
                <ShoppingCart className="h-4 w-4" />
                Ajouter au panier
              </button>
              <button disabled={!available} onClick={handleAddToCart} className="inline-flex flex-1 items-center justify-center rounded-full bg-[#0b7c9e] px-5 py-3.5 text-[13px] font-semibold text-white transition-all hover:bg-navy disabled:cursor-not-allowed disabled:bg-slate-300">
                Acheter maintenant
              </button>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h2 className="font-display text-[22px] font-semibold text-navy">Caractéristiques</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <div key={`${feature.name}-${feature.value}`} className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{feature.name}</p>
                      <p className="mt-1 text-[13px] font-semibold text-navy">{feature.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-3 border-t border-slate-100 pt-6 text-[13px] text-slate-text">
              <p className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-[#0b7c9e]" /> Livraison, garantie et paiement configurables depuis Django.</p>
              <p className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-[#0b7c9e]" /> Le backend reste la source de vérité pour les prix et le stock.</p>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-14" aria-labelledby="related-products">
            <h2 id="related-products" className="font-display text-[32px] font-semibold tracking-tight md:text-[42px]">Vous pourriez aussi aimer</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => <ProductCard key={item.id} product={item} onNavigate={onNavigate} />)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
