import * as mock from '@/api/mock/dashboard.mock';

/**
 * Data-access layer for the dashboard. Today it delegates to the mock layer;
 * swapping to the real backend means changing only this file (e.g. apiClient.get).
 */
export const dashboardApi = {
  /** @param {import('../types').DashboardRange} range */
  getSummary: (range) => mock.getSummary(range),
  /** @param {import('../types').DashboardRange} range */
  getRevenueTrend: (range) => mock.getRevenueTrend(range),
  /** @param {import('../types').DashboardRange} range */
  getSalesTrend: (range) => mock.getSalesTrend(range),
  getCategoryBreakdown: () => mock.getCategoryBreakdown(),
  getTopProducts: () => mock.getTopProducts(),
  getRecentSales: () => mock.getRecentSales(),
  getRecentPurchases: () => mock.getRecentPurchases(),
  getExpiringMedicines: () => mock.getExpiringMedicines(),
  getLowStock: () => mock.getLowStock(),
};

export default dashboardApi;
