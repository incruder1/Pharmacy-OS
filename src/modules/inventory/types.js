/**
 * Inventory domain models.
 * @module modules/inventory/types
 */

/** @typedef {'in_stock'|'low_stock'|'out_of_stock'|'expiring_soon'|'expired'} StockStatus */

/**
 * @typedef {Object} InventoryBatch
 * @property {string} id
 * @property {string} productId
 * @property {string} productName
 * @property {string} category
 * @property {string} batchNumber
 * @property {string} expiryDate - ISO
 * @property {number} daysToExpiry
 * @property {number} quantity
 * @property {number} reorderLevel
 * @property {number} mrp
 * @property {number} costPrice
 * @property {StockStatus} status
 */

export {};
