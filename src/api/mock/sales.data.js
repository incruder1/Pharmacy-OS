import dayjs from 'dayjs';
import { seededRandom } from './network';
import { productsSeed } from './products.data';

const CUSTOMERS = [
  'Rohan Mehta', 'Priya Sharma', 'Aarav Gupta', 'Sneha Iyer', 'Vikram Singh',
  'Ananya Reddy', 'Walk-in', 'Karan Malhotra', 'Divya Nair', 'Arjun Patel',
  'Walk-in', 'Meera Joshi', 'Siddharth Rao', 'Kavya Menon', 'Walk-in',
];
const MODES = ['UPI', 'Cash', 'Card'];

/**
 * Generate a stable history of POS invoices for the sales module + reports.
 */
function buildSales() {
  const rand = seededRandom(424242);
  return Array.from({ length: 48 }, (_, i) => {
    const lineCount = 1 + Math.round(rand() * 4);
    const lineItems = Array.from({ length: lineCount }, () => {
      const product = productsSeed[Math.floor(rand() * productsSeed.length)];
      const qty = 1 + Math.round(rand() * 4);
      const gross = product.mrp * qty;
      const gst = Math.round((gross - gross / (1 + product.gstRate / 100)) * 100) / 100;
      return {
        productId: product.id,
        productName: product.name,
        quantity: qty,
        mrp: product.mrp,
        gstRate: product.gstRate,
        gstAmount: gst,
        costPrice: product.costPrice,
        lineTotal: gross,
      };
    });
    const subtotal = lineItems.reduce((a, li) => a + li.lineTotal, 0);
    const gstAmount = Math.round(lineItems.reduce((a, li) => a + li.gstAmount, 0) * 100) / 100;
    const cogs = lineItems.reduce((a, li) => a + li.costPrice * li.quantity, 0);
    const discount = Math.round(subtotal * (rand() * 0.06) * 0.5) * 2;
    const total = subtotal - discount;
    return {
      id: `INV-${24800 - i}`,
      customerName: CUSTOMERS[Math.floor(rand() * CUSTOMERS.length)],
      customerPhone: `+91 9${Math.floor(700000000 + rand() * 99999999)}`,
      date: dayjs().subtract(Math.floor(i / 2), 'day').subtract(Math.round(rand() * 8), 'hour').toISOString(),
      items: lineCount,
      lineItems,
      subtotal,
      discount,
      gstAmount,
      total,
      profit: Math.round(total - cogs),
      paymentMode: MODES[Math.floor(rand() * MODES.length)],
    };
  });
}

export const salesSeed = buildSales();
