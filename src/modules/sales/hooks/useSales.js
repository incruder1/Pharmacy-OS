import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { salesApi } from '../api/salesApi';
import { useSalesStore } from '../store/salesStore';
import { salesKeys } from './queryKeys';

/** Paginated sales/invoice list scoped to current filters. */
export function useSales() {
  const search = useSalesStore((s) => s.search);
  const filters = useSalesStore((s) => s.filters);
  const page = useSalesStore((s) => s.page);
  const pageSize = useSalesStore((s) => s.pageSize);
  const params = { search, ...filters, page, pageSize };

  return useQuery({
    queryKey: salesKeys.list(params),
    queryFn: () => salesApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useSale(id) {
  return useQuery({
    queryKey: salesKeys.detail(id),
    queryFn: () => salesApi.get(id),
    enabled: Boolean(id),
  });
}
