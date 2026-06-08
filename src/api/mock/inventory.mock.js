import { mockRequest } from './network';
import { matchesSearch, paginate, sortBy } from './utils';
import { inventorySeed } from './inventory.data';
import { daysUntil } from '@/utils';

const EXPIRING_WINDOW_DAYS = 90;

/**
 * Derive a stock status from quantity + expiry.
 * @param {object} batch
 * @returns {'expired'|'expiring_soon'|'out_of_stock'|'low_stock'|'in_stock'}
 */
export function deriveStatus(batch) {
  const days = daysUntil(batch.expiryDate);
  if (days < 0) return 'expired';
  if (batch.quantity === 0) return 'out_of_stock';
  if (days <= EXPIRING_WINDOW_DAYS) return 'expiring_soon';
  if (batch.quantity <= batch.reorderLevel) return 'low_stock';
  return 'in_stock';
}

const withStatus = (b) => ({ ...b, status: deriveStatus(b), daysToExpiry: daysUntil(b.expiryDate) });

let inventory = structuredClone(inventorySeed).map(withStatus);

/**
 * Paginated, filtered inventory batches.
 * @param {{ search?: string, status?: string, expiryWindow?: number, page?: number, pageSize?: number }} [params]
 */
export function listInventory(params = {}) {
  const { search, status, expiryWindow, page, pageSize } = params;
  let rows = inventory.filter(
    (b) =>
      matchesSearch(b, search, ['productName', 'batchNumber', 'category']) &&
      (!status || b.status === status) &&
      (!expiryWindow || (b.daysToExpiry >= 0 && b.daysToExpiry <= expiryWindow)),
  );
  rows = sortBy(rows, 'daysToExpiry');
  return mockRequest(paginate(rows, { page, pageSize }));
}

/** Batches at or below their reorder level (or out of stock). */
export function getLowStock() {
  const rows = inventory.filter((b) => b.status === 'low_stock' || b.status === 'out_of_stock');
  return mockRequest(sortBy(rows, 'quantity'));
}

/** Batches expiring within `days` (default 90). */
export function getExpiringBatches(days = EXPIRING_WINDOW_DAYS) {
  const rows = inventory.filter((b) => b.daysToExpiry >= 0 && b.daysToExpiry <= days);
  return mockRequest(sortBy(rows, 'daysToExpiry'));
}

/** Headline inventory KPIs for the inventory page. */
export function getInventoryStats() {
  return mockRequest({
    totalBatches: inventory.length,
    lowStock: inventory.filter((b) => b.status === 'low_stock').length,
    outOfStock: inventory.filter((b) => b.status === 'out_of_stock').length,
    expiringSoon: inventory.filter((b) => b.status === 'expiring_soon').length,
    stockValue: inventory.reduce((acc, b) => acc + b.quantity * b.costPrice, 0),
  });
}
