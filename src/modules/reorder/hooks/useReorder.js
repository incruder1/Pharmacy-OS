import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { reorderApi } from '../api/reorderApi';
import { useReorderStore } from '../store/reorderStore';
import { reorderKeys } from './queryKeys';

export function useReorderMetrics() {
  return useQuery({ queryKey: reorderKeys.metrics(), queryFn: () => reorderApi.getMetrics() });
}

export function useReorderSuggestions() {
  const search = useReorderStore((s) => s.search);
  const filters = useReorderStore((s) => s.filters);
  const page = useReorderStore((s) => s.page);
  const pageSize = useReorderStore((s) => s.pageSize);
  const params = { search, ...filters, page, pageSize };

  return useQuery({
    queryKey: reorderKeys.list(params),
    queryFn: () => reorderApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useReorderRecommendations() {
  return useQuery({
    queryKey: reorderKeys.recommendations(),
    queryFn: () => reorderApi.getRecommendations(),
  });
}
