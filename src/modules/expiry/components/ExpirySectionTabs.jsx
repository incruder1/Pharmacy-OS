import { Segmented } from 'antd';
import { EXPIRY_WINDOWS } from '../constants';
import { useExpiryStore } from '../store/expiryStore';
import styles from '../expiry.module.scss';

export function ExpirySectionTabs() {
  const window = useExpiryStore((s) => s.window);
  const setWindow = useExpiryStore((s) => s.setWindow);

  return (
    <div className={styles.windowTabs}>
      <Segmented
        block
        size="large"
        options={EXPIRY_WINDOWS.map((w) => ({ value: w.value, label: w.label }))}
        value={window}
        onChange={setWindow}
      />
    </div>
  );
}

export default ExpirySectionTabs;
