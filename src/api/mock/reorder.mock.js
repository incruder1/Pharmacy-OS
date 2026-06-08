import { mockRequest } from './network';
import { matchesSearch, paginate } from './utils';
import { reorderSeed } from './reorder.data';

function filterRows(params = {}) {
  const { search = '', health, category } = params;
  return reorderSeed.filter((r) => {
    if (health && r.health !== health) return false;
    if (category && r.category !== category) return false;
    return matchesSearch(r, search, ['productName', 'supplierName', 'category']);
  });
}

export function getReorderMetrics() {
  const critical = reorderSeed.filter((r) => r.health === 'critical').length;
  const outOfStock = reorderSeed.filter((r) => r.currentStock === 0).length;
  const reorderRequired = reorderSeed.filter((r) => r.health !== 'healthy').length;
  const healthy = reorderSeed.filter((r) => r.health === 'healthy').length;
  const score = Math.round((healthy / reorderSeed.length) * 100);

  return mockRequest({
    criticalProducts: critical,
    outOfStock,
    reorderRequired,
    stockHealthScore: score,
  });
}

export function listReorderSuggestions(params = {}) {
  const filtered = filterRows(params);
  const sorted = [...filtered].sort((a, b) => a.daysRemaining - b.daysRemaining);
  return mockRequest(paginate(sorted, params));
}

export function getTopRecommendations() {
  const urgent = [...reorderSeed]
    .filter((r) => r.health !== 'healthy')
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
    .slice(0, 3);
  return mockRequest(urgent);
}
