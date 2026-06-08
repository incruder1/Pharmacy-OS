import { Card, Typography } from 'antd';
import { colors, palette } from '@/app/theme';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';

const { Text } = Typography;

/**
 * Reusable "card containing a list" widget — the shared skeleton for every
 * dashboard activity/alert panel (top products, recent sales, low stock, …).
 *
 * @template T
 * @param {object} props
 * @param {string} props.title
 * @param {import('react').ReactNode} [props.extra]
 * @param {T[]} [props.data]
 * @param {(item: T, index: number) => import('react').ReactNode} props.renderItem
 * @param {boolean} [props.loading]
 * @param {boolean} [props.error]
 * @param {() => void} [props.onRetry]
 * @param {string} [props.emptyText]
 */
export function ListCard({
  title,
  extra,
  data = [],
  renderItem,
  loading = false,
  error = false,
  onRetry,
  emptyText = 'Nothing to show',
}) {
  const showState = loading || error || data.length === 0;

  return (
    <Card
      variant="borderless"
      style={{ height: '100%', border: `1px solid ${colors.border}`, boxShadow: 'none' }}
      styles={{ body: { padding: showState ? 20 : '4px 8px' } }}
      title={
        <Text style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary }}>{title}</Text>
      }
      extra={extra}
    >
      {loading ? (
        <LoadingState minHeight={220} />
      ) : error ? (
        <ErrorState minHeight={220} onRetry={onRetry} />
      ) : data.length === 0 ? (
        <EmptyState minHeight={220} title={emptyText} />
      ) : (
        <div>
          {data.map((item, index) => (
            <div
              key={item.id ?? index}
              style={{
                padding: '12px 12px',
                borderTop: index === 0 ? 'none' : `1px solid ${palette.gray[100]}`,
              }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default ListCard;
