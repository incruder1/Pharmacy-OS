import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { colors, palette } from '@/app/theme';

/**
 * Reusable smooth area chart for a single metric over time.
 * Used for both Revenue Trend and Sales Trend (composition over duplication).
 *
 * @param {object} props
 * @param {import('../types').TrendPoint[]} props.data
 * @param {string} [props.color]
 * @param {(value: number) => string} [props.valueFormatter]
 * @param {string} [props.gradientId]
 */
export function TrendChart({
  data,
  color = colors.primary,
  valueFormatter = (v) => `${v}`,
  gradientId = 'trendGradient',
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={palette.gray[100]} vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: colors.textTertiary }}
          axisLine={false}
          tickLine={false}
          minTickGap={24}
        />
        <YAxis
          tick={{ fontSize: 12, fill: colors.textTertiary }}
          axisLine={false}
          tickLine={false}
          width={48}
          tickFormatter={valueFormatter}
        />
        <Tooltip
          formatter={(value) => [valueFormatter(value), '']}
          contentStyle={{
            borderRadius: 10,
            border: `1px solid ${colors.border}`,
            boxShadow: '0 8px 24px -8px rgba(15,23,42,0.18)',
            fontSize: 13,
          }}
          labelStyle={{ color: colors.textSecondary, fontWeight: 600 }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TrendChart;
