import { App, Button, Card } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '@/components/FormField';
import { colors } from '@/app/theme';
import { useSettingsStore } from '../store/settingsStore';

/**
 * Reusable settings tab: a card with RHF-bound fields + a Save button that
 * persists the section slice to the settings store.
 *
 * @param {object} props
 * @param {string} props.section - store slice key (profile/business/gst/store)
 * @param {import('zod').ZodTypeAny} props.schema
 * @param {object[]} props.fields - FormField prop objects (minus `control`)
 * @param {string} props.description
 */
export function SettingsForm({ section, schema, fields, description }) {
  const { message } = App.useApp();
  const defaults = useSettingsStore((s) => s[section]);
  const save = useSettingsStore((s) => s.save);
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  const onSubmit = handleSubmit((values) => {
    save(section, values);
    message.success('Settings saved');
  });

  return (
    <Card
      variant="borderless"
      style={{ border: `1px solid ${colors.border}`, boxShadow: 'none', maxWidth: 640 }}
      styles={{ body: { padding: 24 } }}
    >
      {description && (
        <p style={{ color: colors.textSecondary, marginTop: 0, marginBottom: 20 }}>{description}</p>
      )}
      <form onSubmit={onSubmit}>
        {fields.map((f) => (
          <FormField key={f.name} control={control} {...f} />
        ))}
        <Button type="primary" htmlType="submit" loading={formState.isSubmitting}>
          Save Changes
        </Button>
      </form>
    </Card>
  );
}

export default SettingsForm;
