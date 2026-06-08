import { Col, Row } from 'antd';
import {
  AlertOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { StatCard } from '@/components/StatCard';
import { colors } from '@/app/theme';
import { formatCurrency, formatNumber } from '@/utils';
import { useExpiryMetrics } from '../hooks';
import styles from '../expiry.module.scss';

const COL = { xs: 24, sm: 12, xl: 6 };

export function ExpiryMetricsRow() {
  const { data, isLoading } = useExpiryMetrics();

  return (
    <Row gutter={[16, 16]} className={styles.metrics}>
      <Col {...COL}>
        <StatCard
          title="Total Expiry Risk Value"
          value={data ? formatCurrency(data.expiryRiskValue) : '—'}
          icon={<AlertOutlined />}
          accent={colors.warning}
          footer={`${data ? formatNumber(data.atRiskCount) : '—'} batches at risk`}
          loading={isLoading}
        />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Expired Inventory Value"
          value={data ? formatCurrency(data.expiredInventoryValue) : '—'}
          icon={<DollarOutlined />}
          accent={colors.error}
          footer={`${data ? formatNumber(data.expiredCount) : '—'} expired batches`}
          loading={isLoading}
        />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Medicines Near Expiry"
          value={data ? formatNumber(data.medicinesNearExpiry) : '—'}
          icon={<ClockCircleOutlined />}
          accent={colors.info}
          footer="within 30 days"
          loading={isLoading}
        />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Est. Recoverable Value"
          value={data ? formatCurrency(data.estimatedRecoverableValue) : '—'}
          icon={<RiseOutlined />}
          accent={colors.success}
          footer="via returns & transfers"
          loading={isLoading}
        />
      </Col>
    </Row>
  );
}

export default ExpiryMetricsRow;
