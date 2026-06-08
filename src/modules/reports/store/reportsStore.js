import { create } from 'zustand';
import { DEFAULT_TAB } from '../constants';

/** Reports UI state: active tab + shared date range filter. */
export const useReportsStore = create((set) => ({
  tab: DEFAULT_TAB,
  from: undefined,
  to: undefined,
  setTab: (tab) => set({ tab }),
  setRange: (from, to) => set({ from, to }),
}));

export default useReportsStore;
