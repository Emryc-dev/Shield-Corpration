import React from "react";
import { Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react";
import AdminStoreLayout from "./AdminStoreLayout";
import AdminModal from "../../components/AdminModal";
import { createAdminCategory, deleteAdminCategory, getAdminCategories, updateAdminCategory, uploadCategoryImage } from "../../api/admin";
import type { Category } from "../../types";

const empty = { name: "", slug: "", description: "" };
export default function AdminCategoriesPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [form, setForm] = React.useState(empty);
  const [file, setFile] = React.useState<File | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const load = React.useCallback(async () => setCategories(await getAdminCategories()), []);
  React.useEffect(() => { document.title = "Admin Catégories | The Shield Corporation"; void load(); }, [load]);
  const change = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const add = () => { setForm(empty); setFile(null); setEditingId(null); setMessage(""); setOpen(true); };
  const edit = (category: Category) => { setEditingId(category.id); setForm({ name: category.name, slug: category.slug, description: category.description || "" }); setFile(null); setMessage(""); setOpen(true); };
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setBusy(true); setMessage(""); try { const category = editingId ? await updateAdminCategory(editingId, form) : await createAdminCategory(form); if (file) await uploadCategoryImage(category.id, file); await load(); setOpen(false); } catch (error) { setMessage(error instanceof Error ? error.message : "Enregistrement impossible."); } finally { setBusy(false); } };
  const remove = async (id: string) => { if (!window.confirm("Désactiver cette catégorie ?")) return; await deleteAdminCategory(id); await load(); };
  return <AdminStoreLayout active="categories" title="Catégories du Store" subtitle="Organisez le catalogue et importez une image pour chaque catégorie." onNavigate={onNavigate}>
    <section className="rounded-[32px] border bg-white p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-display text-[26px] font-semibold">Liste des catégories</h2><p className="text-sm text-slate-text">{categories.length} catégorie(s)</p></div><button onClick={add} className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-xs font-bold text-white"><Plus className="h-4 w-4" />Ajouter</button></div>
      <div className="grid gap-3 md:grid-cols-2">{categories.map((category) => <article key={category.id} className="flex items-center justify-between rounded-3xl border bg-slate-50 p-4"><div className="flex min-w-0 items-center gap-3">{category.image ? <img src={category.image} alt="" className="h-12 w-12 rounded-xl object-cover" /> : <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />}<div className="min-w-0"><p className="truncate font-bold">{category.name}</p><p className="truncate text-xs text-slate-text">/{category.slug} · {category.productCount ?? 0} produits</p></div></div><div className="ml-3 flex gap-3"><button onClick={() => edit(category)} aria-label="Modifier"><Pencil className="h-4 w-4" /></button><button onClick={() => void remove(category.id)} aria-label="Supprimer" className="text-red-500"><Trash2 className="h-4 w-4" /></button></div></article>)}</div>
    </section>
    <AdminModal open={open} onClose={() => !busy && setOpen(false)} title={editingId ? "Modifier la catégorie" : "Nouvelle catégorie"}>
      <form onSubmit={submit}>
        {message && <p role="alert" className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}
        <div className="grid gap-4"><Field name="name" label="Nom" value={form.name} onChange={change} required /><Field name="slug" label="Slug (optionnel)" value={form.slug} onChange={change} /><label className="grid gap-2 text-xs font-bold text-slate-text">Image<span className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed bg-slate-50"><Upload className="h-5 w-5" />{file?.name || "Importer une image"}<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => setFile(event.target.files?.[0] || null)} /></span></label><label className="grid gap-2 text-xs font-bold text-slate-text">Description<textarea name="description" value={form.description} onChange={change} className="min-h-28 rounded-2xl border bg-slate-50 px-4 py-3" /></label></div>
        <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setOpen(false)} className="rounded-full border px-5 py-3 text-sm font-bold">Annuler</button><button disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white disabled:opacity-60">{busy && <Loader2 className="h-4 w-4 animate-spin" />}Enregistrer</button></div>
      </form>
    </AdminModal>
  </AdminStoreLayout>;
}
function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <label className="grid gap-2 text-xs font-bold text-slate-text">{label}<input {...props} className="h-12 rounded-2xl border bg-slate-50 px-4" /></label>; }
