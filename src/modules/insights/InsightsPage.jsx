import { Col, Row } from 'antd';
import {
  InsightsHeader,
  InsightsMetricsRow,
  InsightsChartsSection,
  FastMovingWidget,
  SlowMovingWidget,
  DeadStockWidget,
  BusinessInsightsFeed,
} from './components';
import styles from './insights.module.scss';

/** Owner Insights — premium analytics dashboard for pharmacy owners. */
export function InsightsPage() {
  return (
    <div className={styles.page}>
      <InsightsHeader />
      <InsightsMetricsRow />
      <InsightsChartsSection />

      <Row gutter={[16, 16]} className={styles.widgetsRow}>
        <Col xs={24} lg={8}>
          <FastMovingWidget />
        </Col>
        <Col xs={24} lg={8}>
          <SlowMovingWidget />
        </Col>
        <Col xs={24} lg={8}>
          <DeadStockWidget />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <BusinessInsightsFeed />
        </Col>
      </Row>
    </div>
  );
}

export default InsightsPage;
