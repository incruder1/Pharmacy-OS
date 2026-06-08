import { Tag, Typography } from 'antd';
import { DataTable } from '@/components/DataTable';
import { colors } from '@/app/theme';
import { formatNumber } from '@/utils';
import { useReorderSuggestions } from '../hooks';
import { useReorderStore } from '../store/reorderStore';
import { HEALTH_PRESETS } from '../constants';
import styles from '../reorder.module.scss';

const { Text } = Typography;

const ROW_CLASS = {
  critical: styles.rowCritical,
  warning: styles.rowWarning,
  healthy: styles.rowHealthy,
};

export function ReorderTable() {
  const { data, isFetching } = useReorderSuggestions();
  const { page, pageSize, setPage } = useReorderStore();

  const columns = [
    {
      title: 'Product',
      dataIndex: 'productName',
      render: (name, r) => (
        <div>
          <Text strong>{name}</Text>
          <Text style={{ display: 'block', fontSize: 12, color: colors.textTertiary }}>{r.category}</Text>
        </div>
      ),
    },
    { title: 'Current Stock', dataIndex: 'currentStock', align: 'right', render: (v) => formatNumber(v) },
    { title: 'Avg Daily Sales', dataIndex: 'avgDailySales', align: 'right', render: (v) => formatNumber(v) },
    {
      title: 'Days Remaining',
      dataIndex: 'daysRemaining',
      align: 'right',
      render: (v) => <Text style={{ color: v <= 7 ? colors.error : colors.textPrimary }}>{v}d</Text>,
    },
    { title: 'Suggested Qty', dataIndex: 'suggestedQty', align: 'right', render: (v) => <Text strong>{formatNumber(v)}</Text> },
    { title: 'Supplier', dataIndex: 'supplierName', ellipsis: true },
    {
      title: 'Status',
      dataIndex: 'health',
      render: (h) => {
        const p = HEALTH_PRESETS[h];
        return <Tag color={p.color} style={{ borderRadius: 999, margin: 0 }}>{p.label}</Tag>;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={data?.data}
      loading={isFetching}
      emptyText="All stock levels look healthy"
      onRow={(record) => ({ className: ROW_CLASS[record.health] })}
      pagination={{ current: page, pageSize, total: data?.total ?? 0, onChange: setPage }}
    />
  );
}

export default ReorderTable;
