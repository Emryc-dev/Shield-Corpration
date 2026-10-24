import { Circle } from "lucide-react";
import type { ProductAvailability } from "../types";
import { formatAvailability } from "../utils/format";

const styles: Record<ProductAvailability, string> = {
  in_stock: "bg-emerald-50 text-emerald-700",
  limited: "bg-orange-50 text-orange-700",
  out_of_stock: "bg-red-50 text-red-700",
  preorder: "bg-cyan-50 text-cyan-700",
};

export default function StockStatus({ availability, stock, compact = false }: { availability: ProductAvailability; stock?: number; compact?: boolean }) {
  const label = availability === "limited" && stock ? `Plus que ${stock} en stock` : formatAvailability(availability);
  return <span className={`inline-flex w-fit items-center gap-1.5 rounded-full font-semibold ${styles[availability]} ${compact ? "px-2 py-1 text-[10px]" : "px-4 py-2 text-[13px]"}`}><Circle className={`${compact ? "h-2 w-2" : "h-2.5 w-2.5"} fill-current`} aria-hidden="true" />{label}</span>;
}