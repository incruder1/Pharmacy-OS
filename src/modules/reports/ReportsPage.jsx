import { DatePicker, Segmented } from 'antd';
import dayjs from 'dayjs';
import { PageHeader } from '@/components/PageHeader';
import { FilterPanel } from '@/components/FilterPanel';
import { useReportsStore } from './store/reportsStore';
import { REPORT_TABS } from './constants';
import { SalesReport, InventoryReport, ExpiryReport, ProfitReport } from './components';

const { RangePicker } = DatePicker;

const VIEWS = {
  sales: SalesReport,
  inventory: InventoryReport,
  expiry: ExpiryReport,
  profit: ProfitReport,
};

/** Reports landing — tabbed analytical reports with a shared date filter. */
export function ReportsPage() {
  const { tab, from, to, setTab, setRange } = useReportsStore();
  const View = VIEWS[tab];
  const dateScoped = tab === 'sales' || tab === 'profit';

  return (
    <div className="po-fade-in">
      <PageHeader title="Reports" subtitle="Sales, inventory, expiry & profit insights" />
      <FilterPanel
        extra={
          dateScoped && (
            <RangePicker
              value={[from ? dayjs(from) : null, to ? dayjs(to) : null]}
              onChange={(r) => setRange(r?.[0]?.toISOString(), r?.[1]?.toISOString())}
              format="DD MMM YYYY"
            />
          )
        }
      >
        <Segmented options={REPORT_TABS} value={tab} onChange={setTab} size="large" />
      </FilterPanel>
      <View />
    </div>
  );
}

export default ReportsPage;
