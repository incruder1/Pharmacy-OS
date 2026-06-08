import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Row, Col } from 'antd';
import { DrawerForm } from '@/components/DrawerForm';
import { FormField } from '@/components/FormField';
import { supplierSchema, emptySupplier } from '../schemas/supplierSchema';
import { useCreateSupplier, useUpdateSupplier } from '../hooks';

/**
 * Create / edit a supplier. `record` non-null ⇒ edit mode.
 * @param {{ open: boolean, onClose: () => void, record?: import('../types').Supplier | null }} props
 */
export function SupplierForm({ open, onClose, record }) {
  const isEdit = Boolean(record);
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(supplierSchema),
    defaultValues: emptySupplier(),
  });
  const create = useCreateSupplier();
  const update = useUpdateSupplier();
  const saving = create.isPending || update.isPending;

  useEffect(() => {
    if (open) reset(record ? { ...record } : emptySupplier());
  }, [open, record, reset]);

  const onSubmit = handleSubmit((values) => {
    const run = isEdit ? update.mutateAsync({ id: record.id, ...values }) : create.mutateAsync(values);
    run.then(onClose).catch(() => {});
  });

  return (
    <DrawerForm
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      loading={saving}
      title={isEdit ? 'Edit Supplier' : 'Add Supplier'}
      submitLabel={isEdit ? 'Save Changes' : 'Add Supplier'}
    >
      <FormField control={control} name="name" label="Supplier Name" required placeholder="e.g. Sun Pharma Distributors" />
      <FormField control={control} name="contactPerson" label="Contact Person" required placeholder="e.g. Rajesh Khanna" />
      <Row gutter={12}>
        <Col span={12}>
          <FormField control={control} name="phone" label="Phone" required placeholder="+91 98200 11223" />
        </Col>
        <Col span={12}>
          <FormField control={control} name="email" label="Email" placeholder="orders@supplier.in" />
        </Col>
      </Row>
      <FormField control={control} name="gstin" label="GSTIN" required placeholder="27AAACS1234A1Z5" />
      <FormField control={control} name="address" label="Address" type="textarea" required placeholder="Street, City, State" />
      <FormField control={control} name="outstanding" label="Outstanding (₹)" type="number" placeholder="0" controlProps={{ min: 0 }} />
    </DrawerForm>
  );
}

export default SupplierForm;
