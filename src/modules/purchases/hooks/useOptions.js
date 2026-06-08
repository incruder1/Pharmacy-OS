import { useQuery } from '@tanstack/react-query';
import { suppliersApi } from '@/modules/suppliers/api/suppliersApi';
import { productsApi } from '@/modules/products/api/productsApi';

/** Supplier dropdown options ({ label, value, raw }). */
export function useSupplierOptions() {
  return useQuery({
    queryKey: ['suppliers', 'options'],
    queryFn: () => suppliersApi.getAll(),
    staleTime: 5 * 60 * 1000,
    select: (rows) => rows.map((s) => ({ label: s.name, value: s.id })),
  });
}

/** Product dropdown options carrying mrp/cost for line-item autofill. */
export function useProductOptions() {
  return useQuery({
    queryKey: ['products', 'options'],
    queryFn: () => productsApi.getAll(),
    staleTime: 5 * 60 * 1000,
    select: (rows) => rows.map((p) => ({ label: p.name, value: p.id, mrp: p.mrp, costPrice: p.costPrice })),
  });
}
