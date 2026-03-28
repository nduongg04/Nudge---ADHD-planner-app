/**
 * Variant 2: List View — iOS 26 Liquid Glass redesign.
 * Glass header summary card at top, glass section badge headers,
 * grouped by Morning / Day / Evening sections.
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GlassCard } from '@/components/ui/glass';
import { useDesignSystem } from '@/hooks/use-design-system';
import { TaskCard } from './task-card';
import { SectionHeader } from './section-header';
import { getTasksByTimeOfDay, type Task, type TimeOfDay } from './mock-data';

interface ListViewProps {
  tasks: Task[];
}

const SECTION_ORDER: TimeOfDay[] = ['anytime', 'morning', 'day', 'evening'];

const ENCOURAGEMENTS = [
  'You\'ve got this — one step at a time.',
  'A calm mind gets more done.',
  'Small wins add up. Keep going.',
  'Progress over perfection, always.',
  'You\'re doing great. Stay focused.',
];

export function ListView({ tasks }: ListViewProps) {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const grouped = getTasksByTimeOfDay(tasks);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const encouragement = ENCOURAGEMENTS[Math.floor(Date.now() / 86400000) % ENCOURAGEMENTS.length];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}>

      {/* Glass header summary card */}
      <GlassCard
        intensity="subtle"
        tinted
        style={{ borderRadius: radius['2xl'], marginBottom: spacing['2xl'] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={[typography.title3, { color: colors.textPrimary }]}>
              {completedTasks}/{totalTasks} done
            </Text>
            <Text
              style={[
                typography.caption1,
                { color: colors.textSecondary, marginTop: spacing.xs },
              ]}>
              {encouragement}
            </Text>
          </View>
          {/* Progress pill */}
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              borderWidth: 3,
              borderColor: colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[typography.footnoteSemibold, { color: colors.accent }]}>
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
            </Text>
          </View>
        </View>
      </GlassCard>

      {SECTION_ORDER.map((section) => {
        const sectionTasks = grouped[section];
        if (sectionTasks.length === 0) return null;

        return (
          <SectionHeader key={section} timeOfDay={section} count={sectionTasks.length}>
            {sectionTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SectionHeader>
        );
      })}
    </ScrollView>
  );
}
