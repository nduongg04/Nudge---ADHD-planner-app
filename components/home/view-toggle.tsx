/**
 * ViewToggle — iOS 26 Liquid Glass segmented control.
 * Glass container with heavier glass active tab (not flat white).
 */

import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { GlassView } from '@/components/ui/glass';
import { IconSymbol, type IconName } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';

export type HomeViewMode = 'timeline' | 'list' | 'cards' | 'focus' | 'empty';

interface ViewToggleProps {
  activeMode: HomeViewMode;
  onModeChange: (mode: HomeViewMode) => void;
}

const MODES: { key: HomeViewMode; label: string; icon: IconName }[] = [
  { key: 'timeline', label: 'Timeline', icon: 'clock' },
  { key: 'list', label: 'List', icon: 'bars-3' },
  { key: 'cards', label: 'Cards', icon: 'squares' },
  { key: 'focus', label: 'Focus', icon: 'eye' },
];

export function ViewToggle({ activeMode, onModeChange }: ViewToggleProps) {
  const { colors, typography, spacing, radius } = useDesignSystem();

  return (
    <GlassView
      intensity="medium"
      style={[styles.container, { borderRadius: radius['2xl'], padding: spacing.xs }]}>
      {MODES.map((mode) => {
        const isActive = activeMode === mode.key;
        return (
          <Pressable
            key={mode.key}
            onPress={() => onModeChange(mode.key)}
            style={[
              styles.tab,
              {
                backgroundColor: isActive ? colors.glassHeavy : 'transparent',
                borderRadius: radius.xl,
                paddingVertical: spacing.sm + 2,
                paddingHorizontal: spacing.lg,
                borderWidth: isActive ? StyleSheet.hairlineWidth : 0,
                borderColor: isActive ? colors.glassBorder : 'transparent',
              },
            ]}>
            <IconSymbol
              name={mode.icon}
              size={12}
              color={isActive ? colors.accent : colors.textTertiary}
            />
            <Text
              style={[
                typography.caption1,
                {
                  color: isActive ? colors.accent : colors.textTertiary,
                  fontWeight: isActive ? '600' : '400',
                  marginLeft: 4,
                },
              ]}>
              {mode.label}
            </Text>
          </Pressable>
        );
      })}
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
