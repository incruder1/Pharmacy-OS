import { Button, Descriptions, Drawer, Flex, Space, Tag, Typography } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { colors } from '@/app/theme';
import { LoadingState } from '@/components/LoadingState';
import { formatCurrency, formatDate, formatNumber } from '@/utils';
import { RISK_LEVEL_MAP } from '../constants';
import { useExpiryBatchDetail } from '../hooks';
import { useExpiryStore } from '../store/expiryStore';
import styles from '../expiry.module.scss';

const { Text, Title } = Typography;

export function ExpiryBatchDrawer() {
  const selectedBatchId = useExpiryStore((s) => s.selectedBatchId);
  const clearSelectedBatch = useExpiryStore((s) => s.clearSelectedBatch);
  const { data, isLoading } = useExpiryBatchDetail(selectedBatchId);

  const open = Boolean(selectedBatchId);
  const risk = data ? RISK_LEVEL_MAP[data.riskLevel] : null;

  return (
    <Drawer
      open={open}
      onClose={clearSelectedBatch}
      width={520}
      title={data ? data.productName : 'Batch Details'}
      destroyOnHidden
    >
      {isLoading ? (
        <LoadingState minHeight={320} />
      ) : data ? (
        <Flex vertical gap={20}>
          <Flex align="center" justify="space-between">
            <Tag color={risk?.tag} style={{ borderRadius: 999, fontWeight: 600 }}>
              {risk?.label} Risk
            </Tag>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
              Batch {data.batchNumber}
            </Text>
          </Flex>

          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label="Generic">{data.genericName}</Descriptions.Item>
            <Descriptions.Item label="Category">{data.category}</Descriptions.Item>
            <Descriptions.Item label="Expiry">
              {formatDate(data.expiryDate)}
              <Text
                style={{
                  marginLeft: 8,
                  color: data.daysToExpiry < 0 ? colors.error : colors.warning,
                  fontWeight: 600,
                }}
              >
                {data.daysToExpiry < 0
                  ? `${Math.abs(data.daysToExpiry)} days ago`
                  : `${data.daysToExpiry} days left`}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Remaining Qty">{formatNumber(data.quantity)}</Descriptions.Item>
            <Descriptions.Item label="MRP">{formatCurrency(data.mrp)}</Descriptions.Item>
            <Descriptions.Item label="Cost">{formatCurrency(data.costPrice)}</Descriptions.Item>
            <Descriptions.Item label="Value at Risk">
              <Text strong style={{ color: colors.error }}>{formatCurrency(data.inventoryValue)}</Text>
            </Descriptions.Item>
          </Descriptions>

          <div className={styles.drawerSection}>
            <Title level={5} style={{ margin: '0 0 8px' }}>Supplier</Title>
            <Text strong style={{ display: 'block' }}>{data.supplierName}</Text>
            <Space direction="vertical" size={4} style={{ marginTop: 8 }}>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
                <UserOutlined /> {data.supplierContact}
              </Text>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
                <PhoneOutlined /> {data.supplierPhone}
              </Text>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
                <MailOutlined /> {data.supplierEmail}
              </Text>
            </Space>
          </div>

          <div className={styles.drawerSection}>
            <Title level={5} style={{ margin: '0 0 8px' }}>Suggested Actions</Title>
            <Flex wrap gap={8}>
              {data.suggestedActions.map((action) => (
                <Button key={action} size="small">{action}</Button>
              ))}
            </Flex>
          </div>
        </Flex>
      ) : (
        <Text type="secondary">Batch not found.</Text>
      )}
    </Drawer>
  );
}

export default ExpiryBatchDrawer;
