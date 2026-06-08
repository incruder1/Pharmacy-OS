export const inventoryKeys = {
  all: ['inventory'],
  list: (params) => ['inventory', 'list', params],
  lowStock: () => ['inventory', 'low-stock'],
  expiring: (days) => ['inventory', 'expiring', days],
  stats: () => ['inventory', 'stats'],
};
