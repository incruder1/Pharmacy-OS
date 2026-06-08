import { mockRequest } from './network';
import {
  buildRevenueTrend,
  businessInsightsSeed,
  categoryPerformanceSeed,
  deadStockSeed,
  fastMovingSeed,
  insightsMetricsSeed,
  slowMovingSeed,
  supplierSpendSeed,
  topProductsChartSeed,
} from './insights.data';

export function getInsightsMetrics() {
  return mockRequest(insightsMetricsSeed);
}

/** @param {'7d'|'30d'|'90d'} range */
export function getInsightsRevenueTrend(range = '30d') {
  const days = range === '7d' ? 7 : range === '90d' ? 90 : 30;
  return mockRequest(buildRevenueTrend(days));
}

export function getCategoryPerformance() {
  return mockRequest(categoryPerformanceSeed);
}

export function getInsightsTopProducts() {
  return mockRequest(topProductsChartSeed);
}

export function getSupplierSpendAnalysis() {
  return mockRequest(supplierSpendSeed);
}

export function getFastMovingProducts() {
  return mockRequest(fastMovingSeed);
}

export function getSlowMovingProducts() {
  return mockRequest(slowMovingSeed);
}

export function getDeadStockProducts() {
  return mockRequest(deadStockSeed);
}

export function getBusinessInsights() {
  return mockRequest(businessInsightsSeed);
}
