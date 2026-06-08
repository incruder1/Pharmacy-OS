import { Button, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

/**
 * Row-action overflow menu — a `MoreOutlined` trigger that opens a dropdown of
 * actions. Keeps tables tidy instead of a sprawl of inline buttons.
 *
 * @param {object} props
 * @param {{ key: string, label: string, icon?: import('react').ReactNode, danger?: boolean, disabled?: boolean, onClick: () => void }[]} props.items
 * @param {import('react').ReactNode} [props.trigger]
 */
export function ActionMenu({ items, trigger }) {
  const menuItems = items.map(({ key, label, icon, danger, disabled }) => ({
    key,
    label,
    icon,
    danger,
    disabled,
  }));

  const onClick = ({ key, domEvent }) => {
    domEvent.stopPropagation();
    items.find((item) => item.key === key)?.onClick?.();
  };

  return (
    <Dropdown menu={{ items: menuItems, onClick }} trigger={['click']} placement="bottomRight">
      {trigger ?? (
        <Button
          type="text"
          icon={<MoreOutlined />}
          onClick={(e) => e.stopPropagation()}
          aria-label="Row actions"
        />
      )}
    </Dropdown>
  );
}

export default ActionMenu;
