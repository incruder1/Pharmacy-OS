import { Card, Col, Row } from 'antd';
import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';
import { colors } from '@/app/theme';

/**
 * Shared report scaffold: a KPI StatCard row, an optional chart card, and a
 * DataTable — so each report file just supplies config.
 *
 * @param {object} props
 * @param {{ title: string, value: string, accent?: string, icon?: import('react').ReactNode }[]} props.stats
 * @param {import('antd').TableProps['columns']} props.columns
 * @param {object[]} [props.data]
 * @param {boolean} [props.loading]
 * @param {import('react').ReactNode} [props.chart]
 * @param {string} [props.chartTitle]
 */
export function ReportSection({ stats, columns, data, loading, chart, chartTitle }) {
  const span = Math.max(6, Math.floor(24 / Math.max(stats.length, 1)));
  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {stats.map((s) => (
          <Col xs={24} sm={12} xl={span} key={s.title}>
            <StatCard title={s.title} value={s.value} accent={s.accent ?? colors.primary} icon={s.icon} loading={loading} />
          </Col>
        ))}
      </Row>
      {chart && (
        <Card
          variant="borderless"
          title={chartTitle}
          style={{ marginBottom: 16, border: `1px solid ${colors.border}`, boxShadow: 'none' }}
          styles={{ body: { padding: 20, height: 280 } }}
        >
          {chart}
        </Card>
      )}
      <DataTable columns={columns} dataSource={data} loading={loading} pagination={{ pageSize: 10 }} emptyText="No data for this period" />
    </div>
  );
}

export default ReportSection;
