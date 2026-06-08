import { PageHeader } from '@/components/PageHeader';
import { useDisclosure } from '@/hooks/useDisclosure';
import { usePurchases } from './hooks';
import { PurchaseFilters, PurchasesTable, PurchaseEntryDrawer } from './components';

/** Purchases screen — list of goods-inward orders + multi-line entry drawer. */
export function PurchasesPage() {
  const { data, isFetching } = usePurchases();
  const drawer = useDisclosure();

  return (
    <div className="po-fade-in">
      <PageHeader title="Purchases" subtitle="Record stock inward & track invoices" />
      <PurchaseFilters onAdd={drawer.open} />
      <PurchasesTable result={data} loading={isFetching} onAdd={drawer.open} />
      <PurchaseEntryDrawer open={drawer.isOpen} onClose={drawer.close} />
    </div>
  );
}

export default PurchasesPage;
