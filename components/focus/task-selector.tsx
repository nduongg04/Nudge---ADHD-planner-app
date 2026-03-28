/**
 * TaskSelector — Expandable task picker for Focus sessions.
 * Shows selected task; expands to reveal task list + create-new input.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  LayoutAnimation,
  StyleSheet,
  Platform,
  UIManager,
} from 'react-native';
import { GlassCard, GlassView } from '@/components/ui/glass';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';
import * as Haptics from 'expo-haptics';
import type { Task } from '@/components/home/mock-data';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export interface SelectedTask {
  emoji: string;
  title: string;
}

interface TaskSelectorProps {
  tasks: Task[];
  selectedTask: SelectedTask | null;
  onSelectTask: (task: SelectedTask | null) => void;
}

export function TaskSelector({
  tasks,
  selectedTask,
  onSelectTask,
}: TaskSelectorProps) {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const [expanded, setExpanded] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const pendingTasks = tasks.filter(
    (t) => t.status === 'pending' || t.status === 'in_progress',
  );

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.selectionAsync();
    setExpanded(!expanded);
  };

  const handleSelect = (task: SelectedTask | null) => {
    Haptics.selectionAsync();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onSelectTask(task);
    setExpanded(false);
  };

  const handleCreateTask = () => {
    if (newTaskName.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onSelectTask({ emoji: '📌', title: newTaskName.trim() });
      setNewTaskName('');
      setExpanded(false);
    }
  };

  const displayEmoji = selectedTask?.emoji ?? '🎯';
  const displayTitle = selectedTask?.title ?? 'General focus';

  return (
    <View style={{ width: '100%' }}>
      {/* Selected task row */}
      <Pressable onPress={toggleExpand}>
        <GlassCard intensity="subtle" style={styles.selectedRow}>
          <View style={styles.row}>
            <Text style={styles.emoji}>{displayEmoji}</Text>
            <Text
              style={[
                typography.bodySemibold,
                {
                  color: colors.textPrimary,
                  flex: 1,
                  marginLeft: spacing.md,
                },
              ]}
              numberOfLines={1}
            >
              {displayTitle}
            </Text>
            <IconSymbol
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={colors.textTertiary}
            />
          </View>
        </GlassCard>
      </Pressable>

      {/* Expanded task list */}
      {expanded && (
        <View style={{ gap: spacing.xs, marginTop: spacing.xs }}>
          {/* General focus option */}
          {selectedTask !== null && (
            <Pressable onPress={() => handleSelect(null)}>
              <GlassView
                intensity="subtle"
                style={[styles.optionRow, { borderRadius: radius.xl }]}
              >
                <Text style={styles.optionEmoji}>🎯</Text>
                <Text
                  style={[
                    typography.body,
                    {
                      color: colors.textPrimary,
                      marginLeft: spacing.md,
                    },
                  ]}
                >
                  General focus
                </Text>
              </GlassView>
            </Pressable>
          )}

          {/* Available tasks */}
          {pendingTasks.map((task) => (
            <Pressable
              key={task.id}
              onPress={() =>
                handleSelect({ emoji: task.emoji, title: task.title })
              }
            >
              <GlassView
                intensity="subtle"
                style={[styles.optionRow, { borderRadius: radius.xl }]}
              >
                <Text style={styles.optionEmoji}>{task.emoji}</Text>
                <Text
                  style={[
                    typography.body,
                    {
                      color: colors.textPrimary,
                      flex: 1,
                      marginLeft: spacing.md,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {task.title}
                </Text>
                <Text
                  style={[
                    typography.caption1,
                    { color: colors.textTertiary },
                  ]}
                >
                  {task.duration}m
                </Text>
              </GlassView>
            </Pressable>
          ))}

          {/* Create new task */}
          <GlassView
            intensity="subtle"
            style={[styles.createRow, { borderRadius: radius.xl }]}
          >
            <IconSymbol name="plus" size={16} color={colors.focus} />
            <TextInput
              value={newTaskName}
              onChangeText={setNewTaskName}
              placeholder="Create new task..."
              placeholderTextColor={colors.textTertiary}
              style={[
                typography.body,
                {
                  flex: 1,
                  marginLeft: spacing.sm,
                  color: colors.textPrimary,
                  paddingVertical: 0,
                },
              ]}
              onSubmitEditing={handleCreateTask}
              returnKeyType="done"
            />
          </GlassView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectedRow: { padding: 14 },
  row: { flexDirection: 'row', alignItems: 'center' },
  emoji: { fontSize: 24 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  optionEmoji: { fontSize: 20 },
  createRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
});
