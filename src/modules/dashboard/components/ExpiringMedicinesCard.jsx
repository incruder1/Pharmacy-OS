import { Flex, Tag, Typography } from 'antd';
import { colors } from '@/app/theme';
import { formatDate, formatNumber } from '@/utils';
import { ListCard } from './ListCard';
import { useExpiringMedicines } from '../hooks';

const { Text } = Typography;

function expiryTag(days) {
  if (days <= 15) return { color: 'red', label: `${days}d left` };
  if (days <= 30) return { color: 'gold', label: `${days}d left` };
  return { color: 'blue', label: `${days}d left` };
}

/** Batches approaching their expiry date, most urgent first. */
export function ExpiringMedicinesCard() {
  const { data, isLoading, isError, refetch } = useExpiringMedicines();
  const sorted = data ? [...data].sort((a, b) => a.daysToExpiry - b.daysToExpiry) : data;

  return (
    <ListCard
      title="Expiring Medicines"
      data={sorted}
      loading={isLoading}
      error={isError}
      onRetry={refetch}
      emptyText="Nothing expiring soon"
      renderItem={(item) => {
        const tag = expiryTag(item.daysToExpiry);
        return (
          <Flex align="center" justify="space-between" style={{ width: '100%' }} gap={12}>
            <div style={{ minWidth: 0 }}>
              <Text strong className="po-truncate" style={{ display: 'block', color: colors.textPrimary }}>
                {item.name}
              </Text>
              <Text style={{ color: colors.textTertiary, fontSize: 12 }}>
                Batch {item.batch} · {formatNumber(item.quantity)} units · exp {formatDate(item.expiryDate)}
              </Text>
            </div>
            <Tag color={tag.color} style={{ margin: 0, borderRadius: 999, flex: 'none' }}>
              {tag.label}
            </Tag>
          </Flex>
        );
      }}
    />
  );
}

export default ExpiringMedicinesCard;
