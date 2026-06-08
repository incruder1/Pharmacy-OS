import { create } from 'zustand';

export const useNotificationsStore = create((set) => ({
  typeFilter: undefined,
  dateRange: undefined,
  setTypeFilter: (typeFilter) => set({ typeFilter }),
  setDateRange: (dateRange) => set({ dateRange }),
  reset: () => set({ typeFilter: undefined, dateRange: undefined }),
}));

export default useNotificationsStore;
