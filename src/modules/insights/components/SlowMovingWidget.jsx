import { Flex, Typography } from 'antd';
import { colors } from '@/app/theme';
import { formatCurrency, formatNumber } from '@/utils';
import { ListCard } from '@/modules/dashboard/components/ListCard';
import { useSlowMoving } from '../hooks';

const { Text } = Typography;

export function SlowMovingWidget() {
  const { data, isLoading, isError, refetch } = useSlowMoving();

  return (
    <ListCard
      title="Slow Moving Products"
      data={data}
      loading={isLoading}
      error={isError}
      onRetry={refetch}
      emptyText="All products moving well"
      renderItem={(item) => (
        <Flex justify="space-between" align="center" gap={12}>
          <div>
            <Text strong style={{ color: colors.textPrimary }}>{item.name}</Text>
            <Text style={{ display: 'block', fontSize: 12, color: colors.textTertiary }}>
              Last sale {item.daysSinceLastSale}d ago
            </Text>
          </div>
          <Flex vertical align="flex-end">
            <Text style={{ color: colors.warning }}>{formatNumber(item.unitsSold)} sold</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>{formatCurrency(item.revenue)}</Text>
          </Flex>
        </Flex>
      )}
    />
  );
}

export default SlowMovingWidget;
