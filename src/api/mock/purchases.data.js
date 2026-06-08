import dayjs from 'dayjs';

/**
 * Seed purchase orders (goods inward). Each has supplier + batch line items.
 */
export const purchasesSeed = [
  {
    id: 'PO-3391',
    supplierId: 'SUP-SUN01',
    supplierName: 'Sun Pharma Distributors',
    invoiceNumber: 'SUN/24-25/8841',
    date: dayjs().subtract(0, 'day').toISOString(),
    status: 'pending',
    lineItems: [
      { productId: 'PRD-DOLO6', productName: 'Dolo 650 Tablet', batchNumber: 'DO2231', quantity: 200, costPrice: 22, mrp: 31, expiryDate: dayjs().add(540, 'day').toISOString() },
      { productId: 'PRD-PANT4', productName: 'Pantop 40 Tablet', batchNumber: 'PA9087', quantity: 120, costPrice: 78, mrp: 112, expiryDate: dayjs().add(420, 'day').toISOString() },
    ],
  },
  {
    id: 'PO-3390',
    supplierId: 'SUP-CIP01',
    supplierName: 'Cipla Wholesale',
    invoiceNumber: 'CIP/24-25/2210',
    date: dayjs().subtract(1, 'day').toISOString(),
    status: 'paid',
    lineItems: [
      { productId: 'PRD-MONT1', productName: 'Montair LC Tablet', batchNumber: 'ML0098', quantity: 90, costPrice: 132, mrp: 185, expiryDate: dayjs().add(300, 'day').toISOString() },
      { productId: 'PRD-NEBUL', productName: 'Asthalin Respules 2.5mg', batchNumber: 'AS5512', quantity: 60, costPrice: 61, mrp: 88, expiryDate: dayjs().add(260, 'day').toISOString() },
    ],
  },
  {
    id: 'PO-3389',
    supplierId: 'SUP-MAN01',
    supplierName: 'Mankind Pharma Agency',
    invoiceNumber: 'MAN/24-25/5567',
    date: dayjs().subtract(2, 'day').toISOString(),
    status: 'partial',
    lineItems: [
      { productId: 'PRD-AMOX5', productName: 'Mox 500 Capsule', batchNumber: 'MX7782', quantity: 150, costPrice: 54, mrp: 78, expiryDate: dayjs().add(480, 'day').toISOString() },
    ],
  },
];

/** Compute a purchase order's net amount from its line items. */
export function purchaseTotal(po) {
  return po.lineItems.reduce((acc, li) => acc + li.quantity * li.costPrice, 0);
}
