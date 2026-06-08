import { Flex, Typography } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { colors } from '@/app/theme';
import { formatCurrency, formatNumber } from '@/utils';
import { ListCard } from '@/modules/dashboard/components/ListCard';
import { useFastMoving } from '../hooks';

const { Text } = Typography;

export function FastMovingWidget() {
  const { data, isLoading, isError, refetch } = useFastMoving();

  return (
    <ListCard
      title="Fast Moving Products"
      data={data}
      loading={isLoading}
      error={isError}
      onRetry={refetch}
      emptyText="No fast movers this period"
      renderItem={(item) => (
        <Flex justify="space-between" align="center" gap={12}>
          <div>
            <Text strong style={{ color: colors.textPrimary }}>{item.name}</Text>
            <Text style={{ display: 'block', fontSize: 12, color: colors.textTertiary }}>
              {item.category}
            </Text>
          </div>
          <Flex vertical align="flex-end">
            <Text strong style={{ color: colors.success }}>
              <ArrowUpOutlined style={{ fontSize: 10 }} /> {formatNumber(item.unitsSold)} units
            </Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>{formatCurrency(item.revenue)}</Text>
          </Flex>
        </Flex>
      )}
    />
  );
}

export default FastMovingWidget;
