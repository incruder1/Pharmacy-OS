import { Flex } from 'antd';

/**
 * Compact toolbar that aligns search + filter controls on one wrapping row.
 * Pass controls as children (Select, DatePicker.RangePicker, SearchInput…).
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {import('react').ReactNode} [props.extra] - right-aligned actions (e.g. "Add")
 * @param {number} [props.gap]
 */
export function FilterPanel({ children, extra, gap = 12 }) {
  return (
    <Flex align="center" justify="space-between" gap={gap} wrap="wrap" style={{ marginBottom: 16 }}>
      <Flex align="center" gap={gap} wrap="wrap">
        {children}
      </Flex>
      {extra && (
        <Flex align="center" gap={gap} wrap="wrap">
          {extra}
        </Flex>
      )}
    </Flex>
  );
}

export default FilterPanel;
