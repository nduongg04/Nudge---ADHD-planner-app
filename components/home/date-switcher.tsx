/**
 * DateSwitcher — Gentler Streak style header with glass profile button.
 * Left-aligned "Today" title with date below, glass profile button on right.
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlassView } from '@/components/ui/glass';
import { useDesignSystem } from '@/hooks/use-design-system';
import { IconSymbol } from '@/components/ui/icon-symbol';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatDate(date: Date) {
  const month = MONTHS[date.getMonth()];
  const num = date.getDate();
  const year = date.getFullYear();
  const day = DAYS[date.getDay()];
  return { day, dateString: `${month} ${num}, ${year}` };
}

export function DateSwitcher() {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const today = new Date();
  const { dateString } = formatDate(today);

  return (
    <View style={[styles.container, { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.sm }]}>
      {/* Left: greeting + title */}
      <View style={styles.textBlock}>
        <Text style={[typography.subheadline, { color: colors.textSecondary }]}>
          Hi there,
        </Text>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Today
        </Text>
        <Text style={[typography.subheadline, { color: colors.textSecondary, marginTop: 2 }]}>
          {dateString}
        </Text>
      </View>

      {/* Right: glass profile circle */}
      <Pressable>
        <GlassView
          intensity="medium"
          style={[
            styles.profileButton,
            { borderRadius: radius.full },
          ]}>
          <IconSymbol name="user" size={20} color={colors.accent} />
        </GlassView>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
    letterSpacing: 0.37,
  },
  profileButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
