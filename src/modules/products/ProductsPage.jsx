import { PageHeader } from '@/components/PageHeader';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useProducts } from './hooks';
import { ProductFilters, ProductsTable, ProductForm } from './components';

/**
 * Products screen — thin composition of filters, table, and the create/edit
 * drawer. Data + mutations live in hooks; UI state in the products store.
 */
export function ProductsPage() {
  const { data, isFetching } = useProducts();
  const drawer = useDisclosure();

  return (
    <div className="po-fade-in">
      <PageHeader title="Products" subtitle="Manage your medicine catalog" />
      <ProductFilters onAdd={() => drawer.open(null)} />
      <ProductsTable
        result={data}
        loading={isFetching}
        onEdit={(record) => drawer.open(record)}
        onAdd={() => drawer.open(null)}
      />
      <ProductForm open={drawer.isOpen} onClose={drawer.close} record={drawer.data} />
    </div>
  );
}

export default ProductsPage;
