import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';
import { useDashboardStore } from '../store/dashboardStore';
import { dashboardKeys } from './queryKeys';

/**
 * Revenue trend series for the selected range.
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../types').TrendPoint[]>}
 */
export function useRevenueTrend() {
  const range = useDashboardStore((s) => s.range);
  return useQuery({
    queryKey: dashboardKeys.revenueTrend(range),
    queryFn: () => dashboardApi.getRevenueTrend(range),
  });
}

/**
 * Sales (order count) trend series for the selected range.
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../types').TrendPoint[]>}
 */
export function useSalesTrend() {
  const range = useDashboardStore((s) => s.range);
  return useQuery({
    queryKey: dashboardKeys.salesTrend(range),
    queryFn: () => dashboardApi.getSalesTrend(range),
  });
}

/**
 * Product-category sales breakdown (range-independent).
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../types').CategorySlice[]>}
 */
export function useCategoryBreakdown() {
  return useQuery({
    queryKey: dashboardKeys.categories(),
    queryFn: () => dashboardApi.getCategoryBreakdown(),
  });
}
