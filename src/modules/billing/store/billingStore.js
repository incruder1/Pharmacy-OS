import { create } from 'zustand';
import { emptyPayments } from '../constants';

/**
 * POS cart store: line items, per-line discount, split payments and customer.
 * Totals are derived (see totals.js) — only raw cart state lives here.
 */
export const useBillingStore = create((set) => ({
  items: [],
  payments: emptyPayments(),
  customer: { name: '', phone: '' },

  /** Add a product (merging quantity if it already exists). */
  addItem: (product) =>
    set((s) => {
      const existing = s.items.find((i) => i.productId === product.id);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return {
        items: [
          ...s.items,
          {
            productId: product.id,
            name: product.name,
            mrp: product.mrp,
            gstRate: product.gstRate,
            quantity: 1,
            discountPct: 0,
          },
        ],
      };
    }),

  updateQty: (productId, quantity) =>
    set((s) => ({
      items: s.items
        .map((i) => (i.productId === productId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    })),

  setDiscount: (productId, discountPct) =>
    set((s) => ({
      items: s.items.map((i) =>
        i.productId === productId ? { ...i, discountPct: discountPct || 0 } : i,
      ),
    })),

  removeItem: (productId) =>
    set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),

  setPayment: (channel, amount) =>
    set((s) => ({ payments: { ...s.payments, [channel]: amount || 0 } })),

  setCustomer: (patch) => set((s) => ({ customer: { ...s.customer, ...patch } })),

  clear: () => set({ items: [], payments: emptyPayments(), customer: { name: '', phone: '' } }),
}));

export default useBillingStore;
