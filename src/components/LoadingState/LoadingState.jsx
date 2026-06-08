import { Flex, Spin, Typography } from 'antd';
import { colors } from '@/app/theme';

const { Text } = Typography;

/**
 * Centered loading indicator for full sections/panels.
 *
 * @param {object} props
 * @param {string} [props.message]
 * @param {number} [props.minHeight]
 */
export function LoadingState({ message = 'Loading…', minHeight = 200 }) {
  return (
    <Flex vertical align="center" justify="center" gap={12} style={{ minHeight }}>
      <Spin size="large" />
      <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{message}</Text>
    </Flex>
  );
}

export default LoadingState;
