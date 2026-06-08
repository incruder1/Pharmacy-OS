import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { expiryApi } from '../api/expiryApi';
import { useExpiryStore } from '../store/expiryStore';
import { expiryKeys } from './queryKeys';

export function useExpiryBySupplier() {
  const window = useExpiryStore((s) => s.window);
  const search = useExpiryStore((s) => s.search);
  const filters = useExpiryStore((s) => s.filters);
  const page = useExpiryStore((s) => s.page);
  const pageSize = useExpiryStore((s) => s.pageSize);
  const params = { window, search, ...filters, page, pageSize };

  return useQuery({
    queryKey: expiryKeys.suppliers(params),
    queryFn: () => expiryApi.listBySupplier(params),
    placeholderData: keepPreviousData,
  });
}

export function useExpiryFilterOptions() {
  return useQuery({
    queryKey: expiryKeys.filterOptions(),
    queryFn: () => expiryApi.getFilterOptions(),
    staleTime: 5 * 60 * 1000,
  });
}
