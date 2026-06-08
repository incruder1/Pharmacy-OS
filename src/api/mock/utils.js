/**
 * Shared helpers for the mock service layer: text search, paginate, id gen.
 */

/**
 * Case-insensitive "does any of these fields contain the term" matcher.
 * @param {object} row
 * @param {string} term
 * @param {string[]} fields
 */
export function matchesSearch(row, term, fields) {
  if (!term) return true;
  const q = term.trim().toLowerCase();
  return fields.some((f) => String(row[f] ?? '').toLowerCase().includes(q));
}

/**
 * Slice an already-filtered array into a paginated envelope.
 * @template T
 * @param {T[]} rows
 * @param {{ page?: number, pageSize?: number }} [params]
 * @returns {{ data: T[], total: number, page: number, pageSize: number }}
 */
export function paginate(rows, { page = 1, pageSize = 10 } = {}) {
  const start = (page - 1) * pageSize;
  return {
    data: rows.slice(start, start + pageSize),
    total: rows.length,
    page,
    pageSize,
  };
}

/**
 * Generate a prefixed id, e.g. genId('PRD') → "PRD-8F3K2".
 * @param {string} prefix
 */
export function genId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

/** Sort a copy of rows by a key/direction. */
export function sortBy(rows, key, dir = 'asc') {
  const factor = dir === 'desc' ? -1 : 1;
  return [...rows].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * factor;
    return String(av).localeCompare(String(bv)) * factor;
  });
}
