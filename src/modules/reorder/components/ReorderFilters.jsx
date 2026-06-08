import { Select } from 'antd';
import { SearchInput } from '@/components/SearchInput';
import { HEALTH_FILTERS } from '../constants';
import { useReorderStore } from '../store/reorderStore';

export function ReorderFilters() {
  const search = useReorderStore((s) => s.search);
  const filters = useReorderStore((s) => s.filters);
  const setSearch = useReorderStore((s) => s.setSearch);
  const setFilter = useReorderStore((s) => s.setFilter);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
      <SearchInput value={search} onSearch={setSearch} placeholder="Search product or supplier…" width={260} />
      <Select
        allowClear
        placeholder="Health"
        style={{ minWidth: 140 }}
        value={filters.health}
        onChange={(v) => setFilter('health', v)}
        options={HEALTH_FILTERS}
      />
    </div>
  );
}

export default ReorderFilters;
