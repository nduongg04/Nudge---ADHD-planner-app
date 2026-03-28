/**
 * Variant 4: Focus — Immersive glass timer with single-task view.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDesignSystem } from '@/hooks/use-design-system';
import { FocusModeView, MOCK_TASKS } from '@/components/home';

export default function FocusVariantScreen() {
  const { colors } = useDesignSystem();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <FocusModeView tasks={MOCK_TASKS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
