import * as React from "react";
import StorePage from "./store/pages/StorePage";
import CategoryPage from "./store/pages/CategoryPage";
import ProductPage from "./store/pages/ProductPage";
import CartPage from "./store/pages/CartPage";
import CheckoutPage from "./store/pages/CheckoutPage";
import PaymentCallbackPage from "./store/pages/PaymentCallbackPage";
import OrdersPage from "./store/pages/OrdersPage";
import StoreAuthPage from "./store/pages/StoreAuthPage";
import RequireStoreAuth from "./store/components/RequireStoreAuth";
import RequireAdminAuth from "./store/components/RequireAdminAuth";
import StoreFooter from "./store/components/StoreFooter";

const AdminDashboard = React.lazy(() => import("./store/pages/admin/AdminStoreDashboardPage"));
const AdminProducts = React.lazy(() => import("./store/pages/admin/AdminProductsPage"));
const AdminOrders = React.lazy(() => import("./store/pages/admin/AdminOrdersPage"));
const AdminCategories = React.lazy(() => import("./store/pages/admin/AdminCategoriesPage"));
const AdminCustomers = React.lazy(() => import("./store/pages/admin/AdminCustomersPage"));
const AdminLogin = React.lazy(() => import("./store/pages/admin/AdminLoginPage"));

function normalizePath(path: string) {
  if (path === "/store") return "/";
  if (path.startsWith("/store/")) return path.slice(6);
  if (path === "/account/login") return "/login";
  return path;
}

export default function StoreApp() {
  const [currentPath, setCurrentPath] = React.useState(normalizePath(window.location.pathname));
  const navigate = React.useCallback((requestedPath: string) => {
    const [pathname, query = ""] = requestedPath.split("?");
    const path = normalizePath(pathname);
    window.history.pushState({}, "", path + (query ? `?${query}` : ""));
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  React.useEffect(() => {
    const onPopState = () => setCurrentPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  if (currentPath === "/admin/login") return <AdminLogin onNavigate={navigate} />;
  if (currentPath === "/admin" || currentPath === "/admin/store") return <RequireAdminAuth currentPath={currentPath} onNavigate={navigate}><AdminDashboard onNavigate={navigate} /></RequireAdminAuth>;
  if (currentPath === "/admin/products" || currentPath === "/admin/store/products") return <RequireAdminAuth currentPath={currentPath} onNavigate={navigate}><AdminProducts onNavigate={navigate} /></RequireAdminAuth>;
  if (currentPath === "/admin/orders" || currentPath === "/admin/store/orders") return <RequireAdminAuth currentPath={currentPath} onNavigate={navigate}><AdminOrders onNavigate={navigate} /></RequireAdminAuth>;
  if (currentPath === "/admin/categories" || currentPath === "/admin/store/categories") return <RequireAdminAuth currentPath={currentPath} onNavigate={navigate}><AdminCategories onNavigate={navigate} /></RequireAdminAuth>;
  if (currentPath === "/admin/customers" || currentPath === "/admin/store/customers") return <RequireAdminAuth currentPath={currentPath} onNavigate={navigate}><AdminCustomers onNavigate={navigate} /></RequireAdminAuth>;

  let page: React.ReactNode;
  if (currentPath === "/login") page = <StoreAuthPage onNavigate={navigate} />;
  else if (currentPath.startsWith("/category/")) page = <CategoryPage slug={currentPath.slice("/category/".length)} onNavigate={navigate} />;
  else if (currentPath.startsWith("/product/")) page = <ProductPage slug={currentPath.slice("/product/".length)} onNavigate={navigate} />;
  else if (currentPath === "/cart") page = <CartPage onNavigate={navigate} />;
  else if (currentPath === "/checkout") page = <RequireStoreAuth currentPath={currentPath} onNavigate={navigate}><CheckoutPage onNavigate={navigate} /></RequireStoreAuth>;
  else if (currentPath === "/payment/callback") page = <RequireStoreAuth currentPath={currentPath} onNavigate={navigate}><PaymentCallbackPage onNavigate={navigate} /></RequireStoreAuth>;
  else if (currentPath === "/account/orders") page = <RequireStoreAuth currentPath={currentPath} onNavigate={navigate}><OrdersPage onNavigate={navigate} /></RequireStoreAuth>;
  else page = <StorePage onNavigate={navigate} />;

  return <>{page}<StoreFooter onNavigate={navigate} /></>;
}