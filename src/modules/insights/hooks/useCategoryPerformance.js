import { useQuery } from '@tanstack/react-query';
import { insightsApi } from '../api/insightsApi';
import { insightsKeys } from './queryKeys';

export function useCategoryPerformance() {
  return useQuery({
    queryKey: insightsKeys.categoryPerformance(),
    queryFn: () => insightsApi.getCategoryPerformance(),
  });
}

export default useCategoryPerformance;
