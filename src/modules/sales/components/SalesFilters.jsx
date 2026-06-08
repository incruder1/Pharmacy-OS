import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { FilterPanel } from '@/components/FilterPanel';
import { SearchInput } from '@/components/SearchInput';
import { useSalesStore } from '../store/salesStore';
import { PAYMENT_MODE_OPTIONS } from '../constants';

const { RangePicker } = DatePicker;

/** Search + payment-mode + date-range filters for invoice history. */
export function SalesFilters() {
  const { search, filters, setSearch, setFilter, setFilters } = useSalesStore();

  const onRange = (range) => {
    setFilters({
      ...filters,
      from: range?.[0] ? range[0].toISOString() : undefined,
      to: range?.[1] ? range[1].toISOString() : undefined,
    });
  };

  return (
    <FilterPanel>
      <SearchInput value={search} onSearch={setSearch} placeholder="Search invoice, customer…" width={260} />
      <Select
        allowClear
        placeholder="Payment mode"
        style={{ width: 150 }}
        options={PAYMENT_MODE_OPTIONS}
        value={filters.mode}
        onChange={(v) => setFilter('mode', v)}
      />
      <RangePicker
        value={[filters.from ? dayjs(filters.from) : null, filters.to ? dayjs(filters.to) : null]}
        onChange={onRange}
        format="DD MMM YYYY"
      />
    </FilterPanel>
  );
}

export default SalesFilters;
