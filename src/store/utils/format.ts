import type { MoneyAmount, ProductAvailability } from "../types";

export function formatMoney(value?: MoneyAmount) {
  if (!value) {
    return "Prix à confirmer";
  }

  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: value.currency,
    maximumFractionDigits: 0,
  }).format(value.amount);
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
