/**
 * Role-based access control for PharmacyOS.
 * Permission keys map 1:1 to feature modules; `*` grants everything.
 */

export const ROLES = {
  OWNER: 'owner',
  PHARMACIST: 'pharmacist',
  CASHIER: 'cashier',
  INVENTORY_MANAGER: 'inventory_manager',
  STORE_MANAGER: 'store_manager',
};

export const PERMISSIONS = {
  DASHBOARD: 'dashboard',
  PRODUCTS: 'products',
  INVENTORY: 'inventory',
  PURCHASES: 'purchases',
  SUPPLIERS: 'suppliers',
  BILLING: 'billing',
  SALES: 'sales',
  REPORTS: 'reports',
  SETTINGS: 'settings',
  EXPIRY: 'expiry',
  INSIGHTS: 'insights.view',
};

/** Permissions granted to each role. */
export const ROLE_PERMISSIONS = {
  [ROLES.OWNER]: ['*'],
  [ROLES.STORE_MANAGER]: [
    'dashboard', 'insights.view', 'products', 'inventory', 'expiry', 'purchases', 'suppliers', 'billing', 'sales', 'reports', 'settings',
  ],
  [ROLES.PHARMACIST]: [
    'dashboard', 'products', 'inventory', 'expiry', 'purchases', 'suppliers', 'billing', 'sales', 'reports',
  ],
  [ROLES.INVENTORY_MANAGER]: [
    'dashboard', 'products', 'inventory', 'expiry', 'purchases', 'suppliers', 'reports',
  ],
  [ROLES.CASHIER]: ['dashboard', 'billing', 'sales', 'products'],
};

/**
 * Does `role` have `permission`?
 * @param {string} role
 * @param {string} permission
 * @returns {boolean}
 */
export function can(role, permission) {
  const perms = ROLE_PERMISSIONS[role] ?? [];
  return perms.includes('*') || perms.includes(permission);
}
