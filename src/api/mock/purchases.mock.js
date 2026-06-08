import dayjs from 'dayjs';
import { mockRequest } from './network';
import { genId, matchesSearch, paginate, sortBy } from './utils';
import { purchaseTotal, purchasesSeed } from './purchases.data';

const decorate = (po) => ({
  ...po,
  items: po.lineItems.length,
  amount: purchaseTotal(po),
});

let purchases = structuredClone(purchasesSeed).map(decorate);

/**
 * Paginated, filtered purchase list.
 * @param {{ search?: string, supplierId?: string, status?: string, page?: number, pageSize?: number }} [params]
 */
export function listPurchases(params = {}) {
  const { search, supplierId, status, page, pageSize } = params;
  let rows = purchases.filter(
    (p) =>
      matchesSearch(p, search, ['id', 'supplierName', 'invoiceNumber']) &&
      (!supplierId || p.supplierId === supplierId) &&
      (!status || p.status === status),
  );
  rows = sortBy(rows, 'date', 'desc');
  return mockRequest(paginate(rows, { page, pageSize }));
}

/** @param {string} id */
export function getPurchase(id) {
  return mockRequest(purchases.find((p) => p.id === id) ?? null);
}

/** @param {object} payload — { supplierId, supplierName, invoiceNumber, lineItems[] } */
export function createPurchase(payload) {
  const record = decorate({
    ...payload,
    id: genId('PO'),
    date: payload.date ?? dayjs().toISOString(),
    status: payload.status ?? 'pending',
    lineItems: payload.lineItems ?? [],
  });
  purchases = [record, ...purchases];
  return mockRequest(record);
}

export function getPurchaseStats() {
  return mockRequest({
    totalPurchases: purchases.length,
    totalValue: purchases.reduce((acc, p) => acc + p.amount, 0),
    pending: purchases.filter((p) => p.status === 'pending').length,
  });
}
