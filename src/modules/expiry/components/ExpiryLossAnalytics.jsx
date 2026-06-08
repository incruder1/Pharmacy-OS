import { Col, Row, Statistic, Typography } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FallOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { colors } from '@/app/theme';
import { LoadingState } from '@/components/LoadingState';
import { formatCurrency } from '@/utils';
import { useExpiryLossAnalytics } from '../hooks';
import styles from '../expiry.module.scss';

const { Text } = Typography;

/** Inventory loss analytics strip with breakdown chart. */
export function ExpiryLossAnalytics() {
  const { data, isLoading } = useExpiryLossAnalytics();

  if (isLoading) return <LoadingState minHeight={160} />;

  if (!data) return null;

  return (
    <div className={styles.lossAnalytics}>
      <div className={styles.lossHeader}>
        <Text className={styles.lossTitle}>Inventory Loss Analytics</Text>
        <Text className={styles.lossSub}>Understand write-offs and projected loss if no action is taken</Text>
      </div>

      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={8}>
          <div className={styles.lossStat}>
            <FallOutlined className={styles.lossStatIcon} style={{ color: colors.error }} />
            <Statistic
              title="Total Loss (Expired)"
              value={data.totalExpiredLoss}
              prefix="₹"
              valueStyle={{ color: colors.error, fontWeight: 700 }}
            />
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className={styles.lossStat}>
            <ThunderboltOutlined className={styles.lossStatIcon} style={{ color: colors.warning }} />
            <Statistic
              title="Projected Loss (No Action)"
              value={data.projectedLoss}
              prefix="₹"
              valueStyle={{ color: colors.warning, fontWeight: 700 }}
            />
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className={styles.lossChart}>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={data.breakdown} layout="vertical" margin={{ left: 4, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={colors.border} />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={72}
                  tick={{ fontSize: 11, fill: colors.textSecondary }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(v) => [formatCurrency(v), 'Value']}
                  contentStyle={{ borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 12 }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={14}>
                  {data.breakdown.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ExpiryLossAnalytics;
