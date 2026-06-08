import { PageHeader } from '@/components/PageHeader';
import { useSales } from './hooks';
import { SalesFilters, SalesTable } from './components';

/** Sales history screen — invoice list with customer + date filters. */
export function SalesPage() {
  const { data, isFetching } = useSales();

  return (
    <div className="po-fade-in">
      <PageHeader title="Sales History" subtitle="Past invoices & payment records" />
      <SalesFilters />
      <SalesTable result={data} loading={isFetching} />
    </div>
  );
}

export default SalesPage;
