import { useMemo, useState } from 'react';
import { App, Button, Typography } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { PageHeader } from '@/components/PageHeader';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useBillingStore } from './store/billingStore';
import { cartTotals, lineBreakdown, paymentsTotal } from './totals';
import { useCreateInvoice } from './hooks';
import { PosSearchBar, CartTable, CartSummary, PaymentPanel, InvoicePreview } from './components';
import styles from './billing.module.scss';

const { Text } = Typography;

/** Pick the channel that contributed the most as the recorded payment mode. */
function dominantMode(payments) {
  const map = { cash: 'Cash', upi: 'UPI', card: 'Card' };
  const top = Object.entries(payments).sort((a, b) => b[1] - a[1])[0];
  return top && top[1] > 0 ? map[top[0]] : 'Cash';
}

/** POS billing screen — two-pane: search + cart on the left, checkout right. */
export function BillingPage() {
  const { message } = App.useApp();
  const items = useBillingStore((s) => s.items);
  const payments = useBillingStore((s) => s.payments);
  const customer = useBillingStore((s) => s.customer);
  const clear = useBillingStore((s) => s.clear);
  const totals = useMemo(() => cartTotals(items), [items]);
  const create = useCreateInvoice();
  const preview = useDisclosure();
  const [invoice, setInvoice] = useState(null);

  const balance = Math.round((totals.grandTotal - paymentsTotal(payments)) * 100) / 100;
  const canCheckout = items.length > 0 && balance <= 0.01;

  const onCheckout = () => {
    if (!canCheckout) {
      message.warning('Collect the full amount before charging.');
      return;
    }
    const lineItems = items.map((i) => {
      const b = lineBreakdown(i);
      return {
        productId: i.productId,
        productName: i.name,
        quantity: i.quantity,
        mrp: i.mrp,
        gstRate: i.gstRate,
        gstAmount: b.gstAmount,
        lineTotal: b.net,
      };
    });
    const payload = {
      customerName: customer.name || 'Walk-in',
      customerPhone: customer.phone,
      lineItems,
      subtotal: totals.grossSubtotal,
      discount: totals.discount,
      gstAmount: totals.gstAmount,
      total: totals.grandTotal,
      profit: 0,
      paymentMode: dominantMode(payments),
    };
    create.mutateAsync(payload).then((saved) => {
      setInvoice(saved);
      preview.open();
      clear();
    }).catch(() => {});
  };

  return (
    <div className="po-fade-in">
      <PageHeader
        title="Billing (POS)"
        subtitle="Fast counter billing with GST & split payments"
        extra={items.length > 0 && (
          <Button icon={<ClearOutlined />} onClick={clear}>Clear cart</Button>
        )}
      />
      <div className={styles.pos}>
        <div className={styles.left}>
          <div className={styles.panel}>
            <PosSearchBar />
          </div>
          <div className={styles.panel}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Cart · {items.length} item(s)</Text>
            <CartTable />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.panel}>
            <CartSummary totals={totals} />
          </div>
          <div className={styles.panel}>
            <PaymentPanel grandTotal={totals.grandTotal} disabled={items.length === 0} loading={create.isPending} onCheckout={onCheckout} />
          </div>
        </div>
      </div>
      <InvoicePreview open={preview.isOpen} invoice={invoice} onClose={preview.close} />
    </div>
  );
}

export default BillingPage;
