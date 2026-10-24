export type MoneyAmount = {
  amount: number;
  currency: string;
};

export type ProductAvailability = "in_stock" | "limited" | "out_of_stock" | "preorder";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductFeature {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  category: Category;
  shortDescription?: string;
  description?: string;
  price?: MoneyAmount;
  oldPrice?: MoneyAmount;
  availability: ProductAvailability;
  stock?: number;
  images: ProductImage[];
  features?: ProductFeature[];
  warranty?: string;
  deliveryInfo?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  averageRating?: number;
  ratingCount?: number;
  relatedProductSlugs?: string[];
}

export interface ProductReview {
  id: string;
  productId: string;
  orderId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface ProductReviewsResponse {
  items: ProductReview[];
  averageRating: number;
  ratingCount: number;
  pagination: { page: number; limit: number; total: number; pages: number };
}

export interface ProductListResponse {
  results: Product[];
  count: number;
  next?: string | null;
  previous?: string | null;
  filters?: ProductFilters;
}

export interface ProductFilters {
  price?: {
    min?: number;
    max?: number;
  };
  brands?: string[];
  availability?: ProductAvailability[];
  features?: Array<{
    name: string;
    values: string[];
  }>;
}

export interface ProductQuery {
  category?: string;
  search?: string;
  ordering?: string;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  availability?: ProductAvailability;
  features?: Record<string, string>;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice?: MoneyAmount;
  subtotal?: MoneyAmount;
}

export interface Cart {
  id?: string;
  items: CartItem[];
  subtotal?: MoneyAmount;
  shipping?: MoneyAmount;
  total?: MoneyAmount;
}

export interface CheckoutPayload {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  deliveryMethod: string;
  paymentMethod: string;
  cartItems: Array<{
    productId: string;
    quantity: number;
  }>;
}

export type OrderStatus =
  | "received"
  | "payment_confirmed"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice?: MoneyAmount;
  subtotal?: MoneyAmount;
}

export interface Order {
  id: string;
  reference: string;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
  total?: MoneyAmount;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  country?: string;
  role?: "CUSTOMER" | "ADMIN";
  isActive?: boolean;
}
