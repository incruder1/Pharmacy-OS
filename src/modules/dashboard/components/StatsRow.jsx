import { Col, Row } from 'antd';
import {
  RiseOutlined,
  ShoppingOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { StatCard } from '@/components/StatCard';
import { colors } from '@/app/theme';
import { formatCurrencyCompact, formatNumber } from '@/utils';
import { useDashboardSummary } from '../hooks';
import { useDashboardStore } from '../store/dashboardStore';
import { RANGE_COMPARISON_LABEL } from '../constants';

const COL = { xs: 24, sm: 12, xl: 6 };

/**
 * Top KPI row: Revenue, Sales, Low Stock, Expiring Medicines.
 * Delta-driven cards reflect the active range; alert cards are absolute counts.
 */
export function StatsRow() {
  const range = useDashboardStore((s) => s.range);
  const { data, isLoading } = useDashboardSummary();
  const comparison = RANGE_COMPARISON_LABEL[range];

  return (
    <Row gutter={[16, 16]}>
      <Col {...COL}>
        <StatCard
          title="Revenue"
          value={data ? formatCurrencyCompact(data.revenue) : '—'}
          icon={<RiseOutlined />}
          accent={colors.primary}
          delta={data?.deltas.revenue}
          deltaLabel={comparison}
          loading={isLoading}
        />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Sales"
          value={data ? formatNumber(data.salesCount) : '—'}
          icon={<ShoppingOutlined />}
          accent={colors.success}
          delta={data?.deltas.salesCount}
          deltaLabel={comparison}
          loading={isLoading}
        />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Low Stock"
          value={data ? formatNumber(data.lowStockCount) : '—'}
          icon={<WarningOutlined />}
          accent={colors.warning}
          footer="needs reorder"
          loading={isLoading}
        />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Expiring Soon"
          value={data ? formatNumber(data.expiringCount) : '—'}
          icon={<ClockCircleOutlined />}
          accent={colors.error}
          footer="within 60 days"
          loading={isLoading}
        />
      </Col>
    </Row>
  );
}

export default StatsRow;
