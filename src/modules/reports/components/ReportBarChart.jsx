import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { colors, palette } from '@/app/theme';
import { formatCurrencyCompact } from '@/utils';

/**
 * Compact bar chart for report aggregations (revenue/profit by bucket).
 * @param {{ data: { name?: string, label?: string, value: number }[], color?: string }} props
 */
export function ReportBarChart({ data, color = colors.primary }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={palette.gray[100]} vertical={false} />
        <XAxis dataKey={data[0]?.label !== undefined ? 'label' : 'name'} tick={{ fontSize: 12, fill: colors.textTertiary }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: colors.textTertiary }} axisLine={false} tickLine={false} width={56} tickFormatter={formatCurrencyCompact} />
        <Tooltip
          formatter={(v) => [formatCurrencyCompact(v), '']}
          contentStyle={{ borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 13 }}
        />
        <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ReportBarChart;
