import { useQuery } from '@tanstack/react-query';
import { insightsApi } from '../api/insightsApi';
import { useInsightsStore } from '../store/insightsStore';
import { insightsKeys } from './queryKeys';

export function useRevenueTrend() {
  const range = useInsightsStore((s) => s.range);
  return useQuery({
    queryKey: insightsKeys.revenueTrend(range),
    queryFn: () => insightsApi.getRevenueTrend(range),
  });
}

export default useRevenueTrend;
