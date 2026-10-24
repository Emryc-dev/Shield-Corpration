import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import StoreHeader from "../components/StoreHeader";
import { EmptyState } from "../components/StoreStates";
import { useCart } from "../context/CartContext";
import { formatMoney } from "../utils/format";

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { items, removeItem, updateQuantity, clearCart, hasPricedItems, estimatedTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bg-global">
        <StoreHeader onNavigate={onNavigate} />
        <main className="mx-auto max-w-[900px] px-4 py-12">
          <EmptyState title="Votre panier est encore vide." text="Explorez le Store et ajoutez les produits qui vous intéressent." actionLabel="Explorer le Store" onAction={() => onNavigate("/store")} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-global font-sans text-navy">
      <StoreHeader onNavigate={onNavigate} title="Panier" />
      <main className="mx-auto grid max-w-[1400px] gap-8 px-4 pb-16 pt-8 md:px-8 lg:grid-cols-[1fr_390px]">
        <section className="rounded-[40px] border border-slate-200/60 bg-white p-5 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-[38px] font-medium tracking-tight md:text-[54px]">Votre panier</h1>
              <p className="mt-2 text-[14px] text-slate-text">Modifiez les quantités avant de passer commande.</p>
            </div>
            <button onClick={clearCart} className="rounded-full border border-slate-200 px-4 py-2 text-[12px] font-semibold text-slate-text transition-colors hover:text-navy">
              Vider
            </button>
          </div>

          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <article key={item.product.id} className="grid gap-4 rounded-[28px] border border-slate-200/70 p-4 sm:grid-cols-[120px_1fr_auto]">
                <img src={item.product.images[0]?.url} alt={item.product.images[0]?.alt || item.product.name} className="aspect-square rounded-2xl object-cover" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b7c9e]">{item.product.brand || item.product.category.name}</p>
                  <h2 className="mt-1 font-display text-[20px] font-semibold text-navy">{item.product.name}</h2>
                  <p className="mt-2 text-[13px] text-slate-text">{formatMoney(item.unitPrice)}</p>
                  <button onClick={() => removeItem(item.product.id)} className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-slate-text hover:text-navy">
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </button>
                </div>
                <div className="flex items-center gap-3 self-center rounded-full border border-slate-200 px-3 py-2">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Réduire la quantité">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-7 text-center text-[13px] font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Augmenter la quantité">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-[36px] border border-slate-200/60 bg-white p-6 shadow-[0_30px_90px_-65px_rgba(10,27,51,0.45)]">
          <h2 className="font-display text-[26px] font-semibold text-navy">Récapitulatif</h2>
          <div className="mt-5 space-y-3 text-[14px] text-slate-text">
            <div className="flex justify-between"><span>Sous-total</span><strong className="text-navy">{hasPricedItems ? formatMoney({ amount: estimatedTotal, currency: "XAF" }) : "À confirmer"}</strong></div>
            <div className="flex justify-between"><span>Livraison</span><strong className="text-navy">À confirmer</strong></div>
            <div className="border-t border-slate-100 pt-3 text-[12px] leading-relaxed">
              Les montants finaux seront revalidés par le backend Django au moment de la commande.
            </div>
          </div>
          <button onClick={() => onNavigate("/store/checkout")} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-3.5 text-[13px] font-semibold text-white transition-all hover:bg-navy-dark">
            Passer commande
            <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => onNavigate("/store")} className="mt-3 w-full rounded-full border border-slate-200 px-5 py-3 text-[13px] font-semibold text-navy transition-all hover:border-[#0b7c9e]/35 hover:text-[#0b7c9e]">
            Continuer les achats
          </button>
        </aside>
      </main>
    </div>
  );
}
