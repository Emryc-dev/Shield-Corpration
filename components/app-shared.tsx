import type { ReactNode } from "react";
import { Boxes, ClipboardList, FolderTree, LayoutDashboard, Users } from "lucide-react";

export type AdminSection = "dashboard" | "products" | "orders" | "categories" | "customers";
export type SidebarNavItem = { title: string; path?: string; icon?: ReactNode; isActive?: boolean; subItems?: SidebarNavItem[] };
export type SidebarNavGroup = { label?: string; items: SidebarNavItem[] };
export const storeNavigation = [
  { id: "dashboard", title: "Vue d'ensemble", path: "/admin/store", icon: <LayoutDashboard /> },
  { id: "products", title: "Produits", path: "/admin/store/products", icon: <Boxes /> },
  { id: "orders", title: "Commandes", path: "/admin/store/orders", icon: <ClipboardList /> },
  { id: "categories", title: "Catégories", path: "/admin/store/categories", icon: <FolderTree /> },
  { id: "customers", title: "Clients", path: "/admin/store/customers", icon: <Users /> },
] as const;
