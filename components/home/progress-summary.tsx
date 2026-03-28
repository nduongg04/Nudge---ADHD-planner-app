/**
 * ProgressSummary — iOS 26 Liquid Glass progress bar.
 * Wrapped in GlassCard. Translucent glass track, not flat gray.
 * Teal for 100%, orange for partial.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '@/components/ui/glass';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';

interface ProgressSummaryProps {
  completed: number;
  total: number;
}

export function ProgressSummary({ completed, total }: ProgressSummaryProps) {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const pct = total > 0 ? (completed / total) * 100 : 0;

  const getMessage = () => {
    if (total === 0) return 'Ready when you are';
    if (pct === 0) return 'Ready when you are';
    if (pct < 30) return "You've started — that's what matters";
    if (pct < 60) return 'Making steady progress';
    if (pct < 100) return 'Almost there, go gentle';
    return 'What a wonderful day!';
  };

  const fillColor = pct === 100 ? colors.completed : colors.accent;

  return (
    <GlassCard intensity="subtle" style={{ marginBottom: spacing.lg }}>
      <View style={styles.textRow}>
        <Text style={[typography.footnoteSemibold, { color: colors.textSecondary }]}>
          {completed} of {total} tasks
        </Text>
        <View style={styles.messageRow}>
          <IconSymbol name="sparkles" size={13} color={fillColor} />
          <Text style={[typography.footnote, { color: colors.textTertiary, marginLeft: 4 }]}>
            {getMessage()}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.track,
          {
            backgroundColor: colors.glass,
            borderRadius: radius.full,
            marginTop: spacing.sm,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.glassBorder,
          },
        ]}>
        <View
          style={[
            styles.fill,
            {
              backgroundColor: fillColor,
              borderRadius: radius.full,
              width: `${Math.max(pct, pct > 0 ? 3 : 0)}%`,
            },
          ]}
        />
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    height: 8,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
  },
});
