/**
 * FocusComplete — Post-session celebration view.
 * Mark task status (Complete / Partially done / Not done) with no judgment.
 * Nimbus AI suggests a break.
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlassCard } from '@/components/ui/glass';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';
import * as Haptics from 'expo-haptics';

export type TaskResult = 'complete' | 'partial' | 'not_done';

interface FocusCompleteProps {
  taskTitle: string;
  taskEmoji: string;
  elapsedMinutes: number;
  onMarkResult: (result: TaskResult) => void;
}

const RESULT_OPTIONS: {
  key: TaskResult;
  emoji: string;
  label: string;
  description: string;
}[] = [
  {
    key: 'complete',
    emoji: '✅',
    label: 'Complete',
    description: 'All done!',
  },
  {
    key: 'partial',
    emoji: '🔄',
    label: 'Partially done',
    description: 'Made progress',
  },
  {
    key: 'not_done',
    emoji: '⏭️',
    label: 'Not done',
    description: "That's okay",
  },
];

export function FocusComplete({
  taskTitle,
  taskEmoji,
  elapsedMinutes,
  onMarkResult,
}: FocusCompleteProps) {
  const { colors, typography, spacing } = useDesignSystem();

  return (
    <View style={[styles.container, { paddingHorizontal: spacing.xl }]}>
      {/* ── Celebration ── */}
      <View style={styles.celebrationArea}>
        <View style={styles.emojiWrapper}>
          <Text style={{ fontSize: 64 }}>{taskEmoji}</Text>
          <IconSymbol
            name="sparkles"
            size={28}
            color={colors.focus}
            style={styles.sparkle}
          />
        </View>

        <Text
          style={[
            typography.title1,
            {
              color: colors.textPrimary,
              textAlign: 'center',
              marginTop: spacing.xl,
            },
          ]}
        >
          Session complete!
        </Text>
        <Text
          style={[
            typography.callout,
            {
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: spacing.sm,
            },
          ]}
        >
          You focused for {elapsedMinutes} minute{elapsedMinutes !== 1 ? 's' : ''} on
        </Text>
        <Text
          style={[
            typography.bodySemibold,
            {
              color: colors.textPrimary,
              textAlign: 'center',
              marginTop: spacing.xs,
            },
          ]}
        >
          {taskTitle}
        </Text>
      </View>

      {/* ── Mark result ── */}
      <View style={{ gap: spacing.sm, width: '100%', marginTop: spacing['4xl'] }}>
        <Text
          style={[
            typography.footnoteSemibold,
            {
              color: colors.textTertiary,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              marginBottom: spacing.xs,
            },
          ]}
        >
          How did it go?
        </Text>

        {RESULT_OPTIONS.map((option) => (
          <Pressable
            key={option.key}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onMarkResult(option.key);
            }}
          >
            <GlassCard intensity="subtle" style={styles.resultCard}>
              <View style={styles.resultRow}>
                <Text style={{ fontSize: 24 }}>{option.emoji}</Text>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text
                    style={[
                      typography.bodySemibold,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {option.label}
                  </Text>
                  <Text
                    style={[
                      typography.caption1,
                      { color: colors.textTertiary },
                    ]}
                  >
                    {option.description}
                  </Text>
                </View>
              </View>
            </GlassCard>
          </Pressable>
        ))}
      </View>

      {/* ── Nimbus AI suggestion ── */}
      <GlassCard
        intensity="subtle"
        tinted
        style={{ marginTop: spacing['3xl'], width: '100%' }}
      >
        <View style={styles.aiRow}>
          <Text style={{ fontSize: 20 }}>☁️</Text>
          <Text
            style={[
              typography.callout,
              {
                color: colors.textSecondary,
                flex: 1,
                marginLeft: spacing.sm,
              },
            ]}
          >
            Take a 5-minute break before your next task. You earned it!
          </Text>
        </View>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebrationArea: {
    alignItems: 'center',
  },
  emojiWrapper: {
    position: 'relative',
  },
  sparkle: {
    position: 'absolute',
    top: -8,
    right: -20,
  },
  resultCard: { padding: 16 },
  resultRow: { flexDirection: 'row', alignItems: 'center' },
  aiRow: { flexDirection: 'row', alignItems: 'flex-start' },
});
