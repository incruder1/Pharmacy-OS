import { Badge, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useUnreadCount } from '../hooks';
import { NotificationDrawer } from './NotificationDrawer';

export function NotificationBell() {
  const drawer = useDisclosure();
  const { data } = useUnreadCount();

  return (
    <>
      <Badge count={data?.count ?? 0} size="small">
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: 18 }} />}
          onClick={drawer.open}
          aria-label="Open notifications"
        />
      </Badge>
      <NotificationDrawer open={drawer.isOpen} onClose={drawer.close} />
    </>
  );
}

export default NotificationBell;
