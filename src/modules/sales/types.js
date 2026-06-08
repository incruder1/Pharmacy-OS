/**
 * Sales domain models.
 * @module modules/sales/types
 */

/**
 * @typedef {Object} SaleLineItem
 * @property {string} productId
 * @property {string} productName
 * @property {number} quantity
 * @property {number} mrp
 * @property {number} gstRate
 * @property {number} gstAmount
 * @property {number} lineTotal
 */

/**
 * @typedef {Object} Sale
 * @property {string} id
 * @property {string} customerName
 * @property {string} customerPhone
 * @property {string} date - ISO
 * @property {number} items
 * @property {SaleLineItem[]} lineItems
 * @property {number} subtotal
 * @property {number} discount
 * @property {number} gstAmount
 * @property {number} total
 * @property {number} profit
 * @property {'UPI'|'Cash'|'Card'} paymentMode
 */

export {};
