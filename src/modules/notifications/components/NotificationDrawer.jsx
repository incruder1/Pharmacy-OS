import { Button, Drawer, Empty, Spin } from 'antd';
import { useNotifications, useMarkRead, useMarkAllRead } from '../hooks';
import { NotificationFilters } from './NotificationFilters';
import { NotificationItem } from './NotificationItem';

export function NotificationDrawer({ open, onClose }) {
  const { data, isLoading } = useNotifications();
  const markRead = useMarkRead();
  const markAll = useMarkAllRead();

  return (
    <Drawer
      title="Notifications"
      open={open}
      onClose={onClose}
      width={420}
      extra={
        <Button size="small" loading={markAll.isPending} onClick={() => markAll.mutate()}>
          Mark all read
        </Button>
      }
    >
      <NotificationFilters />
      {isLoading ? (
        <Spin style={{ display: 'block', margin: '40px auto' }} />
      ) : !data?.length ? (
        <Empty description="You're all caught up" />
      ) : (
        <div role="list">
          {data.map((n) => (
            <NotificationItem key={n.id} item={n} onMarkRead={(id) => markRead.mutate(id)} />
          ))}
        </div>
      )}
    </Drawer>
  );
}

export default NotificationDrawer;
