import React from "react";
import type { CartItem, Product } from "../types";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  hasPricedItems: boolean;
  estimatedTotal: number;
}

const CartContext = React.createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "shield-store-cart";

function readStoredCart() {
  try {
    const rawCart = window.localStorage.getItem(STORAGE_KEY);
    return rawCart ? (JSON.parse(rawCart) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>(() => readStoredCart());

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = React.useCallback((product: Product, quantity = 1) => {
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.product.id === product.id);

      if (existing) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...currentItems,
        {
          id: `guest-${product.id}`,
          product,
          quantity,
          unitPrice: product.price,
          subtotal: product.price
            ? { amount: product.price.amount * quantity, currency: product.price.currency }
            : undefined,
        },
      ];
    });
  }, []);

  const removeItem = React.useCallback((productId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = React.useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
              subtotal: item.unitPrice
                ? { amount: item.unitPrice.amount * quantity, currency: item.unitPrice.currency }
                : undefined,
            }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = React.useCallback(() => setItems([]), []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const pricedItems = items.filter((item) => item.unitPrice);
  const estimatedTotal = pricedItems.reduce((total, item) => total + item.unitPrice!.amount * item.quantity, 0);

  const value = React.useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      hasPricedItems: pricedItems.length === items.length && items.length > 0,
      estimatedTotal,
    }),
    [addItem, clearCart, estimatedTotal, itemCount, items, pricedItems.length, removeItem, updateQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
