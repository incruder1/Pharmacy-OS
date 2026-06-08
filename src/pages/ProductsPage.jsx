import { ProductsPage as ProductsScreen } from '@/modules/products';

/** Thin route wrapper — logic lives in the products module. */
export default function ProductsPage() {
  return <ProductsScreen />;
}
