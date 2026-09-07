import React from "react";
import StoreHeader from "../components/StoreHeader";
import { EmptyState, StoreSkeletonGrid } from "../components/StoreStates";
import { getOrders } from "../api/orders";
import type { Order, OrderStatus } from "../types";
import { formatMoney } from "../utils/format";

interface OrdersPageProps {
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

export default function OrdersPage({ onNavigate }: OrdersPageProps) {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    document.title = "The Shield Corporation Store | Commandes";
    getOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-bg-global font-sans text-navy">
      <StoreHeader onNavigate={onNavigate} title="Commandes" />
      <main className="mx-auto max-w-[1100px] px-4 pb-16 pt-8 md:px-8">
        <section className="rounded-[40px] border border-slate-200/60 bg-white p-6 md:p-10">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#0b7c9e]">Compte client</p>
          <h1 className="mt-3 font-display text-[38px] font-medium tracking-tight md:text-[56px]">Mes commandes</h1>
          <p className="mt-3 max-w-[620px] text-[14px] leading-relaxed text-slate-text">
            Cette page est prête pour l’authentification Django. Les commandes s’afficheront dès qu’un client connecté sera disponible.
          </p>
        </section>

        <section className="mt-8">
          {loading ? (
            <StoreSkeletonGrid count={2} />
          ) : orders.length === 0 ? (
            <EmptyState title="Aucune commande pour le moment." text="Vos commandes apparaîtront ici après confirmation par le backend Django." actionLabel="Explorer le Store" onAction={() => onNavigate("/store")} />
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <article key={order.id} className="rounded-[30px] border border-slate-200/70 bg-white p-5">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="font-display text-[22px] font-semibold text-navy">{order.reference}</h2>
                      <p className="mt-1 text-[13px] text-slate-text">{new Date(order.createdAt).toLocaleDateString("fr-CM")}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-[13px] font-semibold text-[#0b7c9e]">{statusLabels[order.status]}</p>
                      <p className="mt-1 text-[15px] font-bold text-navy">{formatMoney(order.total)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
