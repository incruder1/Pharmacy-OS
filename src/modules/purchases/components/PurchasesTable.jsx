import { Table, Typography } from 'antd';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { colors } from '@/app/theme';
import { formatCurrency, formatDate } from '@/utils';
import { usePurchasesStore } from '../store/purchasesStore';

const { Text } = Typography;

/** Nested line-item table shown when a purchase row expands. */
function LineItems({ items }) {
  const columns = [
    { title: 'Product', dataIndex: 'productName' },
    { title: 'Batch', dataIndex: 'batchNumber' },
    { title: 'Qty', dataIndex: 'quantity', align: 'right' },
    { title: 'Cost', dataIndex: 'costPrice', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'Expiry', dataIndex: 'expiryDate', render: (d) => formatDate(d) },
  ];
  return <Table size="small" rowKey="batchNumber" columns={columns} dataSource={items} pagination={false} />;
}

/** Purchase order listing with expandable line items. */
export function PurchasesTable({ result, loading, onAdd }) {
  const { page, pageSize, setPage } = usePurchasesStore();

  const columns = [
    { title: 'PO #', dataIndex: 'id', render: (id) => <Text strong style={{ color: colors.textPrimary }}>{id}</Text> },
    { title: 'Supplier', dataIndex: 'supplierName' },
    { title: 'Invoice', dataIndex: 'invoiceNumber' },
    { title: 'Date', dataIndex: 'date', render: (d) => formatDate(d) },
    { title: 'Items', dataIndex: 'items', align: 'right' },
    { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'Status', dataIndex: 'status', render: (s) => <StatusBadge status={s} /> },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={result?.data}
      loading={loading}
      emptyText="No purchases yet"
      emptyAction={{ label: 'New Purchase', onClick: onAdd }}
      expandable={{ expandedRowRender: (r) => <LineItems items={r.lineItems} /> }}
      pagination={{ current: page, pageSize, total: result?.total ?? 0, onChange: setPage }}
    />
  );
}

export default PurchasesTable;
