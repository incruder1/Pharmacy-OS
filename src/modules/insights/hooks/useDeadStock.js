import { useQuery } from '@tanstack/react-query';
import { insightsApi } from '../api/insightsApi';
import { insightsKeys } from './queryKeys';

export function useDeadStock() {
  return useQuery({
    queryKey: insightsKeys.deadStock(),
    queryFn: () => insightsApi.getDeadStock(),
  });
}

export default useDeadStock;
