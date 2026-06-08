import { productsSeed } from './products.data';
import { suppliersSeed } from './suppliers.data';

const supplierNames = suppliersSeed.map((s) => s.name);

/** Deterministic reorder suggestions from product catalog. */
export const reorderSeed = productsSeed.slice(0, 18).map((p, i) => {
  const currentStock = [0, 4, 8, 12, 18, 24, 35, 42][i % 8];
  const avgDailySales = 2 + (i % 9);
  const daysRemaining = currentStock === 0 ? 0 : Math.floor(currentStock / avgDailySales);
  const reorderLevel = 30 + (i % 3) * 10;
  const suggestedQty = Math.max(reorderLevel * 2 - currentStock, reorderLevel);
  let health = 'healthy';
  if (currentStock === 0) health = 'critical';
  else if (daysRemaining <= 7) health = 'critical';
  else if (daysRemaining <= 14) health = 'warning';

  return {
    id: `RO-${p.id}`,
    productId: p.id,
    productName: p.name,
    category: p.category,
    currentStock,
    avgDailySales,
    daysRemaining,
    reorderLevel,
    suggestedQty,
    supplierName: supplierNames[i % supplierNames.length],
    supplierId: suppliersSeed[i % suppliersSeed.length].id,
    health,
  };
});
