import { z } from 'zod';

const lineItemSchema = z.object({
  productId: z.string({ message: 'Select a product' }).min(1, 'Select a product'),
  batchNumber: z.string().trim().min(1, 'Batch required'),
  quantity: z.coerce.number().int().positive('Qty > 0'),
  costPrice: z.coerce.number().positive('Cost > 0'),
  mrp: z.coerce.number().positive('MRP > 0'),
  expiryDate: z.string({ message: 'Expiry required' }).min(1, 'Expiry required'),
});

/** Validation for a complete purchase entry. */
export const purchaseSchema = z.object({
  supplierId: z.string({ message: 'Select a supplier' }).min(1, 'Select a supplier'),
  invoiceNumber: z.string().trim().min(2, 'Invoice number is required'),
  status: z.enum(['paid', 'partial', 'pending']),
  lineItems: z.array(lineItemSchema).min(1, 'Add at least one line item'),
});
