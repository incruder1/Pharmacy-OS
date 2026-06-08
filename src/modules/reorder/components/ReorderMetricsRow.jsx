import { Col, Row } from 'antd';
import { AlertOutlined, CloseCircleOutlined, ReloadOutlined, RiseOutlined } from '@ant-design/icons';
import { StatCard } from '@/components/StatCard';
import { colors } from '@/app/theme';
import { formatNumber } from '@/utils';
import { useReorderMetrics } from '../hooks';

const COL = { xs: 24, sm: 12, xl: 6 };

export function ReorderMetricsRow() {
  const { data, isLoading } = useReorderMetrics();

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
      <Col {...COL}>
        <StatCard title="Critical Products" value={data ? formatNumber(data.criticalProducts) : '—'} icon={<AlertOutlined />} accent={colors.error} loading={isLoading} />
      </Col>
      <Col {...COL}>
        <StatCard title="Out of Stock" value={data ? formatNumber(data.outOfStock) : '—'} icon={<CloseCircleOutlined />} accent={colors.error} loading={isLoading} />
      </Col>
      <Col {...COL}>
        <StatCard title="Reorder Required" value={data ? formatNumber(data.reorderRequired) : '—'} icon={<ReloadOutlined />} accent={colors.warning} loading={isLoading} />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Stock Health Score"
          value={data ? `${data.stockHealthScore}%` : '—'}
          icon={<RiseOutlined />}
          accent={colors.success}
          loading={isLoading}
          footer="overall inventory health"
        />
      </Col>
    </Row>
  );
}

export default ReorderMetricsRow;
