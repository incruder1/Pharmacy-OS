export const insightsKeys = {
  all: ['insights'],
  metrics: () => ['insights', 'metrics'],
  revenueTrend: (range) => ['insights', 'revenue-trend', range],
  categoryPerformance: () => ['insights', 'category-performance'],
  topProducts: () => ['insights', 'top-products'],
  supplierSpend: () => ['insights', 'supplier-spend'],
  fastMoving: () => ['insights', 'fast-moving'],
  slowMoving: () => ['insights', 'slow-moving'],
  deadStock: () => ['insights', 'dead-stock'],
  businessInsights: () => ['insights', 'business-insights'],
};
