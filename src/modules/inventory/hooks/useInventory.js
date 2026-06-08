import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { inventoryApi } from '../api/inventoryApi';
import { useInventoryStore } from '../store/inventoryStore';
import { inventoryKeys } from './queryKeys';

/** Paginated inventory batches scoped to current filters. */
export function useInventory() {
  const search = useInventoryStore((s) => s.search);
  const filters = useInventoryStore((s) => s.filters);
  const page = useInventoryStore((s) => s.page);
  const pageSize = useInventoryStore((s) => s.pageSize);
  const params = { search, ...filters, page, pageSize };

  return useQuery({
    queryKey: inventoryKeys.list(params),
    queryFn: () => inventoryApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useLowStock() {
  return useQuery({ queryKey: inventoryKeys.lowStock(), queryFn: () => inventoryApi.getLowStock() });
}

export function useExpiringBatches(days = 90) {
  return useQuery({
    queryKey: inventoryKeys.expiring(days),
    queryFn: () => inventoryApi.getExpiringBatches(days),
  });
}

export function useInventoryStats() {
  return useQuery({ queryKey: inventoryKeys.stats(), queryFn: () => inventoryApi.getStats() });
}
