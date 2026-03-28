/**
 * TaskCard — Solid card with subtle shadow.
 * Active tasks: accent left border.
 * Completed tasks: reduced opacity + strikethrough.
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';
import { HomeContent } from '@/constants/design-system';
import type { Task } from './mock-data';

interface TaskCardProps {
  task: Task;
  compact?: boolean;
  onPress?: (task: Task) => void;
}

export function TaskCard({ task, compact = false, onPress }: TaskCardProps) {
  const { colors, typography, spacing, radius, shadows, isDark } = useDesignSystem();
  const isCompleted = task.status === 'completed';


  return (
    <Pressable onPress={() => onPress?.(task)} style={{ marginBottom: HomeContent.cardGap }}>
      <View
        style={[
          shadows.lg,
          {
            backgroundColor: isDark ? colors.backgroundElevated : '#FFFFFF',
            borderRadius: radius.xl,
            paddingVertical: compact ? HomeContent.cardPaddingCompact : HomeContent.cardPadding,
            paddingHorizontal: compact ? HomeContent.cardPaddingCompact : 10,
            opacity: isCompleted ? 0.55 : 1,
          },
        ]}>
        <View style={styles.row}>
          {/* Icon container */}
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: isCompleted
                  ? colors.completedSoft
                  : isDark ? colors.glass : colors.backgroundSubtle,
                borderRadius: 12,
                width: compact ? HomeContent.cardIconSizeCompact : HomeContent.cardIconSize,
                height: compact ? HomeContent.cardIconSizeCompact : HomeContent.cardIconSize,
              },
            ]}>
            <Text style={{ fontSize: compact ? 16 : 20 }}>{task.emoji}</Text>
          </View>

          {/* Content */}
          <View style={[styles.content, { marginLeft: spacing.sm }]}>
            <Text
              style={[
                compact ? typography.subheadline : typography.body,
                {
                  fontSize: compact ? HomeContent.titleCompactSize : HomeContent.titleSize,
                  color: isCompleted ? colors.textTertiary : colors.textPrimary,
                  textDecorationLine: isCompleted ? 'line-through' : 'none',
                },
              ]}
              numberOfLines={1}>
              {task.title}
            </Text>

            <View style={[styles.meta, { marginTop: 2 }]}>
              {task.startTime && (
                <Text style={[typography.caption1, { color: colors.textTertiary, fontSize: HomeContent.captionSize }]}>
                  {task.startTime}
                </Text>
              )}
              <Text
                style={[
                  typography.caption1,
                  { color: colors.textTertiary, fontSize: HomeContent.captionSize, marginLeft: task.startTime ? spacing.sm : 0 },
                ]}>
                {task.duration}m
              </Text>
              {task.subtasksTotal != null && task.subtasksTotal > 0 && (
                <Text
                  style={[
                    typography.caption1,
                    { color: colors.textTertiary, fontSize: HomeContent.captionSize, marginLeft: spacing.sm },
                  ]}>
                  {task.subtasksDone}/{task.subtasksTotal}
                </Text>
              )}
            </View>
          </View>

          {/* Checkbox — rounded square */}
          <View
            style={[
              styles.checkbox,
              {
                borderColor: isCompleted ? colors.accent : colors.border,
                backgroundColor: isCompleted ? colors.accent : 'transparent',
                width: compact ? HomeContent.cardCheckboxSizeCompact : HomeContent.cardCheckboxSize,
                height: compact ? HomeContent.cardCheckboxSizeCompact : HomeContent.cardCheckboxSize,
                borderRadius: 9999,
              },
            ]}>
            {isCompleted && (
              <IconSymbol name="check" size={compact ? 11 : 13} color="#FFFFFF" />
            )}
          </View>
        </View>

        {/* Subtask progress bar */}
        {task.subtasksTotal != null && task.subtasksTotal > 0 && !compact && (
          <View
            style={[
              styles.progressTrack,
              {
                backgroundColor: isDark ? colors.glass : colors.backgroundSubtle,
                borderRadius: 9999,
                marginTop: spacing.sm,
                height: 4,
              },
            ]}>
            <View
              style={{
                backgroundColor: isCompleted ? colors.completed : colors.accent,
                borderRadius: 9999,
                width: `${((task.subtasksDone ?? 0) / task.subtasksTotal) * 100}%`,
                height: 4,
              }}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    overflow: 'hidden',
  },
});
