import { Tag, Typography } from 'antd';
import { DataTable } from '@/components/DataTable';
import { colors } from '@/app/theme';
import { formatCurrency, formatDateTime } from '@/utils';
import { useSalesStore } from '../store/salesStore';
import { MODE_COLOR } from '../constants';

const { Text } = Typography;

/** Invoice listing table. */
export function SalesTable({ result, loading }) {
  const { page, pageSize, setPage } = useSalesStore();

  const columns = [
    { title: 'Invoice', dataIndex: 'id', render: (id) => <Text strong style={{ color: colors.textPrimary }}>{id}</Text> },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      render: (name, r) => (
        <div>
          <Text style={{ color: colors.textPrimary, display: 'block' }}>{name}</Text>
          <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{r.customerPhone}</Text>
        </div>
      ),
    },
    { title: 'Date', dataIndex: 'date', render: (d) => formatDateTime(d) },
    { title: 'Items', dataIndex: 'items', align: 'right' },
    { title: 'GST', dataIndex: 'gstAmount', align: 'right', render: (v) => formatCurrency(v, { paise: true }) },
    { title: 'Mode', dataIndex: 'paymentMode', render: (m) => <Tag color={MODE_COLOR[m]} style={{ borderRadius: 999 }}>{m}</Tag> },
    { title: 'Total', dataIndex: 'total', align: 'right', render: (v) => <Text strong>{formatCurrency(v)}</Text> },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={result?.data}
      loading={loading}
      emptyText="No sales found"
      pagination={{ current: page, pageSize, total: result?.total ?? 0, onChange: setPage }}
    />
  );
}

export default SalesTable;
