import { useQuery } from '@tanstack/react-query';
import { expiryApi } from '../api/expiryApi';
import { expiryKeys } from './queryKeys';

export function useExpiryLossAnalytics() {
  return useQuery({
    queryKey: expiryKeys.lossAnalytics(),
    queryFn: () => expiryApi.getLossAnalytics(),
  });
}

export default useExpiryLossAnalytics;
