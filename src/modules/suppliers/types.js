/**
 * Suppliers domain models.
 * @module modules/suppliers/types
 */

/**
 * @typedef {Object} Supplier
 * @property {string} id
 * @property {string} name
 * @property {string} contactPerson
 * @property {string} phone
 * @property {string} email
 * @property {string} gstin
 * @property {string} address
 * @property {number} outstanding - payable to supplier (INR)
 */

/**
 * @typedef {Object} SupplierPurchase
 * @property {string} id
 * @property {string} date - ISO
 * @property {number} items
 * @property {number} amount
 * @property {'paid'|'partial'|'pending'} status
 */

export {};
