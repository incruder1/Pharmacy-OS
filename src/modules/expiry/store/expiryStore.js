import { create } from 'zustand';
import { DEFAULT_WINDOW } from '../constants';

/**
 * Expiry Center UI state: active window tab, view mode, filters, pagination.
 */
export const useExpiryStore = create((set) => ({
  window: DEFAULT_WINDOW,
  viewMode: 'batch',
  search: '',
  filters: { supplierId: undefined, category: undefined },
  page: 1,
  pageSize: 10,

  setWindow: (window) => set({ window, page: 1 }),
  setViewMode: (viewMode) => set({ viewMode, page: 1 }),
  setSearch: (search) => set({ search, page: 1 }),
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value || undefined }, page: 1 })),
  setPage: (page, pageSize) => set((s) => ({ page, pageSize: pageSize ?? s.pageSize })),
  reset: () =>
    set({
      window: DEFAULT_WINDOW,
      viewMode: 'batch',
      search: '',
      filters: { supplierId: undefined, category: undefined },
      page: 1,
    }),
}));

export default useExpiryStore;
