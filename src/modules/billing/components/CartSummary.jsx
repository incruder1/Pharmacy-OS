import { Typography } from 'antd';
import { colors } from '@/app/theme';
import { formatCurrency } from '@/utils';
import styles from '../billing.module.scss';

const { Text } = Typography;

/**
 * Totals breakdown: gross, discount, taxable, GST, grand total.
 * @param {{ totals: import('../types').CartTotals }} props
 */
export function CartSummary({ totals }) {
  const rows = [
    ['Subtotal (MRP)', totals.grossSubtotal],
    ['Discount', -totals.discount],
    ['Taxable Value', totals.taxableValue],
    ['GST', totals.gstAmount],
  ];

  return (
    <div>
      {rows.map(([label, value]) => (
        <div key={label} className={styles.summaryRow}>
          <Text style={{ color: colors.textSecondary }}>{label}</Text>
          <Text style={{ color: value < 0 ? colors.success : colors.textPrimary }}>
            {value < 0 ? `- ${formatCurrency(Math.abs(value), { paise: true })}` : formatCurrency(value, { paise: true })}
          </Text>
        </div>
      ))}
      <div className={styles.grandTotal}>
        <span style={{ color: colors.textPrimary }}>Total</span>
        <span style={{ color: colors.primary }}>{formatCurrency(totals.grandTotal)}</span>
      </div>
    </div>
  );
}

export default CartSummary;
