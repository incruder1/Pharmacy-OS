import { Col, Row } from 'antd';
import {
  DatabaseOutlined,
  WarningOutlined,
  StopOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { StatCard } from '@/components/StatCard';
import { colors } from '@/app/theme';
import { formatCurrencyCompact, formatNumber } from '@/utils';
import { useInventoryStats } from '../hooks';

const COL = { xs: 24, sm: 12, xl: 6 };

/** KPI row summarizing stock health. */
export function InventoryStats() {
  const { data, isLoading } = useInventoryStats();
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col {...COL}>
        <StatCard title="Stock Value" value={data ? formatCurrencyCompact(data.stockValue) : '—'} icon={<DatabaseOutlined />} accent={colors.primary} loading={isLoading} footer={`${data?.totalBatches ?? 0} batches`} />
      </Col>
      <Col {...COL}>
        <StatCard title="Low Stock" value={data ? formatNumber(data.lowStock) : '—'} icon={<WarningOutlined />} accent={colors.warning} loading={isLoading} footer="needs reorder" />
      </Col>
      <Col {...COL}>
        <StatCard title="Out of Stock" value={data ? formatNumber(data.outOfStock) : '—'} icon={<StopOutlined />} accent={colors.error} loading={isLoading} footer="unavailable" />
      </Col>
      <Col {...COL}>
        <StatCard title="Expiring Soon" value={data ? formatNumber(data.expiringSoon) : '—'} icon={<ClockCircleOutlined />} accent={colors.info} loading={isLoading} footer="within 90 days" />
      </Col>
    </Row>
  );
}

export default InventoryStats;
