import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Row, Col } from 'antd';
import { DrawerForm } from '@/components/DrawerForm';
import { FormField } from '@/components/FormField';
import { productSchema, emptyProduct } from '../schemas/productSchema';
import { CATEGORY_OPTIONS, GST_OPTIONS } from '../constants';
import { useCreateProduct, useUpdateProduct } from '../hooks';

/**
 * Create / edit a product in a drawer. `record` non-null ⇒ edit mode.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {import('../types').Product | null} [props.record]
 */
export function ProductForm({ open, onClose, record }) {
  const isEdit = Boolean(record);
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: emptyProduct(),
  });
  const create = useCreateProduct();
  const update = useUpdateProduct();
  const saving = create.isPending || update.isPending;

  useEffect(() => {
    if (open) reset(record ? { ...record } : emptyProduct());
  }, [open, record, reset]);

  const onSubmit = handleSubmit((values) => {
    const mutation = isEdit ? update.mutateAsync({ id: record.id, ...values }) : create.mutateAsync(values);
    mutation.then(onClose).catch(() => {});
  });

  return (
    <DrawerForm
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      loading={saving}
      title={isEdit ? 'Edit Product' : 'Add Product'}
      submitLabel={isEdit ? 'Save Changes' : 'Add Product'}
    >
      <FormField control={control} name="name" label="Product Name" required placeholder="e.g. Dolo 650 Tablet" />
      <FormField control={control} name="genericName" label="Generic Name" required placeholder="e.g. Paracetamol 650mg" />
      <FormField control={control} name="manufacturer" label="Manufacturer" required placeholder="e.g. Micro Labs" />
      <Row gutter={12}>
        <Col span={12}>
          <FormField control={control} name="category" label="Category" type="select" required options={CATEGORY_OPTIONS} placeholder="Select" />
        </Col>
        <Col span={12}>
          <FormField control={control} name="gstRate" label="GST (%)" type="select" required options={GST_OPTIONS} placeholder="Select" />
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <FormField control={control} name="hsn" label="HSN Code" required placeholder="e.g. 30049099" />
        </Col>
        <Col span={12}>
          <FormField control={control} name="barcode" label="Barcode" required placeholder="e.g. 8901234500017" />
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <FormField control={control} name="mrp" label="MRP (₹)" type="number" required placeholder="0" controlProps={{ min: 0 }} />
        </Col>
        <Col span={12}>
          <FormField control={control} name="costPrice" label="Cost Price (₹)" type="number" required placeholder="0" controlProps={{ min: 0 }} />
        </Col>
      </Row>
    </DrawerForm>
  );
}

export default ProductForm;
