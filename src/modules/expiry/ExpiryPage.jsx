import {
  ExpiryHeader,
  ExpiryMetricsRow,
  ExpiryRiskBanner,
  ExpirySectionTabs,
  ExpiryFilters,
  ExpiryBatchTable,
  ExpirySupplierView,
} from './components';
import { useExpiryStore } from './store/expiryStore';
import styles from './expiry.module.scss';

/** Dedicated expiry intelligence page — reduce inventory loss from expired medicines. */
export function ExpiryPage() {
  const viewMode = useExpiryStore((s) => s.viewMode);

  return (
    <div className={styles.page}>
      <ExpiryHeader />
      <ExpiryMetricsRow />
      <ExpiryRiskBanner />
      <ExpirySectionTabs />
      <ExpiryFilters />
      {viewMode === 'batch' ? <ExpiryBatchTable /> : <ExpirySupplierView />}
    </div>
  );
}

export default ExpiryPage;
