export const purchaseKeys = {
  all: ['purchases'],
  list: (params) => ['purchases', 'list', params],
  detail: (id) => ['purchases', 'detail', id],
  stats: () => ['purchases', 'stats'],
};
