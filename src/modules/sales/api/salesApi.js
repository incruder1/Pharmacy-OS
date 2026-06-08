import * as mock from '@/api/mock/sales.mock';

/** Data-access layer for sales / invoices. */
export const salesApi = {
  list: (params) => mock.listSales(params),
  get: (id) => mock.getSale(id),
  create: (payload) => mock.createSale(payload),
};

export default salesApi;
