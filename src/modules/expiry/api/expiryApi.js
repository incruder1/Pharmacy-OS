import * as mock from '@/api/mock/expiry.mock';

export const expiryApi = {
  getMetrics: () => mock.getExpiryMetrics(),
  listBatches: (params) => mock.listExpiryBatches(params),
  listBySupplier: (params) => mock.listExpiryBySupplier(params),
  getFilterOptions: () => mock.getExpiryFilterOptions(),
  exportReport: (params) => mock.exportExpiryReport(params),
  getLossAnalytics: () => mock.getExpiryLossAnalytics(),
  getBatchDetail: (id) => mock.getExpiryBatchDetail(id),
};

export default expiryApi;
