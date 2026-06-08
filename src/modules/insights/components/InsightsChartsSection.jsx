import { Col, Row } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { colors } from '@/app/theme';
import { ChartCard } from '@/modules/dashboard/components/ChartCard';
import { TrendChart } from '@/modules/dashboard/components/TrendChart';
import { formatCurrencyCompact } from '@/utils';
import {
  useRevenueTrend,
  useCategoryPerformance,
  useTopProducts,
  useSupplierSpend,
} from '../hooks';

export function InsightsChartsSection() {
  const revenue = useRevenueTrend();
  const categories = useCategoryPerformance();
  const topProducts = useTopProducts();
  const supplierSpend = useSupplierSpend();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={16}>
        <ChartCard
          title="Revenue Trend (30d)"
          loading={revenue.isLoading}
          error={revenue.isError}
          empty={revenue.data?.length === 0}
          onRetry={revenue.refetch}
        >
          <TrendChart
            data={revenue.data ?? []}
            color={colors.primary}
            gradientId="insightsRevGradient"
            valueFormatter={formatCurrencyCompact}
          />
        </ChartCard>
      </Col>

      <Col xs={24} xl={8}>
        <ChartCard
          title="Category Performance"
          loading={categories.isLoading}
          error={categories.isError}
          empty={categories.data?.length === 0}
          onRetry={categories.refetch}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories.data ?? []}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={92}
                paddingAngle={2}
                stroke="none"
              >
                {(categories.data ?? []).map((entry, index) => (
                  <Cell key={entry.name} fill={colors.chartSeries[index % colors.chartSeries.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </Col>

      <Col xs={24} lg={12}>
        <ChartCard
          title="Top Selling Products"
          height={260}
          loading={topProducts.isLoading}
          error={topProducts.isError}
          empty={topProducts.data?.length === 0}
          onRetry={topProducts.refetch}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts.data ?? []} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={colors.border} />
              <XAxis type="number" tickFormatter={formatCurrencyCompact} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={88} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [formatCurrencyCompact(v), 'Revenue']} />
              <Bar dataKey="revenue" fill={colors.primary} radius={[0, 6, 6, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Col>

      <Col xs={24} lg={12}>
        <ChartCard
          title="Supplier Spend Analysis"
          height={260}
          loading={supplierSpend.isLoading}
          error={supplierSpend.isError}
          empty={supplierSpend.data?.length === 0}
          onRetry={supplierSpend.refetch}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={supplierSpend.data ?? []} margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatCurrencyCompact} tick={{ fontSize: 11 }} width={52} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [formatCurrencyCompact(v), 'Spend']} />
              <Bar dataKey="spend" fill={colors.success} radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Col>
    </Row>
  );
}

export default InsightsChartsSection;
