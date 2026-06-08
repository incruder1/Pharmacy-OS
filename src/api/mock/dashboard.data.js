import dayjs from 'dayjs';

/**
 * Static, realistic seed data for the Indian-pharmacy dashboard.
 * Time-series and summary numbers are derived from these in dashboard.mock.js.
 */

export const topProductsSeed = [
  { id: 'p-01', name: 'Dolo 650 Tablet', category: 'Tablet', unitsSold: 1840, revenue: 56_120 },
  { id: 'p-02', name: 'Pan-D Capsule', category: 'Capsule', unitsSold: 1320, revenue: 49_500 },
  { id: 'p-03', name: 'Azithral 500 Tablet', category: 'Tablet', unitsSold: 980, revenue: 41_160 },
  { id: 'p-04', name: 'Crocin Advance', category: 'Tablet', unitsSold: 1560, revenue: 35_880 },
  { id: 'p-05', name: 'Allegra 120mg', category: 'Tablet', unitsSold: 740, revenue: 31_080 },
  { id: 'p-06', name: 'Liv 52 DS Syrup', category: 'Syrup', unitsSold: 410, revenue: 24_600 },
  { id: 'p-07', name: 'Volini Gel 30g', category: 'Topical', unitsSold: 520, revenue: 22_360 },
];

export const recentSalesSeed = [
  { id: 'INV-24819', customer: 'Rohan Mehta', items: 4, amount: 845, mode: 'UPI', minsAgo: 6 },
  { id: 'INV-24818', customer: 'Walk-in', items: 2, amount: 230, mode: 'Cash', minsAgo: 21 },
  { id: 'INV-24817', customer: 'Priya Sharma', items: 7, amount: 1620, mode: 'Card', minsAgo: 48 },
  { id: 'INV-24816', customer: 'Aarav Gupta', items: 1, amount: 95, mode: 'UPI', minsAgo: 73 },
  { id: 'INV-24815', customer: 'Sneha Iyer', items: 5, amount: 1180, mode: 'UPI', minsAgo: 112 },
  { id: 'INV-24814', customer: 'Walk-in', items: 3, amount: 540, mode: 'Cash', minsAgo: 156 },
];

export const recentPurchasesSeed = [
  { id: 'PO-3391', supplier: 'Sun Pharma Distributors', items: 38, amount: 142_500, daysAgo: 0 },
  { id: 'PO-3390', supplier: 'Cipla Wholesale', items: 24, amount: 86_240, daysAgo: 1 },
  { id: 'PO-3389', supplier: 'MedPlus Distributors', items: 51, amount: 167_900, daysAgo: 2 },
  { id: 'PO-3388', supplier: 'Apollo Pharmacy Supply', items: 17, amount: 54_300, daysAgo: 3 },
  { id: 'PO-3387', supplier: 'Mankind Pharma Agency', items: 29, amount: 98_750, daysAgo: 4 },
];

export const expiringMedicinesSeed = [
  { id: 'b-901', name: 'Augmentin 625 Duo', batch: 'AG2231', daysToExpiry: 12, quantity: 40 },
  { id: 'b-902', name: 'Montair LC Tablet', batch: 'ML0098', daysToExpiry: 21, quantity: 65 },
  { id: 'b-903', name: 'Zifi 200 Tablet', batch: 'ZF4410', daysToExpiry: 28, quantity: 30 },
  { id: 'b-904', name: 'Becosules Capsule', batch: 'BC7782', daysToExpiry: 34, quantity: 120 },
  { id: 'b-905', name: 'Shelcal 500', batch: 'SC1190', daysToExpiry: 45, quantity: 88 },
];

export const lowStockSeed = [
  { id: 'p-21', name: 'Telma 40 Tablet', quantity: 8, reorderLevel: 50, status: 'low_stock' },
  { id: 'p-22', name: 'Glycomet GP2', quantity: 0, reorderLevel: 40, status: 'out_of_stock' },
  { id: 'p-23', name: 'Thyronorm 50mcg', quantity: 12, reorderLevel: 60, status: 'low_stock' },
  { id: 'p-24', name: 'Ecosprin 75', quantity: 5, reorderLevel: 30, status: 'low_stock' },
  { id: 'p-25', name: 'Pantop 40 Tablet', quantity: 0, reorderLevel: 45, status: 'out_of_stock' },
];

export const categoryBreakdownSeed = [
  { name: 'Tablets', value: 42 },
  { name: 'Capsules', value: 18 },
  { name: 'Syrups', value: 14 },
  { name: 'Injectables', value: 10 },
  { name: 'Topical', value: 9 },
  { name: 'Others', value: 7 },
];

/** Resolve relative timestamps to absolute ISO strings at read time. */
export function withTimestamps() {
  const now = dayjs();
  return {
    recentSales: recentSalesSeed.map((s) => ({
      ...s,
      createdAt: now.subtract(s.minsAgo, 'minute').toISOString(),
    })),
    recentPurchases: recentPurchasesSeed.map((p) => ({
      ...p,
      createdAt: now.subtract(p.daysAgo, 'day').toISOString(),
    })),
    expiringMedicines: expiringMedicinesSeed.map((e) => ({
      ...e,
      expiryDate: now.add(e.daysToExpiry, 'day').toISOString(),
    })),
  };
}
