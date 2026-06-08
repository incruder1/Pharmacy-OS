import { PageHeader } from '@/components/PageHeader';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useSuppliers } from './hooks';
import { SupplierFilters, SuppliersTable, SupplierForm } from './components';

/** Suppliers screen — filters, table with expandable history, and edit drawer. */
export function SuppliersPage() {
  const { data, isFetching } = useSuppliers();
  const drawer = useDisclosure();

  return (
    <div className="po-fade-in">
      <PageHeader title="Suppliers" subtitle="Distributors, dues & purchase history" />
      <SupplierFilters onAdd={() => drawer.open(null)} />
      <SuppliersTable
        result={data}
        loading={isFetching}
        onEdit={(r) => drawer.open(r)}
        onAdd={() => drawer.open(null)}
      />
      <SupplierForm open={drawer.isOpen} onClose={drawer.close} record={drawer.data} />
    </div>
  );
}

export default SuppliersPage;
