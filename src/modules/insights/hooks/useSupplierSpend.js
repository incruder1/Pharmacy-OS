import { useQuery } from '@tanstack/react-query';
import { insightsApi } from '../api/insightsApi';
import { insightsKeys } from './queryKeys';

export function useSupplierSpend() {
  return useQuery({
    queryKey: insightsKeys.supplierSpend(),
    queryFn: () => insightsApi.getSupplierSpend(),
  });
}

export default useSupplierSpend;
