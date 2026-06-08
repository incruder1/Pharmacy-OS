export const reportKeys = {
  all: ['reports'],
  sales: (params) => ['reports', 'sales', params],
  inventory: () => ['reports', 'inventory'],
  expiry: () => ['reports', 'expiry'],
  profit: (params) => ['reports', 'profit', params],
};
