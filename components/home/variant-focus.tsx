/**
 * Variant 5: Focus Mode View — iOS 26 Liquid Glass immersive redesign.
 * Frosted glass timer ring, glass play/pause button with accent tint,
 * layered glass cards for subtask progress and next-up preview.
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { GlassCard, GlassView } from '@/components/ui/glass';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';
import { getCurrentTask, getNextTask, type Task } from './mock-data';

interface FocusModeViewProps {
  tasks: Task[];
}

function formatTimer(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function FocusModeView({ tasks }: FocusModeViewProps) {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const current = getCurrentTask(tasks);
  const next = getNextTask(tasks);

  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const totalSeconds = current ? current.duration * 60 : 0;
  const remaining = Math.max(totalSeconds - elapsed, 0);
  const progress = totalSeconds > 0 ? elapsed / totalSeconds : 0;

  // All done empty state
  if (!current) {
    return (
      <View style={[styles.centered, { paddingHorizontal: spacing.xl }]}>
        {/* Large glass circle behind sparkle */}
        <View style={styles.emptyCircleWrapper}>
          <GlassView
            intensity="subtle"
            style={[
              styles.emptyCircle,
              { borderRadius: 9999 },
            ]}
          />
          <IconSymbol name="sparkles" size={52} color={colors.accent} />
        </View>
        <Text
          style={[
            typography.title2,
            { color: colors.textPrimary, textAlign: 'center', marginTop: spacing.xl },
          ]}>
          All done for today!
        </Text>
        <Text
          style={[
            typography.body,
            { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
          ]}>
          You've completed everything. Take a well-deserved break.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[styles.container, { paddingHorizontal: spacing.xl }]}
      showsVerticalScrollIndicator={false}>

      {/* Current task focus area */}
      <View style={[styles.focusArea, { marginTop: spacing['3xl'] }]}>

        {/* Timer ring inside large GlassCard circle */}
        <GlassCard
          intensity="medium"
          style={[
            styles.timerGlassCard,
            { borderRadius: 9999, padding: 0 },
          ]}>
          <View style={styles.timerRing}>
            <View
              style={[
                styles.ringOuter,
                {
                  borderColor: colors.borderSubtle,
                  borderWidth: 4,
                  borderRadius: 999,
                },
              ]}>
              <View
                style={[
                  styles.ringProgress,
                  {
                    borderColor: colors.accent,
                    borderWidth: 4,
                    borderRadius: 999,
                    opacity: progress > 0 ? 1 : 0.3,
                  },
                ]}
              />
              <View style={styles.ringInner}>
                <Text style={{ fontSize: 40 }}>{current.emoji}</Text>
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Task title */}
        <Text
          style={[
            typography.title2,
            { color: colors.textPrimary, textAlign: 'center', marginTop: spacing['2xl'] },
          ]}>
          {current.title}
        </Text>

        {/* Time info */}
        {current.startTime && (
          <Text
            style={[
              typography.callout,
              { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs },
            ]}>
            {current.startTime} · {current.duration}m
          </Text>
        )}

        {/* Large timer display */}
        <Text
          style={[
            typography.timer,
            { color: colors.textPrimary, textAlign: 'center', marginTop: spacing['2xl'] },
          ]}>
          {formatTimer(remaining)}
        </Text>

        {/* Timer controls */}
        <View style={[styles.controls, { marginTop: spacing.xl }]}>
          {/* +1 min — glass button */}
          <Pressable
            onPress={() => setElapsed((e) => Math.max(e - 60, 0))}
            style={styles.controlButton}>
            <GlassView
              intensity="subtle"
              style={[styles.controlInner, { borderRadius: radius.full }]}>
              <Text style={[typography.callout, { color: colors.textSecondary }]}>+ 1 min</Text>
            </GlassView>
          </Pressable>

          {/* Play/pause — glass with accent tint overlay */}
          <Pressable
            onPress={() => setIsRunning(!isRunning)}
            style={styles.playButtonWrapper}>
            <GlassView
              intensity="medium"
              style={[styles.playButton, { borderRadius: radius.full }]}>
              {/* Accent tint overlay */}
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: colors.accent + 'CC',
                    borderRadius: radius.full,
                  },
                ]}
              />
              <IconSymbol
                name={isRunning ? 'pause' : 'play'}
                size={22}
                color="#fff"
              />
            </GlassView>
          </Pressable>
        </View>

        {/* Subtask progress card */}
        {current.subtasksTotal != null && current.subtasksTotal > 0 && (
          <GlassCard
            intensity="subtle"
            tinted
            style={{ marginTop: spacing['2xl'], width: '100%' }}>
            <Text style={[typography.subheadlineSemibold, { color: colors.textPrimary }]}>
              Progress: {current.subtasksDone}/{current.subtasksTotal} steps
            </Text>
            <View
              style={[
                styles.progressTrack,
                {
                  backgroundColor: colors.borderSubtle,
                  borderRadius: radius.full,
                  marginTop: spacing.sm,
                },
              ]}>
              <View
                style={{
                  height: 4,
                  backgroundColor: colors.accent,
                  borderRadius: radius.full,
                  width: `${((current.subtasksDone ?? 0) / current.subtasksTotal) * 100}%`,
                }}
              />
            </View>
          </GlassCard>
        )}
      </View>

      {/* Up next preview */}
      {next && (
        <GlassCard
          intensity="subtle"
          tinted
          style={{
            marginTop: spacing['3xl'],
            marginBottom: 120,
          }}>
          <Text
            style={[
              typography.footnote,
              {
                color: colors.textTertiary,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              },
            ]}>
            Up next
          </Text>
          <View style={[styles.nextRow, { marginTop: spacing.sm }]}>
            <Text style={{ fontSize: 20 }}>{next.emoji}</Text>
            <View style={{ marginLeft: spacing.sm, flex: 1 }}>
              <Text
                style={[typography.body, { color: colors.textPrimary }]}
                numberOfLines={1}>
                {next.title}
              </Text>
              <Text style={[typography.caption1, { color: colors.textTertiary }]}>
                {next.startTime && `${next.startTime} · `}{next.duration}m
              </Text>
            </View>
          </View>
        </GlassCard>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCircleWrapper: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
  },
  focusArea: {
    alignItems: 'center',
    width: '100%',
  },
  timerGlassCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerRing: {
    width: 160,
    height: 160,
  },
  ringOuter: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringProgress: {
    position: 'absolute',
    width: 160,
    height: 160,
  },
  ringInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  controlButton: {},
  controlInner: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  playButtonWrapper: {},
  playButton: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  nextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    height: 4,
    overflow: 'hidden',
  },
});
