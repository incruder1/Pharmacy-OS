import { Flex, Typography } from 'antd';
import { colors } from '@/app/theme';
import { formatCurrency, formatDate } from '@/utils';
import { ListCard } from './ListCard';
import { useRecentPurchases } from '../hooks';

const { Text } = Typography;

/** Most recent purchase orders received from suppliers. */
export function RecentPurchasesCard() {
  const { data, isLoading, isError, refetch } = useRecentPurchases();

  return (
    <ListCard
      title="Recent Purchases"
      data={data}
      loading={isLoading}
      error={isError}
      onRetry={refetch}
      emptyText="No purchases yet"
      renderItem={(item) => (
        <Flex align="center" justify="space-between" style={{ width: '100%' }} gap={12}>
          <div style={{ minWidth: 0 }}>
            <Text strong className="po-truncate" style={{ display: 'block', color: colors.textPrimary }}>
              {item.supplier}
            </Text>
            <Text style={{ color: colors.textTertiary, fontSize: 12 }}>
              {item.id} · {item.items} items · {formatDate(item.createdAt)}
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

export default RecentPurchasesCard;
