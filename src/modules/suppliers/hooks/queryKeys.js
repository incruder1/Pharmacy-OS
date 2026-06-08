export const supplierKeys = {
  all: ['suppliers'],
  list: (params) => ['suppliers', 'list', params],
  detail: (id) => ['suppliers', 'detail', id],
  purchases: (id) => ['suppliers', 'purchases', id],
};
