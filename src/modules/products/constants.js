/** Product categories used across the app. */
export const PRODUCT_CATEGORIES = [
  'Tablet',
  'Capsule',
  'Syrup',
  'Injection',
  'Topical',
  'Drops',
  'Others',
];

/** GST slabs applicable to pharma goods in India. */
export const GST_RATES = [0, 5, 12, 18, 28];

export const CATEGORY_OPTIONS = PRODUCT_CATEGORIES.map((c) => ({ label: c, value: c }));
export const GST_OPTIONS = GST_RATES.map((r) => ({ label: `${r}%`, value: r }));

export const DEFAULT_PAGE_SIZE = 10;
