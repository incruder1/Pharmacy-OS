import { Segmented } from 'antd';
import { PageHeader } from '@/components/PageHeader';
import { INSIGHTS_RANGES } from '../constants';
import { useInsightsStore } from '../store/insightsStore';

export function InsightsHeader() {
  const range = useInsightsStore((s) => s.range);
  const setRange = useInsightsStore((s) => s.setRange);

  return (
    <PageHeader
      title="Owner Insights"
      subtitle="Premium business analytics — revenue, inventory health, and actionable intelligence"
      extra={
        <Segmented
          options={INSIGHTS_RANGES.map((r) => ({ label: r.label, value: r.value }))}
          value={range}
          onChange={setRange}
        />
      }
    />
  );
}

export default InsightsHeader;
