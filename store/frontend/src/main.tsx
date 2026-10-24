import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import StoreApp from "./StoreApp";
import { CartProvider } from "./store/context/CartContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <Suspense fallback={<div role="status" className="grid min-h-screen place-items-center bg-bg-global text-sm text-navy">Chargement...</div>}>
        <StoreApp />
      </Suspense>
    </CartProvider>
  </StrictMode>,
);

