import { DatabaseOutlined, AppstoreOutlined, NumberOutlined } from '@ant-design/icons';
import { colors } from '@/app/theme';
import { formatCurrency, formatCurrencyCompact, formatNumber } from '@/utils';
import { useInventoryReport } from '../hooks';
import { ReportSection } from './ReportSection';
import { ReportBarChart } from './ReportBarChart';

/** Inventory valuation report grouped by category. */
export function InventoryReport() {
  const { data, isFetching } = useInventoryReport();
  const summary = data?.summary;

  const stats = [
    { title: 'Stock Value', value: summary ? formatCurrencyCompact(summary.stockValue) : '—', accent: colors.primary, icon: <DatabaseOutlined /> },
    { title: 'Total Units', value: summary ? formatNumber(summary.units) : '—', accent: colors.success, icon: <NumberOutlined /> },
    { title: 'SKUs', value: summary ? formatNumber(summary.skus) : '—', accent: colors.info, icon: <AppstoreOutlined /> },
  ];

  const columns = [
    { title: 'Category', dataIndex: 'category' },
    { title: 'Batches', dataIndex: 'batches', align: 'right' },
    { title: 'Units', dataIndex: 'units', align: 'right', render: (v) => formatNumber(v) },
    { title: 'Stock Value', dataIndex: 'stockValue', align: 'right', render: (v) => formatCurrency(v) },
  ];

  return (
    <ReportSection
      stats={stats}
      columns={columns}
      data={data?.table}
      loading={isFetching}
      chart={<ReportBarChart data={data?.chart ?? []} color={colors.success} />}
      chartTitle="Stock value by category"
    />
  );
}

export default InventoryReport;
