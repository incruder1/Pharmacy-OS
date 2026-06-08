import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Persisted app settings (localStorage). Each tab owns one section slice and
 * patches it via `save`. Defaults seed a realistic Indian medical store.
 */
export const useSettingsStore = create(
  persist(
    (set) => ({
      profile: { name: 'Dr. Anjali Verma', email: 'anjali@medicostore.in', phone: '+91 98200 33445', role: 'owner' },
      business: {
        businessName: 'MediCare Pharmacy',
        ownerName: 'Anjali Verma',
        phone: '+91 98200 33445',
        email: 'contact@medicarepharmacy.in',
        address: 'Shop 14, MG Road, Pune, Maharashtra 411001',
        drugLicenseNo: 'MH-PUN-20B-45231',
      },
      gst: { gstin: '27ABCDE1234F1Z5', pan: 'ABCDE1234F', scheme: 'regular', placeOfSupply: 'Maharashtra' },
      store: { invoicePrefix: 'INV', lowStockThreshold: 30, expiryAlertDays: 90 },

      save: (section, values) => set((s) => ({ [section]: { ...s[section], ...values } })),
    }),
    { name: 'pharmacyos-settings' },
  ),
);

export default useSettingsStore;
