import { Badge, Button } from 'antd';
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
  const isCritical = data.expiredCount > 0 || data.medicinesNearExpiry > 5;

  return (
    <div className={`${styles.riskBanner} ${isCritical ? styles.riskBannerCritical : ''}`}>
      <Badge dot={isCritical} color="#dc2626">
        <WarningOutlined className={styles.riskBannerIcon} />
      </Badge>
      <div className={styles.riskBannerText}>
        <div className={styles.riskBannerTitle}>
          {formatCurrency(totalLoss)} tied up in expiry risk
        </div>
        <div className={styles.riskBannerSub}>
          {data.expiredCount > 0
            ? `${data.expiredCount} expired batches need immediate write-off or return. `
            : ''}
          Act on {data.medicinesNearExpiry} products expiring within 30 days to protect margins.
        </div>
      </div>
      <Button type={isCritical ? 'primary' : 'default'} danger={isCritical} loading={exportMutation.isPending} onClick={() => exportMutation.mutate()}>
        Export Report
      </Button>
    </div>
  );
}

export default ExpiryRiskBanner;
