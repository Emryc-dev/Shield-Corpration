import { Star } from "lucide-react";

interface RatingStarsProps {
  value: number;
  count?: number;
  size?: "sm" | "md";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function RatingStars({ value, count, size = "sm", interactive = false, onChange }: RatingStarsProps) {
  const iconSize = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";
  const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(5, value)) : 0;

  return (
    <div className="flex items-center gap-2" aria-label={`${value.toFixed(1)} sur 5${count !== undefined ? `, ${count} avis` : ""}`}>
      <div className="flex items-center gap-0.5" role={interactive ? "radiogroup" : undefined} aria-label={interactive ? "Choisir une note" : undefined}>
        {[1, 2, 3, 4, 5].map((rating) => {
          const fill = Math.max(0, Math.min(1, safeValue - rating + 1)) * 100;
          const star = <span className='relative inline-flex' aria-hidden='true'><Star className={`${iconSize} fill-transparent text-amber-500/40`} /><span className='absolute inset-y-0 left-0 overflow-hidden' style={{ width: `${fill}%` }}><Star className={`${iconSize} fill-amber-500 text-amber-500`} /></span></span>;
          return interactive ? (
            <button key={rating} type="button" role="radio" aria-checked={value === rating} aria-label={`${rating} étoile${rating > 1 ? "s" : ""}`} onClick={() => onChange?.(rating)} className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#0b7c9e]">
              {star}
            </button>
          ) : <span key={rating}>{star}</span>;
        })}
      </div>
      {count !== undefined && <span className="text-[11px] font-semibold text-slate-500">{count > 0 ? `${value.toFixed(1)} (${count})` : "Aucun avis"}</span>}
    </div>
  );
}
