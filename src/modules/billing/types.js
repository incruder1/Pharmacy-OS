/**
 * Billing / POS domain models.
 * @module modules/billing/types
 */

/**
 * @typedef {Object} CartItem
 * @property {string} productId
 * @property {string} name
 * @property {number} mrp - GST-inclusive unit price (INR)
 * @property {number} gstRate
 * @property {number} quantity
 * @property {number} discountPct - per-line discount %
 */

/**
 * @typedef {Object} CartTotals
 * @property {number} grossSubtotal
 * @property {number} discount
 * @property {number} taxableValue
 * @property {number} gstAmount
 * @property {number} grandTotal
 */

/**
 * @typedef {Object} Payments
 * @property {number} cash
 * @property {number} upi
 * @property {number} card
 */

export {};
