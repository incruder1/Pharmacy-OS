import { Tag, Typography } from 'antd';
import { DataTable } from '@/components/DataTable';
import { colors } from '@/app/theme';
import { formatCurrency, formatDate, formatNumber } from '@/utils';
import { useExpiryBatches } from '../hooks';
import { useExpiryStore } from '../store/expiryStore';
import { EXPIRY_STATUS_MAP } from '../constants';

const { Text } = Typography;

export function ExpiryBatchTable() {
  const { data, isFetching } = useExpiryBatches();
  const { page, pageSize, setPage } = useExpiryStore();

  const columns = [
    {
      title: 'Product',
      dataIndex: 'productName',
      render: (name, r) => (
        <div>
          <Text strong style={{ color: colors.textPrimary, display: 'block' }}>{name}</Text>
          <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{r.genericName}</Text>
        </div>
      ),
    },
    { title: 'Batch', dataIndex: 'batchNumber', width: 100 },
    {
      title: 'Supplier',
      dataIndex: 'supplierName',
      ellipsis: true,
    },
    {
      title: 'Expiry',
      dataIndex: 'expiryDate',
      render: (d, r) => (
        <div>
          <Text style={{ display: 'block' }}>{formatDate(d)}</Text>
          <Text
            style={{
              fontSize: 12,
              color: r.daysToExpiry < 0 ? colors.error : colors.textTertiary,
            }}
          >
            {r.daysToExpiry < 0 ? `${Math.abs(r.daysToExpiry)}d ago` : `${r.daysToExpiry}d left`}
          </Text>
        </div>
      ),
    },
    { title: 'Qty', dataIndex: 'quantity', align: 'right', render: (q) => formatNumber(q) },
    { title: 'MRP', dataIndex: 'mrp', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'Cost', dataIndex: 'costPrice', align: 'right', render: (v) => formatCurrency(v) },
    {
      title: 'Value at Risk',
      dataIndex: 'inventoryValue',
      align: 'right',
      render: (v) => <Text strong>{formatCurrency(v)}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (s) => {
        const preset = EXPIRY_STATUS_MAP[s] ?? { color: 'default', label: s };
        return <Tag color={preset.color} style={{ margin: 0, borderRadius: 999 }}>{preset.label}</Tag>;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={data?.data}
      loading={isFetching}
      emptyText="No batches in this expiry window"
      pagination={{
        current: page,
        pageSize,
        total: data?.total ?? 0,
        onChange: setPage,
      }}
    />
  );
}

export default ExpiryBatchTable;
