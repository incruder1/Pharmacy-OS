/**
 * Dashboard domain models (JSDoc typedefs for editor intellisense in JS).
 * @module modules/dashboard/types
 */

/** @typedef {'today' | '7d' | '30d'} DashboardRange */

/**
 * @typedef {Object} DashboardDeltas
 * @property {number} revenue       - fractional change vs previous period
 * @property {number} salesCount
 * @property {number} avgBillValue
 */

/**
 * @typedef {Object} DashboardSummary
 * @property {DashboardRange} range
 * @property {number} revenue
 * @property {number} salesCount
 * @property {number} itemsSold
 * @property {number} avgBillValue
 * @property {number} lowStockCount
 * @property {number} expiringCount
 * @property {DashboardDeltas} deltas
 */

/**
 * @typedef {Object} TrendPoint
 * @property {string} label
 * @property {number} value
 */

/**
 * @typedef {Object} CategorySlice
 * @property {string} name
 * @property {number} value - percentage share
 */

/**
 * @typedef {Object} TopProduct
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} unitsSold
 * @property {number} revenue
 */

/**
 * @typedef {Object} RecentSale
 * @property {string} id
 * @property {string} customer
 * @property {number} items
 * @property {number} amount
 * @property {'UPI'|'Cash'|'Card'} mode
 * @property {string} createdAt - ISO timestamp
 */

/**
 * @typedef {Object} RecentPurchase
 * @property {string} id
 * @property {string} supplier
 * @property {number} items
 * @property {number} amount
 * @property {string} createdAt - ISO timestamp
 */

/**
 * @typedef {Object} ExpiringMedicine
 * @property {string} id
 * @property {string} name
 * @property {string} batch
 * @property {number} daysToExpiry
 * @property {number} quantity
 * @property {string} expiryDate - ISO timestamp
 */

/**
 * @typedef {Object} LowStockItem
 * @property {string} id
 * @property {string} name
 * @property {number} quantity
 * @property {number} reorderLevel
 * @property {'low_stock'|'out_of_stock'} status
 */

export {};
