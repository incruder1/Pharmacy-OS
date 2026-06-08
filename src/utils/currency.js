import { CURRENCY } from '@/constants/app';

const inrFormatter = new Intl.NumberFormat(CURRENCY.locale, {
  style: 'currency',
  currency: CURRENCY.code,
  maximumFractionDigits: 0,
});

const inrFormatterPaise = new Intl.NumberFormat(CURRENCY.locale, {
  style: 'currency',
  currency: CURRENCY.code,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Format a number as Indian Rupees, e.g. 125000 → "₹1,25,000".
 * @param {number} amount
 * @param {{ paise?: boolean }} [options]
 * @returns {string}
 */
export function formatCurrency(amount, options = {}) {
  const value = Number.isFinite(amount) ? amount : 0;
  return options.paise ? inrFormatterPaise.format(value) : inrFormatter.format(value);
}

/**
 * Compact Indian currency, e.g. 1250000 → "₹12.5L", 25000000 → "₹2.5Cr".
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrencyCompact(amount) {
  const value = Number.isFinite(amount) ? amount : 0;
  const abs = Math.abs(value);
  if (abs >= 1e7) return `${CURRENCY.symbol}${(value / 1e7).toFixed(2)}Cr`;
  if (abs >= 1e5) return `${CURRENCY.symbol}${(value / 1e5).toFixed(2)}L`;
  if (abs >= 1e3) return `${CURRENCY.symbol}${(value / 1e3).toFixed(1)}K`;
  return `${CURRENCY.symbol}${value}`;
}
