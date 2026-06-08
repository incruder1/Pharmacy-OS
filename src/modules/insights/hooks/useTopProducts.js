import { useQuery } from '@tanstack/react-query';
import { insightsApi } from '../api/insightsApi';
import { insightsKeys } from './queryKeys';

export function useTopProducts() {
  return useQuery({
    queryKey: insightsKeys.topProducts(),
    queryFn: () => insightsApi.getTopProducts(),
  });
}

export default useTopProducts;
