import { DatePicker, Select } from 'antd';
import { NOTIFICATION_TYPES } from '../constants';
import { useNotificationsStore } from '../store/notificationsStore';

const { RangePicker } = DatePicker;

export function NotificationFilters() {
  const typeFilter = useNotificationsStore((s) => s.typeFilter);
  const setTypeFilter = useNotificationsStore((s) => s.setTypeFilter);
  const setDateRange = useNotificationsStore((s) => s.setDateRange);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
      <Select
        allowClear
        placeholder="Filter by type"
        style={{ minWidth: 160 }}
        value={typeFilter}
        onChange={setTypeFilter}
        options={NOTIFICATION_TYPES.map((t) => ({ value: t.value, label: t.label }))}
      />
      <RangePicker
        onChange={(dates) =>
          setDateRange(dates ? [dates[0]?.toISOString(), dates[1]?.toISOString()] : undefined)
        }
      />
    </div>
  );
}

export default NotificationFilters;
