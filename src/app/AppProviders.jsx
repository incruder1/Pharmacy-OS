import { App as AntApp, ConfigProvider } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { antdTheme } from './theme';
import { queryClient } from './queryClient';

/**
 * Composes every cross-cutting provider the app needs:
 * - ConfigProvider: design-system theme tokens
 * - AntApp: context for message/notification/modal APIs
 * - QueryClientProvider: server/cache state
 * - BrowserRouter: routing
 *
 * @param {{ children: import('react').ReactNode }} props
 */
export function AppProviders({ children }) {
  return (
    <ConfigProvider theme={antdTheme}>
      <AntApp>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </AntApp>
    </ConfigProvider>
  );
}

export default AppProviders;
