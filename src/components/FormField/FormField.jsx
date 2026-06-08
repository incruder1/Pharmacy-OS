import { Controller } from 'react-hook-form';
import { DatePicker, Input, InputNumber, Select, Typography } from 'antd';
import { colors } from '@/app/theme';

const { Text } = Typography;
const { TextArea } = Input;

/**
 * Render the right antd control for a field `type`, wired to RHF's field API.
 * @param {string} type
 * @param {object} field
 * @param {object} rest
 */
function renderControl(type, field, rest) {
  const common = { ...field, status: rest.status, ...rest.controlProps };
  switch (type) {
    case 'number':
      return <InputNumber {...common} style={{ width: '100%' }} placeholder={rest.placeholder} />;
    case 'textarea':
      return <TextArea {...common} rows={rest.rows ?? 3} placeholder={rest.placeholder} />;
    case 'select':
      return (
        <Select
          {...common}
          options={rest.options}
          placeholder={rest.placeholder}
          showSearch
          optionFilterProp="label"
          allowClear={rest.allowClear}
          mode={rest.mode}
        />
      );
    case 'date':
      return <DatePicker {...common} style={{ width: '100%' }} format="DD MMM YYYY" />;
    case 'password':
      return <Input.Password {...common} placeholder={rest.placeholder} />;
    default:
      return <Input {...common} placeholder={rest.placeholder} prefix={rest.prefix} />;
  }
}

/**
 * Controlled form field: label + antd control bound via RHF Controller + error.
 * Pass `render` or `children` (as a function of field) for fully custom controls.
 *
 * @param {object} props
 * @param {import('react-hook-form').Control} props.control
 * @param {string} props.name
 * @param {string} [props.label]
 * @param {'text'|'number'|'textarea'|'select'|'date'|'password'} [props.type]
 * @param {string} [props.placeholder]
 * @param {{ label: string, value: any }[]} [props.options]
 * @param {boolean} [props.required]
 * @param {string} [props.hint]
 * @param {(field: object) => import('react').ReactNode} [props.render]
 * @param {object} [props.controlProps]
 */
export function FormField({
  control,
  name,
  label,
  type = 'text',
  required,
  hint,
  render,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div style={{ marginBottom: 18 }}>
          {label && (
            <label
              style={{
                display: 'block',
                marginBottom: 6,
                fontSize: 13,
                fontWeight: 500,
                color: colors.textSecondary,
              }}
            >
              {label} {required && <span style={{ color: colors.error }}>*</span>}
            </label>
          )}
          {render
            ? render(field)
            : renderControl(type, field, { ...rest, status: fieldState.error ? 'error' : undefined })}
          {fieldState.error ? (
            <Text style={{ color: colors.error, fontSize: 12, display: 'block', marginTop: 4 }}>
              {fieldState.error.message}
            </Text>
          ) : (
            hint && (
              <Text style={{ color: colors.textTertiary, fontSize: 12, display: 'block', marginTop: 4 }}>
                {hint}
              </Text>
            )
          )}
        </div>
      )}
    />
  );
}

export default FormField;
