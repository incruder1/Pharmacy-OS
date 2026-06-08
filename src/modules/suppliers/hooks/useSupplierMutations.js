import { App } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { suppliersApi } from '../api/suppliersApi';
import { supplierKeys } from './queryKeys';

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: supplierKeys.all });
}

export function useCreateSupplier() {
  const { message } = App.useApp();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (payload) => suppliersApi.create(payload),
    onSuccess: () => {
      message.success('Supplier added');
      invalidate();
    },
    onError: (e) => message.error(e.message),
  });
}

export function useUpdateSupplier() {
  const { message } = App.useApp();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({ id, ...payload }) => suppliersApi.update(id, payload),
    onSuccess: () => {
      message.success('Supplier updated');
      invalidate();
    },
    onError: (e) => message.error(e.message),
  });
}

export function useDeleteSupplier() {
  const { message } = App.useApp();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (id) => suppliersApi.remove(id),
    onSuccess: () => {
      message.success('Supplier deleted');
      invalidate();
    },
    onError: (e) => message.error(e.message),
  });
}
