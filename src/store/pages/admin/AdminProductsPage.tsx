import React from "react";
import { Eye, Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react";
import AdminStoreLayout from "./AdminStoreLayout";
import { createAdminProduct, deleteAdminProduct, getAdminCategories, getAdminProducts, updateAdminProduct, uploadProductImages } from "../../api/admin";
import type { Category, Product } from "../../types";
import { formatAvailability, formatMoney } from "../../utils/format";

interface AdminPageProps { onNavigate: (path: string) => void; }
const emptyForm = { name: "", sku: "", brand: "", categoryId: "", price: "", stock: "", description: "", status: "ACTIVE" as const };

export default function AdminProductsPage({ onNavigate }: AdminPageProps) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [form, setForm] = React.useState(emptyForm);
  const [files, setFiles] = React.useState<File[]>([]);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const load = React.useCallback(async () => {
    const [productResults, categoryResults] = await Promise.all([getAdminProducts(), getAdminCategories()]);
    setProducts(productResults); setCategories(categoryResults);
    setForm((current) => ({ ...current, categoryId: current.categoryId || categoryResults[0]?.id || "" }));
  }, []);
  React.useEffect(() => { document.title = "Admin Produits | The Shield Corporation"; void load(); }, [load]);
  const change = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const reset = () => { setEditingId(null); setForm({ ...emptyForm, categoryId: categories[0]?.id || "" }); setFiles([]); };
  const edit = (product: Product) => { setEditingId(product.id); setForm({ name: product.name, sku: (product as any).sku || "", brand: product.brand || "", categoryId: product.category.id, price: String(product.price?.amount || ""), stock: String(product.stock || 0), description: product.description || product.shortDescription || "", status: "ACTIVE" }); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      const product = editingId ? await updateAdminProduct(editingId, payload) : await createAdminProduct(payload);
      if (files.length) await uploadProductImages(product.id, files);
      setMessage(editingId ? "Produit mis à jour." : "Produit créé."); reset(); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Impossible d’enregistrer le produit."); }
    finally { setBusy(false); }
  };
  const remove = async (id: string) => { if (!window.confirm("Archiver ce produit ?")) return; await deleteAdminProduct(id); await load(); };

  return <AdminStoreLayout active="products" title="Gestion des produits" subtitle="Gérez le catalogue, le stock et les images publiés par l’API Store." onNavigate={onNavigate}>
    <section className="rounded-[32px] border border-slate-200/70 bg-white p-5">
      <div className="flex items-center justify-between gap-4"><div><h3 className="font-display text-[26px] font-semibold">Catalogue produits</h3><p className="text-[13px] text-slate-text">{products.length} produit(s)</p></div><button onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-[13px] font-bold text-white"><Plus className="h-4 w-4" />Nouveau produit</button></div>
      <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[900px] text-left text-[13px]"><thead className="text-[11px] uppercase text-slate-400"><tr><th className="pb-3">Produit</th><th>Catégorie</th><th>Prix</th><th>Stock</th><th>Statut</th><th className="text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{products.map((product) => <tr key={product.id}><td className="py-4"><div className="flex items-center gap-3">{product.images[0]?.url ? <img src={product.images[0].url} alt={product.name} className="h-14 w-14 rounded-2xl object-cover" /> : <div className="h-14 w-14 rounded-2xl bg-slate-100" />}<div><p className="font-bold">{product.name}</p><p className="text-xs text-slate-text">{product.brand}</p></div></div></td><td>{product.category.name}</td><td>{formatMoney(product.price)}</td><td>{product.stock}</td><td>{formatAvailability(product.availability)}</td><td><div className="flex justify-end gap-2"><button onClick={() => onNavigate(`/store/product/${product.slug}`)} aria-label="Voir"><Eye className="h-4 w-4" /></button><button onClick={() => edit(product)} aria-label="Modifier"><Pencil className="h-4 w-4" /></button><button onClick={() => void remove(product.id)} aria-label="Archiver" className="text-red-500"><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table></div>
    </section>
    <form onSubmit={submit} className="mt-6 rounded-[32px] border border-slate-200/70 bg-white p-6">
      <h3 className="font-display text-[26px] font-semibold">{editingId ? "Modifier le produit" : "Nouveau produit"}</h3>{message && <p role="status" className="mt-3 text-sm text-[#0b7c9e]">{message}</p>}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field name="name" label="Nom du produit" value={form.name} onChange={change} required /><Field name="sku" label="SKU" value={form.sku} onChange={change} required />
        <Field name="brand" label="Marque" value={form.brand} onChange={change} /><label className="grid gap-2 text-xs font-bold text-slate-text">Catégorie<select name="categoryId" value={form.categoryId} onChange={change} required className="h-12 rounded-2xl border bg-slate-50 px-4">{categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label>
        <Field name="price" type="number" label="Prix XAF" value={form.price} onChange={change} required /><Field name="stock" type="number" label="Stock" value={form.stock} onChange={change} required />
        <label className="grid gap-2 text-xs font-bold text-slate-text md:col-span-2">Images (JPG, PNG ou WebP, 5 Mo max)<span className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed bg-slate-50"><Upload className="h-5 w-5" />{files.length ? `${files.length} fichier(s) sélectionné(s)` : "Importer des images"}<input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(event) => setFiles(Array.from(event.target.files || []))} /></span></label>
        <label className="grid gap-2 text-xs font-bold text-slate-text md:col-span-2">Description<textarea name="description" value={form.description} onChange={change} required className="min-h-28 rounded-2xl border bg-slate-50 px-4 py-3" /></label>
      </div><button disabled={busy} className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white disabled:opacity-60">{busy && <Loader2 className="h-4 w-4 animate-spin" />}{editingId ? "Enregistrer" : "Créer le produit"}</button>
    </form>
  </AdminStoreLayout>;
}
function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <label className="grid gap-2 text-xs font-bold text-slate-text">{label}<input {...props} className="h-12 rounded-2xl border bg-slate-50 px-4" /></label>; }
