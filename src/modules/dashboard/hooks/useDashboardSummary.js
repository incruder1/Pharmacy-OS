import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';
import { useDashboardStore } from '../store/dashboardStore';
import { dashboardKeys } from './queryKeys';

/**
 * Headline KPI summary for the currently selected range.
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../types').DashboardSummary>}
 */
export function useDashboardSummary() {
  const range = useDashboardStore((s) => s.range);
  return useQuery({
    queryKey: dashboardKeys.summary(range),
    queryFn: () => dashboardApi.getSummary(range),
  });
}

export default useDashboardSummary;
