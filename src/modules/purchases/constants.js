export const PURCHASE_STATUS_OPTIONS = [
  { label: 'Paid', value: 'paid' },
  { label: 'Partial', value: 'partial' },
  { label: 'Pending', value: 'pending' },
];

export const DEFAULT_PAGE_SIZE = 10;

/** A blank line item for the purchase-entry cart. */
export const emptyLineItem = () => ({
  productId: undefined,
  productName: '',
  batchNumber: '',
  quantity: 1,
  costPrice: 0,
  mrp: 0,
  expiryDate: undefined,
});
