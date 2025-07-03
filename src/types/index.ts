export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cashier' | 'manager';
  pin?: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  cost?: number;
  stock: number;
  categoryId: string;
  category?: Category;
  barcode?: string;
  description?: string;
  image?: string;
  variations?: ProductVariation[];
  taxRate?: number;
  isActive: boolean;
}

export interface ProductVariation {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  loyaltyPoints: number;
  totalSpent: number;
  lastVisit?: string;
  isActive: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  discount: number;
  discountType: 'fixed' | 'percentage';
  discountReason?: string;
  variation?: ProductVariation;
}

export interface Order {
  id: string;
  customerId?: string;
  customer?: Customer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  payments: Payment[];
  status: 'pending' | 'completed' | 'refunded' | 'cancelled';
  tableId?: string;
  cashierId: string;
  cashier?: User;
  createdAt: string;
  notes?: string;
}

export interface Payment {
  id: string;
  method: 'cash' | 'card' | 'digital' | 'loyalty';
  amount: number;
  reference?: string;
  change?: number;
}

export interface Table {
  id: string;
  number: string;
  seats: number;
  status: 'vacant' | 'occupied' | 'reserved' | 'cleaning';
  orderId?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Discount {
  id: string;
  name: string;
  type: 'fixed' | 'percentage';
  value: number;
  isActive: boolean;
  conditions?: {
    minAmount?: number;
    maxAmount?: number;
    validFrom?: string;
    validTo?: string;
  };
}

export interface Tax {
  id: string;
  name: string;
  rate: number;
  isDefault: boolean;
  isActive: boolean;
}

export interface LoyaltySettings {
  pointsPerDollar: number;
  dollarsPerPoint: number;
  minimumRedemption: number;
  isActive: boolean;
}

export interface BusinessSettings {
  name: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  currency: string;
  taxNumber?: string;
  receiptFooter?: string;
  pricesIncludeTax: boolean;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  product?: Product;
  type: 'increase' | 'decrease' | 'set';
  quantity: number;
  reason: string;
  userId: string;
  user?: User;
  createdAt: string;
}

export interface Report {
  type: 'sales' | 'products' | 'customers' | 'inventory';
  dateFrom: string;
  dateTo: string;
  data: any;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}