import { Button, Card, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useReorderRecommendations } from '../hooks';
import styles from '../reorder.module.scss';

export function RecommendationCards() {
  const navigate = useNavigate();
  const { data, isLoading } = useReorderRecommendations();

  if (isLoading) return <Skeleton active paragraph={{ rows: 2 }} />;

  return (
    <div className={styles.recommendations}>
      {data?.map((item) => (
        <Card
          key={item.id}
          variant="borderless"
          className={`${styles.recCard} ${item.health === 'warning' ? styles.recCardWarning : ''}`}
        >
          <div className={styles.recTitle}>{item.productName}</div>
          <div className={styles.recMeta}>
            {item.currentStock} left · {item.daysRemaining}d remaining · order {item.suggestedQty} from {item.supplierName}
          </div>
          <Button type="primary" size="small" onClick={() => navigate('/purchases')}>
            Create Purchase
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default RecommendationCards;
