import { InventoryPage as InventoryScreen } from '@/modules/inventory';

/** Thin route wrapper — logic lives in the inventory module. */
export default function InventoryPage() {
  return <InventoryScreen />;
}
