import { Card, Col, Flex, Row, Skeleton, Typography } from 'antd';
import {
  AlertOutlined,
  ArrowUpOutlined,
  DatabaseOutlined,
  DollarOutlined,
  FallOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { StatCard } from '@/components/StatCard';
import { colors } from '@/app/theme';
import { formatCurrency, formatCurrencyCompact, formatPercent } from '@/utils';
import { useInsightsMetrics } from '../hooks';
import styles from '../insights.module.scss';

const { Text } = Typography;
const COL = { xs: 24, sm: 12, lg: 8, xl: 4 };

function HeroRevenueCard({ data, loading }) {
  if (loading) {
    return (
      <Card className={styles.heroMetric} styles={{ body: { padding: 20 } }}>
        <Skeleton active paragraph={{ rows: 2 }} title={false} />
      </Card>
    );
  }

  return (
    <Card className={styles.heroMetric} styles={{ body: { padding: 20 } }}>
      <Flex vertical gap={8}>
        <Flex align="center" justify="space-between">
          <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500 }}>
            Today&apos;s Revenue
          </Text>
          <DollarOutlined style={{ color: '#fff', fontSize: 20 }} />
        </Flex>
        <Text style={{ fontSize: 32, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
          {data ? formatCurrency(data.todayRevenue) : '—'}
        </Text>
        {typeof data?.todayRevenueDelta === 'number' && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              color: '#bbf7d0',
              background: 'rgba(255,255,255,0.15)',
              padding: '2px 10px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              width: 'fit-content',
            }}
          >
            <ArrowUpOutlined style={{ fontSize: 10 }} />
            {formatPercent(data.todayRevenueDelta)} vs yesterday
          </span>
        )}
      </Flex>
    </Card>
  );
}

export function InsightsMetricsRow() {
  const { data, isLoading } = useInsightsMetrics();

  return (
    <Row gutter={[16, 16]} className={styles.metrics}>
      <Col xs={24} sm={12} xl={8}>
        <HeroRevenueCard data={data} loading={isLoading} />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Monthly Revenue"
          value={data ? formatCurrencyCompact(data.monthlyRevenue) : '—'}
          icon={<RiseOutlined />}
          accent={colors.primary}
          delta={data?.monthlyRevenueDelta}
          deltaLabel="vs last month"
          loading={isLoading}
        />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Monthly Profit"
          value={data ? formatCurrencyCompact(data.monthlyProfit) : '—'}
          icon={<RiseOutlined />}
          accent={colors.success}
          footer="after COGS & overhead"
          loading={isLoading}
        />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Inventory Value"
          value={data ? formatCurrencyCompact(data.inventoryValue) : '—'}
          icon={<DatabaseOutlined />}
          accent={colors.info}
          loading={isLoading}
        />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Dead Stock Value"
          value={data ? formatCurrencyCompact(data.deadStockValue) : '—'}
          icon={<FallOutlined />}
          accent={colors.warning}
          footer="180+ days idle"
          loading={isLoading}
        />
      </Col>
      <Col {...COL}>
        <StatCard
          title="Expiry Risk Value"
          value={data ? formatCurrencyCompact(data.expiryRiskValue) : '—'}
          icon={<AlertOutlined />}
          accent={colors.error}
          footer="within 60 days"
          loading={isLoading}
        />
      </Col>
    </Row>
  );
}

export default InsightsMetricsRow;
