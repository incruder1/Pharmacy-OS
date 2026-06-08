import { Select } from 'antd';
import { FilterPanel } from '@/components/FilterPanel';
import { SearchInput } from '@/components/SearchInput';
import { useInventoryStore } from '../store/inventoryStore';
import { STOCK_STATUS_OPTIONS, EXPIRY_WINDOW_OPTIONS } from '../constants';

/** Search + stock-status + expiry-window filters. */
export function InventoryFilters() {
  const { search, filters, setSearch, setFilter } = useInventoryStore();
  return (
    <FilterPanel>
      <SearchInput value={search} onSearch={setSearch} placeholder="Search product, batch…" width={260} />
      <Select
        allowClear
        placeholder="Stock status"
        style={{ width: 170 }}
        options={STOCK_STATUS_OPTIONS}
        value={filters.status}
        onChange={(v) => setFilter('status', v)}
      />
      <Select
        allowClear
        placeholder="Expiry window"
        style={{ width: 160 }}
        options={EXPIRY_WINDOW_OPTIONS}
        value={filters.expiryWindow}
        onChange={(v) => setFilter('expiryWindow', v)}
      />
    </FilterPanel>
  );
}

export default InventoryFilters;
