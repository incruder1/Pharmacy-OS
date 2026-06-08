import { Button, Drawer, Flex } from 'antd';

/**
 * A right-side Drawer scaffold for create/edit forms. Renders form children and
 * a sticky footer with Cancel/Save. Designed to pair with react-hook-form:
 * wire `onSubmit` to `handleSubmit(...)` and pass `loading` from the mutation.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {() => void} props.onSubmit
 * @param {string} props.title
 * @param {import('react').ReactNode} props.children
 * @param {boolean} [props.loading]
 * @param {string} [props.submitLabel]
 * @param {number} [props.width]
 * @param {import('react').ReactNode} [props.footerExtra] - extra left-aligned footer content
 */
export function DrawerForm({
  open,
  onClose,
  onSubmit,
  title,
  children,
  loading = false,
  submitLabel = 'Save',
  width = 480,
  footerExtra,
}) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      width={width}
      destroyOnHidden
      maskClosable={!loading}
      footer={
        <Flex align="center" justify="space-between" gap={12}>
          <div>{footerExtra}</div>
          <Flex gap={8}>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="primary" onClick={onSubmit} loading={loading}>
              {submitLabel}
            </Button>
          </Flex>
        </Flex>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {children}
      </form>
    </Drawer>
  );
}

export default DrawerForm;
