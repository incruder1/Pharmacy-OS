/**
 * @typedef {'critical' | 'warning' | 'healthy'} StockHealth
 * @typedef {Object} ReorderSuggestion
 * @property {string} id
 * @property {string} productId
 * @property {string} productName
 * @property {string} category
 * @property {number} currentStock
 * @property {number} avgDailySales
 * @property {number} daysRemaining
 * @property {number} suggestedQty
 * @property {string} supplierName
 * @property {string} supplierId
 * @property {StockHealth} health
 */

/**
 * @typedef {Object} ReorderMetrics
 * @property {number} criticalProducts
 * @property {number} outOfStock
 * @property {number} reorderRequired
 * @property {number} stockHealthScore
 */

export {};
