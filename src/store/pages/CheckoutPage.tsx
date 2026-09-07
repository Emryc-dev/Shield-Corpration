import React from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import StoreHeader from "../components/StoreHeader";
import { EmptyState } from "../components/StoreStates";
import { createOrder } from "../api/orders";
import { useCart } from "../context/CartContext";
import { formatMoney } from "../utils/format";

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "Cameroun",
  deliveryMethod: "standard",
  paymentMethod: "confirmation",
};

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, clearCart, hasPricedItems, estimatedTotal } = useCart();
  const [formData, setFormData] = React.useState(initialForm);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    document.title = "The Shield Corporation Store | Checkout";
  }, []);

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-bg-global">
        <StoreHeader onNavigate={onNavigate} title="Checkout" />
        <main className="mx-auto max-w-[900px] px-4 py-12">
          <EmptyState title="Votre panier est vide." text="Ajoutez un produit avant de passer commande." actionLabel="Explorer le Store" onAction={() => onNavigate("/store")} />
        </main>
      </div>
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      setError("Veuillez compléter les informations obligatoires.");
      return;
    }

    setSubmitting(true);
    try {
      await createOrder({
        ...formData,
        cartItems: items.map((item) => ({ productId: item.product.id, quantity: item.quantity })),
      });
      clearCart();
      setSuccess(true);
    } catch {
      setError("La commande n’a pas pu être confirmée pour le moment. Vérifiez votre connexion ou réessayez plus tard.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-bg-global">
        <StoreHeader onNavigate={onNavigate} title="Commande confirmée" />
        <main className="mx-auto max-w-[900px] px-4 py-12">
          <div className="rounded-[40px] border border-slate-200/70 bg-white p-8 text-center shadow-[0_30px_90px_-65px_rgba(10,27,51,0.45)]">
            <CheckCircle className="mx-auto h-12 w-12 text-[#0b7c9e]" />
            <h1 className="mt-5 font-display text-[36px] font-semibold text-navy">Commande reçue</h1>
            <p className="mx-auto mt-3 max-w-[620px] text-[14px] leading-relaxed text-slate-text">
              Merci. Notre équipe reviendra vers vous pour confirmer les disponibilités, les prix finaux et les modalités de livraison.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={() => onNavigate("/store")} className="rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white">Continuer les achats</button>
              <button onClick={() => onNavigate("/account/orders")} className="rounded-full border border-slate-200 px-5 py-3 text-[13px] font-semibold text-navy">Voir mes commandes</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-global font-sans text-navy">
      <StoreHeader onNavigate={onNavigate} title="Checkout" />
      <main className="mx-auto grid max-w-[1400px] gap-8 px-4 pb-16 pt-8 md:px-8 lg:grid-cols-[1fr_390px]">
        <form onSubmit={handleSubmit} className="rounded-[40px] border border-slate-200/60 bg-white p-6 md:p-10">
          <h1 className="font-display text-[38px] font-medium tracking-tight md:text-[54px]">Finaliser la commande</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-text">Vos informations seront envoyées au backend Django pour confirmation.</p>

          {error && <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">{error}</p>}

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Field label="Nom complet *" name="fullName" value={formData.fullName} onChange={handleChange} />
            <Field label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} />
            <Field label="Téléphone *" name="phone" value={formData.phone} onChange={handleChange} />
            <Field label="Ville *" name="city" value={formData.city} onChange={handleChange} />
            <Field label="Pays" name="country" value={formData.country} onChange={handleChange} />
            <label>
              <span className="text-[12px] font-bold uppercase tracking-wide text-navy">Mode de livraison</span>
              <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] outline-none focus:border-[#0b7c9e]">
                <option value="standard">Standard, à confirmer</option>
                <option value="pickup">Retrait, à confirmer</option>
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-[12px] font-bold uppercase tracking-wide text-navy">Adresse *</span>
            <textarea name="address" value={formData.address} onChange={handleChange} rows={4} className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] outline-none focus:border-[#0b7c9e]" />
          </label>

          <label className="mt-5 block">
            <span className="text-[12px] font-bold uppercase tracking-wide text-navy">Mode de paiement</span>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] outline-none focus:border-[#0b7c9e]">
              <option value="confirmation">À confirmer avec l’équipe</option>
            </select>
          </label>

          <button disabled={submitting} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-4 text-[14px] font-semibold text-white transition-all hover:bg-navy-dark disabled:cursor-wait disabled:bg-slate-400">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Confirmer la commande
          </button>
        </form>

        <aside className="h-fit rounded-[36px] border border-slate-200/60 bg-white p-6">
          <h2 className="font-display text-[26px] font-semibold">Résumé</h2>
          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 border-b border-slate-100 pb-4">
                <img src={item.product.images[0]?.url} alt={item.product.name} className="h-14 w-14 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-navy">{item.product.name}</p>
                  <p className="text-[12px] text-slate-text">Qté {item.quantity}</p>
                </div>
                <p className="text-[12px] font-semibold text-navy">{formatMoney(item.unitPrice)}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 text-[14px] text-slate-text">
            <div className="flex justify-between"><span>Sous-total</span><strong className="text-navy">{hasPricedItems ? formatMoney({ amount: estimatedTotal, currency: "XAF" }) : "À confirmer"}</strong></div>
            <div className="flex justify-between"><span>Livraison</span><strong className="text-navy">À confirmer</strong></div>
            <div className="border-t border-slate-100 pt-3 font-semibold text-navy">Total final confirmé par Django</div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text" }: { label: string; name: string; value: string; type?: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <label>
      <span className="text-[12px] font-bold uppercase tracking-wide text-navy">{label}</span>
      <input name={name} type={type} value={value} onChange={onChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] outline-none focus:border-[#0b7c9e]" />
    </label>
  );
}
