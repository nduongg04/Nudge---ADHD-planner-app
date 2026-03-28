/**
 * Variant 3: Cards — 2-column glass bento grid with category color strips.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDesignSystem } from '@/hooks/use-design-system';
import {
  DateSwitcher,
  MoodCheckin,
  ProgressSummary,
  FAB,
  CardsView,
  MOCK_TASKS,
  getCompletedCount,
} from '@/components/home';

export default function CardsVariantScreen() {
  const { colors, spacing } = useDesignSystem();
  const insets = useSafeAreaInsets();

  const tasks = MOCK_TASKS;
  const completed = getCompletedCount(tasks);

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <DateSwitcher />
      <View style={{ paddingHorizontal: spacing.xl }}>
        <MoodCheckin />
        <ProgressSummary completed={completed} total={tasks.length} />
      </View>
      <View style={styles.viewContainer}>
        <CardsView tasks={tasks} />
      </View>
      <FAB />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewContainer: { flex: 1 },
});
