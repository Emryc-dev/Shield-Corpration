import React from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Dashboard } from "@/components/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import AdminStoreLayout from "./AdminStoreLayout";
import { createApiCost, deleteApiCost, getAdminOverview, getApiCosts, type AdminOverview, type ApiCost } from "../../api/admin";

export default function AdminStoreDashboardPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [overview, setOverview] = React.useState<AdminOverview | null>(null);
  const [costs, setCosts] = React.useState<ApiCost[]>([]);
  const [form, setForm] = React.useState({ provider: "", amount: "", description: "" });
  const [error, setError] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [reload, setReload] = React.useState(0);
  React.useEffect(() => {
    let cancelled = false; document.title = "Administration du Store | The Shield Corporation"; setError(false);
    Promise.all([getAdminOverview(), getApiCosts()]).then(([data, costItems]) => { if (!cancelled) { setOverview(data); setCosts(costItems); } }).catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [reload]);
  const submitCost = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true);
    try { await createApiCost({ provider: form.provider, amount: Number(form.amount), description: form.description || undefined }); setForm({ provider: "", amount: "", description: "" }); setReload((value) => value + 1); }
    finally { setBusy(false); }
  };
  const removeCost = async (id: string) => { await deleteApiCost(id); setReload((value) => value + 1); };
  return <AdminStoreLayout active="dashboard" title="Vue d’ensemble" subtitle="Suivez le catalogue, les commandes et le revenu net du mois." onNavigate={onNavigate}>
    {error ? <div role="alert" className="flex flex-col items-start gap-3"><p>Impossible de charger le tableau de bord.</p><Button variant="outline" onClick={() => setReload((value) => value + 1)}>Réessayer</Button></div> : overview ? <><Dashboard overview={overview} onNavigate={onNavigate} />
      <section className="mt-4 grid gap-4 rounded-xl border bg-card p-5 lg:grid-cols-[0.8fr_1.2fr]">
        <form onSubmit={submitCost}><h2 className="text-lg font-semibold">Enregistrer un coût API</h2><p className="mt-1 text-sm text-muted-foreground">Ces coûts sont déduits des ventes payées du mois.</p><div className="mt-4 grid gap-3"><input required value={form.provider} onChange={(event) => setForm({ ...form, provider: event.target.value })} placeholder="Fournisseur, ex. Cloudinary" className="h-11 rounded-lg border bg-background px-3" /><input required min="0" type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="Montant XAF" className="h-11 rounded-lg border bg-background px-3" /><input value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description optionnelle" className="h-11 rounded-lg border bg-background px-3" /><Button disabled={busy} className="w-fit">{busy ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}Ajouter le coût</Button></div></form>
        <div><h2 className="text-lg font-semibold">Coûts récents</h2><div className="mt-4 grid gap-2">{costs.length ? costs.slice(0, 8).map((cost) => <div key={cost.id} className="flex items-center justify-between rounded-lg border p-3"><div><p className="font-medium">{cost.provider}</p><p className="text-xs text-muted-foreground">{cost.description || new Date(cost.incurredAt).toLocaleDateString("fr-FR")}</p></div><div className="flex items-center gap-3"><strong>{Number(cost.amount).toLocaleString("fr-FR")} XAF</strong><button onClick={() => void removeCost(cost.id)} aria-label="Supprimer le coût" className="text-destructive"><Trash2 className="size-4" /></button></div></div>) : <p className="text-sm text-muted-foreground">Aucun coût API enregistré ce mois.</p>}</div></div>
      </section></> : <div aria-label="Chargement du tableau de bord" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-36 rounded-xl" />)}</div>}
  </AdminStoreLayout>;
}
