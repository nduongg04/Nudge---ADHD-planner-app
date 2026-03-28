/**
 * Home Screen — Nudge ADHD AI Planner.
 * Greeting + compact week strip + scrollable task accordions.
 * iOS 26 Liquid Glass aesthetic with Heroicons.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDesignSystem } from '@/hooks/use-design-system';
import { HomeContent } from '@/constants/design-system';
import { GlassView } from '@/components/ui/glass';
import { IconSymbol, type IconName } from '@/components/ui/icon-symbol';
import { TaskCard } from '@/components/home/task-card';
import {
  MOCK_TASKS,
  getTasksByTimeOfDay,
  type Task,
  type TimeOfDay,
} from '@/components/home/mock-data';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getWeekDates(centerDate: Date): Date[] {
  const dayOfWeek = centerDate.getDay();
  const startOfWeek = addDays(centerDate, -dayOfWeek);
  return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i));
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// ─── Section Config ─────────────────────────────────────────────────────────

type ViewMode = 'timeline' | 'list';

const SECTION_ORDER: TimeOfDay[] = ['anytime', 'morning', 'day', 'evening'];

const SECTION_CONFIG: Record<TimeOfDay, { label: string; icon: IconName; placeholder: string }> = {
  anytime: { label: 'ANYTIME', icon: 'clock', placeholder: 'Anytime today works' },
  morning: { label: 'MORNING', icon: 'sun', placeholder: "What's on your morning list?" },
  day: { label: 'AFTERNOON', icon: 'sparkles', placeholder: "What's happening today?" },
  evening: { label: 'EVENING', icon: 'moon', placeholder: 'End the day your way' },
};

const SECTION_TINTS: Record<TimeOfDay, { light: string; dark: string }> = {
  anytime: { light: 'rgba(168, 162, 158, 0.10)', dark: 'rgba(168, 162, 158, 0.08)' },
  morning: { light: 'rgba(253, 186, 116, 0.15)', dark: 'rgba(253, 186, 116, 0.08)' },
  day: { light: 'rgba(147, 197, 253, 0.15)', dark: 'rgba(147, 197, 253, 0.08)' },
  evening: { light: 'rgba(196, 181, 253, 0.15)', dark: 'rgba(196, 181, 253, 0.08)' },
};

// ─── TopBar ─────────────────────────────────────────────────────────────────

function TopBar({
  onToggleView,
  onAddTask,
}: {
  onToggleView: () => void;
  onAddTask: () => void;
}) {
  const { colors, typography, spacing, radius, shadows } = useDesignSystem();
  const greeting = getGreeting();

  return (
    <View style={[styles.topBar, { paddingHorizontal: spacing.xl }]}>
      {/* Greeting */}
      <Text
        style={[
          typography.bodySemibold,
          { color: colors.textPrimary, fontSize: HomeContent.headingSize, flex: 1 },
        ]}
        numberOfLines={1}>
        {greeting}, Alex
      </Text>

      {/* Right: view switcher + add task — native liquid glass interactive buttons */}
      <View style={styles.topBarRight}>
        <Pressable onPress={onToggleView} hitSlop={8}>
          <GlassView
            isInteractive
            style={[styles.circleButton, shadows.lg, { width: 44, height: 44, borderRadius: radius.full }]}>
            <IconSymbol name="ellipsis-vertical" size={22} color={colors.textSecondary} />
          </GlassView>
        </Pressable>
        <Pressable onPress={onAddTask} hitSlop={8} style={{ marginLeft: spacing.sm }}>
          <GlassView
            isInteractive
            style={[styles.circleButton, shadows.lg, { width: 44, height: 44, borderRadius: radius.full }]}>
            <IconSymbol name="plus" size={22} color={colors.accent} />
          </GlassView>
        </Pressable>
      </View>
    </View>
  );
}

// ─── WeekStrip (compact: day letters + date numbers) ────────────────────────

function WeekStrip({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}) {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const today = new Date();
  const weekDates = getWeekDates(selectedDate);

  return (
    <View style={[styles.weekStrip, { paddingHorizontal: spacing.xl, marginTop: spacing.md }]}>
      {weekDates.map((date, idx) => {
        const isSelected = isSameDay(date, selectedDate);
        const isCurrentDay = isSameDay(date, today);
        const dayNum = date.getDate();

        return (
          <Pressable
            key={idx}
            onPress={() => onSelectDate(date)}
            style={styles.weekDayColumn}>
            {/* Day letter */}
            <Text
              style={[
                typography.caption2,
                {
                  color: isSelected ? colors.textPrimary : colors.textTertiary,
                  fontSize: 11,
                  fontWeight: '600',
                },
              ]}>
              {DAY_LETTERS[date.getDay()]}
            </Text>

            {/* Date number circle */}
            {isSelected ? (
              <View
                style={[
                  styles.weekDayCircle,
                  {
                    backgroundColor: colors.accent,
                    width: 36,
                    height: 36,
                    borderRadius: radius.full,
                    marginTop: 4,
                  },
                ]}>
                <Text style={[typography.bodySemibold, { color: '#FFFFFF', fontSize: 15 }]}>
                  {dayNum}
                </Text>
              </View>
            ) : (
              <View
                style={[
                  styles.weekDayCircle,
                  {
                    backgroundColor: 'transparent',
                    width: 36,
                    height: 36,
                    borderRadius: radius.full,
                    marginTop: 4,
                  },
                ]}>
                <Text
                  style={[
                    typography.bodySemibold,
                    {
                      color: isCurrentDay ? colors.accent : colors.textPrimary,
                      fontSize: 15,
                    },
                  ]}>
                  {dayNum}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── ViewSwitcherPopover ────────────────────────────────────────────────────

function ViewSwitcherPopover({
  viewMode,
  onSelect,
  onClose,
}: {
  viewMode: ViewMode;
  onSelect: (mode: ViewMode) => void;
  onClose: () => void;
}) {
  const { colors, typography, spacing, radius } = useDesignSystem();

  return (
    <Pressable style={styles.popoverOverlay} onPress={onClose}>
      <View style={[styles.popoverAnchor, { right: spacing.xl + 36 + spacing.sm }]}>
        <GlassView
          style={[styles.popover, { borderRadius: radius.xl, padding: spacing.xs }]}>
          <Pressable
            onPress={() => onSelect('timeline')}
            style={[
              styles.popoverItem,
              { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.lg },
              viewMode === 'timeline' && { backgroundColor: colors.glass },
            ]}>
            <IconSymbol name="clock" size={HomeContent.labelSize + 3} color={viewMode === 'timeline' ? colors.accent : colors.textSecondary} />
            <Text
              style={[
                typography.subheadline,
                {
                  color: viewMode === 'timeline' ? colors.accent : colors.textPrimary,
                  marginLeft: spacing.sm,
                },
              ]}>
              Timeline
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onSelect('list')}
            style={[
              styles.popoverItem,
              { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.lg },
              viewMode === 'list' && { backgroundColor: colors.glass },
            ]}>
            <IconSymbol name="list-bullet" size={HomeContent.labelSize + 3} color={viewMode === 'list' ? colors.accent : colors.textSecondary} />
            <Text
              style={[
                typography.subheadline,
                {
                  color: viewMode === 'list' ? colors.accent : colors.textPrimary,
                  marginLeft: spacing.sm,
                },
              ]}>
              List
            </Text>
          </Pressable>
        </GlassView>
      </View>
    </Pressable>
  );
}

// ─── NowIndicator ───────────────────────────────────────────────────────────

function NowIndicator() {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return (
    <View style={[styles.nowIndicator, { marginVertical: spacing.sm }]}>
      <View style={[styles.nowDot, { backgroundColor: colors.accent }]} />
      <View style={[styles.nowLine, { backgroundColor: colors.accent }]} />
      <GlassView
        style={[styles.nowBadge, { borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 2 }]}>
        <Text style={[typography.caption2, { color: colors.accent, fontWeight: '700', fontSize: HomeContent.captionSize - 1 }]}>
          {timeStr}
        </Text>
      </GlassView>
    </View>
  );
}

// ─── SectionGroup ───────────────────────────────────────────────────────────

function SectionGroup({
  timeOfDay,
  tasks,
  viewMode,
  showNowIndicator,
}: {
  timeOfDay: TimeOfDay;
  tasks: Task[];
  viewMode: ViewMode;
  showNowIndicator?: boolean;
}) {
  const { colors, typography, spacing, radius, isDark } = useDesignSystem();
  const [expanded, setExpanded] = useState(true);

  const config = SECTION_CONFIG[timeOfDay];
  const tint = SECTION_TINTS[timeOfDay];
  const tintColor = isDark ? tint.dark : tint.light;

  const toggleExpanded = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  }, []);

  return (
    <View style={{ marginTop: spacing.lg }}>
      {/* Section header row */}
      <View style={styles.sectionHeaderRow}>
        <Pressable onPress={toggleExpanded}>
          <GlassView
            isInteractive
            style={[
              styles.sectionPill,
              {
                borderRadius: radius.full,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.xs + 2,
                backgroundColor: tintColor,
              },
            ]}>
            <IconSymbol name={config.icon} size={HomeContent.labelSize} color={colors.textSecondary} />
            <Text
              style={[
                typography.caption1,
                {
                  color: colors.textSecondary,
                  marginLeft: spacing.xs,
                  letterSpacing: 1,
                  fontWeight: '700',
                  fontSize: HomeContent.labelSize,
                },
              ]}>
              {config.label} ({tasks.length})
            </Text>
            <IconSymbol
              name={expanded ? 'chevron-down' : 'chevron-right'}
              size={10}
              color={colors.textTertiary}
              style={{ marginLeft: spacing.xs }}
            />
          </GlassView>
        </Pressable>
      </View>

      {/* Now indicator */}
      {showNowIndicator && expanded && <NowIndicator />}

      {/* Collapsible content */}
      {expanded && (
        <View style={{ marginTop: spacing.sm }}>
          {tasks.length === 0 ? (
            <View
              style={[
                styles.emptyPlaceholder,
                {
                  borderColor: colors.border,
                  borderRadius: radius.lg,
                  padding: spacing.md,
                  backgroundColor: tintColor,
                },
              ]}>
              <Text
                style={[typography.subheadline, { color: colors.textTertiary, flex: 1, fontSize: HomeContent.labelSize }]}>
                {config.placeholder}
              </Text>
              <IconSymbol name="plus" size={16} color={colors.textTertiary} />
            </View>
          ) : viewMode === 'list' ? (
            /* List view: compact cards */
            tasks.map((task) => <TaskCard key={task.id} task={task} compact />)
          ) : (
            /* Timeline view: individual cards */
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </View>
      )}
    </View>
  );
}

// ─── Main Screen ────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const { colors, spacing } = useDesignSystem();
  const insets = useSafeAreaInsets();

  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [showViewSwitcher, setShowViewSwitcher] = useState(false);

  const handleSelectDate = useCallback((date: Date) => setSelectedDate(date), []);

  const handleToggleView = useCallback(() => {
    setShowViewSwitcher((prev) => !prev);
  }, []);

  const handleSelectView = useCallback((mode: ViewMode) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setViewMode(mode);
    setShowViewSwitcher(false);
  }, []);

  const handleAddTask = useCallback(() => {
    // TODO: open Add Task bottom sheet
  }, []);

  const tasks = MOCK_TASKS;
  const grouped = useMemo(() => getTasksByTimeOfDay(tasks), [tasks]);

  // Determine which section gets the "now" indicator
  const hour = new Date().getHours();
  const nowSection: TimeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'day' : 'evening';

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <TopBar
        onToggleView={handleToggleView}
        onAddTask={handleAddTask}
      />
      <WeekStrip selectedDate={selectedDate} onSelectDate={handleSelectDate} />

      {/* Divider */}
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: colors.glassBorder,
          marginTop: spacing.md,
          marginHorizontal: spacing.xl,
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingHorizontal: spacing.xl,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}>
        {SECTION_ORDER.map((tod) => {
          const sectionTasks = grouped[tod];
          if (tod === 'anytime' && sectionTasks.length === 0) return null;
          return (
            <SectionGroup
              key={tod}
              timeOfDay={tod}
              tasks={sectionTasks}
              viewMode={viewMode}
              showNowIndicator={tod === nowSection}
            />
          );
        })}
      </ScrollView>

      {/* View Switcher Popover */}
      {showViewSwitcher && (
        <ViewSwitcherPopover
          viewMode={viewMode}
          onSelect={handleSelectView}
          onClose={() => setShowViewSwitcher(false)}
        />
      )}
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // TopBar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // WeekStrip
  weekStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  weekDayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  weekDayCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ScrollView
  scrollView: {
    flex: 1,
  },
  // SectionGroup
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  // NowIndicator
  nowIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  nowLine: {
    flex: 1,
    height: 1.5,
  },
  nowBadge: {
    marginLeft: 4,
  },
  // Popover
  popoverOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  popoverAnchor: {
    position: 'absolute',
    top: 52,
  },
  popover: {
    minWidth: 150,
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
