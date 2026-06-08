import { Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataTable } from '@/components/DataTable';
import { ActionMenu } from '@/components/ActionMenu';
import { StatusBadge } from '@/components/StatusBadge';
import { useConfirm } from '@/components/ConfirmModal';
import { colors } from '@/app/theme';
import { formatCurrency } from '@/utils';
import { useSuppliersStore } from '../store/suppliersStore';
import { useDeleteSupplier } from '../hooks';
import { SupplierPurchases } from './SupplierPurchases';

const { Text } = Typography;

/** Supplier listing with outstanding column + expandable purchase history. */
export function SuppliersTable({ result, loading, onEdit, onAdd }) {
  const { page, pageSize, setPage } = useSuppliersStore();
  const { confirm } = useConfirm();
  const remove = useDeleteSupplier();

  const askDelete = (r) =>
    confirm({
      title: `Delete ${r.name}?`,
      content: 'This supplier will be removed.',
      okText: 'Delete',
      danger: true,
      onOk: () => remove.mutateAsync(r.id),
    });

  const columns = [
    {
      title: 'Supplier',
      dataIndex: 'name',
      render: (name, r) => (
        <div>
          <Text strong style={{ color: colors.textPrimary, display: 'block' }}>{name}</Text>
          <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{r.contactPerson} · {r.phone}</Text>
        </div>
      ),
    },
    { title: 'GSTIN', dataIndex: 'gstin' },
    {
      title: 'Outstanding',
      dataIndex: 'outstanding',
      align: 'right',
      render: (v) =>
        v > 0 ? (
          <Text strong style={{ color: colors.error }}>{formatCurrency(v)}</Text>
        ) : (
          <StatusBadge status="paid" label="Settled" />
        ),
    },
    {
      title: '',
      key: 'actions',
      align: 'right',
      width: 56,
      render: (_, r) => (
        <ActionMenu
          items={[
            { key: 'edit', label: 'Edit', icon: <EditOutlined />, onClick: () => onEdit(r) },
            { key: 'delete', label: 'Delete', icon: <DeleteOutlined />, danger: true, onClick: () => askDelete(r) },
          ]}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={result?.data}
      loading={loading}
      emptyText="No suppliers yet"
      emptyAction={{ label: 'Add Supplier', onClick: onAdd }}
      expandable={{ expandedRowRender: (r) => <SupplierPurchases supplierId={r.id} /> }}
      pagination={{ current: page, pageSize, total: result?.total ?? 0, onChange: setPage }}
    />
  );
}

export default SuppliersTable;
