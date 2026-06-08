import { App } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

/**
 * Hook returning an imperative confirm dialog backed by antd's App context
 * (v6-safe — no static Modal.confirm). Resolves nothing; runs `onOk`.
 *
 * @returns {{ confirm: (opts: {
 *   title: string,
 *   content?: import('react').ReactNode,
 *   okText?: string,
 *   danger?: boolean,
 *   onOk: () => void | Promise<void>,
 * }) => void }}
 */
export function useConfirm() {
  const { modal } = App.useApp();

  const confirm = ({ title, content, okText = 'Confirm', danger = false, onOk }) => {
    modal.confirm({
      title,
      content,
      icon: <ExclamationCircleFilled style={{ color: danger ? '#dc2626' : '#f59e0b' }} />,
      okText,
      okButtonProps: { danger },
      cancelText: 'Cancel',
      centered: true,
      onOk,
    });
  };

  return { confirm };
}

export default useConfirm;
