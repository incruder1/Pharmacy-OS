import { Typography } from 'antd';
import { MedicineBoxFilled } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE } from '@/constants/app';
import styles from './AuthLayout.module.scss';

const { Title, Text } = Typography;

/** Centered split-screen shell for auth screens (login / signup). */
export function AuthLayout() {
  return (
    <div className={styles.shell}>
      <div className={styles.brandPane}>
        <MedicineBoxFilled style={{ fontSize: 40 }} />
        <Title style={{ color: '#fff', margin: 0 }}>{APP_NAME}</Title>
        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16 }}>{APP_TAGLINE}</Text>
      </div>
      <div className={styles.formPane}>
        <div className={styles.formCard}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
