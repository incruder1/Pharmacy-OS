import { theme as antdAlgorithms } from 'antd';
import { colors, palette, radius, typography } from './tokens';

/**
 * Maps PharmacyOS design tokens onto an Ant Design 6 theme config.
 * Passed to <ConfigProvider theme={antdTheme} />.
 */
export const antdTheme = {
  algorithm: antdAlgorithms.defaultAlgorithm,
  token: {
    colorPrimary: colors.primary,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorInfo: colors.info,
    colorLink: colors.primary,

    colorText: colors.textPrimary,
    colorTextSecondary: colors.textSecondary,
    colorTextTertiary: colors.textTertiary,
    colorBorder: colors.border,
    colorBorderSecondary: palette.gray[100],
    colorBgLayout: colors.bgLayout,
    colorBgContainer: colors.bgContainer,

    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.base,
    fontSizeHeading1: typography.fontSize['3xl'],
    fontSizeHeading2: typography.fontSize['2xl'],
    fontSizeHeading3: typography.fontSize.xl,
    fontSizeHeading4: typography.fontSize.lg,

    borderRadius: radius.md,
    borderRadiusLG: radius.lg,
    borderRadiusSM: radius.sm,

    controlHeight: 38,
    controlHeightLG: 44,
    controlHeightSM: 30,
    wireframe: false,
  },
  components: {
    Layout: {
      headerBg: colors.bgContainer,
      bodyBg: colors.bgLayout,
      siderBg: colors.bgContainer,
      headerHeight: 60,
      headerPadding: '0 24px',
    },
    Menu: {
      itemBorderRadius: radius.sm,
      itemHeight: 40,
      itemMarginInline: 8,
      itemSelectedBg: palette.brand[50],
      itemSelectedColor: colors.primary,
      iconSize: 18,
    },
    Card: {
      borderRadiusLG: radius.lg,
      paddingLG: 20,
    },
    Button: {
      controlHeight: 38,
      fontWeight: typography.fontWeight.medium,
      primaryShadow: 'none',
      defaultShadow: 'none',
    },
    Table: {
      headerBg: palette.gray[50],
      headerColor: colors.textSecondary,
      headerSplitColor: 'transparent',
      borderColor: palette.gray[100],
      rowHoverBg: palette.gray[50],
      cellPaddingBlock: 12,
    },
    Statistic: {
      titleFontSize: typography.fontSize.sm,
    },
    Segmented: {
      itemSelectedBg: colors.bgContainer,
      trackBg: palette.gray[100],
    },
    Tag: {
      borderRadiusSM: radius.full,
    },
  },
};

export default antdTheme;
