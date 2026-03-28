/**
 * WeekCalendar — Native-paged week/month slider.
 *
 * Uses ScrollView with pagingEnabled for zero-flash page transitions.
 * - Horizontal swipe: navigate weeks (collapsed) or months (expanded)
 * - Swipe down / tap month label: expand to month view
 * - Swipe up / tap month label: collapse to week view
 * - Tap any date to select it
 */

import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
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
const EXPAND_THRESHOLD = 40;

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

// ─── WeekPage (memoized) ───────────────────────────────────────────────────

const WeekPage = React.memo(function WeekPage({
  dates,
  selectedDate,
  today,
  onSelectDate,
  width,
}: {
  dates: Date[];
  selectedDate: Date;
  today: Date;
  onSelectDate: (date: Date) => void;
  width: number;
}) {
  return (
    <View style={{ width }}>
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
});

// ─── MonthPage (memoized) ──────────────────────────────────────────────────

const MonthPage = React.memo(function MonthPage({
  refDate,
  grid,
  selectedDate,
  today,
  onSelectDate,
  width,
}: {
  refDate: Date;
  grid: Date[][];
  selectedDate: Date;
  today: Date;
  onSelectDate: (date: Date) => void;
  width: number;
}) {
  return (
    <View style={{ width }}>
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
});

// ─── WeekCalendar ───────────────────────────────────────────────────────────

export function WeekCalendar({ selectedDate, onSelectDate }: WeekCalendarProps) {
  const { colors, typography, spacing } = useDesignSystem();
  const today = useMemo(() => new Date(), []);

  const [expanded, setExpanded] = useState(false);
  const [refDate, setRefDate] = useState(selectedDate);
  const [pageWidth, setPageWidth] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  // Guard to prevent onMomentumScrollEnd from firing during programmatic scroll
  const isResetting = useRef(false);

  // ── Compute 3 pages ──
  const weekPages = useMemo(() => {
    const prev = addDays(refDate, -7);
    const next = addDays(refDate, 7);
    return [getWeekDates(prev), getWeekDates(refDate), getWeekDates(next)];
  }, [refDate]);

  const monthPages = useMemo(() => {
    const prev = addMonths(refDate, -1);
    const next = addMonths(refDate, 1);
    return [
      { ref: prev, grid: getMonthGrid(prev.getFullYear(), prev.getMonth()) },
      { ref: refDate, grid: getMonthGrid(refDate.getFullYear(), refDate.getMonth()) },
      { ref: next, grid: getMonthGrid(next.getFullYear(), next.getMonth()) },
    ];
  }, [refDate]);

  const monthLabel = getMonthLabel(refDate);

  // ── Scroll handlers ──
  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isResetting.current) {
        isResetting.current = false;
        return;
      }
      if (pageWidth === 0) return;

      const offsetX = e.nativeEvent.contentOffset.x;
      const page = Math.round(offsetX / pageWidth);

      if (page === 1) return; // stayed on center, no navigation needed

      // 1. Instantly snap scroll back to center FIRST (before data update).
      //    This prevents the flash: if we setRefDate first, the pages re-render
      //    with shifted data while scroll is still at the old page = wrong content visible.
      isResetting.current = true;
      scrollRef.current?.scrollTo({ x: pageWidth, animated: false });

      // 2. Then update data. React re-renders the center page with the new week/month.
      //    Since scroll is already at center, the new content appears seamlessly.
      if (page === 0) {
        setRefDate((d) => (expanded ? addMonths(d, -1) : addDays(d, -7)));
      } else if (page === 2) {
        setRefDate((d) => (expanded ? addMonths(d, 1) : addDays(d, 7)));
      }
    },
    [pageWidth, expanded],
  );

  // ── Expand / Collapse via vertical gesture ──
  const doExpand = useCallback(() => setExpanded(true), []);
  const doCollapse = useCallback(() => setExpanded(false), []);

  const verticalGesture = Gesture.Pan()
    .activeOffsetY([-15, 15])
    .failOffsetX([-15, 15])
    .onEnd((e) => {
      if (!expanded && e.translationY > EXPAND_THRESHOLD) {
        runOnJS(doExpand)();
      } else if (expanded && e.translationY < -EXPAND_THRESHOLD) {
        runOnJS(doCollapse)();
      }
    });

  const handleSelectDate = useCallback(
    (date: Date) => {
      onSelectDate(date);
      setRefDate(date);
    },
    [onSelectDate],
  );

  // ── Layout measurement ──
  const onContainerLayout = useCallback(
    (e: { nativeEvent: { layout: { width: number } } }) => {
      const w = e.nativeEvent.layout.width;
      if (w !== pageWidth) {
        setPageWidth(w);
      }
    },
    [pageWidth],
  );

  // ── Render page helper ──
  const renderPage = useCallback(
    (index: number) => {
      if (expanded) {
        const page = monthPages[index];
        return (
          <MonthPage
            key={index}
            refDate={page.ref}
            grid={page.grid}
            selectedDate={selectedDate}
            today={today}
            onSelectDate={handleSelectDate}
            width={pageWidth}
          />
        );
      }
      return (
        <WeekPage
          key={index}
          dates={weekPages[index]}
          selectedDate={selectedDate}
          today={today}
          onSelectDate={handleSelectDate}
          width={pageWidth}
        />
      );
    },
    [expanded, monthPages, weekPages, selectedDate, today, handleSelectDate, pageWidth],
  );

  // ── Render ──
  return (
    <GestureDetector gesture={verticalGesture}>
      <View style={[styles.container, { paddingHorizontal: spacing.xl }]}>
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

        {/* Paged ScrollView — native snap, no flash */}
        <View style={styles.trackClip} onLayout={onContainerLayout}>
          {pageWidth > 0 && (
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              bounces={false}
              onMomentumScrollEnd={onMomentumEnd}
              contentOffset={{ x: pageWidth, y: 0 }}
            >
              {renderPage(0)}
              {renderPage(1)}
              {renderPage(2)}
            </ScrollView>
          )}
        </View>
      </View>
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
});
