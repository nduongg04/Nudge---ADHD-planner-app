/**
 * MoodCheckin — iOS 26 Liquid Glass mood selector.
 * Wrapped in GlassCard. Unselected pills use translucent glass bg.
 * Selected: orange background + white text.
 */

import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { GlassCard } from '@/components/ui/glass';
import { IconSymbol, type IconName } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';

interface MoodOption {
  key: string;
  icon: IconName;
  label: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  { key: 'great', icon: 'sparkles', label: 'Great' },
  { key: 'good', icon: 'sun', label: 'Good' },
  { key: 'okay', icon: 'eye', label: 'Okay' },
  { key: 'low', icon: 'moon', label: 'Low' },
  { key: 'tough', icon: 'heart', label: 'Tough' },
];

export function MoodCheckin() {
  const { colors, typography, spacing } = useDesignSystem();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <GlassCard intensity="subtle" tinted style={{ marginBottom: spacing.md }}>
      <Text style={[typography.subheadline, { color: colors.textSecondary, marginBottom: spacing.md }]}>
        How are you feeling today?
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}>
        {MOOD_OPTIONS.map((mood) => {
          const isSelected = selected === mood.key;
          return (
            <Pressable
              key={mood.key}
              onPress={() => setSelected(mood.key === selected ? null : mood.key)}
              style={[
                styles.pill,
                {
                  backgroundColor: isSelected ? colors.accent : colors.glass,
                  borderRadius: 9999,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.sm,
                  marginRight: spacing.sm,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: isSelected ? colors.accent : colors.glassBorder,
                },
              ]}>
              <IconSymbol
                name={mood.icon}
                size={16}
                color={isSelected ? '#FFFFFF' : colors.textTertiary}
              />
              <Text
                style={[
                  typography.subheadline,
                  {
                    color: isSelected ? '#FFFFFF' : colors.textSecondary,
                    marginLeft: spacing.xs,
                  },
                ]}>
                {mood.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
