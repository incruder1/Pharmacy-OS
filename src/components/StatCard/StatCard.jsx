import { Card, Flex, Skeleton, Tooltip, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { colors, palette, radius } from '@/app/theme';
import { formatPercent } from '@/utils';

const { Text } = Typography;

const TREND = {
  up: { color: colors.success, bg: palette.success[50], Icon: ArrowUpOutlined },
  down: { color: colors.error, bg: palette.error[50], Icon: ArrowDownOutlined },
};

/**
 * A KPI tile: label, big value, optional icon and period-over-period delta.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string | number} props.value
 * @param {import('react').ReactNode} [props.icon]
 * @param {string} [props.accent] - accent color for the icon chip
 * @param {number} [props.delta] - fractional change (0.12 = +12%)
 * @param {string} [props.deltaLabel] - context, e.g. "vs last week"
 * @param {string} [props.footer]
 * @param {boolean} [props.loading]
 * @param {() => void} [props.onClick]
 */
export function StatCard({
  title,
  value,
  icon,
  accent = colors.primary,
  delta,
  deltaLabel,
  footer,
  loading = false,
  onClick,
}) {
  const hasDelta = typeof delta === 'number';
  const trend = hasDelta && delta >= 0 ? TREND.up : TREND.down;

  return (
    <Card
      variant="borderless"
      className={onClick ? 'po-clickable' : undefined}
      onClick={onClick}
      styles={{ body: { padding: 20 } }}
      style={{ height: '100%', boxShadow: 'none', border: `1px solid ${colors.border}` }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 2 }} title={false} />
      ) : (
        <Flex vertical gap={12}>
          <Flex align="center" justify="space-between">
            <Text style={{ color: colors.textSecondary, fontSize: 13, fontWeight: 500 }}>
              {title}
            </Text>
            {icon ? (
              <Flex
                align="center"
                justify="center"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: radius.md,
                  background: `${accent}14`,
                  color: accent,
                  fontSize: 18,
                }}
              >
                {icon}
              </Flex>
            ) : null}
          </Flex>

          <Text style={{ fontSize: 28, fontWeight: 700, color: colors.textPrimary, lineHeight: 1.1 }}>
            {value}
          </Text>

          <Flex align="center" gap={8} style={{ minHeight: 20 }}>
            {hasDelta && (
              <Tooltip title={deltaLabel}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    color: trend.color,
                    background: trend.bg,
                    padding: '2px 8px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <trend.Icon style={{ fontSize: 10 }} />
                  {formatPercent(Math.abs(delta))}
                </span>
              </Tooltip>
            )}
            {footer && (
              <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{footer}</Text>
            )}
          </Flex>
        </Flex>
      )}
    </Card>
  );
}

export default StatCard;
