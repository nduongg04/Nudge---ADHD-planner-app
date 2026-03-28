/**
 * GlassView — iOS 26 native Liquid Glass container.
 * Uses expo-glass-effect's native GlassView (UIVisualEffectView) on iOS 26+.
 * Falls back to expo-blur BlurView on older platforms.
 */

import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import {
  GlassView as NativeGlassView,
  isLiquidGlassAvailable,
} from 'expo-glass-effect';
import { BlurView } from 'expo-blur';
import { useDesignSystem } from '@/hooks/use-design-system';
import { BlurIntensity } from '@/constants/design-system';

const USE_NATIVE_GLASS = isLiquidGlassAvailable();

type GlassIntensity = keyof typeof BlurIntensity;

export type GlassViewProps = ViewProps & {
  /** Blur intensity — maps to native glassEffectStyle or expo-blur intensity */
  intensity?: GlassIntensity;
  /** Apply a tinted overlay */
  tinted?: boolean;
  /** Make the glass surface respond to touches with native press effect (iOS 26 only) */
  isInteractive?: boolean;
  /** Native glass style variant: default 'regular', or 'clear' for more transparent */
  glassEffectStyle?: 'regular' | 'clear';
};

export function GlassView({
  intensity = 'medium',
  tinted = false,
  isInteractive = false,
  glassEffectStyle,
  style,
  children,
  ...rest
}: GlassViewProps) {
  const { colors, isDark, radius } = useDesignSystem();

  if (USE_NATIVE_GLASS) {
    // Native iOS 26 Liquid Glass
    return (
      <NativeGlassView
        isInteractive={isInteractive}
        glassEffectStyle={glassEffectStyle ?? (tinted ? 'clear' : undefined)}
        style={[
          styles.nativeContainer,
          { borderRadius: radius.xl },
          style,
        ]}
        {...rest}>
        {children}
      </NativeGlassView>
    );
  }

  // Fallback: expo-blur for older iOS / Android
  return (
    <View
      style={[
        styles.fallbackContainer,
        { borderRadius: radius.xl, borderColor: colors.glassBorder },
        style,
      ]}
      {...rest}>
      <BlurView
        intensity={BlurIntensity[intensity]}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: tinted ? colors.glassTint : colors.glass,
            borderRadius: radius.xl,
          },
        ]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  nativeContainer: {
    overflow: 'hidden',
  },
  fallbackContainer: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
