import * as mock from '@/api/mock/insights.mock';

export const insightsApi = {
  getMetrics: () => mock.getInsightsMetrics(),
  /** @param {'7d'|'30d'|'90d'} range */
  getRevenueTrend: (range) => mock.getInsightsRevenueTrend(range),
  getCategoryPerformance: () => mock.getCategoryPerformance(),
  getTopProducts: () => mock.getInsightsTopProducts(),
  getSupplierSpend: () => mock.getSupplierSpendAnalysis(),
  getFastMoving: () => mock.getFastMovingProducts(),
  getSlowMoving: () => mock.getSlowMovingProducts(),
  getDeadStock: () => mock.getDeadStockProducts(),
  getBusinessInsights: () => mock.getBusinessInsights(),
};

export default insightsApi;
