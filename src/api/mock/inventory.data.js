import dayjs from 'dayjs';
import { seededRandom } from './network';
import { productsSeed } from './products.data';

/**
 * Deterministically generate 1–2 stock batches per product so inventory,
 * low-stock, and expiry views stay stable across reloads.
 */
function buildBatches() {
  const rand = seededRandom(7654);
  const batches = [];
  productsSeed.forEach((product, i) => {
    const count = 1 + Math.round(rand());
    for (let b = 0; b < count; b += 1) {
      const quantity = Math.round(rand() * 220);
      const reorderLevel = 30 + Math.round(rand() * 40);
      // Spread expiry from already-expired to ~24 months out.
      const expiryDays = Math.round(rand() * 760) - 40;
      const costPrice = product.costPrice;
      batches.push({
        id: `BTH-${product.id.slice(4)}-${b + 1}`,
        productId: product.id,
        productName: product.name,
        category: product.category,
        batchNumber: `${product.name.slice(0, 2).toUpperCase()}${1000 + i * 7 + b}`,
        expiryDate: dayjs().add(expiryDays, 'day').toISOString(),
        quantity,
        reorderLevel,
        mrp: product.mrp,
        costPrice,
      });
    }
  });
  return batches;
}

export const inventorySeed = buildBatches();
