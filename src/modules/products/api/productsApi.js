import * as mock from '@/api/mock/products.mock';

/**
 * Data-access layer for products. Delegates to the mock layer today; swap these
 * bodies for apiClient calls to go live without touching hooks/components.
 */
export const productsApi = {
  /** @param {import('../types').ProductListParams} params */
  list: (params) => mock.listProducts(params),
  getAll: () => mock.getAllProducts(),
  /** @param {string} id */
  get: (id) => mock.getProduct(id),
  /** @param {object} payload */
  create: (payload) => mock.createProduct(payload),
  /** @param {string} id @param {object} payload */
  update: (id, payload) => mock.updateProduct(id, payload),
  /** @param {string} id */
  remove: (id) => mock.deleteProduct(id),
  getManufacturers: () => mock.getManufacturers(),
};

export default productsApi;
