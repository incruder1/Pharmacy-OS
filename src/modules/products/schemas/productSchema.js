import { z } from 'zod';
import { PRODUCT_CATEGORIES, GST_RATES } from '../constants';

/**
 * Validation schema for the product create/edit form.
 */
export const productSchema = z.object({
  name: z.string().trim().min(2, 'Product name is required'),
  genericName: z.string().trim().min(2, 'Generic name is required'),
  manufacturer: z.string().trim().min(2, 'Manufacturer is required'),
  category: z.enum(PRODUCT_CATEGORIES, { message: 'Select a category' }),
  gstRate: z.coerce.number().refine((v) => GST_RATES.includes(v), 'Select a GST slab'),
  hsn: z
    .string()
    .trim()
    .regex(/^\d{4,8}$/, 'HSN must be 4–8 digits'),
  barcode: z.string().trim().min(6, 'Barcode is required'),
  mrp: z.coerce.number().positive('MRP must be greater than 0'),
  costPrice: z.coerce.number().positive('Cost price must be greater than 0'),
});

/** @returns {import('zod').infer<typeof productSchema>} */
export const emptyProduct = () => ({
  name: '',
  genericName: '',
  manufacturer: '',
  category: 'Tablet',
  gstRate: 12,
  hsn: '',
  barcode: '',
  mrp: undefined,
  costPrice: undefined,
});
