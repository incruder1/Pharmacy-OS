import { Tag, Typography } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import { DataTable } from '@/components/DataTable';
import { colors } from '@/app/theme';
import { formatCurrency, formatDate, formatNumber } from '@/utils';
import { RISK_BORDER_COLORS, RISK_LEVEL_MAP } from '../constants';
import { useExpiryBatches } from '../hooks';
import { useExpiryStore } from '../store/expiryStore';
import styles from '../expiry.module.scss';

const { Text } = Typography;

export function ExpiryBatchTable() {
  const { data, isFetching } = useExpiryBatches();
  const { page, pageSize, setPage, setSelectedBatchId } = useExpiryStore();

  const columns = [
    {
      title: 'Product',
      dataIndex: 'productName',
      render: (name, r) => (
        <div className={styles.productCell}>
          {(r.riskLevel === 'Critical' || r.riskLevel === 'Expired') && (
            <WarningFilled className={styles.criticalIcon} />
          )}
          <div>
            <Text strong style={{ color: colors.textPrimary, display: 'block' }}>{name}</Text>
            <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{r.genericName}</Text>
          </div>
        </div>
      ),
    },
    { title: 'Batch Number', dataIndex: 'batchNumber', width: 110 },
    { title: 'Supplier', dataIndex: 'supplierName', ellipsis: true },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      render: (d, r) => (
        <div>
          <Text style={{ display: 'block' }}>{formatDate(d)}</Text>
          <Text
            style={{
              fontSize: 12,
              color: r.daysToExpiry < 0 ? colors.error : colors.textTertiary,
            }}
          >
            {r.daysToExpiry < 0 ? `${Math.abs(r.daysToExpiry)}d ago` : `${r.daysToExpiry}d left`}
          </Text>
        </div>
      ),
    },
    {
      title: 'Remaining Qty',
      dataIndex: 'quantity',
      align: 'right',
      render: (q) => formatNumber(q),
    },
    {
      title: 'Inventory Value',
      dataIndex: 'inventoryValue',
      align: 'right',
      render: (v) => <Text strong>{formatCurrency(v)}</Text>,
    },
    {
      title: 'Risk Level',
      dataIndex: 'riskLevel',
      render: (level) => {
        const preset = RISK_LEVEL_MAP[level] ?? { tag: 'default', label: level };
        return (
          <Tag color={preset.tag} style={{ margin: 0, borderRadius: 999, fontWeight: 600 }}>
            {preset.label}
          </Tag>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={data?.data}
      loading={isFetching}
      emptyText="No batches in this expiry window"
      onRow={(record) => ({
        onClick: () => setSelectedBatchId(record.id),
        className: styles[`riskRow${record.riskLevel}`] ?? '',
        style: {
          borderLeft: `3px solid ${RISK_BORDER_COLORS[record.riskLevel] ?? colors.border}`,
          cursor: 'pointer',
        },
      })}
      pagination={{
        current: page,
        pageSize,
        total: data?.total ?? 0,
        onChange: setPage,
      }}
    />
  );
}

export default ExpiryBatchTable;
