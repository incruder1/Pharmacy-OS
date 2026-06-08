import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';
import { dashboardKeys } from './queryKeys';

/**
 * Medicines approaching their expiry date.
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../types').ExpiringMedicine[]>}
 */
export function useExpiringMedicines() {
  return useQuery({
    queryKey: dashboardKeys.expiring(),
    queryFn: () => dashboardApi.getExpiringMedicines(),
  });
}

/**
 * Products at or below their reorder level.
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../types').LowStockItem[]>}
 */
export function useLowStock() {
  return useQuery({
    queryKey: dashboardKeys.lowStock(),
    queryFn: () => dashboardApi.getLowStock(),
  });
}
