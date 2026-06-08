/**
 * Centralized query keys for the dashboard — stable, range-aware, and easy to
 * invalidate. Keys are arrays so TanStack Query can do partial matching.
 */
export const dashboardKeys = {
  all: ['dashboard'],
  summary: (range) => ['dashboard', 'summary', range],
  revenueTrend: (range) => ['dashboard', 'revenue-trend', range],
  salesTrend: (range) => ['dashboard', 'sales-trend', range],
  categories: () => ['dashboard', 'categories'],
  topProducts: () => ['dashboard', 'top-products'],
  recentSales: () => ['dashboard', 'recent-sales'],
  recentPurchases: () => ['dashboard', 'recent-purchases'],
  expiring: () => ['dashboard', 'expiring'],
  lowStock: () => ['dashboard', 'low-stock'],
};
