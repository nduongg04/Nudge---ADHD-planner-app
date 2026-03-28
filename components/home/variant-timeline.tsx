/**
 * Variant 1: Timeline View — iOS 26 Liquid Glass redesign.
 * Glass header card, glass time label pills for current slot,
 * glowing "now" halo dot, thin 1.5px spine.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GlassCard, GlassView } from '@/components/ui/glass';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';
import { TaskCard } from './task-card';
import type { Task } from './mock-data';

interface TimelineViewProps {
  tasks: Task[];
}

function formatTimeLabel(time: string) {
  const [h] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12} ${ampm}`;
}

export function TimelineView({ tasks }: TimelineViewProps) {
  const { colors, typography, spacing, radius } = useDesignSystem();

  const now = new Date();
  const currentHour = now.getHours();

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.startTime) return 1;
    if (!b.startTime) return -1;
    return a.startTime.localeCompare(b.startTime);
  });

  const nowInsertIndex = sortedTasks.findIndex((task) => {
    const h = task.startTime ? parseInt(task.startTime.split(':')[0], 10) : 0;
    return h > currentHour;
  });

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}>

      {/* Glass header card */}
      <GlassCard
        intensity="subtle"
        tinted
        style={[styles.headerCard, { borderRadius: radius['2xl'], marginBottom: spacing['2xl'] }]}>
        <View style={styles.headerRow}>
          <IconSymbol name="clock" size={18} color={colors.accent} />
          <Text style={[typography.calloutSemibold, { color: colors.textPrimary, marginLeft: spacing.sm }]}>
            Your Timeline
          </Text>
        </View>
        <Text style={[typography.caption1, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          {sortedTasks.length} tasks scheduled today
        </Text>
      </GlassCard>

      {sortedTasks.map((task, index) => {
        const taskHour = task.startTime ? parseInt(task.startTime.split(':')[0], 10) : 0;
        const isCurrentSlot =
          taskHour === currentHour ||
          (taskHour <= currentHour && taskHour + Math.ceil(task.duration / 60) > currentHour);

        let dotColor = colors.border;
        let dotFilled = false;
        if (task.status === 'completed') {
          dotColor = colors.completed;
          dotFilled = true;
        } else if (task.status === 'in_progress') {
          dotColor = colors.accent;
          dotFilled = true;
        }

        const showNowDot = nowInsertIndex === index && index > 0;

        return (
          <View key={task.id}>
            {/* Glowing "now" orange halo dot */}
            {showNowDot && (
              <View style={[styles.nowRow, { marginBottom: spacing.sm }]}>
                <View style={[styles.timeColumn, { width: 52 }]} />
                <View style={[styles.spineWrapper, { marginHorizontal: spacing.sm }]}>
                  {/* Halo circle */}
                  <View
                    style={[
                      styles.nowHalo,
                      { backgroundColor: colors.accent + '33' },
                    ]}
                  />
                  {/* Core dot */}
                  <View
                    style={[
                      styles.nowDot,
                      { backgroundColor: colors.accent },
                    ]}
                  />
                </View>
                <View style={styles.cardColumn} />
              </View>
            )}

            <View style={styles.timelineRow}>
              {/* Time label — glass pill when current slot */}
              <View style={[styles.timeColumn, { width: 52 }]}>
                {task.startTime && (
                  isCurrentSlot ? (
                    <GlassView
                      intensity="subtle"
                      style={{
                        borderRadius: 9999,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        alignSelf: 'flex-end',
                      }}>
                      <Text
                        style={[
                          typography.caption1,
                          {
                            color: colors.accent,
                            fontWeight: '600',
                          },
                        ]}>
                        {formatTimeLabel(task.startTime)}
                      </Text>
                    </GlassView>
                  ) : (
                    <Text
                      style={[
                        typography.caption1,
                        {
                          color: colors.textSecondary,
                          fontWeight: '400',
                          textAlign: 'right',
                        },
                      ]}>
                      {formatTimeLabel(task.startTime)}
                    </Text>
                  )
                )}
              </View>

              {/* Timeline spine */}
              <View style={[styles.spineWrapper, { marginHorizontal: spacing.sm }]}>
                <View
                  style={[
                    styles.spineDot,
                    {
                      backgroundColor: dotFilled ? dotColor : 'transparent',
                      borderColor: dotFilled ? dotColor : colors.border,
                      borderWidth: dotFilled ? 0 : 1.5,
                    },
                  ]}
                />
                {index < sortedTasks.length - 1 && (
                  <View
                    style={[
                      styles.spineLine,
                      {
                        backgroundColor:
                          task.status === 'completed' ? colors.completed : colors.border,
                      },
                    ]}
                  />
                )}
              </View>

              {/* Task card */}
              <View style={styles.cardColumn}>
                <TaskCard task={task} />
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  headerCard: {
    marginTop: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  nowRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeColumn: {
    paddingTop: 14,
    alignItems: 'flex-end',
  },
  spineWrapper: {
    alignItems: 'center',
    paddingTop: 16,
  },
  spineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  spineLine: {
    width: 1.5,
    flex: 1,
    minHeight: 40,
    marginTop: 4,
  },
  nowHalo: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  nowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.95,
  },
  cardColumn: {
    flex: 1,
  },
});
