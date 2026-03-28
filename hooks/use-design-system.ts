/**
 * Hook to access the full design system theme based on current color scheme.
 */

import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  LightTheme,
  DarkTheme,
  Typography,
  Spacing,
  Radius,
  Shadows,
  BlurIntensity,
  Animation,
  type ThemeColors,
} from '@/constants/design-system';

export function useDesignSystem() {
  const scheme = useColorScheme() ?? 'light';
  const colors: ThemeColors = scheme === 'dark' ? DarkTheme : LightTheme;
  const isDark = scheme === 'dark';

  return {
    colors,
    typography: Typography,
    spacing: Spacing,
    radius: Radius,
    shadows: Shadows,
    blur: BlurIntensity,
    animation: Animation,
    isDark,
  };
}
