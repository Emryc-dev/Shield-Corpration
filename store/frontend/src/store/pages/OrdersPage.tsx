import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";
import { getOrders, type OrdersPagination } from "../api/orders";
import StoreHeader from "../components/StoreHeader";
import type { Order, OrderStatus } from "../types";
import { formatMoney } from "../utils/format";

const PAGE_SIZE = 10;

const statusLabels: Record<OrderStatus, string> = {
  received: "Commande reçue",
  payment_confirmed: "Paiement confirmé",
  preparing: "En préparation",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const statusStyles: Record<OrderStatus, string> = {
  received: "bg-slate-100 text-slate-700",
  payment_confirmed: "bg-sky-100 text-sky-800",
  preparing: "bg-amber-100 text-amber-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800",
};

const initialPagination: OrdersPagination = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  pages: 1,
};

interface OrdersPageProps {
  onNavigate: (path: string) => void;
}

export default function OrdersPage({ onNavigate }: OrdersPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState(initialPagination);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getOrders(page, PAGE_SIZE)
      .then((response) => {
        if (!active) return;
        setOrders(response.items);
        setPagination(response.pagination);
      })
      .catch(() => {
        if (!active) return;
        setError("Impossible de charger vos commandes. Veuillez réessayer.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, reload]);

  const visiblePages = useMemo(() => {
    const total = pagination.pages;
    if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

    const candidates = new Set([1, total, page - 1, page, page + 1]);
    return [...candidates]
      .filter((value) => value > 0 && value <= total)
      .sort((a, b) => a - b);
  }, [page, pagination.pages]);

  const changePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > pagination.pages || nextPage === page) return;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <StoreHeader onNavigate={onNavigate} title="Mes commandes" />
      <main className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Votre espace client
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Mes commandes
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Retrouvez vos achats et suivez leur progression depuis un seul endroit.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="space-y-3 p-5" aria-label="Chargement des commandes">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-14 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : error ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
              <p className="font-medium text-slate-900">{error}</p>
              <button
                type="button"
                onClick={() => setReload((value) => value + 1)}
                className="mt-5 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Réessayer
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
              <span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-sky-50 text-sky-700">
                <PackageSearch aria-hidden="true" />
              </span>
              <h2 className="text-xl font-semibold text-slate-950">Aucune commande pour le moment</h2>
              <p className="mt-2 text-sm text-slate-600">Votre prochaine commande apparaîtra ici.</p>
              <button
                type="button"
                onClick={() => onNavigate("/store")}
                className="mt-6 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Explorer le Store
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Commande</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Articles</th>
                      <th className="px-6 py-4 font-semibold">Statut</th>
                      <th className="px-6 py-4 text-right font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((order) => {
                      const itemCount = order.items.reduce(
                        (total, item) => total + Number(item.quantity || 0),
                        0,
                      );

                      return (
                        <tr key={order.id} className="transition-colors hover:bg-sky-50/40">
                          <td className="px-6 py-5">
                            <span className="font-semibold text-slate-950">{order.reference}</span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                            {new Intl.DateTimeFormat("fr-CM", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }).format(new Date(order.createdAt))}
                          </td>
                          <td className="px-6 py-5 text-sm text-slate-600">
                            {itemCount} article{itemCount > 1 ? "s" : ""}
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
                            >
                              {statusLabels[order.status]}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-5 text-right font-semibold text-slate-950">
                            {formatMoney(order.total)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  {pagination.total} commande{pagination.total > 1 ? "s" : ""} au total
                </p>
                {pagination.pages > 1 && (
                  <nav className="flex items-center gap-1" aria-label="Pagination des commandes">
                    <button
                      type="button"
                      onClick={() => changePage(page - 1)}
                      disabled={page === 1}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Page précédente"
                    >
                      <ChevronLeft size={17} aria-hidden="true" />
                    </button>

                    {visiblePages.map((pageNumber, index) => {
                      const previous = visiblePages[index - 1];
                      return (
                        <span key={pageNumber} className="contents">
                          {previous && pageNumber - previous > 1 && (
                            <span className="px-1 text-slate-400" aria-hidden="true">…</span>
                          )}
                          <button
                            type="button"
                            onClick={() => changePage(pageNumber)}
                            aria-current={pageNumber === page ? "page" : undefined}
                            className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition ${
                              pageNumber === page
                                ? "bg-slate-950 text-white"
                                : "border border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        </span>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => changePage(page + 1)}
                      disabled={page === pagination.pages}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Page suivante"
                    >
                      <ChevronRight size={17} aria-hidden="true" />
                    </button>
                  </nav>
                )}
              </div>
            </>
          )}
        </div>
        </section>
      </main>
    </div>
  );
}
