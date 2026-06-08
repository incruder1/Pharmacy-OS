import { createElement } from 'react';
import { Layout, Menu } from 'antd';
import { MedicineBoxFilled } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME } from '@/constants/app';
import { colors } from '@/app/theme';
import { NAV_ITEMS } from '@/config/navigation';
import { can } from '@/config/permissions';
import styles from '../DashboardLayout.module.scss';

const { Sider } = Layout;

/**
 * Collapsible navigation rail driven by config/navigation, filtered by role.
 * @param {{ collapsed: boolean, onCollapse: (v: boolean) => void, role: string }} props
 */
export function Sidebar({ collapsed, onCollapse, role }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = NAV_ITEMS.filter((item) => can(role, item.permission)).map((item) => ({
    key: item.path,
    icon: createElement(item.icon),
    label: item.label,
  }));

  const selectedKey = NAV_ITEMS.find((i) => location.pathname.startsWith(i.path))?.path ?? '/dashboard';

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={232} theme="light" className={styles.sider}>
      <div className={styles.brand}>
        <MedicineBoxFilled style={{ fontSize: 22, color: colors.primary }} />
        {!collapsed && <span>{APP_NAME}</span>}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
        onClick={({ key }) => navigate(key)}
        style={{ borderInlineEnd: 'none' }}
      />
    </Sider>
  );
}

export default Sidebar;
