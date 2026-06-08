import dayjs from 'dayjs';
import { mockRequest, seededRandom } from './network';
import { genId, matchesSearch, paginate, sortBy } from './utils';
import { suppliersSeed } from './suppliers.data';

let suppliers = structuredClone(suppliersSeed);

/**
 * Paginated, filtered supplier list.
 * @param {{ search?: string, hasDues?: boolean, page?: number, pageSize?: number }} [params]
 */
export function listSuppliers(params = {}) {
  const { search, hasDues, page, pageSize } = params;
  let rows = suppliers.filter(
    (s) =>
      matchesSearch(s, search, ['name', 'contactPerson', 'phone', 'gstin', 'email']) &&
      (!hasDues || s.outstanding > 0),
  );
  rows = sortBy(rows, 'name');
  return mockRequest(paginate(rows, { page, pageSize }));
}

export function getAllSuppliers() {
  return mockRequest(sortBy(suppliers, 'name'));
}

/** @param {string} id */
export function getSupplier(id) {
  return mockRequest(suppliers.find((s) => s.id === id) ?? null);
}

/** @param {object} payload */
export function createSupplier(payload) {
  const record = { ...payload, id: genId('SUP'), outstanding: payload.outstanding ?? 0 };
  suppliers = [record, ...suppliers];
  return mockRequest(record);
}

/** @param {string} id @param {object} payload */
export function updateSupplier(id, payload) {
  suppliers = suppliers.map((s) => (s.id === id ? { ...s, ...payload, id } : s));
  return mockRequest(suppliers.find((s) => s.id === id));
}

/** @param {string} id */
export function deleteSupplier(id) {
  suppliers = suppliers.filter((s) => s.id !== id);
  return mockRequest({ id });
}

/**
 * Stable mock purchase history for a supplier.
 * @param {string} id
 */
export function getSupplierPurchases(id) {
  const seed = id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const rand = seededRandom(seed);
  const count = 3 + Math.round(rand() * 3);
  const rows = Array.from({ length: count }, (_, i) => ({
    id: `PO-${5000 + Math.round(rand() * 900)}`,
    date: dayjs().subtract(i * 11 + Math.round(rand() * 6), 'day').toISOString(),
    items: 8 + Math.round(rand() * 40),
    amount: Math.round((20000 + rand() * 150000) / 10) * 10,
    status: rand() > 0.4 ? 'paid' : rand() > 0.5 ? 'partial' : 'pending',
  }));
  return mockRequest(rows);
}
