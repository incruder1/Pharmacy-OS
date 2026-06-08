import { useQuery } from '@tanstack/react-query';
import { insightsApi } from '../api/insightsApi';
import { insightsKeys } from './queryKeys';

export function useSlowMoving() {
  return useQuery({
    queryKey: insightsKeys.slowMoving(),
    queryFn: () => insightsApi.getSlowMoving(),
  });
}

export default useSlowMoving;
