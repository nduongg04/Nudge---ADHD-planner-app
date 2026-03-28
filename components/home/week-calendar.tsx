/**
 * WeekCalendar — Real paged slider for week/month navigation.
 *
 * - Renders 3 pages (prev, current, next) side by side
 * - Horizontal swipe slides pages like a real carousel
 * - Swipe down to expand into month view, swipe up to collapse
 * - Tap month label to toggle expand/collapse
 * - Tap any date to select it
 */

import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { useDesignSystem } from "@/hooks/use-design-system";

// ─── Constants ──────────────────────────────────────────────────────────────

const DAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const SWIPE_VELOCITY = 500;
const EXPAND_THRESHOLD = 40;

const SPRING_CONFIG = {
  damping: 22,
  stiffness: 220,
  mass: 0.8,
};

const SNAP_TIMING = {
  duration: 250,
};

// ─── Date Helpers ───────────────────────────────────────────────────────────

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n, 1);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
  );
}

function getWeekDates(centerDate: Date): Date[] {
  const dayOfWeek = centerDate.getDay();
  const startOfWeek = addDays(centerDate, -dayOfWeek);
  return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i));
}

function getMonthGrid(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const gridStart = addDays(firstDay, -startOffset);

  const rows: Date[][] = [];
  let current = gridStart;
  for (let r = 0; r < 6; r++) {
    const row: Date[] = [];
    for (let c = 0; c < 7; c++) {
      row.push(current);
      current = addDays(current, 1);
    }
    rows.push(row);
  }
  return rows;
}

function getMonthLabel(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

// ─── Types ──────────────────────────────────────────────────────────────────

interface WeekCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

// ─── DayCell ────────────────────────────────────────────────────────────────

function DayCell({
  date,
  isSelected,
  isToday,
  isCurrentMonth,
  onPress,
}: {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  onPress: () => void;
}) {
  const { colors, typography, radius } = useDesignSystem();
  const dayNum = date.getDate();

  const textColor = isSelected
    ? "#FFFFFF"
    : !isCurrentMonth
      ? colors.textTertiary
      : isToday
        ? colors.accent
        : colors.textPrimary;

  return (
    <Pressable onPress={onPress} style={styles.dayCell}>
      <View
        style={[
          styles.dayCircle,
          {
            borderRadius: radius.full,
            backgroundColor: isSelected ? colors.accent : "transparent",
          },
        ]}
      >
        <Text
          style={[
            typography.bodySemibold,
            { color: textColor, fontSize: 15 },
          ]}
        >
          {dayNum}
        </Text>
      </View>
    </Pressable>
  );
}

// ─── DayLetterHeader ───────────────────────────────────────────────────────

function DayLetterHeader() {
  const { colors, typography } = useDesignSystem();
  return (
    <View style={styles.weekRow}>
      {DAY_LETTERS.map((letter, idx) => (
        <View key={idx} style={styles.dayCell}>
          <Text
            style={[
              typography.caption2,
              {
                color: colors.textTertiary,
                fontSize: 11,
                fontWeight: "600",
              },
            ]}
          >
            {letter}
          </Text>
        </View>
      ))}
    </View>
  );
}

// ─── WeekPage (day headers + single week row) ─────────────────────────────

function WeekPage({
  dates,
  selectedDate,
  today,
  onSelectDate,
}: {
  dates: Date[];
  selectedDate: Date;
  today: Date;
  onSelectDate: (date: Date) => void;
}) {
  return (
    <View>
      <DayLetterHeader />
      <View style={styles.weekRow}>
        {dates.map((date, idx) => (
          <DayCell
            key={idx}
            date={date}
            isSelected={isSameDay(date, selectedDate)}
            isToday={isSameDay(date, today)}
            isCurrentMonth={true}
            onPress={() => onSelectDate(date)}
          />
        ))}
      </View>
    </View>
  );
}

// ─── MonthPage (day headers + full month grid) ────────────────────────────

function MonthPage({
  refDate,
  grid,
  selectedDate,
  today,
  onSelectDate,
}: {
  refDate: Date;
  grid: Date[][];
  selectedDate: Date;
  today: Date;
  onSelectDate: (date: Date) => void;
}) {
  return (
    <View>
      <DayLetterHeader />
      {grid.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.weekRow}>
          {row.map((date, colIdx) => (
            <DayCell
              key={colIdx}
              date={date}
              isSelected={isSameDay(date, selectedDate)}
              isToday={isSameDay(date, today)}
              isCurrentMonth={isSameMonth(date, refDate)}
              onPress={() => onSelectDate(date)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

// ─── WeekCalendar ───────────────────────────────────────────────────────────

export function WeekCalendar({ selectedDate, onSelectDate }: WeekCalendarProps) {
  const { colors, typography, spacing } = useDesignSystem();
  const today = useMemo(() => new Date(), []);

  const [expanded, setExpanded] = useState(false);
  const [refDate, setRefDate] = useState(selectedDate);
  const [pageWidth, setPageWidth] = useState(0);

  // ── Compute 3 week pages ──
  const weekPages = useMemo(() => {
    const prevWeek = addDays(refDate, -7);
    const nextWeek = addDays(refDate, 7);
    return {
      prev: getWeekDates(prevWeek),
      current: getWeekDates(refDate),
      next: getWeekDates(nextWeek),
    };
  }, [refDate]);

  // ── Compute 3 month pages ──
  const monthPages = useMemo(() => {
    const prev = addMonths(refDate, -1);
    const next = addMonths(refDate, 1);
    return {
      prev: { ref: prev, grid: getMonthGrid(prev.getFullYear(), prev.getMonth()) },
      current: { ref: refDate, grid: getMonthGrid(refDate.getFullYear(), refDate.getMonth()) },
      next: { ref: next, grid: getMonthGrid(next.getFullYear(), next.getMonth()) },
    };
  }, [refDate]);

  const monthLabel = getMonthLabel(refDate);

  // ── Animated values ──
  const translateX = useSharedValue(0);
  const isAnimating = useSharedValue(false);

  // ── Navigation counter — triggers useLayoutEffect to reset translateX ──
  const navCounter = useRef(0);
  const [navTick, setNavTick] = useState(0);

  // Reset translateX atomically with the React commit (before paint)
  useLayoutEffect(() => {
    if (navTick > 0) {
      translateX.value = 0;
      isAnimating.value = false;
    }
  }, [navTick, translateX, isAnimating]);

  // ── Navigation callbacks ──
  const navigateForward = useCallback(() => {
    if (expanded) {
      setRefDate((d) => addMonths(d, 1));
    } else {
      setRefDate((d) => addDays(d, 7));
    }
    navCounter.current += 1;
    setNavTick(navCounter.current);
  }, [expanded]);

  const navigateBack = useCallback(() => {
    if (expanded) {
      setRefDate((d) => addMonths(d, -1));
    } else {
      setRefDate((d) => addDays(d, -7));
    }
    navCounter.current += 1;
    setNavTick(navCounter.current);
  }, [expanded]);

  const doExpand = useCallback(() => setExpanded(true), []);
  const doCollapse = useCallback(() => setExpanded(false), []);

  const handleSelectDate = useCallback(
    (date: Date) => {
      onSelectDate(date);
      setRefDate(date);
    },
    [onSelectDate],
  );

  const snapAndNavigate = useCallback(
    (direction: "left" | "right") => {
      "worklet";
      const target = direction === "left" ? -pageWidth : pageWidth;
      isAnimating.value = true;
      translateX.value = withTiming(target, SNAP_TIMING, (finished) => {
        if (finished) {
          // Don't reset translateX here on UI thread — that causes the flash.
          // Instead, runOnJS updates React state; useLayoutEffect resets
          // translateX atomically with the new data commit.
          runOnJS(direction === "left" ? navigateForward : navigateBack)();
        }
      });
    },
    [pageWidth, translateX, isAnimating, navigateForward, navigateBack],
  );

  // ── Horizontal gesture (page slide) ──
  const horizontalGesture = Gesture.Pan()
    .activeOffsetX([-15, 15])
    .failOffsetY([-10, 10])
    .onUpdate((e) => {
      if (isAnimating.value) return;
      // Clamp to ±pageWidth so you only see 1 adjacent page
      translateX.value = Math.max(
        -pageWidth,
        Math.min(pageWidth, e.translationX),
      );
    })
    .onEnd((e) => {
      if (isAnimating.value) return;
      const threshold = pageWidth * 0.3;
      const shouldSnap =
        Math.abs(e.translationX) > threshold ||
        Math.abs(e.velocityX) > SWIPE_VELOCITY;

      if (shouldSnap && e.translationX < 0) {
        snapAndNavigate("left");
      } else if (shouldSnap && e.translationX > 0) {
        snapAndNavigate("right");
      } else {
        // Bounce back
        translateX.value = withSpring(0, SPRING_CONFIG);
      }
    });

  // ── Vertical gesture (expand/collapse) ──
  const verticalGesture = Gesture.Pan()
    .activeOffsetY([-15, 15])
    .failOffsetX([-10, 10])
    .onEnd((e) => {
      if (!expanded && e.translationY > EXPAND_THRESHOLD) {
        runOnJS(doExpand)();
      } else if (expanded && e.translationY < -EXPAND_THRESHOLD) {
        runOnJS(doCollapse)();
      }
    });

  const composedGesture = Gesture.Race(horizontalGesture, verticalGesture);

  // ── Animated style for the 3-page track ──
  // Track has 3 pages in a row. `left: -pageWidth` centers on the middle page.
  // translateX adds the gesture/animation delta on top.
  const trackStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // ── Layout measurement (on the clip container, not the padded wrapper) ──
  const onTrackLayout = useCallback(
    (e: { nativeEvent: { layout: { width: number } } }) => {
      setPageWidth(e.nativeEvent.layout.width);
    },
    [],
  );

  // ── Render helper for a single page ──
  const renderPage = useCallback(
    (position: "prev" | "current" | "next") => {
      if (expanded) {
        const page = monthPages[position];
        return (
          <MonthPage
            refDate={page.ref}
            grid={page.grid}
            selectedDate={selectedDate}
            today={today}
            onSelectDate={handleSelectDate}
          />
        );
      }
      return (
        <WeekPage
          dates={weekPages[position]}
          selectedDate={selectedDate}
          today={today}
          onSelectDate={handleSelectDate}
        />
      );
    },
    [expanded, monthPages, weekPages, selectedDate, today, handleSelectDate],
  );

  // ── Render ──
  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[styles.container, { paddingHorizontal: spacing.xl }]}
      >
        {/* Month label — tap to toggle expand/collapse */}
        <Pressable
          onPress={() => {
            if (expanded) doCollapse();
            else doExpand();
          }}
        >
          <Text
            style={[
              typography.subheadlineSemibold,
              {
                color: colors.textSecondary,
                marginBottom: spacing.md,
                textAlign: "center",
              },
            ]}
          >
            {monthLabel}
          </Text>
        </Pressable>

        {/* Clipped viewport — measures usable width */}
        <View style={styles.trackClip} onLayout={onTrackLayout}>
          {pageWidth > 0 && (
            <Animated.View
              style={[
                styles.track,
                { width: pageWidth * 3, left: -pageWidth },
                trackStyle,
              ]}
            >
              <View style={{ width: pageWidth }}>{renderPage("prev")}</View>
              <View style={{ width: pageWidth }}>{renderPage("current")}</View>
              <View style={{ width: pageWidth }}>{renderPage("next")}</View>
            </Animated.View>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  dayCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 2,
  },
  dayCircle: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  trackClip: {
    overflow: "hidden",
  },
  track: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
