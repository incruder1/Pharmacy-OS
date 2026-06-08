import { useQuery } from '@tanstack/react-query';
import { expiryApi } from '../api/expiryApi';
import { expiryKeys } from './queryKeys';

/** @param {string | null} id */
export function useExpiryBatchDetail(id) {
  return useQuery({
    queryKey: expiryKeys.batchDetail(id),
    queryFn: () => expiryApi.getBatchDetail(id),
    enabled: Boolean(id),
  });
}

export default useExpiryBatchDetail;
