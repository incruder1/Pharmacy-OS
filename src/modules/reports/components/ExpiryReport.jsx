import { ClockCircleOutlined, StopOutlined, FallOutlined } from '@ant-design/icons';
import { colors } from '@/app/theme';
import { StatusBadge } from '@/components/StatusBadge';
import { formatCurrency, formatCurrencyCompact, formatDate, formatNumber } from '@/utils';
import { useExpiryReport } from '../hooks';
import { ReportSection } from './ReportSection';

/** Expiry report: at-risk and expired batches. */
export function ExpiryReport() {
  const { data, isFetching } = useExpiryReport();
  const summary = data?.summary;

  const stats = [
    { title: 'Expiring Soon', value: summary ? formatNumber(summary.expiringSoon) : '—', accent: colors.warning, icon: <ClockCircleOutlined /> },
    { title: 'Expired', value: summary ? formatNumber(summary.expired) : '—', accent: colors.error, icon: <StopOutlined /> },
    { title: 'Value at Risk', value: summary ? formatCurrencyCompact(summary.valueAtRisk) : '—', accent: colors.info, icon: <FallOutlined /> },
  ];

  const columns = [
    { title: 'Product', dataIndex: 'productName' },
    { title: 'Batch', dataIndex: 'batchNumber' },
    { title: 'Expiry', dataIndex: 'expiryDate', render: (d) => formatDate(d) },
    { title: 'Days Left', dataIndex: 'daysToExpiry', align: 'right', render: (d) => (d < 0 ? 'Expired' : d) },
    { title: 'Qty', dataIndex: 'quantity', align: 'right' },
    { title: 'Value at Risk', dataIndex: 'valueAtRisk', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'Status', dataIndex: 'status', render: (s) => <StatusBadge status={s} /> },
  ];

  return <ReportSection stats={stats} columns={columns} data={data?.table} loading={isFetching} />;
}

export default ExpiryReport;
