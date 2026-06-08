/**
 * Products domain models (JSDoc typedefs).
 * @module modules/products/types
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} genericName
 * @property {string} manufacturer
 * @property {string} category
 * @property {number} gstRate - GST slab %
 * @property {string} hsn - HSN code
 * @property {string} barcode
 * @property {number} mrp
 * @property {number} costPrice
 */

/**
 * @typedef {Object} ProductListParams
 * @property {string} [search]
 * @property {string} [category]
 * @property {string} [manufacturer]
 * @property {number} [page]
 * @property {number} [pageSize]
 */

export {};
