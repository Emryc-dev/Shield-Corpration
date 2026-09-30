import type { MoneyAmount, ProductAvailability } from "../types";

export function formatMoney(
  value?: MoneyAmount | number | string,
  fallbackCurrency = "XAF",
) {
  if (value === undefined || value === null) {
    return "Prix à confirmer";
  }

  const amount = typeof value === "object" ? Number(value.amount) : Number(value);
  const currency =
    typeof value === "object" && value.currency
      ? value.currency.toUpperCase()
      : fallbackCurrency;

  if (!Number.isFinite(amount)) {
    return "Prix à confirmer";
  }

  try {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString("fr-CM")} ${currency}`;
  }
}

export function formatAvailability(availability: ProductAvailability) {
  const labels: Record<ProductAvailability, string> = {
    in_stock: "Disponible",
    limited: "Stock limité",
    out_of_stock: "Indisponible",
    preorder: "Sur commande",
  };

  return labels[availability];
}

export function canAddToCart(availability: ProductAvailability) {
  return availability !== "out_of_stock";
}
