import { productsApi } from '@/modules/products/api/productsApi';
import { salesApi } from '@/modules/sales/api/salesApi';

/**
 * Billing data-access: medicine lookup (from the product catalog) and invoice
 * persistence (into the sales store, so it shows up in Sales History).
 */
export const billingApi = {
  /** @param {string} term */
  async searchMedicines(term) {
    const res = await productsApi.list({ search: term, page: 1, pageSize: 8 });
    return res.data;
  },
  /** @param {object} invoice */
  createInvoice: (invoice) => salesApi.create(invoice),
};

export default billingApi;
