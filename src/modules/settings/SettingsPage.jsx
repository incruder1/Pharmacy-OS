import { Tabs } from 'antd';
import { PageHeader } from '@/components/PageHeader';
import { SETTINGS_TABS } from './constants';
import { ProfileTab, BusinessTab, GstTab, StoreTab } from './components';

const CONTENT = {
  profile: <ProfileTab />,
  business: <BusinessTab />,
  gst: <GstTab />,
  store: <StoreTab />,
};

/** Settings screen — tabbed forms persisted to localStorage. */
export function SettingsPage() {
  const items = SETTINGS_TABS.map((t) => ({ key: t.key, label: t.label, children: CONTENT[t.key] }));

  return (
    <div className="po-fade-in">
      <PageHeader title="Settings" subtitle="Profile, business, GST & store preferences" />
      <Tabs items={items} />
    </div>
  );
}

export default SettingsPage;
