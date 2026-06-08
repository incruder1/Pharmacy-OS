import { create } from 'zustand';
import { emptyLineItem } from '../constants';

/**
 * Draft purchase "cart": the in-progress goods-inward entry. Holds supplier +
 * invoice header and an editable list of batch line items until submitted.
 */
export const usePurchaseDraftStore = create((set) => ({
  supplierId: undefined,
  invoiceNumber: '',
  status: 'pending',
  lineItems: [emptyLineItem()],

  setField: (key, value) => set({ [key]: value }),
  addLine: () => set((s) => ({ lineItems: [...s.lineItems, emptyLineItem()] })),
  updateLine: (index, patch) =>
    set((s) => ({
      lineItems: s.lineItems.map((li, i) => (i === index ? { ...li, ...patch } : li)),
    })),
  removeLine: (index) =>
    set((s) => ({
      lineItems: s.lineItems.length > 1 ? s.lineItems.filter((_, i) => i !== index) : s.lineItems,
    })),
  reset: () =>
    set({ supplierId: undefined, invoiceNumber: '', status: 'pending', lineItems: [emptyLineItem()] }),
}));

export default usePurchaseDraftStore;
