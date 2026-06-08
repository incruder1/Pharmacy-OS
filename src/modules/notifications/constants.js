export const NOTIFICATION_TYPES = [
  { value: 'expiry', label: 'Expiry Alerts', color: 'red' },
  { value: 'low_stock', label: 'Low Stock', color: 'orange' },
  { value: 'purchase', label: 'Purchase', color: 'blue' },
  { value: 'payment', label: 'Payment', color: 'purple' },
  { value: 'system', label: 'System', color: 'default' },
];

export const TYPE_MAP = Object.fromEntries(NOTIFICATION_TYPES.map((t) => [t.value, t]));
