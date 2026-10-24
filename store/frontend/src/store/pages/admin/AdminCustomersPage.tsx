import React from "react";
import { Ban, Loader2, Search, ShieldCheck, Trash2, UserRound } from "lucide-react";
import AdminStoreLayout from "./AdminStoreLayout";
import AdminModal from "../../components/AdminModal";
import { deleteAdminCustomer, getAdminCustomer, getAdminCustomers, setAdminCustomerStatus, type AdminCustomer } from "../../api/admin";

export default function AdminCustomersPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [customers, setCustomers] = React.useState<AdminCustomer[]>([]);
  const [selected, setSelected] = React.useState<AdminCustomer | null>(null);
  const [query, setQuery] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const load = React.useCallback(async () => setCustomers(await getAdminCustomers()), []);
  React.useEffect(() => { document.title = "Clients | Administration Store"; void load(); }, [load]);
  const openCustomer = async (id: string) => { setBusy(true); setError(""); try { setSelected(await getAdminCustomer(id)); } catch { setError("Impossible de charger ce profil."); } finally { setBusy(false); } };
  const toggleStatus = async () => { if (!selected) return; setBusy(true); try { await setAdminCustomerStatus(selected.id, !selected.isActive); const detail = await getAdminCustomer(selected.id); setSelected(detail); await load(); } finally { setBusy(false); } };
  const remove = async () => { if (!selected || !window.confirm("Supprimer définitivement ce client sans commande ?")) return; setBusy(true); setError(""); try { await deleteAdminCustomer(selected.id); setSelected(null); await load(); } catch (cause) { setError(cause instanceof Error ? cause.message : "Ce client ne peut pas être supprimé."); } finally { setBusy(false); } };
  const visible = customers.filter((customer) => `${customer.firstName} ${customer.lastName} ${customer.email}`.toLowerCase().includes(query.toLowerCase()));
  return <AdminStoreLayout active="customers" title="Clients" subtitle="Consultez les profils, l'activité d'achat et gérez l'accès des comptes clients." onNavigate={onNavigate}>
    <section className="rounded-[32px] border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-display text-[26px] font-semibold">Comptes clients</h2><p className="text-sm text-slate-text">{customers.length} client(s)</p></div><label className="flex h-11 min-w-64 items-center gap-2 rounded-full border bg-slate-50 px-4"><Search className="h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un client" className="w-full bg-transparent text-sm outline-none" /></label></div>
      {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="text-xs uppercase text-slate-400"><tr><th className="pb-3">Client</th><th>Commandes</th><th>Total dépensé</th><th>Inscription</th><th>Statut</th></tr></thead><tbody className="divide-y">{visible.map((customer) => <tr key={customer.id} onClick={() => void openCustomer(customer.id)} className="cursor-pointer hover:bg-slate-50"><td className="py-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-bold text-white">{customer.firstName[0]}{customer.lastName[0]}</span><div><p className="font-bold">{customer.firstName} {customer.lastName}</p><p className="text-xs text-slate-text">{customer.email}</p></div></div></td><td>{customer.orderCount}</td><td>{Number(customer.totalSpent).toLocaleString("fr-FR")} XAF</td><td>{new Date(customer.createdAt).toLocaleDateString("fr-FR")}</td><td><span className={`rounded-full px-3 py-1 text-xs font-bold ${customer.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{customer.isActive ? "Actif" : "Bloqué"}</span></td></tr>)}</tbody></table>{!visible.length && <p className="py-12 text-center text-sm text-slate-text">Aucun client ne correspond à cette recherche.</p>}</div>
    </section>
    <AdminModal open={Boolean(selected)} onClose={() => setSelected(null)} title="Profil client" description="Informations du compte et historique des commandes.">
      {selected && <div>
        <div className="flex items-center gap-4 rounded-3xl bg-slate-50 p-5"><span className="grid h-16 w-16 place-items-center rounded-full bg-navy text-xl font-bold text-white"><UserRound className="h-7 w-7" /></span><div><h3 className="text-xl font-bold text-navy">{selected.firstName} {selected.lastName}</h3><p className="text-sm text-slate-text">{selected.email}</p><p className="text-sm text-slate-text">{selected.phone || "Téléphone non renseigné"}</p></div></div>
        <dl className="mt-5 grid gap-3 sm:grid-cols-3"><Stat label="Commandes" value={String(selected.orderCount)} /><Stat label="Total dépensé" value={`${Number(selected.totalSpent).toLocaleString("fr-FR")} XAF`} /><Stat label="Membre depuis" value={new Date(selected.createdAt).toLocaleDateString("fr-FR")} /></dl>
        <h3 className="mt-6 font-bold">Dernières commandes</h3><div className="mt-3 grid gap-2">{selected.orders?.length ? selected.orders.slice(0, 5).map((order) => <div key={order.id} className="flex justify-between rounded-2xl border p-3 text-sm"><span>{order.reference || order.id}</span><span className="font-semibold">{order.status}</span></div>) : <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-text">Aucune commande enregistrée.</p>}</div>
        {error && <p role="alert" className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="mt-6 flex flex-wrap justify-end gap-3"><button disabled={busy} onClick={() => void remove()} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-bold text-red-600 disabled:opacity-50"><Trash2 className="h-4 w-4" />Supprimer</button><button disabled={busy} onClick={() => void toggleStatus()} className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : selected.isActive ? <Ban className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}{selected.isActive ? "Bloquer le compte" : "Réactiver le compte"}</button></div>
      </div>}
    </AdminModal>
  </AdminStoreLayout>;
}
function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border p-4"><dt className="text-xs text-slate-text">{label}</dt><dd className="mt-1 font-bold text-navy">{value}</dd></div>; }
