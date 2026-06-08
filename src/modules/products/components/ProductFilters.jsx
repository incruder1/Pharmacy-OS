import { Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FilterPanel } from '@/components/FilterPanel';
import { SearchInput } from '@/components/SearchInput';
import { useProductsStore } from '../store/productsStore';
import { useManufacturers } from '../hooks';
import { CATEGORY_OPTIONS } from '../constants';

/**
 * Search + category/manufacturer filters and the "Add Product" action.
 * @param {{ onAdd: () => void }} props
 */
export function ProductFilters({ onAdd }) {
  const { search, filters, setSearch, setFilter } = useProductsStore();
  const { data: manufacturers = [] } = useManufacturers();

  return (
    <FilterPanel
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Add Product
        </Button>
      }
    >
      <SearchInput value={search} onSearch={setSearch} placeholder="Search name, generic, barcode…" width={280} />
      <Select
        allowClear
        placeholder="Category"
        style={{ width: 160 }}
        options={CATEGORY_OPTIONS}
        value={filters.category}
        onChange={(v) => setFilter('category', v)}
      />
      <Select
        allowClear
        showSearch
        placeholder="Manufacturer"
        style={{ width: 200 }}
        options={manufacturers.map((m) => ({ label: m, value: m }))}
        value={filters.manufacturer}
        onChange={(v) => setFilter('manufacturer', v)}
      />
    </FilterPanel>
  );
}

export default ProductFilters;
