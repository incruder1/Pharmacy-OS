/** @type {{ value: import('./types').ExpiryWindow | 'expired', label: string, color: string }[]} */
export const EXPIRY_WINDOWS = [
  { value: 'expired', label: 'Expired', color: '#dc2626' },
  { value: '30d', label: 'Expiring in 30 Days', color: '#ea580c' },
  { value: '60d', label: 'Expiring in 60 Days', color: '#d97706' },
  { value: '90d', label: 'Expiring in 90 Days', color: '#ca8a04' },
];

export const EXPIRY_VIEW_MODES = [
  { value: 'batch', label: 'Batch View' },
  { value: 'supplier', label: 'Supplier View' },
];

export const DEFAULT_WINDOW = '30d';

/** Status badge mapping for expiry-specific states. */
export const EXPIRY_STATUS_MAP = {
  expired: { color: 'red', label: 'Expired' },
  critical: { color: 'orange', label: 'Critical (≤30d)' },
  warning: { color: 'gold', label: 'Warning (≤60d)' },
  watch: { color: 'blue', label: 'Watch (≤90d)' },
};
