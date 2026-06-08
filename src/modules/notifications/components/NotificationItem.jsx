import { Button, Tag, Typography } from 'antd';
import { colors } from '@/app/theme';
import { fromNow } from '@/utils';
import { TYPE_MAP } from '../constants';

const { Text } = Typography;

export function NotificationItem({ item, onMarkRead }) {
  const type = TYPE_MAP[item.type] ?? { label: item.type, color: 'default' };

  return (
    <div
      role="listitem"
      style={{
        padding: '12px 0',
        borderBottom: `1px solid ${colors.border}`,
        opacity: item.read ? 0.65 : 1,
        background: item.read ? 'transparent' : '#f8fafc',
        paddingLeft: item.read ? 0 : 8,
        borderRadius: item.read ? 0 : 8,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text strong style={{ color: colors.textPrimary, display: 'block' }}>{item.title}</Text>
          <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{item.body}</Text>
          <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{fromNow(item.createdAt)}</Text>
        </div>
        <Tag color={type.color} style={{ borderRadius: 999, margin: 0, flexShrink: 0 }}>{type.label}</Tag>
      </div>
      {!item.read && (
        <Button type="link" size="small" style={{ padding: 0, marginTop: 4 }} onClick={() => onMarkRead(item.id)}>
          Mark read
        </Button>
      )}
    </div>
  );
}

export default NotificationItem;
