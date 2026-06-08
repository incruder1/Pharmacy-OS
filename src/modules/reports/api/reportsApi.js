import * as mock from '@/api/mock/reports.mock';

/** Data-access layer for report aggregations. */
export const reportsApi = {
  sales: (params) => mock.getSalesReport(params),
  inventory: () => mock.getInventoryReport(),
  expiry: () => mock.getExpiryReport(),
  profit: (params) => mock.getProfitReport(params),
};

export default reportsApi;
