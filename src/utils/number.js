import { CURRENCY } from '@/constants/app';

const numberFormatter = new Intl.NumberFormat(CURRENCY.locale);

/**
 * Group a number with Indian digit grouping, e.g. 1234567 → "12,34,567".
 * @param {number} value
 * @returns {string}
 */
export function formatNumber(value) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

/**
 * Format a ratio/percentage with a sign, e.g. 0.123 → "+12.3%".
 * @param {number} value - a fraction (0.12) or already-percent if `asFraction` is false
 * @param {{ asFraction?: boolean, withSign?: boolean }} [options]
 * @returns {string}
 */
export function formatPercent(value, options = {}) {
  const { asFraction = true, withSign = true } = options;
  const pct = asFraction ? value * 100 : value;
  const sign = withSign && pct > 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}

/**
 * Clamp a number between a min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
