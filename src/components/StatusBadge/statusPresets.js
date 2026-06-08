/**
 * Status → color/label presets shared across modules (stock, expiry, payments).
 * `color` uses Ant Design preset palette names.
 */
export const STATUS_PRESETS = {
  in_stock: { color: 'green', label: 'In Stock' },
  low_stock: { color: 'orange', label: 'Low Stock' },
  out_of_stock: { color: 'red', label: 'Out of Stock' },
  expiring_soon: { color: 'gold', label: 'Expiring Soon' },
  expired: { color: 'red', label: 'Expired' },
  paid: { color: 'green', label: 'Paid' },
  pending: { color: 'orange', label: 'Pending' },
  partial: { color: 'blue', label: 'Partial' },
  active: { color: 'green', label: 'Active' },
  inactive: { color: 'default', label: 'Inactive' },
};
