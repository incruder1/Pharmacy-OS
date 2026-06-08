import { QueryClient } from '@tanstack/react-query';

/**
 * Shared TanStack Query client. Sensible defaults for a dashboard-heavy app:
 * cache for a minute, retry once, no refetch storms on window focus.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default queryClient;
