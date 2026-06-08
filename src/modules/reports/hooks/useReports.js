import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../api/reportsApi';
import { useReportsStore } from '../store/reportsStore';
import { reportKeys } from './queryKeys';

export function useSalesReport() {
  const { from, to } = useReportsStore();
  const params = { from, to };
  return useQuery({ queryKey: reportKeys.sales(params), queryFn: () => reportsApi.sales(params) });
}

export function useInventoryReport() {
  return useQuery({ queryKey: reportKeys.inventory(), queryFn: () => reportsApi.inventory() });
}

export function useExpiryReport() {
  return useQuery({ queryKey: reportKeys.expiry(), queryFn: () => reportsApi.expiry() });
}

export function useProfitReport() {
  const { from, to } = useReportsStore();
  const params = { from, to };
  return useQuery({ queryKey: reportKeys.profit(params), queryFn: () => reportsApi.profit(params) });
}
