/**
 * Theme configuration — bridges old Colors API with the new design system.
 * Import from @/constants/design-system for full design tokens.
 */

import { LightTheme, DarkTheme, FontFamily } from '@/constants/design-system';

// Legacy-compatible Colors export so existing components keep working
export const Colors = {
  light: {
    text: LightTheme.textPrimary,
    background: LightTheme.background,
    tint: LightTheme.accent,
    icon: LightTheme.textTertiary,
    tabIconDefault: LightTheme.tabIconDefault,
    tabIconSelected: LightTheme.tabIconSelected,
  },
  dark: {
    text: DarkTheme.textPrimary,
    background: DarkTheme.background,
    tint: DarkTheme.accent,
    icon: DarkTheme.textTertiary,
    tabIconDefault: DarkTheme.tabIconDefault,
    tabIconSelected: DarkTheme.tabIconSelected,
  },
};

export const Fonts = FontFamily;
