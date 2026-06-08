import { Segmented } from 'antd';
import { PageHeader } from '@/components/PageHeader';
import { useDashboardStore } from '../store/dashboardStore';
import { DASHBOARD_RANGES } from '../constants';

/**
 * Dashboard page header with the range switcher (Today / 7d / 30d).
 * Reads & writes the shared dashboard store, which re-scopes every widget.
 */
export function DashboardHeader() {
  const range = useDashboardStore((s) => s.range);
  const setRange = useDashboardStore((s) => s.setRange);

  return (
    <PageHeader
      title="Dashboard"
      subtitle="Your pharmacy at a glance"
      extra={
        <Segmented
          options={DASHBOARD_RANGES}
          value={range}
          onChange={setRange}
          size="large"
        />
      }
    />
  );
}

export default DashboardHeader;
