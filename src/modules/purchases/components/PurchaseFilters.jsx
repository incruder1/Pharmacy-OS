import { Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FilterPanel } from '@/components/FilterPanel';
import { SearchInput } from '@/components/SearchInput';
import { usePurchasesStore } from '../store/purchasesStore';
import { useSupplierOptions } from '../hooks';
import { PURCHASE_STATUS_OPTIONS } from '../constants';

/** Search + supplier/status filters and "New Purchase" action. */
export function PurchaseFilters({ onAdd }) {
  const { search, filters, setSearch, setFilter } = usePurchasesStore();
  const { data: suppliers = [] } = useSupplierOptions();

  return (
    <FilterPanel
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          New Purchase
        </Button>
      }
    >
      <SearchInput value={search} onSearch={setSearch} placeholder="Search PO, invoice, supplier…" width={260} />
      <Select
        allowClear
        showSearch
        optionFilterProp="label"
        placeholder="Supplier"
        style={{ width: 200 }}
        options={suppliers}
        value={filters.supplierId}
        onChange={(v) => setFilter('supplierId', v)}
      />
      <Select
        allowClear
        placeholder="Status"
        style={{ width: 140 }}
        options={PURCHASE_STATUS_OPTIONS}
        value={filters.status}
        onChange={(v) => setFilter('status', v)}
      />
    </FilterPanel>
  );
}

export default PurchaseFilters;
