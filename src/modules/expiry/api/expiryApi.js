import * as mock from '@/api/mock/expiry.mock';

export const expiryApi = {
  getMetrics: () => mock.getExpiryMetrics(),
  listBatches: (params) => mock.listExpiryBatches(params),
  listBySupplier: (params) => mock.listExpiryBySupplier(params),
  getFilterOptions: () => mock.getExpiryFilterOptions(),
  exportReport: (params) => mock.exportExpiryReport(params),
};

export default expiryApi;
