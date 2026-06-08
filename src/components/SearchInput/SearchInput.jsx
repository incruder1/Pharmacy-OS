import { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '@/hooks/useDebounce';

/**
 * Debounced search box. Emits `onSearch` only after the user pauses typing,
 * keeping list queries cheap. Controlled-friendly via `value`.
 *
 * @param {object} props
 * @param {string} [props.value]
 * @param {(term: string) => void} props.onSearch
 * @param {string} [props.placeholder]
 * @param {number} [props.delay]
 * @param {number|string} [props.width]
 * @param {boolean} [props.autoFocus]
 * @param {boolean} [props.allowClear]
 */
export function SearchInput({
  value = '',
  onSearch,
  placeholder = 'Search…',
  delay = 350,
  width = 260,
  autoFocus = false,
  allowClear = true,
}) {
  const [term, setTerm] = useState(value);
  const debounced = useDebounce(term, delay);

  // Sync from a changed external `value` during render (no effect) — React's
  // recommended pattern for adjusting state when a prop changes.
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setTerm(value);
  }

  // Emit the debounced term, skipping the initial mount to avoid a spurious
  // empty search on first render.
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <Input
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      placeholder={placeholder}
      prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
      allowClear={allowClear}
      autoFocus={autoFocus}
      style={{ width }}
    />
  );
}

export default SearchInput;
