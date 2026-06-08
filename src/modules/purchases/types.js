/**
 * Purchases domain models.
 * @module modules/purchases/types
 */

/**
 * @typedef {Object} PurchaseLineItem
 * @property {string} productId
 * @property {string} productName
 * @property {string} batchNumber
 * @property {number} quantity
 * @property {number} costPrice
 * @property {number} mrp
 * @property {string} expiryDate - ISO
 */

/**
 * @typedef {Object} Purchase
 * @property {string} id
 * @property {string} supplierId
 * @property {string} supplierName
 * @property {string} invoiceNumber
 * @property {string} date - ISO
 * @property {'paid'|'partial'|'pending'} status
 * @property {PurchaseLineItem[]} lineItems
 * @property {number} items
 * @property {number} amount
 */

export {};
