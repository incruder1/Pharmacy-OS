import { Flex, Tag, Typography } from 'antd';
import { colors } from '@/app/theme';
import { formatCurrency, fromNow } from '@/utils';
import { ListCard } from './ListCard';
import { useRecentSales } from '../hooks';

const { Text } = Typography;

const MODE_COLOR = { UPI: 'geekblue', Cash: 'green', Card: 'purple' };

/** Most recent POS invoices. */
export function RecentSalesCard() {
  const { data, isLoading, isError, refetch } = useRecentSales();

  return (
    <ListCard
      title="Recent Sales"
      data={data}
      loading={isLoading}
      error={isError}
      onRetry={refetch}
      emptyText="No sales yet"
      renderItem={(item) => (
        <Flex align="center" justify="space-between" style={{ width: '100%' }} gap={12}>
          <div style={{ minWidth: 0 }}>
            <Flex align="center" gap={8}>
              <Text strong style={{ color: colors.textPrimary }}>
                {item.id}
              </Text>
              <Tag color={MODE_COLOR[item.mode]} style={{ margin: 0, borderRadius: 999 }}>
                {item.mode}
              </Tag>
            </Flex>
            <Text style={{ color: colors.textTertiary, fontSize: 12 }}>
              {item.customer} · {item.items} items · {fromNow(item.createdAt)}
            </Text>
          </div>
          <Text strong style={{ color: colors.textPrimary, flex: 'none' }}>
            {formatCurrency(item.amount)}
          </Text>
        </Flex>
      )}
    />
  );
}

export default RecentSalesCard;
