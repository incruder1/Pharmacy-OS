/** Default chart range for owner insights. */
export const INSIGHTS_DEFAULT_RANGE = '30d';

/** @type {{ value: string, label: string }[]} */
export const INSIGHTS_RANGES = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
];

/** Severity styling for narrative insight cards. */
export const INSIGHT_SEVERITY = {
  danger: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  warning: { color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  info: { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  success: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
};
