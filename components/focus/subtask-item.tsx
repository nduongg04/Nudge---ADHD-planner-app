/**
 * SubtaskItem — Glass-card subtask row with checkbox for Focus sessions.
 * Matches the Tiimo-style checklist: emoji + title + circular checkbox.
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlassCard } from '@/components/ui/glass';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';
import * as Haptics from 'expo-haptics';

export interface FocusSubtask {
  id: string;
  title: string;
  emoji: string;
  completed: boolean;
}

interface SubtaskItemProps {
  subtask: FocusSubtask;
  onToggle: () => void;
}

export function SubtaskItem({ subtask, onToggle }: SubtaskItemProps) {
  const { colors, typography, spacing, radius } = useDesignSystem();

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };

  return (
    <Pressable onPress={handleToggle}>
      <GlassCard intensity="subtle" style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.emoji}>{subtask.emoji}</Text>
          <Text
            style={[
              typography.body,
              {
                flex: 1,
                marginLeft: spacing.md,
                color: subtask.completed
                  ? colors.textTertiary
                  : colors.textPrimary,
                textDecorationLine: subtask.completed
                  ? 'line-through'
                  : 'none',
              },
            ]}
            numberOfLines={1}
          >
            {subtask.title}
          </Text>
          <View
            style={[
              styles.checkbox,
              {
                borderRadius: radius.full,
                borderColor: subtask.completed
                  ? colors.textPrimary
                  : colors.textTertiary,
                backgroundColor: subtask.completed
                  ? colors.textPrimary
                  : 'transparent',
              },
            ]}
          >
            {subtask.completed && (
              <IconSymbol name="check" size={14} color="#fff" />
            )}
          </View>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center' },
  emoji: { fontSize: 24 },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
