import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { expiryApi } from '../api/expiryApi';
import { useExpiryStore } from '../store/expiryStore';
import { expiryKeys } from './queryKeys';

export function useExpiryBatches() {
  const window = useExpiryStore((s) => s.window);
  const search = useExpiryStore((s) => s.search);
  const filters = useExpiryStore((s) => s.filters);
  const page = useExpiryStore((s) => s.page);
  const pageSize = useExpiryStore((s) => s.pageSize);
  const params = { window, search, ...filters, page, pageSize };

  return useQuery({
    queryKey: expiryKeys.batches(params),
    queryFn: () => expiryApi.listBatches(params),
    placeholderData: keepPreviousData,
  });
}
