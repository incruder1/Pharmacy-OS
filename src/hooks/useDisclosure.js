import { useCallback, useState } from 'react';

/**
 * Open/close state for drawers, modals, and popovers — optionally carrying a
 * payload (the record being edited) opened alongside the panel.
 *
 * @template T
 * @param {boolean} [initial]
 * @returns {{
 *   isOpen: boolean,
 *   data: T | null,
 *   open: (data?: T) => void,
 *   close: () => void,
 *   toggle: () => void,
 * }}
 */
export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const [data, setData] = useState(null);

  const open = useCallback((payload) => {
    setData(payload ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return { isOpen, data, open, close, toggle };
}

export default useDisclosure;
