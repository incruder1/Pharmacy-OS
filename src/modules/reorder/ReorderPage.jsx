import { ReorderHeader, ReorderMetricsRow, RecommendationCards, ReorderFilters, ReorderTable } from './components';
import styles from './reorder.module.scss';

export function ReorderPage() {
  return (
    <div className={styles.page}>
      <ReorderHeader />
      <ReorderMetricsRow />
      <RecommendationCards />
      <ReorderFilters />
      <ReorderTable />
    </div>
  );
}

export default ReorderPage;
