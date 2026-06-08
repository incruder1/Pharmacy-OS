import { App } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../api/productsApi';
import { productKeys } from './queryKeys';

/** Invalidate every products query after a write. */
function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: productKeys.all });
}

export function useCreateProduct() {
  const { message } = App.useApp();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (payload) => productsApi.create(payload),
    onSuccess: () => {
      message.success('Product added');
      invalidate();
    },
    onError: (e) => message.error(e.message),
  });
}

export function useUpdateProduct() {
  const { message } = App.useApp();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({ id, ...payload }) => productsApi.update(id, payload),
    onSuccess: () => {
      message.success('Product updated');
      invalidate();
    },
    onError: (e) => message.error(e.message),
  });
}

export function useDeleteProduct() {
  const { message } = App.useApp();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (id) => productsApi.remove(id),
    onSuccess: () => {
      message.success('Product deleted');
      invalidate();
    },
    onError: (e) => message.error(e.message),
  });
}
