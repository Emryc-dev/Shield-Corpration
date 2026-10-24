import React from "react";
import { Eye } from "lucide-react";
import AdminStoreLayout from "./AdminStoreLayout";
import { getAdminOrders } from "../../api/admin";
import type { Order, OrderStatus } from "../../types";
import { formatMoney } from "../../utils/format";

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

const statusLabels: Record<OrderStatus, string> = {
  received: "Commande reçue",
  payment_confirmed: "Paiement confirmé",
  preparing: "En préparation",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export default function AdminOrdersPage({ onNavigate }: AdminPageProps) {
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    document.title = "Admin Commandes | The Shield Corporation";
    getAdminOrders().then(setOrders);
  }, []);

  return (
    <AdminStoreLayout
      active="orders"
      title="Suivi des commandes"
      subtitle="Retrouvez les commandes, leurs produits et leur état d’avancement."
      onNavigate={onNavigate}
    >
      <section className="rounded-[32px] border border-slate-200/70 bg-white p-5 shadow-[0_22px_70px_-60px_rgba(10,27,51,0.45)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-[13px]">
            <thead className="text-[11px] uppercase tracking-wide text-slate-400">
              <tr>
                <th className="pb-3">Référence</th>
                <th className="pb-3">Produits</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Statut</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-sm text-slate-text">Aucune commande pour le moment. Les nouvelles commandes apparaîtront ici.</td></tr>}
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-4 font-bold text-navy">{order.reference}</td>
                  <td className="py-4 text-slate-text">{order.items.length} article{order.items.length > 1 ? "s" : ""}</td>
                  <td className="py-4 text-slate-text">{new Date(order.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td className="py-4 font-bold text-navy">{formatMoney(order.total)}</td>
                  <td className="py-4">
                    <select defaultValue={order.status} className="h-10 rounded-full border border-slate-200 bg-slate-50 px-3 text-[12px] font-bold text-navy outline-none focus:border-[#0b7c9e]/40">
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 text-right">
                    <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-[12px] font-bold text-slate-text hover:border-[#0b7c9e]/30 hover:text-[#0b7c9e]">
                      <Eye className="h-4 w-4" />
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-[0_22px_70px_-60px_rgba(10,27,51,0.45)]">
        <h3 className="font-display text-[26px] font-semibold">Détail commande</h3>
        <p className="mt-2 max-w-[760px] text-[14px] leading-relaxed text-slate-text">
          Cet espace recevra les informations client, adresse, livraison, paiement, produits et historique de statuts lorsque l’endpoint Django sera disponible.
        </p>
      </section>
    </AdminStoreLayout>
  );
}
