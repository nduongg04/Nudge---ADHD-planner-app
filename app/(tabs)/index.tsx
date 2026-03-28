/**
 * Home Screen — Nudge ADHD AI Planner.
 * Greeting + compact week strip + scrollable task accordions.
 * iOS 26 Liquid Glass aesthetic with Heroicons.
 */

import {
  MOCK_TASKS,
  getTasksByTimeOfDay,
  type Task,
  type TimeOfDay,
} from "@/components/home/mock-data";
import { TaskCard } from "@/components/home/task-card";
import { WeekCalendar } from "@/components/home/week-calendar";
import { GlassView } from "@/components/ui/glass";
import { IconSymbol, type IconName } from "@/components/ui/icon-symbol";
import { HomeContent } from "@/constants/design-system";
import { useDesignSystem } from "@/hooks/use-design-system";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

// ─── Section Config ─────────────────────────────────────────────────────────

type ViewMode = "timeline" | "list";

const SECTION_ORDER: TimeOfDay[] = ["anytime", "morning", "day", "evening"];

const SECTION_CONFIG: Record<
  TimeOfDay,
  { label: string; icon: IconName; placeholder: string }
> = {
  anytime: {
    label: "ANYTIME",
    icon: "clock",
    placeholder: "Anytime today works",
  },
  morning: {
    label: "MORNING",
    icon: "sun",
    placeholder: "What's on your morning list?",
  },
  day: {
    label: "AFTERNOON",
    icon: "sparkles",
    placeholder: "What's happening today?",
  },
  evening: {
    label: "EVENING",
    icon: "moon",
    placeholder: "End the day your way",
  },
};

const SECTION_TINTS: Record<TimeOfDay, { light: string; dark: string }> = {
  anytime: {
    light: "rgba(168, 162, 158, 0.10)",
    dark: "rgba(168, 162, 158, 0.08)",
  },
  morning: {
    light: "rgba(253, 186, 116, 0.15)",
    dark: "rgba(253, 186, 116, 0.08)",
  },
  day: {
    light: "rgba(147, 197, 253, 0.15)",
    dark: "rgba(147, 197, 253, 0.08)",
  },
  evening: {
    light: "rgba(196, 181, 253, 0.15)",
    dark: "rgba(196, 181, 253, 0.08)",
  },
};

/** Solid badge backgrounds per time-of-day */
const BADGE_COLORS: Record<
  TimeOfDay,
  { bg: { light: string; dark: string }; text: { light: string; dark: string } }
> = {
  anytime: {
    bg: {
      light: "rgba(168, 162, 158, 0.14)",
      dark: "rgba(168, 162, 158, 0.18)",
    },
    text: { light: "#78716c", dark: "#a8a29e" },
  },
  morning: {
    bg: {
      light: "rgba(255, 190, 100, 0.25)",
      dark: "rgba(253, 186, 116, 0.22)",
    },
    text: { light: "#b45309", dark: "#fbbf24" },
  },
  day: {
    bg: {
      light: "rgba(130, 180, 255, 0.25)",
      dark: "rgba(147, 197, 253, 0.22)",
    },
    text: { light: "#1d4ed8", dark: "#93c5fd" },
  },
  evening: {
    bg: {
      light: "rgba(180, 160, 255, 0.25)",
      dark: "rgba(196, 181, 253, 0.22)",
    },
    text: { light: "#6d28d9", dark: "#c4b5fd" },
  },
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
          {
            color: colors.textPrimary,
            fontSize: HomeContent.headingSize,
            flex: 1,
          },
        ]}
        numberOfLines={1}
      >
        {greeting}, Alex
      </Text>

      {/* Right: view switcher + add task — native liquid glass interactive buttons */}
      <View style={styles.topBarRight}>
        <Pressable onPress={onToggleView} hitSlop={8}>
          <GlassView
            isInteractive
            style={[
              styles.circleButton,
              shadows.lg,
              { width: 44, height: 44, borderRadius: radius.full },
            ]}
          >
            <IconSymbol
              name="ellipsis-vertical"
              size={22}
              color={colors.textSecondary}
            />
          </GlassView>
        </Pressable>
        <Pressable
          onPress={onAddTask}
          hitSlop={8}
          style={{ marginLeft: spacing.sm }}
        >
          <GlassView
            isInteractive
            style={[
              styles.circleButton,
              shadows.lg,
              { width: 44, height: 44, borderRadius: radius.full },
            ]}
          >
            <IconSymbol name="plus" size={22} color={colors.accent} />
          </GlassView>
        </Pressable>
      </View>
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
      <View
        style={[styles.popoverAnchor, { right: spacing.xl + 36 + spacing.sm }]}
      >
        <GlassView
          style={[
            styles.popover,
            { borderRadius: radius.xl, padding: spacing.xs },
          ]}
        >
          <Pressable
            onPress={() => onSelect("timeline")}
            style={[
              styles.popoverItem,
              {
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.sm,
                borderRadius: radius.lg,
              },
              viewMode === "timeline" && { backgroundColor: colors.glass },
            ]}
          >
            <IconSymbol
              name="clock"
              size={HomeContent.labelSize + 3}
              color={
                viewMode === "timeline" ? colors.accent : colors.textSecondary
              }
            />
            <Text
              style={[
                typography.subheadline,
                {
                  color:
                    viewMode === "timeline"
                      ? colors.accent
                      : colors.textPrimary,
                  marginLeft: spacing.sm,
                },
              ]}
            >
              Timeline
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onSelect("list")}
            style={[
              styles.popoverItem,
              {
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.sm,
                borderRadius: radius.lg,
              },
              viewMode === "list" && { backgroundColor: colors.glass },
            ]}
          >
            <IconSymbol
              name="list-bullet"
              size={HomeContent.labelSize + 3}
              color={viewMode === "list" ? colors.accent : colors.textSecondary}
            />
            <Text
              style={[
                typography.subheadline,
                {
                  color:
                    viewMode === "list" ? colors.accent : colors.textPrimary,
                  marginLeft: spacing.sm,
                },
              ]}
            >
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
  const timeStr = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <View style={[styles.nowIndicator, { marginVertical: spacing.sm }]}>
      <View style={[styles.nowDot, { backgroundColor: colors.accent }]} />
      <View style={[styles.nowLine, { backgroundColor: colors.accent }]} />
      <GlassView
        style={[
          styles.nowBadge,
          {
            borderRadius: radius.full,
            paddingHorizontal: spacing.sm,
            paddingVertical: 2,
          },
        ]}
      >
        <Text
          style={[
            typography.caption2,
            {
              color: colors.accent,
              fontWeight: "700",
              fontSize: HomeContent.captionSize - 1,
            },
          ]}
        >
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
  const expanded = useRef(true);
  const arrowAnim = useRef(new Animated.Value(1)).current;
  const contentAnim = useRef(new Animated.Value(1)).current;
  const [, forceRender] = useState(0);

  const config = SECTION_CONFIG[timeOfDay];
  const tint = SECTION_TINTS[timeOfDay];
  const tintColor = isDark ? tint.dark : tint.light;
  const badge = BADGE_COLORS[timeOfDay];
  const badgeBg = isDark ? badge.bg.dark : badge.bg.light;
  const badgeText = isDark ? badge.text.dark : badge.text.light;

  const toggleExpanded = useCallback(() => {
    const next = !expanded.current;
    expanded.current = next;
    // Arrow rotation (native driver)
    Animated.spring(arrowAnim, {
      toValue: next ? 1 : 0,
      damping: 18,
      stiffness: 100,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
    // Content fade + height (JS driver)
    Animated.timing(contentAnim, {
      toValue: next ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    forceRender((n) => n + 1);
  }, [arrowAnim, contentAnim]);

  return (
    <View style={{ marginTop: spacing.lg }}>
      {/* Section header row */}
      <View style={styles.sectionHeaderRow}>
        <Pressable onPress={toggleExpanded}>
          <View
            style={[
              styles.sectionPill,
              {
                borderRadius: radius.full,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.xs + 2,
                backgroundColor: badgeBg,
              },
            ]}
          >
            <IconSymbol
              name={config.icon}
              size={HomeContent.labelSize}
              color={badgeText}
            />
            <Text
              style={[
                typography.caption1,
                {
                  color: colors.textPrimary,
                  marginLeft: spacing.xs,
                  letterSpacing: 1,
                  fontWeight: "500",
                  fontSize: HomeContent.smallTitleSize,
                },
              ]}
            >
              {config.label} ({tasks.length})
            </Text>
            <Animated.View
              style={{
                marginLeft: spacing.xs,
                transform: [
                  {
                    rotate: arrowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "90deg"],
                    }),
                  },
                ],
              }}
            >
              <IconSymbol name="chevron-right" size={10} color={badgeText} />
            </Animated.View>
          </View>
        </Pressable>
      </View>

      {/* Now indicator */}
      {showNowIndicator && expanded.current && <NowIndicator />}

      {/* Task list — fade + height shrink via Animated (JS driver) */}
      <Animated.View
        style={{
          overflow: "hidden",
          opacity: contentAnim,
          maxHeight: contentAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 2000],
          }),
          marginTop: contentAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, spacing.sm],
          }),
        }}
        pointerEvents={expanded.current ? "auto" : "none"}
      >
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
            ]}
          >
            <Text
              style={[
                typography.subheadline,
                {
                  color: colors.textTertiary,
                  flex: 1,
                  fontSize: HomeContent.labelSize,
                },
              ]}
            >
              {config.placeholder}
            </Text>
            <IconSymbol name="plus" size={16} color={colors.textTertiary} />
          </View>
        ) : viewMode === "list" ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} compact />)
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </Animated.View>
    </View>
  );
}

// ─── Main Screen ────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const { colors, spacing } = useDesignSystem();
  const insets = useSafeAreaInsets();

  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const [showViewSwitcher, setShowViewSwitcher] = useState(false);

  const handleSelectDate = useCallback(
    (date: Date) => setSelectedDate(date),
    [],
  );

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
  const nowSection: TimeOfDay =
    hour < 12 ? "morning" : hour < 17 ? "day" : "evening";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top },
      ]}
    >
      <TopBar onToggleView={handleToggleView} onAddTask={handleAddTask} />
      <WeekCalendar selectedDate={selectedDate} onSelectDate={handleSelectDate} />

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
        showsVerticalScrollIndicator={false}
      >
        {SECTION_ORDER.map((tod) => {
          const sectionTasks = grouped[tod];
          if (tod === "anytime" && sectionTasks.length === 0) return null;
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  // ScrollView
  scrollView: {
    flex: 1,
  },
  // SectionGroup
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionPill: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  // NowIndicator
  nowIndicator: {
    flexDirection: "row",
    alignItems: "center",
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
    position: "absolute",
    top: 52,
  },
  popover: {
    minWidth: 150,
  },
  popoverItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});
