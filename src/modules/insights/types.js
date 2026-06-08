/**
 * Owner Insights domain models (JSDoc typedefs).
 * @module modules/insights/types
 */

/**
 * @typedef {Object} InsightsMetrics
 * @property {number} todayRevenue
 * @property {number} monthlyRevenue
 * @property {number} monthlyProfit
 * @property {number} inventoryValue
 * @property {number} deadStockValue
 * @property {number} expiryRiskValue
 * @property {number} todayRevenueDelta
 * @property {number} monthlyRevenueDelta
 */

/**
 * @typedef {Object} TrendPoint
 * @property {string} label
 * @property {number} value
 */

/**
 * @typedef {Object} CategorySlice
 * @property {string} name
 * @property {number} value
 * @property {number} revenue
 */

/**
 * @typedef {Object} TopProductBar
 * @property {string} id
 * @property {string} name
 * @property {number} unitsSold
 * @property {number} revenue
 */

/**
 * @typedef {Object} SupplierSpend
 * @property {string} id
 * @property {string} name
 * @property {number} spend
 * @property {number} orders
 */

/**
 * @typedef {Object} MovingProduct
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} unitsSold
 * @property {number} revenue
 * @property {number} daysSinceLastSale
 */

/**
 * @typedef {Object} DeadStockItem
 * @property {string} id
 * @property {string} name
 * @property {number} quantity
 * @property {number} value
 * @property {number} daysIdle
 */

/**
 * @typedef {'warning' | 'info' | 'success' | 'danger'} InsightSeverity
 */

/**
 * @typedef {Object} BusinessInsight
 * @property {string} id
 * @property {string} message
 * @property {InsightSeverity} severity
 * @property {string} [actionLabel]
 */

export {};
