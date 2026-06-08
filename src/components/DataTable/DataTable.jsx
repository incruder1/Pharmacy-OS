import { Table } from 'antd';
import { EmptyState } from '@/components/EmptyState';

const DEFAULT_PAGINATION = {
  showSizeChanger: true,
  showTotal: (total, [from, to]) => `${from}–${to} of ${total}`,
  pageSizeOptions: [10, 20, 50, 100],
};

/**
 * The workhorse listing table: antd Table with project defaults — stable rowKey,
 * sticky header, shared empty state, and INR-friendly pagination summary.
 *
 * @param {object} props
 * @param {import('antd').TableProps['columns']} props.columns
 * @param {object[]} [props.dataSource]
 * @param {boolean} [props.loading]
 * @param {string|((row: any) => string)} [props.rowKey]
 * @param {object|false} [props.pagination]
 * @param {import('antd').TableProps['onRow']} [props.onRow]
 * @param {string} [props.emptyText]
 * @param {import('react').ReactNode} [props.emptyAction]
 * @param {import('antd').TableProps['expandable']} [props.expandable]
 * @param {object} [props.scroll]
 * @param {'small'|'middle'|'large'} [props.size]
 */
export function DataTable({
  columns,
  dataSource = [],
  loading = false,
  rowKey = 'id',
  pagination,
  onRow,
  emptyText = 'No records found',
  emptyAction,
  expandable,
  scroll,
  size = 'middle',
}) {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={rowKey}
      size={size}
      onRow={onRow}
      expandable={expandable}
      sticky
      scroll={scroll ?? { x: 'max-content' }}
      pagination={pagination === false ? false : { ...DEFAULT_PAGINATION, ...pagination }}
      locale={{
        emptyText: loading ? (
          <span />
        ) : (
          <EmptyState
            minHeight={220}
            title={emptyText}
            actionLabel={emptyAction?.label}
            onAction={emptyAction?.onClick}
          />
        ),
      }}
    />
  );
}

export default DataTable;
