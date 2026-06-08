import { Button, Empty, Flex, Typography } from 'antd';
import { colors } from '@/app/theme';

const { Text } = Typography;

/**
 * Empty-data placeholder with an optional primary action.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {string} [props.actionLabel]
 * @param {() => void} [props.onAction]
 * @param {import('react').ReactNode} [props.icon]
 * @param {number} [props.minHeight]
 */
export function EmptyState({
  title = 'Nothing here yet',
  description,
  actionLabel,
  onAction,
  icon,
  minHeight = 180,
}) {
  return (
    <Flex vertical align="center" justify="center" style={{ minHeight, textAlign: 'center' }}>
      <Empty
        image={icon ?? Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>
            <Text strong style={{ color: colors.textPrimary }}>
              {title}
            </Text>
            {description && (
              <>
                <br />
                <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{description}</Text>
              </>
            )}
          </span>
        }
      >
        {actionLabel && onAction && (
          <Button type="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </Empty>
    </Flex>
  );
}

export default EmptyState;
