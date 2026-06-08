import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { expiryApi } from '../api/expiryApi';
import { useExpiryStore } from '../store/expiryStore';

/** Triggers a mock CSV export and downloads it client-side. */
export function useExportExpiry() {
  const { message } = App.useApp();
  const window = useExpiryStore((s) => s.window);
  const search = useExpiryStore((s) => s.search);
  const filters = useExpiryStore((s) => s.filters);

  return useMutation({
    mutationFn: () => expiryApi.exportReport({ window, search, ...filters }),
    onSuccess: (result) => {
      const blob = new Blob([result.csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.filename;
      link.click();
      URL.revokeObjectURL(url);
      message.success(`Exported ${result.rowCount} rows`);
    },
    onError: () => message.error('Export failed'),
  });
}
