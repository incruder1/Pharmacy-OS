import { RiseOutlined, FileTextOutlined, PercentageOutlined } from '@ant-design/icons';
import { colors } from '@/app/theme';
import { formatCurrency, formatCurrencyCompact, formatDate, formatNumber } from '@/utils';
import { useSalesReport } from '../hooks';
import { ReportSection } from './ReportSection';
import { ReportBarChart } from './ReportBarChart';

/** Day-wise sales report. */
export function SalesReport() {
  const { data, isFetching } = useSalesReport();
  const summary = data?.summary;

  const stats = [
    { title: 'Revenue', value: summary ? formatCurrencyCompact(summary.revenue) : '—', accent: colors.primary, icon: <RiseOutlined /> },
    { title: 'Invoices', value: summary ? formatNumber(summary.invoices) : '—', accent: colors.success, icon: <FileTextOutlined /> },
    { title: 'GST Collected', value: summary ? formatCurrencyCompact(summary.gst) : '—', accent: colors.warning, icon: <PercentageOutlined /> },
    { title: 'Profit', value: summary ? formatCurrencyCompact(summary.profit) : '—', accent: colors.info, icon: <RiseOutlined /> },
  ];

  const columns = [
    { title: 'Date', dataIndex: 'date', render: (d) => formatDate(d) },
    { title: 'Invoices', dataIndex: 'invoices', align: 'right' },
    { title: 'Revenue', dataIndex: 'revenue', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'GST', dataIndex: 'gst', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'Profit', dataIndex: 'profit', align: 'right', render: (v) => formatCurrency(v) },
  ];

  return (
    <ReportSection
      stats={stats}
      columns={columns}
      data={data?.table}
      loading={isFetching}
      chart={<ReportBarChart data={data?.trend ?? []} />}
      chartTitle="Revenue trend"
    />
  );
}

export default SalesReport;
