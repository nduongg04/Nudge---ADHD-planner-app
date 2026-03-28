/**
 * SectionHeader — Time-of-day section label (like Tiimo: Morning, Day, Evening).
 * iOS 26 Liquid Glass: glass badge with colored dot indicator.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlassView } from '@/components/ui/glass';
import { useDesignSystem } from '@/hooks/use-design-system';
import { IconSymbol, type IconName } from '@/components/ui/icon-symbol';
import { TaskCategories } from '@/constants/design-system';
import type { TimeOfDay } from './mock-data';

const SECTION_ICONS: Record<TimeOfDay, IconName> = {
  anytime: 'clock',
  morning: 'sun',
  day: 'sparkles',
  evening: 'moon',
};

const CATEGORY_COLORS: Record<TimeOfDay, string> = {
  anytime: '#D6D3D1',
  morning: '#FDBA74',
  day: '#93C5FD',
  evening: '#C4B5FD',
};

interface SectionHeaderProps {
  timeOfDay: TimeOfDay;
  count: number;
  children: React.ReactNode;
}

export function SectionHeader({ timeOfDay, count, children }: SectionHeaderProps) {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const [expanded, setExpanded] = useState(true);
  const category = TaskCategories[timeOfDay];
  const categoryColor = CATEGORY_COLORS[timeOfDay];

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        style={[styles.header, { marginBottom: spacing.sm, paddingHorizontal: spacing.xs }]}>
        <GlassView
          intensity="subtle"
          style={{
            borderRadius: radius.full,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.xs,
          }}>
          <View style={styles.badgeInner}>
            {/* Colored dot indicator */}
            <View
              style={[
                styles.categoryDot,
                { backgroundColor: categoryColor },
              ]}
            />
            <IconSymbol name={SECTION_ICONS[timeOfDay]} size={14} color={colors.textSecondary} />
            <Text
              style={[
                typography.subheadlineSemibold,
                { color: colors.textPrimary, marginLeft: spacing.sm, textTransform: 'uppercase' },
              ]}>
              {category.label}
            </Text>
            <Text
              style={[
                typography.subheadline,
                { color: colors.textTertiary, marginLeft: spacing.xs },
              ]}>
              ({count})
            </Text>
          </View>
        </GlassView>

        <IconSymbol
          name="chevron-right"
          size={14}
          color={colors.textTertiary}
          style={expanded ? { transform: [{ rotate: '90deg' }] } : undefined}
        />
      </Pressable>

      {expanded && children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
});
