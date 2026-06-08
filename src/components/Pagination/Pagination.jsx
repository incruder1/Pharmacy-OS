import { Pagination as AntPagination } from 'antd';

/**
 * Thin wrapper over antd Pagination with project defaults. Use for custom
 * layouts where the table's built-in pager isn't enough (e.g. card grids).
 *
 * @param {object} props
 * @param {number} props.current
 * @param {number} props.pageSize
 * @param {number} props.total
 * @param {(page: number, pageSize: number) => void} props.onChange
 * @param {boolean} [props.showSizeChanger]
 */
export function Pagination({ current, pageSize, total, onChange, showSizeChanger = true }) {
  return (
    <AntPagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      showSizeChanger={showSizeChanger}
      pageSizeOptions={[10, 20, 50, 100]}
      showTotal={(t, [from, to]) => `${from}–${to} of ${t}`}
      align="end"
    />
  );
}

export default Pagination;
