import { MOCK_LATENCY_MS } from '@/constants/app';

/**
 * Resolve a value after a simulated network delay, returning a deep clone so
 * callers can never mutate the underlying mock dataset.
 *
 * @template T
 * @param {T} data
 * @param {{ delay?: number }} [options]
 * @returns {Promise<T>}
 */
export function mockRequest(data, options = {}) {
  const delay = options.delay ?? MOCK_LATENCY_MS;
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), delay);
  });
}

/**
 * Tiny seeded PRNG (mulberry32) so generated mock series are stable per seed.
 * @param {number} seed
 * @returns {() => number} number in [0, 1)
 */
export function seededRandom(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
