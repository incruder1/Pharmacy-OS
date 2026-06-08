import { Flex, Space, Typography } from 'antd';
import { colors } from '@/app/theme';

const { Title, Text } = Typography;

/**
 * Consistent page title block with optional subtitle and right-aligned actions.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {import('react').ReactNode} [props.extra] - actions (buttons, filters)
 * @param {import('react').ReactNode} [props.children] - below the title row
 */
export function PageHeader({ title, subtitle, extra, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: colors.textPrimary }}>
            {title}
          </Title>
          {subtitle && (
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>{subtitle}</Text>
          )}
        </div>
        {extra && <Space wrap>{extra}</Space>}
      </Flex>
      {children}
    </div>
  );
}

export default PageHeader;
