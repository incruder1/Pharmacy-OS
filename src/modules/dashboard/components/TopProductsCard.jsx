import { Flex, Typography } from 'antd';
import { colors, palette, radius } from '@/app/theme';
import { formatCurrency, formatNumber } from '@/utils';
import { ListCard } from './ListCard';
import { useTopProducts } from '../hooks';

const { Text } = Typography;

/** Best-selling products by revenue. */
export function TopProductsCard() {
  const { data, isLoading, isError, refetch } = useTopProducts();

  return (
    <ListCard
      title="Top Products"
      data={data}
      loading={isLoading}
      error={isError}
      onRetry={refetch}
      emptyText="No sales yet"
      renderItem={(item, index) => (
        <Flex align="center" justify="space-between" style={{ width: '100%' }} gap={12}>
          <Flex align="center" gap={12} style={{ minWidth: 0 }}>
            <Flex
              align="center"
              justify="center"
              style={{
                width: 28,
                height: 28,
                flex: 'none',
                borderRadius: radius.sm,
                background: palette.brand[50],
                color: colors.primary,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {index + 1}
            </Flex>
            <div style={{ minWidth: 0 }}>
              <Text strong className="po-truncate" style={{ display: 'block', color: colors.textPrimary }}>
                {item.name}
              </Text>
              <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{item.category}</Text>
            </div>
          </Flex>
          <div style={{ textAlign: 'right', flex: 'none' }}>
            <Text strong style={{ display: 'block', color: colors.textPrimary }}>
              {formatCurrency(item.revenue)}
            </Text>
            <Text style={{ color: colors.textTertiary, fontSize: 12 }}>
              {formatNumber(item.unitsSold)} units
            </Text>
          </div>
        </Flex>
      )}
    />
  );
}

export default TopProductsCard;
