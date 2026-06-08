import { Flex, Typography } from 'antd';
import { colors } from '@/app/theme';
import { formatNumber } from '@/utils';
import { StatusBadge } from '@/components/StatusBadge';
import { ListCard } from './ListCard';
import { useLowStock } from '../hooks';

const { Text } = Typography;

/** Products at or below their reorder level. */
export function LowStockCard() {
  const { data, isLoading, isError, refetch } = useLowStock();

  return (
    <ListCard
      title="Low Stock Alerts"
      data={data}
      loading={isLoading}
      error={isError}
      onRetry={refetch}
      emptyText="Stock levels are healthy"
      renderItem={(item) => (
        <Flex align="center" justify="space-between" style={{ width: '100%' }} gap={12}>
          <div style={{ minWidth: 0 }}>
            <Text strong className="po-truncate" style={{ display: 'block', color: colors.textPrimary }}>
              {item.name}
            </Text>
            <Text style={{ color: colors.textTertiary, fontSize: 12 }}>
              {formatNumber(item.quantity)} in stock · reorder at {formatNumber(item.reorderLevel)}
            </Text>
          </div>
          <StatusBadge status={item.status} />
        </Flex>
      )}
    />
  );
}

export default LowStockCard;
