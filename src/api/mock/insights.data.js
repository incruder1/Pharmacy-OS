import dayjs from 'dayjs';

/** Realistic Indian pharmacy analytics seed data. */

export const insightsMetricsSeed = {
  todayRevenue: 28_450,
  monthlyRevenue: 8_42_600,
  monthlyProfit: 1_68_520,
  inventoryValue: 24_85_000,
  deadStockValue: 1_12_400,
  expiryRiskValue: 42_500,
  todayRevenueDelta: 0.082,
  monthlyRevenueDelta: 0.124,
};

export const fastMovingSeed = [
  { id: 'fm-1', name: 'Dolo 650 Tablet', category: 'Tablet', unitsSold: 420, revenue: 12_880, daysSinceLastSale: 0 },
  { id: 'fm-2', name: 'Pan-D Capsule', category: 'Capsule', unitsSold: 310, revenue: 11_620, daysSinceLastSale: 0 },
  { id: 'fm-3', name: 'Crocin Advance', category: 'Tablet', unitsSold: 285, revenue: 6_540, daysSinceLastSale: 1 },
  { id: 'fm-4', name: 'Azithral 500', category: 'Tablet', unitsSold: 198, revenue: 8_316, daysSinceLastSale: 0 },
  { id: 'fm-5', name: 'Allegra 120mg', category: 'Tablet', unitsSold: 142, revenue: 5_964, daysSinceLastSale: 1 },
];

export const slowMovingSeed = [
  { id: 'sm-1', name: 'Rantac 150', category: 'Tablet', unitsSold: 4, revenue: 168, daysSinceLastSale: 45 },
  { id: 'sm-2', name: 'Deriphyllin Retard', category: 'Tablet', unitsSold: 6, revenue: 348, daysSinceLastSale: 38 },
  { id: 'sm-3', name: 'Voveran SR 75', category: 'Tablet', unitsSold: 8, revenue: 592, daysSinceLastSale: 52 },
  { id: 'sm-4', name: 'Candid Cream 20g', category: 'Topical', unitsSold: 5, revenue: 310, daysSinceLastSale: 41 },
  { id: 'sm-5', name: 'Metrogyl 400', category: 'Tablet', unitsSold: 9, revenue: 135, daysSinceLastSale: 33 },
];

export const deadStockSeed = [
  { id: 'ds-1', name: 'Glycomet GP2', quantity: 36, value: 3_420, daysIdle: 210 },
  { id: 'ds-2', name: 'Telma 40 Tablet', quantity: 48, value: 5_184, daysIdle: 195 },
  { id: 'ds-3', name: 'Pantop 40 Tablet', quantity: 44, value: 2_816, daysIdle: 188 },
  { id: 'ds-4', name: 'Taxim-O 200', quantity: 42, value: 4_956, daysIdle: 172 },
  { id: 'ds-5', name: 'Omez 20 Capsule', quantity: 75, value: 3_600, daysIdle: 165 },
];

export const businessInsightsSeed = [
  { id: 'bi-1', message: '12 products have not sold in 180 days.', severity: 'warning' },
  { id: 'bi-2', message: '₹42,500 inventory may expire within 60 days.', severity: 'danger' },
  { id: 'bi-3', message: 'Dolo 650 is your fastest mover this week.', severity: 'success' },
  { id: 'bi-4', message: 'Monthly profit margin improved 3.2% vs last month.', severity: 'info' },
  { id: 'bi-5', message: 'Sun Pharma Distributors account for 28% of spend.', severity: 'info' },
];

export const categoryPerformanceSeed = [
  { name: 'Tablets', value: 44, revenue: 3_72_000 },
  { name: 'Capsules', value: 19, revenue: 1_58_400 },
  { name: 'Syrups', value: 13, revenue: 98_600 },
  { name: 'Topical', value: 11, revenue: 82_400 },
  { name: 'Injectables', value: 8, revenue: 64_200 },
  { name: 'Others', value: 5, revenue: 67_000 },
];

export const topProductsChartSeed = [
  { id: 'tp-1', name: 'Dolo 650', unitsSold: 1840, revenue: 56_120 },
  { id: 'tp-2', name: 'Pan-D', unitsSold: 1320, revenue: 49_500 },
  { id: 'tp-3', name: 'Azithral 500', unitsSold: 980, revenue: 41_160 },
  { id: 'tp-4', name: 'Crocin Advance', unitsSold: 1560, revenue: 35_880 },
  { id: 'tp-5', name: 'Allegra 120', unitsSold: 740, revenue: 31_080 },
];

export const supplierSpendSeed = [
  { id: 'ss-1', name: 'Sun Pharma', spend: 4_82_500, orders: 18 },
  { id: 'ss-2', name: 'Cipla Wholesale', spend: 3_26_240, orders: 14 },
  { id: 'ss-3', name: 'MedPlus Dist', spend: 2_67_900, orders: 11 },
  { id: 'ss-4', name: 'Alkem Dist', spend: 1_98_600, orders: 9 },
  { id: 'ss-5', name: 'GSK Supply', spend: 1_54_300, orders: 8 },
  { id: 'ss-6', name: 'Pfizer India', spend: 1_12_800, orders: 6 },
];

/** Build 30-day revenue trend from seed base. */
export function buildRevenueTrend(days = 30) {
  const base = 26_000;
  return Array.from({ length: days }, (_, i) => {
    const wave = 1 + 0.25 * Math.sin((i / days) * Math.PI * 2);
    const weekend = [0, 6].includes(dayjs().subtract(days - 1 - i, 'day').day()) ? 0.82 : 1;
    const value = Math.round((base * wave * weekend * (0.85 + (i % 7) * 0.03)) / 100) * 100;
    return {
      label: dayjs().subtract(days - 1 - i, 'day').format('DD MMM'),
      value,
    };
  });
}
