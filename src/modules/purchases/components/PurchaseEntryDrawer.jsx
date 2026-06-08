import { App, Col, Input, Row, Select, Typography, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { DrawerForm } from '@/components/DrawerForm';
import { usePurchaseDraftStore } from '../store/purchaseDraftStore';
import { purchaseSchema } from '../schemas/purchaseSchema';
import { PURCHASE_STATUS_OPTIONS } from '../constants';
import { useCreatePurchase, useSupplierOptions } from '../hooks';
import { PurchaseLineItems } from './PurchaseLineItems';

const { Text } = Typography;

const Field = ({ label, required, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 500, color: '#475569' }}>
      {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
    </label>
    {children}
  </div>
);

/** Goods-inward purchase entry drawer driven by the draft cart store. */
export function PurchaseEntryDrawer({ open, onClose }) {
  const { message } = App.useApp();
  const draft = usePurchaseDraftStore();
  const { data: suppliers = [] } = useSupplierOptions();
  const create = useCreatePurchase();

  const handleClose = () => {
    draft.reset();
    onClose();
  };

  const onSubmit = () => {
    const payload = {
      supplierId: draft.supplierId,
      invoiceNumber: draft.invoiceNumber,
      status: draft.status,
      lineItems: draft.lineItems,
    };
    const result = purchaseSchema.safeParse(payload);
    if (!result.success) {
      message.error(result.error.issues[0]?.message ?? 'Please complete the form');
      return;
    }
    const supplierName = suppliers.find((s) => s.value === draft.supplierId)?.label ?? '';
    create.mutateAsync({ ...payload, supplierName }).then(handleClose).catch(() => {});
  };

  return (
    <DrawerForm
      open={open}
      onClose={handleClose}
      onSubmit={onSubmit}
      loading={create.isPending}
      title="New Purchase Entry"
      submitLabel="Save Purchase"
      width={760}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Field label="Supplier" required>
            <Select
              showSearch
              optionFilterProp="label"
              placeholder="Select supplier"
              style={{ width: '100%' }}
              options={suppliers}
              value={draft.supplierId}
              onChange={(v) => draft.setField('supplierId', v)}
            />
          </Field>
        </Col>
        <Col span={12}>
          <Field label="Invoice Number" required>
            <Input
              placeholder="e.g. SUN/24-25/8841"
              value={draft.invoiceNumber}
              onChange={(e) => draft.setField('invoiceNumber', e.target.value)}
            />
          </Field>
        </Col>
      </Row>
      <Field label="Payment Status">
        <Select
          style={{ width: 200 }}
          options={PURCHASE_STATUS_OPTIONS}
          value={draft.status}
          onChange={(v) => draft.setField('status', v)}
        />
      </Field>

      <Text strong style={{ display: 'block', marginBottom: 8 }}>Batch Line Items</Text>
      <PurchaseLineItems />

      <Field label="Invoice Upload">
        <Upload.Dragger beforeUpload={() => false} maxCount={1} accept=".pdf,.jpg,.png">
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="ant-upload-text">Click or drag invoice to attach</p>
          <p className="ant-upload-hint">PDF, JPG or PNG (mock upload)</p>
        </Upload.Dragger>
      </Field>
    </DrawerForm>
  );
}

export default PurchaseEntryDrawer;
