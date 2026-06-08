import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ROUTES } from '@/config/routes';

/**
 * App router: every feature screen renders inside the DashboardLayout (sidebar,
 * topbar, breadcrumbs). Pages are lazy-loaded via config/routes. The legacy
 * `/dashboard` entry is preserved and is the default landing route.
 */
export function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
