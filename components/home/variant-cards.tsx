/**
 * Variant 4: Compact Card View — iOS 26 Liquid Glass bento redesign.
 * 2-column glass tile grid with frosted category color strips,
 * glowing progress dots, and depth through layered translucency.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { GlassCard } from '@/components/ui/glass';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';
import type { Task, TimeOfDay } from './mock-data';

interface CardsViewProps {
  tasks: Task[];
}

const TIME_OF_DAY_COLORS: Record<TimeOfDay, string> = {
  morning: '#FDBA74',
  day: '#93C5FD',
  evening: '#C4B5FD',
  anytime: '#D6D3D1',
};

function CompactCard({ task }: { task: Task }) {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const isCompleted = task.status === 'completed';
  const isActive = task.status === 'in_progress';
  const categoryColor = TIME_OF_DAY_COLORS[task.timeOfDay ?? 'anytime'];

  return (
    <Pressable style={styles.cardWrapper}>
      <GlassCard
        compact
        intensity={isActive ? 'medium' : 'subtle'}
        tinted={isActive}
        style={[
          styles.card,
          {
            borderRadius: radius.xl,
            padding: 0,
            overflow: 'hidden',
          },
          isActive && { borderColor: colors.accent, borderWidth: 1.5 },
          isCompleted && { opacity: 0.55 },
        ]}>
        {/* Frosted category color strip */}
        <View
          style={[
            styles.categoryStrip,
            { backgroundColor: categoryColor },
          ]}
        />

        <View style={{ padding: spacing.md }}>
          {/* Icon + status */}
          <View style={styles.cardTop}>
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: isCompleted ? colors.completedSoft : colors.accentMuted,
                  borderRadius: radius.md,
                },
              ]}>
              <Text style={{ fontSize: 20 }}>{task.emoji}</Text>
            </View>
            {isCompleted && (
              <View
                style={[
                  styles.checkBadge,
                  { backgroundColor: colors.completed, borderRadius: radius.full },
                ]}>
                <IconSymbol name="check" size={10} color="#fff" />
              </View>
            )}
          </View>

          {/* Title */}
          <Text
            style={[
              typography.subheadlineSemibold,
              {
                color: isCompleted ? colors.textTertiary : colors.textPrimary,
                marginTop: spacing.sm,
                textDecorationLine: isCompleted ? 'line-through' : 'none',
              },
            ]}
            numberOfLines={2}>
            {task.title}
          </Text>

          {/* Time + duration */}
          <View style={[styles.cardMeta, { marginTop: spacing.sm }]}>
            {task.startTime && (
              <Text style={[typography.caption1, { color: colors.textTertiary }]}>
                {task.startTime}
              </Text>
            )}
            <Text
              style={[
                typography.caption1,
                { color: colors.textTertiary, marginLeft: task.startTime ? 6 : 0 },
              ]}>
              · {task.duration}m
            </Text>
          </View>

          {/* Progress dots — glowing when filled */}
          {task.subtasksTotal != null && task.subtasksTotal > 0 && (
            <View style={[styles.dots, { marginTop: spacing.sm }]}>
              {Array.from({ length: task.subtasksTotal }).map((_, i) => {
                const isFilled = i < (task.subtasksDone ?? 0);
                const dotColor = isFilled
                  ? (isCompleted ? colors.completed : colors.accent)
                  : colors.borderSubtle;
                return (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      isFilled && styles.dotActive,
                      {
                        backgroundColor: dotColor,
                        borderRadius: 4,
                      },
                      isFilled && {
                        shadowColor: dotColor,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.6,
                        shadowRadius: 3,
                        elevation: 2,
                      },
                    ]}
                  />
                );
              })}
            </View>
          )}
        </View>
      </GlassCard>
    </Pressable>
  );
}

export function CardsView({ tasks }: CardsViewProps) {
  const { spacing } = useDesignSystem();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingHorizontal: spacing.xl,
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.grid}>
        {tasks.map((task) => (
          <CompactCard key={task.id} task={task} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48.5%',
    marginBottom: 10,
  },
  card: {
    minHeight: 140,
  },
  categoryStrip: {
    height: 3,
    width: '100%',
    opacity: 0.75,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 3,
  },
  dot: {
    width: 6,
    height: 6,
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
