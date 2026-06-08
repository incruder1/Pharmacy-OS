import { Col, Flex, Row } from 'antd';
import {
  DashboardHeader,
  StatsRow,
  ChartsSection,
  RecentSalesCard,
  RecentPurchasesCard,
  TopProductsCard,
  ExpiringMedicinesCard,
  LowStockCard,
} from './components';

/**
 * Dashboard screen — composes header, KPI row, charts, and activity/alert
 * widgets. All data fetching lives inside the child widgets (each owns its own
 * query + loading/error state), keeping this composition file thin.
 */
export function DashboardPage() {
  return (
    <Flex vertical gap={16} className="po-fade-in">
      <DashboardHeader />

      <StatsRow />

      <ChartsSection />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <RecentSalesCard />
        </Col>
        <Col xs={24} lg={12}>
          <TopProductsCard />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <RecentPurchasesCard />
        </Col>
        <Col xs={24} lg={8}>
          <LowStockCard />
        </Col>
        <Col xs={24} lg={8}>
          <ExpiringMedicinesCard />
        </Col>
      </Row>
    </Flex>
  );
}

export default DashboardPage;
