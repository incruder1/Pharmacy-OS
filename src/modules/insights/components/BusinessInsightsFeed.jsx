import { Card, Typography } from 'antd';
import {
  BulbOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { colors } from '@/app/theme';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { INSIGHT_SEVERITY } from '../constants';
import { useBusinessInsights } from '../hooks';
import styles from '../insights.module.scss';

const { Text } = Typography;

const ICONS = {
  danger: ExclamationCircleOutlined,
  warning: WarningOutlined,
  info: InfoCircleOutlined,
  success: BulbOutlined,
};

export function BusinessInsightsFeed() {
  const { data, isLoading, isError, refetch } = useBusinessInsights();

  return (
    <Card
      variant="borderless"
      style={{ height: '100%', border: `1px solid ${colors.border}`, boxShadow: 'none' }}
      styles={{ body: { padding: 16 } }}
      title={
        <Text style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary }}>
          Recent Business Insights
        </Text>
      }
    >
      {isLoading ? (
        <LoadingState minHeight={200} />
      ) : isError ? (
        <ErrorState minHeight={200} onRetry={refetch} />
      ) : (
        data?.map((insight) => {
          const preset = INSIGHT_SEVERITY[insight.severity] ?? INSIGHT_SEVERITY.info;
          const Icon = ICONS[insight.severity] ?? InfoCircleOutlined;
          return (
            <div
              key={insight.id}
              className={styles.insightCard}
              style={{
                background: preset.bg,
                borderColor: preset.border,
                color: preset.color,
              }}
            >
              <Icon style={{ marginRight: 8 }} />
              {insight.message}
            </div>
          );
        })
      )}
    </Card>
  );
}

export default BusinessInsightsFeed;
