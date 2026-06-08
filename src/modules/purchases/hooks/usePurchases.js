import { App } from 'antd';
import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { purchasesApi } from '../api/purchasesApi';
import { usePurchasesStore } from '../store/purchasesStore';
import { purchaseKeys } from './queryKeys';

/** Paginated purchase list scoped to current filters. */
export function usePurchases() {
  const search = usePurchasesStore((s) => s.search);
  const filters = usePurchasesStore((s) => s.filters);
  const page = usePurchasesStore((s) => s.page);
  const pageSize = usePurchasesStore((s) => s.pageSize);
  const params = { search, ...filters, page, pageSize };

  return useQuery({
    queryKey: purchaseKeys.list(params),
    queryFn: () => purchasesApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function usePurchaseStats() {
  return useQuery({ queryKey: purchaseKeys.stats(), queryFn: () => purchasesApi.getStats() });
}

export function useCreatePurchase() {
  const { message } = App.useApp();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => purchasesApi.create(payload),
    onSuccess: () => {
      message.success('Purchase recorded');
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
    },
    onError: (e) => message.error(e.message),
  });
}
