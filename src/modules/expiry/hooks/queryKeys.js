export const expiryKeys = {
  all: ['expiry'],
  metrics: () => ['expiry', 'metrics'],
  batches: (params) => ['expiry', 'batches', params],
  suppliers: (params) => ['expiry', 'suppliers', params],
  filterOptions: () => ['expiry', 'filter-options'],
  lossAnalytics: () => ['expiry', 'loss-analytics'],
  batchDetail: (id) => ['expiry', 'batch', id],
};
