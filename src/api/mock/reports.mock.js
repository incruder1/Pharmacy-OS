import dayjs from 'dayjs';
import { mockRequest } from './network';
import { sortBy } from './utils';
import { salesSeed } from './sales.data';
import { inventorySeed } from './inventory.data';
import { deriveStatus } from './inventory.mock';
import { daysUntil } from '@/utils';

const within = (iso, from, to) =>
  (!from || !dayjs(iso).isBefore(dayjs(from), 'day')) &&
  (!to || !dayjs(iso).isAfter(dayjs(to), 'day'));

/**
 * Sales report: per-day revenue, invoices, GST, profit + a summary + trend.
 * @param {{ from?: string, to?: string }} [params]
 */
export function getSalesReport({ from, to } = {}) {
  const rows = salesSeed.filter((s) => within(s.date, from, to));
  const byDay = new Map();
  rows.forEach((s) => {
    const key = dayjs(s.date).format('YYYY-MM-DD');
    const day = byDay.get(key) ?? { date: key, invoices: 0, revenue: 0, gst: 0, profit: 0 };
    day.invoices += 1;
    day.revenue += s.total;
    day.gst += s.gstAmount;
    day.profit += s.profit;
    byDay.set(key, day);
  });
  const table = sortBy([...byDay.values()], 'date', 'desc').map((d) => ({
    ...d,
    revenue: Math.round(d.revenue),
    gst: Math.round(d.gst),
    profit: Math.round(d.profit),
    key: d.date,
  }));
  const summary = {
    revenue: Math.round(rows.reduce((a, s) => a + s.total, 0)),
    invoices: rows.length,
    gst: Math.round(rows.reduce((a, s) => a + s.gstAmount, 0)),
    profit: Math.round(rows.reduce((a, s) => a + s.profit, 0)),
  };
  const trend = sortBy(table, 'date').map((d) => ({ label: dayjs(d.date).format('DD MMM'), value: d.revenue }));
  return mockRequest({ table, summary, trend });
}

/** Inventory valuation report grouped by category. */
export function getInventoryReport() {
  const batches = inventorySeed.map((b) => ({ ...b, status: deriveStatus(b) }));
  const byCat = new Map();
  batches.forEach((b) => {
    const c = byCat.get(b.category) ?? { key: b.category, category: b.category, batches: 0, units: 0, stockValue: 0 };
    c.batches += 1;
    c.units += b.quantity;
    c.stockValue += b.quantity * b.costPrice;
    byCat.set(b.category, c);
  });
  const table = sortBy([...byCat.values()], 'stockValue', 'desc').map((c) => ({ ...c, stockValue: Math.round(c.stockValue) }));
  const summary = {
    stockValue: Math.round(batches.reduce((a, b) => a + b.quantity * b.costPrice, 0)),
    units: batches.reduce((a, b) => a + b.quantity, 0),
    skus: new Set(batches.map((b) => b.productId)).size,
  };
  return mockRequest({ table, summary, chart: table.map((c) => ({ name: c.category, value: c.stockValue })) });
}

/** Expiry report: soon-to-expire and expired batches with value at risk. */
export function getExpiryReport() {
  const rows = inventorySeed
    .map((b) => ({ ...b, daysToExpiry: daysUntil(b.expiryDate), status: deriveStatus(b) }))
    .filter((b) => b.status === 'expiring_soon' || b.status === 'expired')
    .map((b) => ({ ...b, key: b.id, valueAtRisk: Math.round(b.quantity * b.costPrice) }));
  const table = sortBy(rows, 'daysToExpiry');
  const summary = {
    expiringSoon: rows.filter((b) => b.status === 'expiring_soon').length,
    expired: rows.filter((b) => b.status === 'expired').length,
    valueAtRisk: rows.reduce((a, b) => a + b.valueAtRisk, 0),
  };
  return mockRequest({ table, summary });
}

/** Profit report: top products by margin contribution. */
export function getProfitReport({ from, to } = {}) {
  const rows = salesSeed.filter((s) => within(s.date, from, to));
  const byProduct = new Map();
  rows.forEach((s) =>
    s.lineItems.forEach((li) => {
      const p = byProduct.get(li.productId) ?? { key: li.productId, product: li.productName, units: 0, revenue: 0, profit: 0 };
      p.units += li.quantity;
      p.revenue += li.lineTotal;
      p.profit += (li.mrp - li.costPrice) * li.quantity;
      byProduct.set(li.productId, p);
    }),
  );
  const table = sortBy([...byProduct.values()], 'profit', 'desc').map((p) => ({
    ...p,
    revenue: Math.round(p.revenue),
    profit: Math.round(p.profit),
    margin: p.revenue ? Math.round((p.profit / p.revenue) * 1000) / 10 : 0,
  }));
  const summary = {
    revenue: Math.round(rows.reduce((a, s) => a + s.total, 0)),
    profit: table.reduce((a, p) => a + p.profit, 0),
    products: table.length,
  };
  return mockRequest({ table, summary, chart: table.slice(0, 6).map((p) => ({ name: p.product, value: p.profit })) });
}
