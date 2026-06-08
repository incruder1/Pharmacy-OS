import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { colors } from '@/app/theme';

/**
 * Donut chart of product-category sales share.
 *
 * @param {object} props
 * @param {import('../types').CategorySlice[]} props.data
 */
export function CategoryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={62}
          outerRadius={96}
          paddingAngle={2}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={colors.chartSeries[index % colors.chartSeries.length]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value}%`, name]}
          contentStyle={{
            borderRadius: 10,
            border: `1px solid ${colors.border}`,
            fontSize: 13,
          }}
        />
        <Legend
          iconType="circle"
          iconSize={9}
          formatter={(value) => (
            <span style={{ color: colors.textSecondary, fontSize: 13 }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryChart;
