/* eslint-disable react-refresh/only-export-components -- central route config, not a component module */
import { lazy } from 'react';
import { PERMISSIONS } from './permissions';

/** Lazy-loaded route screens (thin wrappers in src/pages). */
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const BillingPage = lazy(() => import('@/pages/BillingPage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const InventoryPage = lazy(() => import('@/pages/InventoryPage'));
const PurchasesPage = lazy(() => import('@/pages/PurchasesPage'));
const SuppliersPage = lazy(() => import('@/pages/SuppliersPage'));
const SalesPage = lazy(() => import('@/pages/SalesPage'));
const ReportsPage = lazy(() => import('@/pages/ReportsPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const ExpiryPage = lazy(() => import('@/pages/ExpiryPage'));

/**
 * Central route config consumed by App.jsx. Each route declares its element and
 * the permission key gating it (RBAC via config/permissions).
 */
export const ROUTES = [
  { path: 'dashboard', element: <DashboardPage />, permission: PERMISSIONS.DASHBOARD },
  { path: 'billing', element: <BillingPage />, permission: PERMISSIONS.BILLING },
  { path: 'products', element: <ProductsPage />, permission: PERMISSIONS.PRODUCTS },
  { path: 'inventory', element: <InventoryPage />, permission: PERMISSIONS.INVENTORY },
  { path: 'expiry', element: <ExpiryPage />, permission: PERMISSIONS.EXPIRY },
  { path: 'purchases', element: <PurchasesPage />, permission: PERMISSIONS.PURCHASES },
  { path: 'suppliers', element: <SuppliersPage />, permission: PERMISSIONS.SUPPLIERS },
  { path: 'sales', element: <SalesPage />, permission: PERMISSIONS.SALES },
  { path: 'reports', element: <ReportsPage />, permission: PERMISSIONS.REPORTS },
  { path: 'settings', element: <SettingsPage />, permission: PERMISSIONS.SETTINGS },
];

export default ROUTES;
