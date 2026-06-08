import { mockRequest } from './network';
import { genId, matchesSearch, paginate, sortBy } from './utils';
import { manufacturersSeed, productsSeed } from './products.data';

/** Mutable in-session store (deep-cloned on read by mockRequest). */
let products = structuredClone(productsSeed);

/**
 * Paginated, filtered product list.
 * @param {{ search?: string, category?: string, manufacturer?: string, page?: number, pageSize?: number }} [params]
 */
export function listProducts(params = {}) {
  const { search, category, manufacturer, page, pageSize } = params;
  let rows = products.filter(
    (p) =>
      matchesSearch(p, search, ['name', 'genericName', 'manufacturer', 'barcode', 'hsn']) &&
      (!category || p.category === category) &&
      (!manufacturer || p.manufacturer === manufacturer),
  );
  rows = sortBy(rows, 'name');
  return mockRequest(paginate(rows, { page, pageSize }));
}

/** All products (unpaginated) — used by billing search and selectors. */
export function getAllProducts() {
  return mockRequest(sortBy(products, 'name'));
}

/** @param {string} id */
export function getProduct(id) {
  return mockRequest(products.find((p) => p.id === id) ?? null);
}

/** @param {object} payload */
export function createProduct(payload) {
  const record = { ...payload, id: genId('PRD') };
  products = [record, ...products];
  return mockRequest(record);
}

/** @param {string} id @param {object} payload */
export function updateProduct(id, payload) {
  products = products.map((p) => (p.id === id ? { ...p, ...payload, id } : p));
  return mockRequest(products.find((p) => p.id === id));
}

/** @param {string} id */
export function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  return mockRequest({ id });
}

export function getManufacturers() {
  return mockRequest(manufacturersSeed);
}
