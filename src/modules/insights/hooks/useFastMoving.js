import { useQuery } from '@tanstack/react-query';
import { insightsApi } from '../api/insightsApi';
import { insightsKeys } from './queryKeys';

export function useFastMoving() {
  return useQuery({
    queryKey: insightsKeys.fastMoving(),
    queryFn: () => insightsApi.getFastMoving(),
  });
}

export default useFastMoving;
