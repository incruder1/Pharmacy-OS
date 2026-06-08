import dayjs from 'dayjs';
import { mockRequest } from './network';
import { genId, matchesSearch, paginate, sortBy } from './utils';
import { salesSeed } from './sales.data';

let sales = structuredClone(salesSeed);

const inRange = (iso, from, to) => {
  if (!from && !to) return true;
  const d = dayjs(iso);
  return (!from || !d.isBefore(dayjs(from), 'day')) && (!to || !d.isAfter(dayjs(to), 'day'));
};

/**
 * Paginated, filtered sales/invoice list.
 * @param {{ search?: string, mode?: string, from?: string, to?: string, page?: number, pageSize?: number }} [params]
 */
export function listSales(params = {}) {
  const { search, mode, from, to, page, pageSize } = params;
  let rows = sales.filter(
    (s) =>
      matchesSearch(s, search, ['id', 'customerName', 'customerPhone']) &&
      (!mode || s.paymentMode === mode) &&
      inRange(s.date, from, to),
  );
  rows = sortBy(rows, 'date', 'desc');
  return mockRequest(paginate(rows, { page, pageSize }));
}

/** @param {string} id */
export function getSale(id) {
  return mockRequest(sales.find((s) => s.id === id) ?? null);
}

/** Persist a POS invoice produced by the billing module. */
export function createSale(payload) {
  const record = {
    ...payload,
    id: payload.id ?? genId('INV'),
    date: payload.date ?? dayjs().toISOString(),
    items: payload.lineItems?.length ?? 0,
  };
  sales = [record, ...sales];
  return mockRequest(record);
}

/** Raw sales rows for report aggregations. */
export function getAllSales() {
  return mockRequest(sales);
}
