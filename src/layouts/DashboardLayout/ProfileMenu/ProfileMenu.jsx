import { Avatar, Dropdown, Typography } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { colors } from '@/app/theme';
import { ROLE_OPTIONS } from '@/modules/settings/constants';
import styles from '../DashboardLayout.module.scss';

const { Text } = Typography;

const roleLabel = (role) => ROLE_OPTIONS.find((r) => r.value === role)?.label ?? role;

/** Avatar dropdown with profile summary and quick actions. */
export function ProfileMenu({ profile }) {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const items = [
    { key: 'settings', label: 'Settings', icon: <SettingOutlined /> },
    { type: 'divider' },
    { key: 'logout', label: 'Sign out', icon: <LogoutOutlined />, danger: true },
  ];

  const onClick = ({ key }) => {
    if (key === 'settings') navigate('/settings');
    if (key === 'logout') message.info('Signed out (demo)');
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={['click']} placement="bottomRight">
      <div className={styles.profile}>
        <Avatar size={32} icon={<UserOutlined />} style={{ background: colors.primary }} />
        <span className={styles.profileMeta}>
          <Text strong style={{ fontSize: 13, color: colors.textPrimary }}>{profile.name}</Text>
          <Text style={{ fontSize: 11, color: colors.textTertiary }}>{roleLabel(profile.role)}</Text>
        </span>
        <DownOutlined style={{ fontSize: 10, color: colors.textTertiary }} />
      </div>
    </Dropdown>
  );
}

export default ProfileMenu;
