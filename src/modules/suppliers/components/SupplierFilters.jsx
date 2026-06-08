import { Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FilterPanel } from '@/components/FilterPanel';
import { SearchInput } from '@/components/SearchInput';
import { useSuppliersStore } from '../store/suppliersStore';
import { DUES_OPTIONS } from '../constants';

/** Search + dues filter and the "Add Supplier" action. */
export function SupplierFilters({ onAdd }) {
  const { search, filters, setSearch, setFilter } = useSuppliersStore();
  return (
    <FilterPanel
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Add Supplier
        </Button>
      }
    >
      <SearchInput value={search} onSearch={setSearch} placeholder="Search name, contact, GSTIN…" width={280} />
      <Select
        allowClear
        placeholder="Payment status"
        style={{ width: 160 }}
        options={DUES_OPTIONS}
        value={filters.hasDues}
        onChange={(v) => setFilter('hasDues', v)}
      />
    </FilterPanel>
  );
}

export default SupplierFilters;
