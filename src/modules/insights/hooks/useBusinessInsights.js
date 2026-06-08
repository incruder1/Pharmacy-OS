import { useQuery } from '@tanstack/react-query';
import { insightsApi } from '../api/insightsApi';
import { insightsKeys } from './queryKeys';

export function useBusinessInsights() {
  return useQuery({
    queryKey: insightsKeys.businessInsights(),
    queryFn: () => insightsApi.getBusinessInsights(),
  });
}

export default useBusinessInsights;
