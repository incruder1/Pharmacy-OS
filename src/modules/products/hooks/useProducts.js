import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { productsApi } from '../api/productsApi';
import { useProductsStore } from '../store/productsStore';
import { productKeys } from './queryKeys';

/**
 * Paginated product list scoped to the current store filters.
 */
export function useProducts() {
  const search = useProductsStore((s) => s.search);
  const filters = useProductsStore((s) => s.filters);
  const page = useProductsStore((s) => s.page);
  const pageSize = useProductsStore((s) => s.pageSize);
  const params = { search, ...filters, page, pageSize };

  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productsApi.list(params),
    placeholderData: keepPreviousData,
  });
}

/** Single product by id. */
export function useProduct(id) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.get(id),
    enabled: Boolean(id),
  });
}

/** Distinct manufacturer options for the filter dropdown. */
export function useManufacturers() {
  return useQuery({
    queryKey: productKeys.manufacturers(),
    queryFn: () => productsApi.getManufacturers(),
    staleTime: 5 * 60 * 1000,
  });
}
