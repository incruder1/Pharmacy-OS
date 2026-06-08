import { Tag } from 'antd';
import { STATUS_PRESETS } from './statusPresets';

/**
 * A pill-style status tag. Pass a known `status` key, or override color/label.
 *
 * @param {object} props
 * @param {keyof typeof STATUS_PRESETS} [props.status]
 * @param {string} [props.color]
 * @param {string} [props.label]
 */
export function StatusBadge({ status, color, label }) {
  const preset = status ? STATUS_PRESETS[status] : undefined;
  const resolvedColor = color ?? preset?.color ?? 'default';
  const resolvedLabel = label ?? preset?.label ?? status ?? '—';

  return (
    <Tag color={resolvedColor} style={{ margin: 0, fontWeight: 500, borderRadius: 999 }}>
      {resolvedLabel}
    </Tag>
  );
}

export default StatusBadge;
