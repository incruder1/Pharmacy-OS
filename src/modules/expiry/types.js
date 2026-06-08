/**
 * @typedef {'expired' | '30d' | '60d' | '90d'} ExpiryWindow
 * @typedef {'batch' | 'supplier'} ExpiryViewMode
 * @typedef {'expired' | 'critical' | 'warning' | 'watch'} ExpiryStatus
 * @typedef {'Expired' | 'Critical' | 'High' | 'Medium' | 'Low'} RiskLevel
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
 * @property {RiskLevel} riskLevel
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
 * @typedef {Object} ExpiryLossAnalytics
 * @property {number} totalExpiredLoss
 * @property {number} projectedLoss
 * @property {{ label: string, value: number, color: string }[]} breakdown
 */

/**
 * @typedef {Object} ExpiryBatchDetail
 * @property {string} id
 * @property {string} productName
 * @property {string} genericName
 * @property {string} category
 * @property {string} batchNumber
 * @property {string} supplierId
 * @property {string} supplierName
 * @property {string} supplierContact
 * @property {string} supplierPhone
 * @property {string} supplierEmail
 * @property {number} quantity
 * @property {number} mrp
 * @property {number} costPrice
 * @property {string} expiryDate
 * @property {number} daysToExpiry
 * @property {number} inventoryValue
 * @property {RiskLevel} riskLevel
 * @property {string[]} suggestedActions
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
