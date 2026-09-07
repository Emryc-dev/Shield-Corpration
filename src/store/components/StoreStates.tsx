import { AlertCircle, PackageSearch } from "lucide-react";

export function StoreSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-[360px] animate-pulse rounded-[30px] border border-slate-200/60 bg-white">
          <div className="h-44 rounded-t-[30px] bg-slate-100" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-24 rounded bg-slate-100" />
            <div className="h-5 w-3/4 rounded bg-slate-100" />
            <div className="h-3 w-full rounded bg-slate-100" />
            <div className="h-3 w-2/3 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, text, actionLabel, onAction }: { title: string; text: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="rounded-[32px] border border-slate-200/70 bg-white p-8 text-center shadow-[0_20px_60px_-30px_rgba(10,27,51,0.25)]">
      <PackageSearch className="mx-auto h-10 w-10 text-[#0b7c9e]" />
      <h2 className="mt-4 font-display text-[24px] font-semibold text-navy">{title}</h2>
      <p className="mx-auto mt-2 max-w-[520px] text-[14px] leading-relaxed text-slate-text">{text}</p>
      <button type="button" onClick={onAction} className="mt-6 rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white transition-all hover:bg-navy-dark">
        {actionLabel}
      </button>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-[32px] border border-slate-200/70 bg-white p-8 text-center">
      <AlertCircle className="mx-auto h-10 w-10 text-[#0b7c9e]" />
      <h2 className="mt-4 font-display text-[24px] font-semibold text-navy">Chargement impossible</h2>
      <p className="mx-auto mt-2 max-w-[520px] text-[14px] leading-relaxed text-slate-text">
        Nous rencontrons un problème lors du chargement des produits. Veuillez réessayer.
      </p>
      <button type="button" onClick={onRetry} className="mt-6 rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white transition-all hover:bg-navy-dark">
        Réessayer
      </button>
    </div>
  );
}
