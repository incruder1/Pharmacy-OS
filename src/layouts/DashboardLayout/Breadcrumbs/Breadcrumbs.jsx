import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { PATH_LABELS } from '@/config/navigation';

/** Route-driven breadcrumb trail. */
export function Breadcrumbs() {
  const { pathname } = useLocation();
  const label = PATH_LABELS[pathname] ?? PATH_LABELS[`/${pathname.split('/')[1]}`];

  return (
    <Breadcrumb
      items={[
        { title: <HomeOutlined /> },
        ...(label ? [{ title: label }] : []),
      ]}
    />
  );
}

export default Breadcrumbs;
