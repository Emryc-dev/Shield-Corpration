import React from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import AdminStoreLayout from "./AdminStoreLayout";
import { getAdminCategories, getAdminProducts } from "../../api/admin";
import type { Category, Product } from "../../types";
import { formatAvailability, formatMoney } from "../../utils/format";

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export default function AdminProductsPage({ onNavigate }: AdminPageProps) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    document.title = "Admin Produits | The Shield Corporation";
    Promise.all([getAdminProducts(), getAdminCategories()]).then(([productResults, categoryResults]) => {
      setProducts(productResults);
      setCategories(categoryResults);
    });
  }, []);

  return (
    <AdminStoreLayout
      active="products"
      title="Gestion des produits"
      subtitle="Préparez les fiches produits, images, prix, stock et caractéristiques avant synchronisation avec Django."
      onNavigate={onNavigate}
    >
      <section className="rounded-[32px] border border-slate-200/70 bg-white p-5 shadow-[0_22px_70px_-60px_rgba(10,27,51,0.45)]">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-[26px] font-semibold">Catalogue produits</h3>
            <p className="mt-1 text-[13px] text-slate-text">{products.length} produit{products.length > 1 ? "s" : ""} dans le fallback frontend.</p>
          </div>
          <button className="inline-flex w-fit items-center gap-2 rounded-full bg-navy px-5 py-3 text-[13px] font-bold text-white transition-all hover:bg-[#0b7c9e]">
            <Plus className="h-4 w-4" />
            Nouveau produit
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-[13px]">
            <thead className="text-[11px] uppercase tracking-wide text-slate-400">
              <tr>
                <th className="pb-3">Produit</th>
                <th className="pb-3">Catégorie</th>
                <th className="pb-3">Prix</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Statut</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]?.url} alt={product.name} className="h-14 w-14 rounded-2xl object-cover" />
                      <div>
                        <p className="font-bold text-navy">{product.name}</p>
                        <p className="text-[12px] text-slate-text">{product.brand || "The Shield Store"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-slate-text">{product.category.name}</td>
                  <td className="py-4 font-bold text-navy">{formatMoney(product.price)}</td>
                  <td className="py-4 text-slate-text">{product.stock ?? "À connecter"}</td>
                  <td className="py-4"><span className="rounded-full bg-slate-50 px-3 py-1 text-[12px] font-bold text-slate-text">{formatAvailability(product.availability)}</span></td>
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onNavigate(`/store/product/${product.slug}`)} className="rounded-full border border-slate-200 p-2 text-slate-text hover:border-[#0b7c9e]/30 hover:text-[#0b7c9e]" aria-label="Voir le produit"><Eye className="h-4 w-4" /></button>
                      <button className="rounded-full border border-slate-200 p-2 text-slate-text hover:border-[#0b7c9e]/30 hover:text-[#0b7c9e]" aria-label="Modifier le produit"><Pencil className="h-4 w-4" /></button>
                      <button className="rounded-full border border-slate-200 p-2 text-slate-text hover:border-red-300 hover:text-red-500" aria-label="Supprimer le produit"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-[0_22px_70px_-60px_rgba(10,27,51,0.45)]">
        <h3 className="font-display text-[26px] font-semibold">Formulaire produit</h3>
        <p className="mt-1 text-[13px] text-slate-text">Champs prévus pour l’API Django : nom, slug, prix, stock, images, caractéristiques et statut.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Nom du produit" placeholder="Ex. Casque Audio Studio" />
          <Field label="Marque" placeholder="Ex. Sony, Apple, Sélection Shield" />
          <label className="grid gap-2 text-[12px] font-bold text-slate-text">
            Catégorie
            <select className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[13px] text-navy outline-none focus:border-[#0b7c9e]/40">
              {categories.map((category) => <option key={category.id}>{category.name}</option>)}
            </select>
          </label>
          <Field label="Prix" placeholder="Ex. 150000" />
          <Field label="Stock" placeholder="Ex. 12" />
          <Field label="URL image" placeholder="https://..." />
          <label className="grid gap-2 text-[12px] font-bold text-slate-text md:col-span-2">
            Description
            <textarea className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] text-navy outline-none focus:border-[#0b7c9e]/40" placeholder="Description courte et orientée client" />
          </label>
        </div>
      </section>
    </AdminStoreLayout>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-[12px] font-bold text-slate-text">
      {label}
      <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[13px] text-navy outline-none placeholder:text-slate-400 focus:border-[#0b7c9e]/40" placeholder={placeholder} />
    </label>
  );
}
