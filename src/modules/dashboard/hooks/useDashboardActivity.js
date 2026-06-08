import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';
import { dashboardKeys } from './queryKeys';

/**
 * Best-selling products.
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../types').TopProduct[]>}
 */
export function useTopProducts() {
  return useQuery({
    queryKey: dashboardKeys.topProducts(),
    queryFn: () => dashboardApi.getTopProducts(),
  });
}

/**
 * Most recent sales (POS invoices).
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../types').RecentSale[]>}
 */
export function useRecentSales() {
  return useQuery({
    queryKey: dashboardKeys.recentSales(),
    queryFn: () => dashboardApi.getRecentSales(),
  });
}

/**
 * Most recent purchase orders.
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../types').RecentPurchase[]>}
 */
export function useRecentPurchases() {
  return useQuery({
    queryKey: dashboardKeys.recentPurchases(),
    queryFn: () => dashboardApi.getRecentPurchases(),
  });
}
