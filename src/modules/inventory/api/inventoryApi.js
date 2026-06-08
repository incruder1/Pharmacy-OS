import * as mock from '@/api/mock/inventory.mock';

/** Data-access layer for inventory batches. */
export const inventoryApi = {
  list: (params) => mock.listInventory(params),
  getLowStock: () => mock.getLowStock(),
  getExpiringBatches: (days) => mock.getExpiringBatches(days),
  getStats: () => mock.getInventoryStats(),
};

export default inventoryApi;
