import { Flex, Tag, Typography } from 'antd';
import { colors } from '@/app/theme';
import { formatCurrency, formatNumber } from '@/utils';
import { ListCard } from '@/modules/dashboard/components/ListCard';
import { useDeadStock } from '../hooks';

const { Text } = Typography;

export function DeadStockWidget() {
  const { data, isLoading, isError, refetch } = useDeadStock();

  return (
    <ListCard
      title="Dead Stock Products"
      data={data}
      loading={isLoading}
      error={isError}
      onRetry={refetch}
      emptyText="No dead stock detected"
      renderItem={(item) => (
        <Flex justify="space-between" align="center" gap={12}>
          <div>
            <Text strong style={{ color: colors.textPrimary }}>{item.name}</Text>
            <Text style={{ display: 'block', fontSize: 12, color: colors.textTertiary }}>
              {formatNumber(item.quantity)} units · idle {item.daysIdle}d
            </Text>
          </div>
          <Tag color="red" style={{ borderRadius: 999, margin: 0 }}>{formatCurrency(item.value)}</Tag>
        </Flex>
      )}
    />
  );
}

export default DeadStockWidget;
