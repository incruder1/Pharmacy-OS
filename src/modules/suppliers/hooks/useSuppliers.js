import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { suppliersApi } from '../api/suppliersApi';
import { useSuppliersStore } from '../store/suppliersStore';
import { supplierKeys } from './queryKeys';

/** Paginated supplier list scoped to current filters. */
export function useSuppliers() {
  const search = useSuppliersStore((s) => s.search);
  const filters = useSuppliersStore((s) => s.filters);
  const page = useSuppliersStore((s) => s.page);
  const pageSize = useSuppliersStore((s) => s.pageSize);
  const params = { search, ...filters, page, pageSize };

  return useQuery({
    queryKey: supplierKeys.list(params),
    queryFn: () => suppliersApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useSupplier(id) {
  return useQuery({
    queryKey: supplierKeys.detail(id),
    queryFn: () => suppliersApi.get(id),
    enabled: Boolean(id),
  });
}

export function useSupplierPurchases(id) {
  return useQuery({
    queryKey: supplierKeys.purchases(id),
    queryFn: () => suppliersApi.getPurchases(id),
    enabled: Boolean(id),
  });
}
