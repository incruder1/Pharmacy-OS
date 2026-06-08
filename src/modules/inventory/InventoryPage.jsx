import { PageHeader } from '@/components/PageHeader';
import { useInventory } from './hooks';
import { InventoryStats, InventoryFilters, InventoryTable } from './components';

/** Inventory screen — stock health KPIs, filters, and batch/expiry table. */
export function InventoryPage() {
  const { data, isFetching } = useInventory();

  return (
    <div className="po-fade-in">
      <PageHeader title="Inventory" subtitle="Track batches, stock levels & expiry" />
      <InventoryStats />
      <InventoryFilters />
      <InventoryTable result={data} loading={isFetching} />
    </div>
  );
}

export default InventoryPage;
