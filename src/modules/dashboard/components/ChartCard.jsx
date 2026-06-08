import { Card, Typography } from 'antd';
import { colors } from '@/app/theme';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';

const { Text } = Typography;

/**
 * Reusable card wrapper for any chart/section: handles title, extra slot, and
 * the loading / error / empty / ready states uniformly.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {import('react').ReactNode} [props.extra]
 * @param {boolean} [props.loading]
 * @param {boolean} [props.error]
 * @param {boolean} [props.empty]
 * @param {() => void} [props.onRetry]
 * @param {number} [props.height]
 * @param {import('react').ReactNode} props.children
 */
export function ChartCard({
  title,
  extra,
  loading = false,
  error = false,
  empty = false,
  onRetry,
  height = 280,
  children,
}) {
  return (
    <Card
      variant="borderless"
      style={{ height: '100%', border: `1px solid ${colors.border}`, boxShadow: 'none' }}
      styles={{ body: { padding: 20 } }}
      title={
        <Text style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary }}>{title}</Text>
      }
      extra={extra}
    >
      <div style={{ height }}>
        {loading ? (
          <LoadingState minHeight={height} />
        ) : error ? (
          <ErrorState minHeight={height} onRetry={onRetry} />
        ) : empty ? (
          <EmptyState minHeight={height} title="No data for this period" />
        ) : (
          children
        )}
      </div>
    </Card>
  );
}

export default ChartCard;
