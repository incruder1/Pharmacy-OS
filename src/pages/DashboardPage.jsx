import { DashboardPage as DashboardScreen } from '@/modules/dashboard';

/**
 * Thin route component for the Dashboard. Page components stay minimal —
 * all logic lives in the feature module.
 */
export default function DashboardPage() {
  return <DashboardScreen />;
}
