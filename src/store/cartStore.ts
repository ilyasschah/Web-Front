import { create } from 'zustand';
import { CartItem, Product, Customer, Payment } from '@/types';

interface CartState {
  items: CartItem[];
  customer: Customer | null;
  discount: number;
  discountType: 'fixed' | 'percentage';
  tax: number;
  payments: Payment[];
  tableId: string | null;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateItemPrice: (itemId: string, price: number) => void;
  updateItemDiscount: (itemId: string, discount: number, type: 'fixed' | 'percentage', reason?: string) => void;
  setCustomer: (customer: Customer | null) => void;
  setDiscount: (discount: number, type: 'fixed' | 'percentage') => void;
  addPayment: (payment: Payment) => void;
  removePayment: (paymentId: string) => void;
  setTable: (tableId: string | null) => void;
  clearCart: () => void;
  
  // Computed values
  getSubtotal: () => number;
  getTotalDiscount: () => number;
  getTax: () => number;
  getTotal: () => number;
  getTotalPaid: () => number;
  getBalance: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  customer: null,
  discount: 0,
  discountType: 'fixed',
  tax: 0,
  payments: [],
  tableId: null,

  addItem: (product: Product, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity,
        price: product.price,
        discount: 0,
        discountType: 'fixed',
      };
      set({ items: [...items, newItem] });
    }
  },

  removeItem: (itemId: string) => {
    set({ items: get().items.filter(item => item.id !== itemId) });
  },

  updateQuantity: (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    
    set({
      items: get().items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    });
  },

  updateItemPrice: (itemId: string, price: number) => {
    set({
      items: get().items.map(item =>
        item.id === itemId ? { ...item, price } : item
      )
    });
  },

  updateItemDiscount: (itemId: string, discount: number, type: 'fixed' | 'percentage', reason?: string) => {
    set({
      items: get().items.map(item =>
        item.id === itemId 
          ? { ...item, discount, discountType: type, discountReason: reason }
          : item
      )
    });
  },

  setCustomer: (customer: Customer | null) => {
    set({ customer });
  },

  setDiscount: (discount: number, type: 'fixed' | 'percentage') => {
    set({ discount, discountType: type });
  },

  addPayment: (payment: Payment) => {
    set({ payments: [...get().payments, payment] });
  },

  removePayment: (paymentId: string) => {
    set({ payments: get().payments.filter(p => p.id !== paymentId) });
  },

  setTable: (tableId: string | null) => {
    set({ tableId });
  },

  clearCart: () => {
    set({
      items: [],
      customer: null,
      discount: 0,
      discountType: 'fixed',
      payments: [],
      tableId: null,
    });
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const itemDiscount = item.discountType === 'percentage' 
        ? itemTotal * (item.discount / 100)
        : item.discount;
      return total + (itemTotal - itemDiscount);
    }, 0);
  },

  getTotalDiscount: () => {
    const subtotal = get().getSubtotal();
    const globalDiscount = get().discount;
    const globalDiscountType = get().discountType;
    
    return globalDiscountType === 'percentage'
      ? subtotal * (globalDiscount / 100)
      : globalDiscount;
  },

  getTax: () => {
    const subtotalAfterDiscount = get().getSubtotal() - get().getTotalDiscount();
    return subtotalAfterDiscount * 0.1; // 10% tax rate - should be configurable
  },

  getTotal: () => {
    return get().getSubtotal() - get().getTotalDiscount() + get().getTax();
  },

  getTotalPaid: () => {
    return get().payments.reduce((total, payment) => total + payment.amount, 0);
  },

  getBalance: () => {
    return get().getTotal() - get().getTotalPaid();
  },
}));