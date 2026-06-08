import { Button } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { formatCurrency } from '@/utils';
import { useExpiryMetrics } from '../hooks';
import { useExportExpiry } from '../hooks/useExportExpiry';
import styles from '../expiry.module.scss';

/** Actionable alert strip — surfaces total ₹ at risk above the table. */
export function ExpiryRiskBanner() {
  const { data } = useExpiryMetrics();
  const exportMutation = useExportExpiry();

  if (!data || (data.expiredInventoryValue === 0 && data.expiryRiskValue === 0)) return null;

  const totalLoss = data.expiredInventoryValue + data.expiryRiskValue;

  return (
    <div className={styles.riskBanner}>
      <WarningOutlined className={styles.riskBannerIcon} />
      <div className={styles.riskBannerText}>
        <div className={styles.riskBannerTitle}>
          {formatCurrency(totalLoss)} tied up in expiry risk
        </div>
        <div className={styles.riskBannerSub}>
          Act now on expired stock and batches expiring within 90 days to protect margins.
        </div>
      </div>
      <Button loading={exportMutation.isPending} onClick={() => exportMutation.mutate()}>
        Export Report
      </Button>
    </div>
  );
}

export default ExpiryRiskBanner;
