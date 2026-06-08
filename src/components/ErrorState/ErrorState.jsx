import { Button, Empty, Flex, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { colors } from '@/app/theme';

const { Text } = Typography;

/**
 * Friendly error panel with an optional retry action.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {() => void} [props.onRetry]
 * @param {number} [props.minHeight]
 */
export function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this data. Please try again.',
  onRetry,
  minHeight = 200,
}) {
  return (
    <Flex vertical align="center" justify="center" gap={8} style={{ minHeight, textAlign: 'center' }}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>
            <Text strong style={{ color: colors.textPrimary }}>
              {title}
            </Text>
            <br />
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{description}</Text>
          </span>
        }
      />
      {onRetry && (
        <Button icon={<ReloadOutlined />} onClick={onRetry}>
          Retry
        </Button>
      )}
    </Flex>
  );
}

export default ErrorState;
