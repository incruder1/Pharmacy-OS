import { Button, Select, Segmented } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import { SearchInput } from '@/components/SearchInput';
import { EXPIRY_VIEW_MODES } from '../constants';
import { useExpiryStore } from '../store/expiryStore';
import { useExpiryFilterOptions, useExportExpiry } from '../hooks';
import styles from '../expiry.module.scss';

export function ExpiryFilters() {
  const search = useExpiryStore((s) => s.search);
  const filters = useExpiryStore((s) => s.filters);
  const viewMode = useExpiryStore((s) => s.viewMode);
  const setSearch = useExpiryStore((s) => s.setSearch);
  const setFilter = useExpiryStore((s) => s.setFilter);
  const setViewMode = useExpiryStore((s) => s.setViewMode);
  const reset = useExpiryStore((s) => s.reset);

  const { data: options } = useExpiryFilterOptions();
  const exportMutation = useExportExpiry();

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <SearchInput
          value={search}
          onSearch={setSearch}
          placeholder="Search product, batch, generic…"
          width={280}
        />
        <Select
          allowClear
          placeholder="Supplier"
          style={{ minWidth: 180 }}
          value={filters.supplierId}
          onChange={(v) => setFilter('supplierId', v)}
          options={options?.suppliers?.map((s) => ({ value: s.id, label: s.name }))}
        />
        <Select
          allowClear
          placeholder="Category"
          style={{ minWidth: 140 }}
          value={filters.category}
          onChange={(v) => setFilter('category', v)}
          options={options?.categories?.map((c) => ({ value: c, label: c }))}
        />
        <Button icon={<ReloadOutlined />} onClick={reset}>
          Reset
        </Button>
      </div>
      <Segmented
        options={EXPIRY_VIEW_MODES}
        value={viewMode}
        onChange={setViewMode}
      />
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        loading={exportMutation.isPending}
        onClick={() => exportMutation.mutate()}
      >
        Export
      </Button>
    </div>
  );
}

export default ExpiryFilters;
