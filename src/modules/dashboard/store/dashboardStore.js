import { create } from 'zustand';
import { DEFAULT_RANGE } from '../constants';

/**
 * Dashboard UI state: the selected time range that scopes all widgets.
 * Server data itself lives in TanStack Query — this store only holds the filter.
 *
 * @typedef {Object} DashboardState
 * @property {import('../types').DashboardRange} range
 * @property {(range: import('../types').DashboardRange) => void} setRange
 */

/** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<DashboardState>>} */
export const useDashboardStore = create((set) => ({
  range: DEFAULT_RANGE,
  setRange: (range) => set({ range }),
}));

export default useDashboardStore;
