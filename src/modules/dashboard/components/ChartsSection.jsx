import { Col, Row } from 'antd';
import { colors } from '@/app/theme';
import { formatCurrencyCompact, formatNumber } from '@/utils';
import { ChartCard } from './ChartCard';
import { TrendChart } from './TrendChart';
import { CategoryChart } from './CategoryChart';
import { useRevenueTrend, useSalesTrend, useCategoryBreakdown } from '../hooks';

/**
 * Charts row: Revenue Trend + Product Categories on top, Sales Trend below.
 * Each chart owns its own query state via ChartCard's loading/error/empty slots.
 */
export function ChartsSection() {
  const revenue = useRevenueTrend();
  const sales = useSalesTrend();
  const categories = useCategoryBreakdown();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={16}>
        <ChartCard
          title="Revenue Trend"
          loading={revenue.isLoading}
          error={revenue.isError}
          empty={revenue.data?.length === 0}
          onRetry={revenue.refetch}
        >
          <TrendChart
            data={revenue.data ?? []}
            color={colors.primary}
            gradientId="revGradient"
            valueFormatter={formatCurrencyCompact}
          />
        </ChartCard>
      </Col>

      <Col xs={24} xl={8}>
        <ChartCard
          title="Product Categories"
          loading={categories.isLoading}
          error={categories.isError}
          empty={categories.data?.length === 0}
          onRetry={categories.refetch}
        >
          <CategoryChart data={categories.data ?? []} />
        </ChartCard>
      </Col>

      <Col xs={24}>
        <ChartCard
          title="Sales Trend"
          height={240}
          loading={sales.isLoading}
          error={sales.isError}
          empty={sales.data?.length === 0}
          onRetry={sales.refetch}
        >
          <TrendChart
            data={sales.data ?? []}
            color={colors.success}
            gradientId="salesGradient"
            valueFormatter={formatNumber}
          />
        </ChartCard>
      </Col>
    </Row>
  );
}

export default ChartsSection;
