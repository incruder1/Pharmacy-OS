import dayjs from 'dayjs';
import { mockRequest, seededRandom } from './network';
import {
  categoryBreakdownSeed,
  expiringMedicinesSeed,
  lowStockSeed,
  topProductsSeed,
  withTimestamps,
} from './dashboard.data';

/** Per-range generation config: how many points and how to label them. */
const RANGE_CONFIG = {
  today: { points: 13, seed: 101, base: 2800, step: 'hour' },
  '7d': { points: 7, seed: 202, base: 38_000, step: 'day' },
  '30d': { points: 30, seed: 303, base: 41_000, step: 'day' },
};

function labelFor(range, index, total) {
  if (range === 'today') return dayjs().hour(9).add(index, 'hour').format('h A');
  return dayjs()
    .subtract(total - 1 - index, 'day')
    .format('DD MMM');
}

/**
 * Build a stable revenue/sales series for a range.
 * @param {'today'|'7d'|'30d'} range
 * @returns {{ label: string, revenue: number, sales: number }[]}
 */
function buildSeries(range) {
  const cfg = RANGE_CONFIG[range] ?? RANGE_CONFIG['7d'];
  const rand = seededRandom(cfg.seed);
  return Array.from({ length: cfg.points }, (_, i) => {
    const wave = 1 + 0.35 * Math.sin((i / cfg.points) * Math.PI * 2);
    const noise = 0.75 + rand() * 0.5;
    const revenue = Math.round((cfg.base * wave * noise) / 10) * 10;
    const sales = Math.max(1, Math.round(revenue / (260 + rand() * 120)));
    return { label: labelFor(range, i, cfg.points), revenue, sales };
  });
}

function sum(series, key) {
  return series.reduce((acc, point) => acc + point[key], 0);
}

/**
 * Headline KPIs for the selected range, with period-over-period deltas.
 * @param {'today'|'7d'|'30d'} range
 */
export function getSummary(range) {
  const series = buildSeries(range);
  const rand = seededRandom((RANGE_CONFIG[range]?.seed ?? 0) + 7);
  const revenue = sum(series, 'revenue');
  const salesCount = sum(series, 'sales');

  const summary = {
    range,
    revenue,
    salesCount,
    itemsSold: Math.round(salesCount * (2.4 + rand())),
    avgBillValue: Math.round(revenue / Math.max(1, salesCount)),
    lowStockCount: lowStockSeed.length,
    expiringCount: expiringMedicinesSeed.length,
    deltas: {
      revenue: Number((rand() * 0.3 - 0.06).toFixed(3)),
      salesCount: Number((rand() * 0.25 - 0.05).toFixed(3)),
      avgBillValue: Number((rand() * 0.18 - 0.07).toFixed(3)),
    },
  };
  return mockRequest(summary);
}

/** @param {'today'|'7d'|'30d'} range */
export function getRevenueTrend(range) {
  const series = buildSeries(range).map(({ label, revenue }) => ({ label, value: revenue }));
  return mockRequest(series);
}

/** @param {'today'|'7d'|'30d'} range */
export function getSalesTrend(range) {
  const series = buildSeries(range).map(({ label, sales }) => ({ label, value: sales }));
  return mockRequest(series);
}

export function getCategoryBreakdown() {
  return mockRequest(categoryBreakdownSeed);
}

export function getTopProducts() {
  return mockRequest(topProductsSeed);
}

export function getRecentSales() {
  return mockRequest(withTimestamps().recentSales);
}

export function getRecentPurchases() {
  return mockRequest(withTimestamps().recentPurchases);
}

export function getExpiringMedicines() {
  return mockRequest(withTimestamps().expiringMedicines);
}

export function getLowStock() {
  return mockRequest(lowStockSeed);
}
