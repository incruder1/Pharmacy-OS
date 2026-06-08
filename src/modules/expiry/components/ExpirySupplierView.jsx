import { Typography } from 'antd';
import { DataTable } from '@/components/DataTable';
import { colors } from '@/app/theme';
import { formatCurrency, formatNumber } from '@/utils';
import { useExpiryBySupplier } from '../hooks';
import { useExpiryStore } from '../store/expiryStore';

const { Text } = Typography;

export function ExpirySupplierView() {
  const { data, isFetching } = useExpiryBySupplier();
  const { page, pageSize, setPage } = useExpiryStore();

  const columns = [
    {
      title: 'Supplier',
      dataIndex: 'supplierName',
      render: (name) => <Text strong style={{ color: colors.textPrimary }}>{name}</Text>,
    },
    { title: 'Batches', dataIndex: 'batchCount', align: 'right', render: (v) => formatNumber(v) },
    { title: 'Products', dataIndex: 'productCount', align: 'right', render: (v) => formatNumber(v) },
    {
      title: 'Expired Value',
      dataIndex: 'expiredValue',
      align: 'right',
      render: (v) => (
        <Text style={{ color: v > 0 ? colors.error : colors.textTertiary }}>{formatCurrency(v)}</Text>
      ),
    },
    {
      title: 'Risk Value',
      dataIndex: 'riskValue',
      align: 'right',
      render: (v) => (
        <Text style={{ color: v > 0 ? colors.warning : colors.textTertiary }}>{formatCurrency(v)}</Text>
      ),
    },
    {
      title: 'Total Exposure',
      dataIndex: 'totalValue',
      align: 'right',
      render: (v) => <Text strong>{formatCurrency(v)}</Text>,
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={data?.data}
      loading={isFetching}
      emptyText="No supplier exposure in this window"
      pagination={{
        current: page,
        pageSize,
        total: data?.total ?? 0,
        onChange: setPage,
      }}
    />
  );
}

export default ExpirySupplierView;
