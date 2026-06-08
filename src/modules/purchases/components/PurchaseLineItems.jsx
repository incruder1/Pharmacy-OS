import { Button, DatePicker, Input, InputNumber, Select, Table, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { colors } from '@/app/theme';
import { formatCurrency } from '@/utils';
import { usePurchaseDraftStore } from '../store/purchaseDraftStore';
import { useProductOptions } from '../hooks';

const { Text } = Typography;

/** Editable batch line-item grid for the purchase-entry drawer. */
export function PurchaseLineItems() {
  const lineItems = usePurchaseDraftStore((s) => s.lineItems);
  const updateLine = usePurchaseDraftStore((s) => s.updateLine);
  const removeLine = usePurchaseDraftStore((s) => s.removeLine);
  const addLine = usePurchaseDraftStore((s) => s.addLine);
  const { data: products = [] } = useProductOptions();

  const onProduct = (index, id) => {
    const p = products.find((o) => o.value === id);
    updateLine(index, { productId: id, productName: p?.label ?? '', costPrice: p?.costPrice ?? 0, mrp: p?.mrp ?? 0 });
  };

  const columns = [
    {
      title: 'Product',
      width: 200,
      render: (_, __, i) => (
        <Select
          showSearch
          optionFilterProp="label"
          placeholder="Select product"
          style={{ width: '100%' }}
          options={products}
          value={lineItems[i].productId}
          onChange={(v) => onProduct(i, v)}
        />
      ),
    },
    {
      title: 'Batch',
      width: 110,
      render: (_, __, i) => (
        <Input value={lineItems[i].batchNumber} onChange={(e) => updateLine(i, { batchNumber: e.target.value })} placeholder="Batch" />
      ),
    },
    {
      title: 'Qty',
      width: 80,
      render: (_, __, i) => (
        <InputNumber min={1} value={lineItems[i].quantity} onChange={(v) => updateLine(i, { quantity: v })} style={{ width: '100%' }} />
      ),
    },
    {
      title: 'Cost',
      width: 100,
      render: (_, __, i) => (
        <InputNumber min={0} value={lineItems[i].costPrice} onChange={(v) => updateLine(i, { costPrice: v })} style={{ width: '100%' }} />
      ),
    },
    {
      title: 'MRP',
      width: 100,
      render: (_, __, i) => (
        <InputNumber min={0} value={lineItems[i].mrp} onChange={(v) => updateLine(i, { mrp: v })} style={{ width: '100%' }} />
      ),
    },
    {
      title: 'Expiry',
      width: 140,
      render: (_, __, i) => (
        <DatePicker
          picker="month"
          format="MM/YYYY"
          value={lineItems[i].expiryDate ? dayjs(lineItems[i].expiryDate) : null}
          onChange={(d) => updateLine(i, { expiryDate: d ? d.endOf('month').toISOString() : undefined })}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: '',
      width: 40,
      render: (_, __, i) => (
        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeLine(i)} disabled={lineItems.length === 1} />
      ),
    },
  ];

  const total = lineItems.reduce((a, li) => a + (li.quantity || 0) * (li.costPrice || 0), 0);

  return (
    <div>
      <Table
        size="small"
        rowKey={(_, i) => i}
        columns={columns}
        dataSource={lineItems}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <Button type="dashed" icon={<PlusOutlined />} onClick={addLine}>
          Add line item
        </Button>
        <Text strong style={{ color: colors.textPrimary }}>
          Total: {formatCurrency(total)}
        </Text>
      </div>
    </div>
  );
}

export default PurchaseLineItems;
