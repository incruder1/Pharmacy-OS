import { App } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import { billingApi } from '../api/billingApi';

/**
 * Instant medicine search for the POS bar (debounced).
 * @param {string} term
 */
export function useMedicineSearch(term) {
  const debounced = useDebounce(term, 200);
  return useQuery({
    queryKey: ['billing', 'search', debounced],
    queryFn: () => billingApi.searchMedicines(debounced),
    enabled: debounced.trim().length > 0,
    staleTime: 30 * 1000,
  });
}

/** Persist a completed POS invoice. */
export function useCreateInvoice() {
  const { message } = App.useApp();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (invoice) => billingApi.createInvoice(invoice),
    onSuccess: () => {
      message.success('Invoice created');
      qc.invalidateQueries({ queryKey: ['sales'] });
    },
    onError: (e) => message.error(e.message),
  });
}
