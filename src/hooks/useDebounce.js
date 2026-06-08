import { useEffect, useState } from 'react';

/**
 * Debounce a fast-changing value (search input, filters) to limit downstream work.
 *
 * @template T
 * @param {T} value
 * @param {number} [delay] - milliseconds
 * @returns {T}
 */
export function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default useDebounce;
