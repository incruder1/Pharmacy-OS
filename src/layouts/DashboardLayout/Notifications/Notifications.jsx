import { Badge, Button, Drawer, Empty, Tag, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useDisclosure } from '@/hooks/useDisclosure';
import { colors } from '@/app/theme';
import { useLowStock, useExpiringBatches } from '@/modules/inventory';
import { formatDate } from '@/utils';

const { Text } = Typography;

/** Bell with a count badge that opens a drawer of stock/expiry alerts. */
export function Notifications() {
  const drawer = useDisclosure();
  const { data: lowStock = [] } = useLowStock();
  const { data: expiring = [] } = useExpiringBatches(30);

  const alerts = [
    ...lowStock.slice(0, 6).map((b) => ({
      key: `ls-${b.id}`,
      title: b.productName,
      desc: `${b.quantity} left · reorder at ${b.reorderLevel}`,
      tag: { text: b.status === 'out_of_stock' ? 'Out of stock' : 'Low stock', color: b.status === 'out_of_stock' ? 'red' : 'orange' },
    })),
    ...expiring.slice(0, 6).map((b) => ({
      key: `ex-${b.id}`,
      title: b.productName,
      desc: `Batch ${b.batchNumber} · expires ${formatDate(b.expiryDate)}`,
      tag: { text: 'Expiring', color: 'gold' },
    })),
  ];

  return (
    <>
      <Badge count={alerts.length} size="small">
        <Button type="text" icon={<BellOutlined style={{ fontSize: 18 }} />} onClick={drawer.open} aria-label="Notifications" />
      </Badge>
      <Drawer title="Notifications" open={drawer.isOpen} onClose={drawer.close} width={400}>
        {alerts.length === 0 ? (
          <Empty description="You're all caught up" />
        ) : (
          <div role="list">
            {alerts.map((a) => (
              <div
                key={a.key}
                role="listitem"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  padding: '12px 0',
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <Text strong style={{ color: colors.textPrimary }}>{a.title}</Text>
                  <Tag color={a.tag.color} style={{ borderRadius: 999, margin: 0 }}>{a.tag.text}</Tag>
                </span>
                <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{a.desc}</Text>
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </>
  );
}

export default Notifications;
