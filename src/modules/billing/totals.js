/**
 * Pure GST + totals math for the POS cart. MRP is treated as GST-inclusive
 * (Indian retail convention), so GST is back-calculated out of the net price.
 */

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Per-line breakdown for a cart item.
 * @param {import('./types').CartItem} item
 */
export function lineBreakdown(item) {
  const gross = item.mrp * item.quantity;
  const discount = round2((gross * (item.discountPct || 0)) / 100);
  const net = gross - discount;
  const taxable = round2(net / (1 + item.gstRate / 100));
  const gstAmount = round2(net - taxable);
  return { gross, discount, net: round2(net), taxable, gstAmount };
}

/**
 * Aggregate cart totals.
 * @param {import('./types').CartItem[]} items
 * @returns {import('./types').CartTotals}
 */
export function cartTotals(items) {
  return items.reduce(
    (acc, item) => {
      const b = lineBreakdown(item);
      return {
        grossSubtotal: round2(acc.grossSubtotal + b.gross),
        discount: round2(acc.discount + b.discount),
        taxableValue: round2(acc.taxableValue + b.taxable),
        gstAmount: round2(acc.gstAmount + b.gstAmount),
        grandTotal: round2(acc.grandTotal + b.net),
      };
    },
    { grossSubtotal: 0, discount: 0, taxableValue: 0, gstAmount: 0, grandTotal: 0 },
  );
}

/** Sum of split-payment channels. */
export function paymentsTotal(payments) {
  return round2((payments.cash || 0) + (payments.upi || 0) + (payments.card || 0));
}
