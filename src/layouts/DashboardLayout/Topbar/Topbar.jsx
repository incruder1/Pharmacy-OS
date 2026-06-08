import { Button, Input, Layout, Tooltip } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { Notifications } from '../Notifications';
import { ProfileMenu } from '../ProfileMenu';
import styles from '../DashboardLayout.module.scss';

const { Header } = Layout;

/** App top bar: breadcrumbs, global search, quick action, alerts, profile. */
export function Topbar({ profile }) {
  const navigate = useNavigate();

  return (
    <Header className={styles.header}>
      <Breadcrumbs />
      <div className={styles.headerRight}>
        <Input
          prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
          placeholder="Search…"
          style={{ width: 220 }}
          aria-label="Global search"
          onPressEnter={(e) => e.currentTarget.value && navigate('/products')}
        />
        <Tooltip title="New sale">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/billing')}>
            New Sale
          </Button>
        </Tooltip>
        <Notifications />
        <ProfileMenu profile={profile} />
      </div>
    </Header>
  );
}

export default Topbar;
