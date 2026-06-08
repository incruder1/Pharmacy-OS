import { Typography } from 'antd';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { colors } from '@/app/theme';
import { formatCurrency, formatDate, formatNumber } from '@/utils';
import { useInventoryStore } from '../store/inventoryStore';

const { Text } = Typography;

/** Batch & expiry tracking table. */
export function InventoryTable({ result, loading }) {
  const { page, pageSize, setPage } = useInventoryStore();

  const columns = [
    {
      title: 'Product',
      dataIndex: 'productName',
      render: (name, r) => (
        <div>
          <Text strong style={{ color: colors.textPrimary, display: 'block' }}>{name}</Text>
          <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{r.category}</Text>
        </div>
      ),
    },
    { title: 'Batch', dataIndex: 'batchNumber' },
    {
      title: 'Expiry',
      dataIndex: 'expiryDate',
      render: (d, r) => (
        <div>
          <Text style={{ color: colors.textPrimary, display: 'block' }}>{formatDate(d)}</Text>
          <Text style={{ color: r.daysToExpiry < 0 ? colors.error : colors.textTertiary, fontSize: 12 }}>
            {r.daysToExpiry < 0 ? 'expired' : `${r.daysToExpiry} days left`}
          </Text>
        </div>
      ),
    },
    { title: 'Qty', dataIndex: 'quantity', align: 'right', render: (q) => formatNumber(q) },
    { title: 'MRP', dataIndex: 'mrp', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'Cost', dataIndex: 'costPrice', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'Status', dataIndex: 'status', render: (s) => <StatusBadge status={s} /> },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={result?.data}
      loading={loading}
      emptyText="No batches found"
      pagination={{ current: page, pageSize, total: result?.total ?? 0, onChange: setPage }}
    />
  );
}

export default InventoryTable;
