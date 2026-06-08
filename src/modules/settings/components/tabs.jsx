import { SettingsForm } from './SettingsForm';
import { profileSchema, businessSchema, gstSchema, storeSchema } from '../schemas/settingsSchema';
import { ROLE_OPTIONS, GST_SCHEME_OPTIONS } from '../constants';

/** Each tab is a thin SettingsForm config — kept tiny per user preference. */

export const ProfileTab = () => (
  <SettingsForm
    section="profile"
    schema={profileSchema}
    description="Your personal account details."
    fields={[
      { name: 'name', label: 'Full Name', required: true },
      { name: 'email', label: 'Email', required: true },
      { name: 'phone', label: 'Phone', required: true },
      { name: 'role', label: 'Role', type: 'select', required: true, options: ROLE_OPTIONS },
    ]}
  />
);

export const BusinessTab = () => (
  <SettingsForm
    section="business"
    schema={businessSchema}
    description="Pharmacy business identity printed on invoices."
    fields={[
      { name: 'businessName', label: 'Business Name', required: true },
      { name: 'ownerName', label: 'Owner Name', required: true },
      { name: 'phone', label: 'Phone', required: true },
      { name: 'email', label: 'Email' },
      { name: 'address', label: 'Address', type: 'textarea', required: true },
      { name: 'drugLicenseNo', label: 'Drug License No.', required: true },
    ]}
  />
);

export const GstTab = () => (
  <SettingsForm
    section="gst"
    schema={gstSchema}
    description="Tax registration used for GST-compliant billing."
    fields={[
      { name: 'gstin', label: 'GSTIN', required: true },
      { name: 'pan', label: 'PAN', required: true },
      { name: 'scheme', label: 'GST Scheme', type: 'select', required: true, options: GST_SCHEME_OPTIONS },
      { name: 'placeOfSupply', label: 'Place of Supply', required: true },
    ]}
  />
);

export const StoreTab = () => (
  <SettingsForm
    section="store"
    schema={storeSchema}
    description="Operational defaults for billing and stock alerts."
    fields={[
      { name: 'invoicePrefix', label: 'Invoice Prefix', required: true },
      { name: 'lowStockThreshold', label: 'Low-stock Threshold (units)', type: 'number', required: true, controlProps: { min: 0 } },
      { name: 'expiryAlertDays', label: 'Expiry Alert Window (days)', type: 'number', required: true, controlProps: { min: 1 } },
    ]}
  />
);
