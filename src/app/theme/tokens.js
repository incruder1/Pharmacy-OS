/**
 * Design tokens — the single source of truth for PharmacyOS visual language.
 * Consumed by the Ant Design theme (antdTheme.js) and any custom styling.
 * Inspired by Stripe / Linear / Notion: calm neutrals, one confident accent.
 */

// ── Color palette ────────────────────────────────────────────────────────────
export const palette = {
  // Brand — indigo (trust + modern SaaS)
  brand: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5', // primary
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  // Neutral — slate
  gray: {
    25: '#fcfcfd',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: { 50: '#ecfdf5', 100: '#d1fae5', 500: '#10b981', 600: '#059669', 700: '#047857' },
  warning: { 50: '#fffbeb', 100: '#fef3c7', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
  error: { 50: '#fef2f2', 100: '#fee2e2', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c' },
  info: { 50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' },
  white: '#ffffff',
};

// Semantic colors used across the app (charts, badges, accents).
export const colors = {
  primary: palette.brand[600],
  primaryHover: palette.brand[700],
  success: palette.success[600],
  warning: palette.warning[600],
  error: palette.error[600],
  info: palette.info[600],
  textPrimary: palette.gray[900],
  textSecondary: palette.gray[500],
  textTertiary: palette.gray[400],
  border: palette.gray[200],
  bgLayout: palette.gray[50],
  bgContainer: palette.white,
  // Ordered series for charts (category pies, multi-series).
  chartSeries: ['#4f46e5', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#14b8a6'],
};

// ── Typography ────────────────────────────────────────────────────────────────
export const typography = {
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontFamilyMono: "'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, monospace",
  fontSize: { xs: 12, sm: 13, base: 14, md: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36 },
  fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeight: { tight: 1.25, snug: 1.4, normal: 1.5, relaxed: 1.65 },
};

// ── Spacing (4px base scale) ───────────────────────────────────────────────────
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};

// ── Border radius ──────────────────────────────────────────────────────────────
export const radius = { xs: 4, sm: 6, md: 8, lg: 12, xl: 16, '2xl': 20, full: 9999 };

// ── Shadows (soft, layered — Stripe-like) ───────────────────────────────────────
export const shadows = {
  xs: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
  sm: '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)',
  md: '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.05)',
  lg: '0 12px 24px -6px rgba(15, 23, 42, 0.10), 0 4px 8px -4px rgba(15, 23, 42, 0.06)',
  xl: '0 24px 48px -12px rgba(15, 23, 42, 0.18)',
};

export const tokens = { palette, colors, typography, spacing, radius, shadows };

export default tokens;
