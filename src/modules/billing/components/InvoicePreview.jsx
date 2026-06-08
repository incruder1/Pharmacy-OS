import { Divider, Modal, Table, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { colors } from '@/app/theme';
import { APP_NAME } from '@/constants/app';
import { formatCurrency, formatDateTime } from '@/utils';

const { Text, Title } = Typography;

/**
 * Read-only invoice preview shown after checkout.
 * @param {{ open: boolean, invoice: object | null, onClose: () => void }} props
 */
export function InvoicePreview({ open, invoice, onClose }) {
  if (!invoice) return null;

  const columns = [
    { title: 'Item', dataIndex: 'productName' },
    { title: 'Qty', dataIndex: 'quantity', align: 'right' },
    { title: 'Rate', dataIndex: 'mrp', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'GST', dataIndex: 'gstAmount', align: 'right', render: (v) => formatCurrency(v, { paise: true }) },
    { title: 'Amount', dataIndex: 'lineTotal', align: 'right', render: (v) => formatCurrency(v) },
  ];

  return (
    <Modal open={open} onCancel={onClose} onOk={onClose} okText="Done" cancelButtonProps={{ style: { display: 'none' } }} centered width={620}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <CheckCircleFilled style={{ color: colors.success, fontSize: 36 }} />
        <Title level={4} style={{ margin: '8px 0 0' }}>Payment Successful</Title>
        <Text style={{ color: colors.textTertiary }}>{APP_NAME} · {invoice.id}</Text>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text>{invoice.customerName || 'Walk-in'}</Text>
        <Text style={{ color: colors.textTertiary }}>{formatDateTime(invoice.date)}</Text>
      </div>
      <Table size="small" rowKey="productId" columns={columns} dataSource={invoice.lineItems} pagination={false} />
      <div style={{ marginTop: 12, textAlign: 'right' }}>
        <div><Text style={{ color: colors.textSecondary }}>Discount: </Text>{formatCurrency(invoice.discount)}</div>
        <div><Text style={{ color: colors.textSecondary }}>GST: </Text>{formatCurrency(invoice.gstAmount, { paise: true })}</div>
        <Title level={4} style={{ margin: '4px 0 0' }}>Total: {formatCurrency(invoice.total)}</Title>
        <Text style={{ color: colors.textTertiary }}>Paid via {invoice.paymentMode}</Text>
      </div>
    </Modal>
  );
}

export default InvoicePreview;
