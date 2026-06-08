/**
 * @typedef {'expired' | '30d' | '60d' | '90d'} ExpiryWindow
 * @typedef {'batch' | 'supplier'} ExpiryViewMode
 * @typedef {'expired' | 'critical' | 'warning' | 'watch'} ExpiryStatus
 */

/**
 * @typedef {Object} ExpiryBatch
 * @property {string} id
 * @property {string} productName
 * @property {string} genericName
 * @property {string} category
 * @property {string} batchNumber
 * @property {string} supplierId
 * @property {string} supplierName
 * @property {number} quantity
 * @property {number} mrp
 * @property {number} costPrice
 * @property {string} expiryDate
 * @property {number} daysToExpiry
 * @property {number} inventoryValue
 * @property {ExpiryStatus} status
 * @property {ExpiryWindow | 'beyond'} window
 */

/**
 * @typedef {Object} ExpiryMetrics
 * @property {number} expiryRiskValue
 * @property {number} expiredInventoryValue
 * @property {number} medicinesNearExpiry
 * @property {number} estimatedRecoverableValue
 * @property {number} expiredCount
 * @property {number} atRiskCount
 */

/**
 * @typedef {Object} ExpirySupplierRow
 * @property {string} supplierId
 * @property {string} supplierName
 * @property {number} batchCount
 * @property {number} productCount
 * @property {number} expiredValue
 * @property {number} riskValue
 * @property {number} totalValue
 */

export {};
