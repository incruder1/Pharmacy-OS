import { Button, Input, InputNumber, Typography } from 'antd';
import { colors } from '@/app/theme';
import { formatCurrency } from '@/utils';
import { useBillingStore } from '../store/billingStore';
import { PAYMENT_CHANNELS } from '../constants';
import { paymentsTotal } from '../totals';
import styles from '../billing.module.scss';

const { Text } = Typography;

/**
 * Customer details + split-payment entry + checkout trigger.
 * @param {{ grandTotal: number, disabled: boolean, onCheckout: () => void, loading: boolean }} props
 */
export function PaymentPanel({ grandTotal, disabled, onCheckout, loading }) {
  const payments = useBillingStore((s) => s.payments);
  const setPayment = useBillingStore((s) => s.setPayment);
  const customer = useBillingStore((s) => s.customer);
  const setCustomer = useBillingStore((s) => s.setCustomer);

  const paid = paymentsTotal(payments);
  const balance = Math.round((grandTotal - paid) * 100) / 100;

  return (
    <div>
      <Text strong style={{ display: 'block', marginBottom: 8 }}>Customer</Text>
      <Input
        placeholder="Customer name (optional)"
        value={customer.name}
        onChange={(e) => setCustomer({ name: e.target.value })}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder="Phone (optional)"
        value={customer.phone}
        onChange={(e) => setCustomer({ phone: e.target.value })}
        style={{ marginBottom: 16 }}
      />

      <Text strong style={{ display: 'block', marginBottom: 8 }}>Split Payment</Text>
      {PAYMENT_CHANNELS.map(({ key, label }) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ color: colors.textSecondary }}>{label}</Text>
          <InputNumber
            min={0}
            value={payments[key]}
            onChange={(v) => setPayment(key, v)}
            prefix="₹"
            style={{ width: 160 }}
          />
        </div>
      ))}

      <div className={styles.balance}>
        <Text style={{ color: colors.textSecondary }}>{balance > 0 ? 'Balance due' : 'Change'}</Text>
        <Text style={{ color: balance > 0 ? colors.error : colors.success }}>
          {formatCurrency(Math.abs(balance))}
        </Text>
      </div>

      <Button
        type="primary"
        size="large"
        block
        style={{ marginTop: 16 }}
        disabled={disabled}
        loading={loading}
        onClick={onCheckout}
      >
        Charge {formatCurrency(grandTotal)}
      </Button>
    </div>
  );
}

export default PaymentPanel;
