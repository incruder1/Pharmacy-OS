import { useQuery } from '@tanstack/react-query';
import { insightsApi } from '../api/insightsApi';
import { insightsKeys } from './queryKeys';

export function useInsightsMetrics() {
  return useQuery({
    queryKey: insightsKeys.metrics(),
    queryFn: () => insightsApi.getMetrics(),
  });
}

export default useInsightsMetrics;
