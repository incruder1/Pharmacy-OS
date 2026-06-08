import { Tag, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataTable } from '@/components/DataTable';
import { ActionMenu } from '@/components/ActionMenu';
import { useConfirm } from '@/components/ConfirmModal';
import { colors } from '@/app/theme';
import { formatCurrency } from '@/utils';
import { useProductsStore } from '../store/productsStore';
import { useDeleteProduct } from '../hooks';

const { Text } = Typography;

/**
 * Product listing table with edit/delete row actions.
 * @param {{ result?: object, loading?: boolean, onEdit: (p: object) => void, onAdd: () => void }} props
 */
export function ProductsTable({ result, loading, onEdit, onAdd }) {
  const { page, pageSize, setPage } = useProductsStore();
  const { confirm } = useConfirm();
  const remove = useDeleteProduct();

  const askDelete = (record) =>
    confirm({
      title: `Delete ${record.name}?`,
      content: 'This product will be removed from the catalog.',
      okText: 'Delete',
      danger: true,
      onOk: () => remove.mutateAsync(record.id),
    });

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      render: (name, r) => (
        <div>
          <Text strong style={{ color: colors.textPrimary, display: 'block' }}>{name}</Text>
          <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{r.genericName}</Text>
        </div>
      ),
    },
    { title: 'Manufacturer', dataIndex: 'manufacturer' },
    { title: 'Category', dataIndex: 'category', render: (c) => <Tag style={{ borderRadius: 999 }}>{c}</Tag> },
    { title: 'GST', dataIndex: 'gstRate', align: 'right', render: (g) => `${g}%` },
    { title: 'HSN', dataIndex: 'hsn' },
    { title: 'MRP', dataIndex: 'mrp', align: 'right', render: (v) => formatCurrency(v) },
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
      emptyText="No products yet"
      emptyAction={{ label: 'Add Product', onClick: onAdd }}
      pagination={{
        current: page,
        pageSize,
        total: result?.total ?? 0,
        onChange: setPage,
      }}
    />
  );
}

export default ProductsTable;
