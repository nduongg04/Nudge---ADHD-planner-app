/**
 * FocusSession — Active focus timer with circular progress ring,
 * countdown display, play/pause controls, subtask checklist,
 * and Nimbus body-doubling presence.
 *
 * Design reference: Tiimo focus screen — immersive, minimal, premium.
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { GlassView } from '@/components/ui/glass';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';
import { FontFamily } from '@/constants/design-system';
import { CircularProgress } from './circular-progress';
import { SubtaskItem, type FocusSubtask } from './subtask-item';
import * as Haptics from 'expo-haptics';

interface FocusSessionProps {
  taskTitle: string;
  taskEmoji: string;
  durationMinutes: number;
  startTime: string;
  endTime: string;
  subtasks: FocusSubtask[];
  onToggleSubtask: (id: string) => void;
  onComplete: (elapsed: number) => void;
  onStop: () => void;
}

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const RING_SIZE = 240;

export function FocusSession({
  taskTitle,
  taskEmoji,
  durationMinutes,
  startTime,
  endTime,
  subtasks,
  onToggleSubtask,
  onComplete,
  onStop,
}: FocusSessionProps) {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const totalSeconds = durationMinutes * 60;

  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasCompleted = useRef(false);

  const remaining = Math.max(totalSeconds - elapsed, 0);
  const progress = totalSeconds > 0 ? elapsed / totalSeconds : 0;
  const completedSubtasks = subtasks.filter((s) => s.completed).length;

  // Timer tick
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => {
          const next = e + 1;
          if (next >= totalSeconds) {
            clearInterval(intervalRef.current!);
            return totalSeconds;
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, totalSeconds]);

  // Auto-complete when timer reaches 0
  useEffect(() => {
    if (remaining === 0 && elapsed > 0 && !hasCompleted.current) {
      hasCompleted.current = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onComplete(elapsed);
    }
  }, [remaining, elapsed, onComplete]);

  const togglePause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPaused((p) => !p);
  };

  const addMinute = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setElapsed((e) => Math.max(e - 60, 0));
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.container, { paddingHorizontal: spacing.xl }]}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Task info ── */}
      <View style={[styles.center, { marginTop: spacing['2xl'] }]}>
        <Text
          style={[
            typography.title1,
            { color: colors.textPrimary, textAlign: 'center' },
          ]}
        >
          {taskTitle}
        </Text>
        <Text
          style={[
            typography.callout,
            {
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: spacing.xs,
            },
          ]}
        >
          {startTime} → {endTime}
        </Text>
      </View>

      {/* ── Circular progress ring ── */}
      <View style={[styles.center, { marginTop: spacing['3xl'] }]}>
        <CircularProgress
          size={RING_SIZE}
          strokeWidth={14}
          progress={progress}
          trackColor={colors.focusSoft}
          progressColor={colors.focus}
          fillColor={colors.focusSoft + '80'}
        >
          <Text style={{ fontSize: 48 }}>{taskEmoji}</Text>
        </CircularProgress>
      </View>

      {/* ── Timer display ── */}
      <Text
        style={[
          styles.timerText,
          {
            fontFamily: FontFamily?.regular,
            color: colors.textPrimary,
            marginTop: spacing['2xl'],
          },
        ]}
      >
        {formatTimer(remaining)}
      </Text>

      {/* Paused message */}
      {isPaused && (
        <Text
          style={[
            typography.callout,
            {
              color: colors.focus,
              textAlign: 'center',
              marginTop: spacing.sm,
            },
          ]}
        >
          Take your time
        </Text>
      )}

      {/* ── Controls ── */}
      <View style={[styles.controls, { marginTop: spacing.xl, gap: spacing.lg }]}>
        {/* +1 min pill */}
        <Pressable onPress={addMinute}>
          <GlassView
            intensity="subtle"
            style={[styles.addMinPill, { borderRadius: radius.full }]}
          >
            <Text
              style={[
                typography.calloutSemibold,
                { color: colors.textSecondary },
              ]}
            >
              + 1 min
            </Text>
          </GlassView>
        </Pressable>

        {/* Play/Pause — dark pill */}
        <Pressable onPress={togglePause}>
          <View
            style={[
              styles.pauseButton,
              {
                borderRadius: radius.full,
                backgroundColor: colors.textPrimary,
              },
            ]}
          >
            <IconSymbol
              name={isPaused ? 'play' : 'pause'}
              size={22}
              color="#fff"
            />
          </View>
        </Pressable>
      </View>

      {/* ── Subtask checklist ── */}
      {subtasks.length > 0 && (
        <View style={{ marginTop: spacing['3xl'], width: '100%' }}>
          <Text
            style={[
              typography.footnoteSemibold,
              {
                color: colors.textTertiary,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                marginBottom: spacing.md,
              },
            ]}
          >
            {completedSubtasks}/{subtasks.length} steps
          </Text>
          <View style={{ gap: spacing.sm }}>
            {subtasks.map((subtask) => (
              <SubtaskItem
                key={subtask.id}
                subtask={subtask}
                onToggle={() => onToggleSubtask(subtask.id)}
              />
            ))}
          </View>
        </View>
      )}

      {/* ── Nimbus body double ── */}
      <View style={styles.nimbus}>
        <Text style={{ fontSize: 40 }}>☁️</Text>
      </View>

      {/* ── "I'm stuck" ── */}
      <Pressable style={{ marginTop: spacing['3xl'] }}>
        <GlassView
          intensity="subtle"
          style={[styles.stuckPill, { borderRadius: radius.full }]}
        >
          <Text
            style={[
              typography.callout,
              { color: colors.focus },
            ]}
          >
            I'm stuck
          </Text>
        </GlassView>
      </Pressable>

      {/* ── End session ── */}
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onStop();
        }}
        style={{ marginTop: spacing.xl, marginBottom: 120 }}
      >
        <Text
          style={[
            typography.callout,
            { color: colors.destructive, textAlign: 'center' },
          ]}
        >
          End session
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  center: { alignItems: 'center', width: '100%' },
  timerText: {
    fontSize: 64,
    fontWeight: '200',
    letterSpacing: -2,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMinPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  pauseButton: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nimbus: {
    alignSelf: 'flex-end',
    marginTop: 24,
    marginRight: 8,
  },
  stuckPill: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    alignSelf: 'center',
  },
});
