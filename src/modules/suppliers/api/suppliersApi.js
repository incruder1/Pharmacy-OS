import * as mock from '@/api/mock/suppliers.mock';

/** Data-access layer for suppliers. */
export const suppliersApi = {
  list: (params) => mock.listSuppliers(params),
  getAll: () => mock.getAllSuppliers(),
  get: (id) => mock.getSupplier(id),
  create: (payload) => mock.createSupplier(payload),
  update: (id, payload) => mock.updateSupplier(id, payload),
  remove: (id) => mock.deleteSupplier(id),
  getPurchases: (id) => mock.getSupplierPurchases(id),
};

export default suppliersApi;
