import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ROUTES } from '@/config/routes';

const LandingPage = lazy(() => import('@/pages/LandingPage'));

function PageLoader() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '40vh' }}>
      <Spin size="large" />
    </div>
  );
}

/** Public landing at `/`; app screens inside DashboardLayout at `/dashboard`, etc. */
export function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<DashboardLayout />}>
          {ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
