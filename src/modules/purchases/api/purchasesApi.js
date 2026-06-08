import * as mock from '@/api/mock/purchases.mock';

/** Data-access layer for purchases. */
export const purchasesApi = {
  list: (params) => mock.listPurchases(params),
  get: (id) => mock.getPurchase(id),
  create: (payload) => mock.createPurchase(payload),
  getStats: () => mock.getPurchaseStats(),
};

export default purchasesApi;
