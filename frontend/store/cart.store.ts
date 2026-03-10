'use client';

import { create } from 'zustand';
import { CartItem, Product } from '@/types';

type CartState = {
  tabId?: string;
  items: CartItem[];
  setTabId: (tabId: string) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  tabId: undefined,
  items: [],
  setTabId: (tabId) => set({ tabId }),
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId)
    })),
  clearCart: () => set({ items: [] })
}));
