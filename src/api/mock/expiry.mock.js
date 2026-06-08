import { mockRequest } from './network';
import { matchesSearch, paginate } from './utils';
import { buildExpiryRows, getExpiryWindow } from './expiry.data';
import { suppliersSeed } from './suppliers.data';

const RECOVERABLE_RATE = 0.65;
let cache = null;

function rows() {
  if (!cache) cache = buildExpiryRows();
  return cache;
}

function valueAtRisk(batch) {
  return batch.quantity * batch.costPrice;
}

function filterRows(params = {}) {
  const {
    window = '30d',
    search = '',
    supplierId,
    category,
    viewAll = false,
  } = params;

  return rows().filter((r) => {
    if (!viewAll && window !== 'all') {
      if (window === 'expired' && r.window !== 'expired') return false;
      if (window === '30d' && r.window !== '30d') return false;
      if (window === '60d' && r.window !== '60d') return false;
      if (window === '90d' && r.window !== '90d') return false;
    }
    if (supplierId && r.supplierId !== supplierId) return false;
    if (category && r.category !== category) return false;
    return matchesSearch(r, search, ['productName', 'genericName', 'batchNumber', 'supplierName']);
  });
}

/** Headline KPI metrics for the expiry center. */
export function getExpiryMetrics() {
  const all = rows();
  const expired = all.filter((r) => r.window === 'expired');
  const atRisk = all.filter((r) => r.window !== 'expired' && r.window !== 'beyond');
  const near30 = all.filter((r) => r.window === '30d');

  const expiredValue = expired.reduce((s, r) => s + valueAtRisk(r), 0);
  const riskValue = atRisk.reduce((s, r) => s + valueAtRisk(r), 0);
  const nearCount = new Set(near30.map((r) => r.productName)).size;

  const metrics = {
    expiryRiskValue: riskValue,
    expiredInventoryValue: expiredValue,
    medicinesNearExpiry: nearCount,
    estimatedRecoverableValue: Math.round(riskValue * RECOVERABLE_RATE),
    expiredCount: expired.length,
    atRiskCount: atRisk.length,
  };
  return mockRequest(metrics);
}

/** Paginated batch list for the active expiry window. */
export function listExpiryBatches(params = {}) {
  const filtered = filterRows(params);
  const sorted = [...filtered].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  return mockRequest(paginate(sorted, params));
}

/** Supplier-aggregated expiry view. */
export function listExpiryBySupplier(params = {}) {
  const filtered = filterRows({ ...params, viewAll: false });
  const map = new Map();

  filtered.forEach((batch) => {
    const key = batch.supplierId;
    if (!map.has(key)) {
      map.set(key, {
        supplierId: batch.supplierId,
        supplierName: batch.supplierName,
        batchCount: 0,
        productCount: new Set(),
        expiredValue: 0,
        riskValue: 0,
        totalValue: 0,
        batches: [],
      });
    }
    const agg = map.get(key);
    agg.batchCount += 1;
    agg.productCount.add(batch.productName);
    const val = valueAtRisk(batch);
    agg.totalValue += val;
    if (batch.window === 'expired') agg.expiredValue += val;
    else agg.riskValue += val;
    agg.batches.push(batch);
  });

  const data = [...map.values()]
    .map((s) => ({ ...s, productCount: s.productCount.size, batches: undefined }))
    .sort((a, b) => b.riskValue + b.expiredValue - (a.riskValue + a.expiredValue));

  return mockRequest(paginate(data, params));
}

/** Filter option lists derived from seed data. */
export function getExpiryFilterOptions() {
  const all = rows();
  const suppliers = [...new Map(all.map((r) => [r.supplierId, r.supplierName])).entries()].map(
    ([id, name]) => ({ id, name }),
  );
  const categories = [...new Set(all.map((r) => r.category))].sort();
  return mockRequest({ suppliers, categories });
}

/** CSV export payload for the active filters. */
export function exportExpiryReport(params = {}) {
  const filtered = filterRows({ ...params, viewAll: params.window === 'all' });
  const header = 'Product,Generic,Batch,Supplier,Expiry,Days Left,Qty,MRP,Cost,Value,Status\n';
  const lines = filtered.map((r) =>
    [
      r.productName,
      r.genericName,
      r.batchNumber,
      r.supplierName,
      r.expiryDate.slice(0, 10),
      r.daysToExpiry,
      r.quantity,
      r.mrp,
      r.costPrice,
      r.inventoryValue,
      r.status,
    ].join(','),
  );
  const csv = header + lines.join('\n');
  return mockRequest({ filename: `expiry-report-${params.window ?? 'all'}.csv`, csv, rowCount: filtered.length });
}

/** Inventory loss analytics for the expiry center. */
export function getExpiryLossAnalytics() {
  const all = rows();
  const expired = all.filter((r) => r.window === 'expired');
  const atRisk = all.filter((r) => r.window !== 'expired' && r.window !== 'beyond');

  const totalExpiredLoss = expired.reduce((s, r) => s + valueAtRisk(r), 0);
  const projectedLoss = atRisk.reduce((s, r) => s + valueAtRisk(r) * 0.85, 0);

  const buckets = [
    { label: 'Expired', filter: (r) => r.window === 'expired', color: '#dc2626' },
    { label: '≤30 days', filter: (r) => r.window === '30d', color: '#ea580c' },
    { label: '31–60 days', filter: (r) => r.window === '60d', color: '#d97706' },
    { label: '61–90 days', filter: (r) => r.window === '90d', color: '#ca8a04' },
  ];

  const breakdown = buckets.map((b) => ({
    label: b.label,
    value: all.filter(b.filter).reduce((s, r) => s + valueAtRisk(r), 0),
    color: b.color,
  }));

  return mockRequest({ totalExpiredLoss, projectedLoss: Math.round(projectedLoss), breakdown });
}

/** Full batch detail for the drawer, including supplier contact. */
export function getExpiryBatchDetail(id) {
  const batch = rows().find((r) => r.id === id);
  if (!batch) return mockRequest(null);

  const supplier = suppliersSeed.find((s) => s.id === batch.supplierId);
  const actions = [];

  if (batch.daysToExpiry < 0) {
    actions.push('Write off expired stock', 'Return to supplier (if eligible)', 'Document for audit');
  } else if (batch.daysToExpiry <= 30) {
    actions.push('Discount sale', 'Return to supplier', 'Transfer to sister store');
  } else {
    actions.push('Monitor weekly', 'Plan promotional bundle', 'Negotiate supplier return');
  }

  const detail = {
    ...batch,
    supplierContact: supplier?.contactPerson ?? '—',
    supplierPhone: supplier?.phone ?? '—',
    supplierEmail: supplier?.email ?? '—',
    suggestedActions: actions,
  };
  return mockRequest(detail);
}

export { getExpiryWindow };
