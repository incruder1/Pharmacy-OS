import { z } from 'zod';

const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/;

/** Validation schema for the supplier create/edit form. */
export const supplierSchema = z.object({
  name: z.string().trim().min(2, 'Supplier name is required'),
  contactPerson: z.string().trim().min(2, 'Contact person is required'),
  phone: z.string().trim().min(8, 'Enter a valid phone number'),
  email: z.string().trim().email('Enter a valid email').or(z.literal('')),
  gstin: z.string().trim().regex(GSTIN_RE, 'Enter a valid 15-char GSTIN'),
  address: z.string().trim().min(4, 'Address is required'),
  outstanding: z.coerce.number().min(0, 'Cannot be negative'),
});

export const emptySupplier = () => ({
  name: '',
  contactPerson: '',
  phone: '',
  email: '',
  gstin: '',
  address: '',
  outstanding: 0,
});
