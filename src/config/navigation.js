import {
  DashboardOutlined,
  MedicineBoxOutlined,
  DatabaseOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  DollarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { PERMISSIONS } from './permissions';

/**
 * Sidebar navigation model. Each item: icon, label, path, permission key.
 * The Sidebar renders these and `can()` filters by the current role.
 */
export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: DashboardOutlined, permission: PERMISSIONS.DASHBOARD },
  { key: 'billing', label: 'Billing (POS)', path: '/billing', icon: DollarOutlined, permission: PERMISSIONS.BILLING },
  { key: 'products', label: 'Products', path: '/products', icon: MedicineBoxOutlined, permission: PERMISSIONS.PRODUCTS },
  { key: 'inventory', label: 'Inventory', path: '/inventory', icon: DatabaseOutlined, permission: PERMISSIONS.INVENTORY },
  { key: 'purchases', label: 'Purchases', path: '/purchases', icon: ShoppingCartOutlined, permission: PERMISSIONS.PURCHASES },
  { key: 'suppliers', label: 'Suppliers', path: '/suppliers', icon: TeamOutlined, permission: PERMISSIONS.SUPPLIERS },
  { key: 'sales', label: 'Sales History', path: '/sales', icon: FileTextOutlined, permission: PERMISSIONS.SALES },
  { key: 'reports', label: 'Reports', path: '/reports', icon: BarChartOutlined, permission: PERMISSIONS.REPORTS },
  { key: 'settings', label: 'Settings', path: '/settings', icon: SettingOutlined, permission: PERMISSIONS.SETTINGS },
];

/** Human label for a path (used by breadcrumbs). */
export const PATH_LABELS = NAV_ITEMS.reduce((acc, item) => {
  acc[item.path] = item.label;
  return acc;
}, {});
