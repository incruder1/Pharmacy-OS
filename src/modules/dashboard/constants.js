/**
 * Dashboard-local constants: range options and labels.
 */

/** @type {{ value: import('./types').DashboardRange, label: string }[]} */
export const DASHBOARD_RANGES = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
];

export const DEFAULT_RANGE = 'today';

/** Human label for a range value (used in deltas / captions). */
export const RANGE_COMPARISON_LABEL = {
  today: 'vs yesterday',
  '7d': 'vs last week',
  '30d': 'vs last month',
};
