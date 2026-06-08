import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '@/constants/app';

dayjs.extend(relativeTime);

/**
 * Format a date value with the app's default date format.
 * @param {string | number | Date | import('dayjs').Dayjs} value
 * @param {string} [format]
 * @returns {string}
 */
export function formatDate(value, format = DATE_FORMAT) {
  return value ? dayjs(value).format(format) : '—';
}

/**
 * Format a date-time value with the app's default date-time format.
 * @param {string | number | Date | import('dayjs').Dayjs} value
 * @returns {string}
 */
export function formatDateTime(value) {
  return value ? dayjs(value).format(DATE_TIME_FORMAT) : '—';
}

/**
 * Human relative time, e.g. "3 hours ago".
 * @param {string | number | Date | import('dayjs').Dayjs} value
 * @returns {string}
 */
export function fromNow(value) {
  return value ? dayjs(value).fromNow() : '—';
}

/**
 * Whole days from now until the given date (negative when in the past).
 * @param {string | number | Date | import('dayjs').Dayjs} value
 * @returns {number}
 */
export function daysUntil(value) {
  return dayjs(value).startOf('day').diff(dayjs().startOf('day'), 'day');
}
