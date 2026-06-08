import { RiseOutlined, DollarOutlined, AppstoreOutlined } from '@ant-design/icons';
import { colors } from '@/app/theme';
import { formatCurrency, formatCurrencyCompact, formatNumber } from '@/utils';
import { useProfitReport } from '../hooks';
import { ReportSection } from './ReportSection';
import { ReportBarChart } from './ReportBarChart';

/** Profit report by product. */
export function ProfitReport() {
  const { data, isFetching } = useProfitReport();
  const summary = data?.summary;

  const stats = [
    { title: 'Revenue', value: summary ? formatCurrencyCompact(summary.revenue) : '—', accent: colors.primary, icon: <DollarOutlined /> },
    { title: 'Gross Profit', value: summary ? formatCurrencyCompact(summary.profit) : '—', accent: colors.success, icon: <RiseOutlined /> },
    { title: 'Products', value: summary ? formatNumber(summary.products) : '—', accent: colors.info, icon: <AppstoreOutlined /> },
  ];

  const columns = [
    { title: 'Product', dataIndex: 'product' },
    { title: 'Units', dataIndex: 'units', align: 'right', render: (v) => formatNumber(v) },
    { title: 'Revenue', dataIndex: 'revenue', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'Profit', dataIndex: 'profit', align: 'right', render: (v) => formatCurrency(v) },
    { title: 'Margin', dataIndex: 'margin', align: 'right', render: (v) => `${v}%` },
  ];

  return (
    <ReportSection
      stats={stats}
      columns={columns}
      data={data?.table}
      loading={isFetching}
      chart={<ReportBarChart data={data?.chart ?? []} color={colors.success} />}
      chartTitle="Top products by profit"
    />
  );
}

export default ProfitReport;
