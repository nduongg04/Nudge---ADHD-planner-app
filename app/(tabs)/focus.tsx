/**
 * Focus Tab — Single-screen dial selector → active session → completion.
 * No separate setup screen. Drag the ring to set time, pick a task, and go.
 */

import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDesignSystem } from '@/hooks/use-design-system';
import { GlassView } from '@/components/ui/glass';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { MOCK_TASKS } from '@/components/home/mock-data';
import { TimerDial } from '@/components/focus/timer-dial';
import { TaskSelector, type SelectedTask } from '@/components/focus/task-selector';
import { FocusSession } from '@/components/focus/focus-session';
import { FocusComplete, type TaskResult } from '@/components/focus/focus-complete';
import type { FocusSubtask } from '@/components/focus/subtask-item';
import * as Haptics from 'expo-haptics';

type FocusPhase = 'idle' | 'active' | 'completed';

const AMBIANCE_OPTIONS = [
  { key: 'none', label: 'No music', emoji: '🔇' },
  { key: 'lofi', label: 'Lo-fi', emoji: '🎵' },
  { key: 'nature', label: 'Nature', emoji: '🌿' },
  { key: 'white', label: 'White noise', emoji: '☁️' },
];

const MOCK_SUBTASKS: FocusSubtask[] = [
  { id: 's1', title: 'Wake up', emoji: '🌅', completed: false },
  { id: 's2', title: 'Brush teeth', emoji: '🪥', completed: false },
  { id: 's3', title: 'Breakfast', emoji: '🍳', completed: false },
  { id: 's4', title: 'Have coffee', emoji: '☕', completed: false },
];

function formatTimeLabel(date: Date): string {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function FocusScreen() {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const insets = useSafeAreaInsets();

  const [phase, setPhase] = useState<FocusPhase>('idle');
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [selectedTask, setSelectedTask] = useState<SelectedTask | null>(null);
  const [ambianceIndex, setAmbianceIndex] = useState(0);
  const [subtasks, setSubtasks] = useState<FocusSubtask[]>(MOCK_SUBTASKS);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [sessionStart, setSessionStart] = useState(() => new Date());

  const ambiance = AMBIANCE_OPTIONS[ambianceIndex];
  const taskTitle = selectedTask?.title ?? 'General focus';
  const taskEmoji = selectedTask?.emoji ?? '🎯';

  const cycleAmbiance = () => {
    Haptics.selectionAsync();
    setAmbianceIndex((i) => (i + 1) % AMBIANCE_OPTIONS.length);
  };

  const handleStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSubtasks(MOCK_SUBTASKS.map((s) => ({ ...s, completed: false })));
    setElapsedSeconds(0);
    setSessionStart(new Date());
    setPhase('active');
  };

  const handleToggleSubtask = useCallback((id: string) => {
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s)),
    );
  }, []);

  const handleComplete = useCallback((elapsed: number) => {
    setElapsedSeconds(elapsed);
    setPhase('completed');
  }, []);

  const handleStop = useCallback(() => {
    setPhase('completed');
  }, []);

  const handleMarkResult = useCallback((_result: TaskResult) => {
    setPhase('idle');
  }, []);

  const endTime = new Date(sessionStart.getTime() + selectedMinutes * 60_000);

  // ── Active session ──
  if (phase === 'active') {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, paddingTop: insets.top },
        ]}
      >
        <FocusSession
          taskTitle={taskTitle}
          taskEmoji={taskEmoji}
          durationMinutes={selectedMinutes}
          startTime={formatTimeLabel(sessionStart)}
          endTime={formatTimeLabel(endTime)}
          subtasks={subtasks}
          onToggleSubtask={handleToggleSubtask}
          onComplete={handleComplete}
          onStop={handleStop}
        />
      </View>
    );
  }

  // ── Completed ──
  if (phase === 'completed') {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, paddingTop: insets.top },
        ]}
      >
        <FocusComplete
          taskTitle={taskTitle}
          taskEmoji={taskEmoji}
          elapsedMinutes={Math.max(1, Math.ceil(elapsedSeconds / 60))}
          onMarkResult={handleMarkResult}
        />
      </View>
    );
  }

  // ── Idle — Dial selector ──
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
          paddingHorizontal: spacing.xl,
        },
      ]}
    >
      {/* Top bar — music selector */}
      <View style={[styles.topBar, { marginTop: spacing.lg }]}>
        <Pressable onPress={cycleAmbiance}>
          <GlassView
            intensity="subtle"
            style={[styles.musicPill, { borderRadius: radius.full }]}
          >
            <Text style={{ fontSize: 14 }}>{ambiance.emoji}</Text>
            <Text
              style={[
                typography.footnote,
                { color: colors.textSecondary, marginLeft: spacing.xs },
              ]}
            >
              {ambiance.label}
            </Text>
          </GlassView>
        </Pressable>
      </View>

      {/* Center area — title + dial */}
      <View style={styles.centerArea}>
        <Text
          style={[
            typography.largeTitle,
            { color: colors.textPrimary, textAlign: 'center' },
          ]}
        >
          Focus
        </Text>

        <View style={{ marginTop: spacing['2xl'] }}>
          <TimerDial
            minutes={selectedMinutes}
            onChangeMinutes={setSelectedMinutes}
          />
        </View>
      </View>

      {/* Bottom area — task selector + start */}
      <View style={{ paddingBottom: insets.bottom + 90 }}>
        <TaskSelector
          tasks={MOCK_TASKS}
          selectedTask={selectedTask}
          onSelectTask={setSelectedTask}
        />

        <Pressable
          onPress={handleStart}
          style={{ marginTop: spacing.xl, alignSelf: 'center' }}
        >
          <GlassView
            intensity="subtle"
            style={[
              styles.startButton,
              {
                borderRadius: radius.full,
                backgroundColor: colors.backgroundSubtle,
              },
            ]}
          >
            <Text
              style={[
                typography.bodySemibold,
                { color: colors.textPrimary, marginRight: spacing.sm },
              ]}
            >
              Start
            </Text>
            <IconSymbol name="play" size={16} color={colors.textPrimary} />
          </GlassView>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
});
