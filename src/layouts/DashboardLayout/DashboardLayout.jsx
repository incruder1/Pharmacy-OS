import { Suspense, useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { LoadingState } from '@/components/LoadingState';
import { useSettingsStore } from '@/modules/settings';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import styles from './DashboardLayout.module.scss';

const { Content } = Layout;

/**
 * Authenticated app chrome: collapsible sidebar + topbar + routed content.
 * Role (from settings) drives which nav items / routes are visible.
 */
export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const profile = useSettingsStore((s) => s.profile);

  return (
    <Layout className={styles.layout} hasSider>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} role={profile.role} />
      <Layout>
        <Topbar profile={profile} />
        <Content className={styles.content}>
          <Suspense fallback={<LoadingState minHeight={400} />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
