import { Table } from 'antd';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingState } from '@/components/LoadingState';
import { formatCurrency, formatDate } from '@/utils';
import { useSupplierPurchases } from '../hooks';

/**
 * Expandable-row content: a supplier's recent purchase history.
 * @param {{ supplierId: string }} props
 */
export function SupplierPurchases({ supplierId }) {
  const { data, isLoading } = useSupplierPurchases(supplierId);
  if (isLoading) return <LoadingState minHeight={120} message="Loading purchases…" />;

  const columns = [
    { title: 'PO #', dataIndex: 'id' },
    { title: 'Date', dataIndex: 'date', render: (d) => formatDate(d) },
    { title: 'Items', dataIndex: 'items', align: 'right' },
    { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'Status', dataIndex: 'status', render: (s) => <StatusBadge status={s} /> },
  ];

  return <Table size="small" rowKey="id" columns={columns} dataSource={data} pagination={false} />;
}

export default SupplierPurchases;
