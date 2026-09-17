import React from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminStoreLayout from "./AdminStoreLayout";
import { getAdminCategories } from "../../api/admin";
import type { Category } from "../../types";

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export default function AdminCategoriesPage({ onNavigate }: AdminPageProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    document.title = "Admin Catégories | The Shield Corporation";
    getAdminCategories().then(setCategories);
  }, []);

  return (
    <AdminStoreLayout
      active="categories"
      title="Catégories du Store"
      subtitle="Organisez le catalogue avec des catégories extensibles, pilotées ensuite par Django."
      onNavigate={onNavigate}
    >
      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[32px] border border-slate-200/70 bg-white p-5 shadow-[0_22px_70px_-60px_rgba(10,27,51,0.45)]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="font-display text-[26px] font-semibold">Liste des catégories</h3>
            <button className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-[12px] font-bold text-white hover:bg-[#0b7c9e]">
              <Plus className="h-4 w-4" />
              Ajouter
            </button>
          </div>
          <div className="grid gap-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between gap-4 rounded-[24px] border border-slate-100 bg-slate-50 p-4">
                <div>
                  <p className="font-bold text-navy">{category.name}</p>
                  <p className="mt-1 text-[12px] text-slate-text">/{category.slug} · {category.productCount ?? "Catalogue"} produits</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-text hover:text-[#0b7c9e]" aria-label="Modifier la catégorie"><Pencil className="h-4 w-4" /></button>
                  <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-text hover:text-red-500" aria-label="Supprimer la catégorie"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-[0_22px_70px_-60px_rgba(10,27,51,0.45)]">
          <h3 className="font-display text-[26px] font-semibold">Formulaire catégorie</h3>
          <div className="mt-5 grid gap-4">
            <Field label="Nom" placeholder="Ex. Smartphones" />
            <Field label="Slug" placeholder="smartphones" />
            <Field label="Image" placeholder="https://..." />
            <label className="grid gap-2 text-[12px] font-bold text-slate-text">
              Description
              <textarea className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] text-navy outline-none focus:border-[#0b7c9e]/40" placeholder="Description courte de la catégorie" />
            </label>
          </div>
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
