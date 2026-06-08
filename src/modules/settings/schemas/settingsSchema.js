import { z } from 'zod';

const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const profileSchema = z.object({
  name: z.string().trim().min(2, 'Name is required'),
  email: z.string().trim().email('Enter a valid email'),
  phone: z.string().trim().min(8, 'Enter a valid phone'),
  role: z.enum(['owner', 'pharmacist', 'cashier', 'inventory_manager', 'store_manager']),
});

export const businessSchema = z.object({
  businessName: z.string().trim().min(2, 'Business name is required'),
  ownerName: z.string().trim().min(2, 'Owner name is required'),
  phone: z.string().trim().min(8, 'Enter a valid phone'),
  email: z.string().trim().email('Enter a valid email').or(z.literal('')),
  address: z.string().trim().min(4, 'Address is required'),
  drugLicenseNo: z.string().trim().min(4, 'Drug license number is required'),
});

export const gstSchema = z.object({
  gstin: z.string().trim().regex(GSTIN_RE, 'Enter a valid 15-char GSTIN'),
  pan: z.string().trim().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Enter a valid PAN'),
  scheme: z.enum(['regular', 'composition']),
  placeOfSupply: z.string().trim().min(2, 'Place of supply is required'),
});

export const storeSchema = z.object({
  invoicePrefix: z.string().trim().min(1, 'Invoice prefix is required'),
  lowStockThreshold: z.coerce.number().int().min(0, 'Cannot be negative'),
  expiryAlertDays: z.coerce.number().int().positive('Must be greater than 0'),
});
