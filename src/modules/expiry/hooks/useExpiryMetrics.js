import { useQuery } from '@tanstack/react-query';
import { expiryApi } from '../api/expiryApi';
import { expiryKeys } from './queryKeys';

export function useExpiryMetrics() {
  return useQuery({
    queryKey: expiryKeys.metrics(),
    queryFn: () => expiryApi.getMetrics(),
  });
}
