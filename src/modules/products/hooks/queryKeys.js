/** Centralized, partially-matchable query keys for products. */
export const productKeys = {
  all: ['products'],
  list: (params) => ['products', 'list', params],
  detail: (id) => ['products', 'detail', id],
  manufacturers: () => ['products', 'manufacturers'],
};
