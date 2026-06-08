import { Button, InputNumber, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { colors } from '@/app/theme';
import { formatCurrency } from '@/utils';
import { useBillingStore } from '../store/billingStore';
import { lineBreakdown } from '../totals';
import styles from '../billing.module.scss';

const { Text } = Typography;

/** Editable cart: quantity steppers, per-line discount, remove. */
export function CartTable() {
  const items = useBillingStore((s) => s.items);
  const updateQty = useBillingStore((s) => s.updateQty);
  const setDiscount = useBillingStore((s) => s.setDiscount);
  const removeItem = useBillingStore((s) => s.removeItem);

  if (!items.length) {
    return <div className={styles.emptyCart}>Cart is empty — search a medicine to begin billing.</div>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ color: colors.textSecondary, fontSize: 12, textAlign: 'left' }}>
          <th style={{ padding: '8px 4px' }}>Item</th>
          <th style={{ padding: '8px 4px', width: 96 }}>Qty</th>
          <th style={{ padding: '8px 4px', width: 84 }}>Disc %</th>
          <th style={{ padding: '8px 4px', width: 96, textAlign: 'right' }}>Amount</th>
          <th style={{ width: 36 }} />
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const { net } = lineBreakdown(item);
          return (
            <tr key={item.productId} style={{ borderTop: `1px solid ${colors.border}` }}>
              <td style={{ padding: '10px 4px' }}>
                <Text strong style={{ color: colors.textPrimary, display: 'block' }}>{item.name}</Text>
                <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{formatCurrency(item.mrp)} · GST {item.gstRate}%</Text>
              </td>
              <td style={{ padding: '10px 4px' }}>
                <InputNumber min={1} value={item.quantity} onChange={(v) => updateQty(item.productId, v ?? 1)} size="small" style={{ width: 72 }} />
              </td>
              <td style={{ padding: '10px 4px' }}>
                <InputNumber min={0} max={100} value={item.discountPct} onChange={(v) => setDiscount(item.productId, v)} size="small" style={{ width: 64 }} />
              </td>
              <td style={{ padding: '10px 4px', textAlign: 'right' }}>
                <Text strong>{formatCurrency(net)}</Text>
              </td>
              <td>
                <Button type="text" danger size="small" icon={<DeleteOutlined />} onClick={() => removeItem(item.productId)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CartTable;
