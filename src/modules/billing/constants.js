/** Payment channels for split tender. */
export const PAYMENT_CHANNELS = [
  { key: 'cash', label: 'Cash' },
  { key: 'upi', label: 'UPI' },
  { key: 'card', label: 'Card' },
];

export const emptyPayments = () => ({ cash: 0, upi: 0, card: 0 });
