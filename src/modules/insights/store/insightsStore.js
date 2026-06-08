import { create } from 'zustand';
import { INSIGHTS_DEFAULT_RANGE } from '../constants';

/** Owner Insights UI state — date range filter for charts. */
export const useInsightsStore = create((set) => ({
  range: INSIGHTS_DEFAULT_RANGE,
  setRange: (range) => set({ range }),
}));

export default useInsightsStore;
