import { create } from 'zustand';

/**
 * Factory for a feature-local list store: search + filters + pagination, with
 * a `setFilter` that resets to page 1. Shared by every listing module so each
 * store stays a one-liner instead of repeating boilerplate.
 *
 * @param {object} [initialFilters] - default filter values (besides search)
 * @param {number} [pageSize]
 */
export function createListStore(initialFilters = {}, pageSize = 10) {
  const defaults = { search: '', ...initialFilters };
  return create((set) => ({
    search: '',
    filters: { ...initialFilters },
    page: 1,
    pageSize,

    setSearch: (search) => set({ search, page: 1 }),
    setFilter: (key, value) =>
      set((s) => ({ filters: { ...s.filters, [key]: value }, page: 1 })),
    setFilters: (filters) => set({ filters, page: 1 }),
    setPage: (page, size) => set((s) => ({ page, pageSize: size ?? s.pageSize })),
    reset: () => set({ search: defaults.search, filters: { ...initialFilters }, page: 1 }),
  }));
}

export default createListStore;
