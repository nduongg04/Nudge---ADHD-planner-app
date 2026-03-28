/**
 * TimerDial — Draggable circular time selector (max 60 min).
 * Smooth gradient-style ring, drag handle with glow, center display.
 * 1-minute tick snapping with haptic feedback on every minute change.
 */

import React, { useRef } from 'react';
import { View, Text, StyleSheet, type GestureResponderEvent } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { useDesignSystem } from '@/hooks/use-design-system';
import { FontFamily } from '@/constants/design-system';
import * as Haptics from 'expo-haptics';

interface TimerDialProps {
  minutes: number;
  onChangeMinutes: (minutes: number) => void;
}

const DIAL_SIZE = 280;
const CENTER = DIAL_SIZE / 2;
const RING_R = 108;
const RING_WIDTH = 22;
const HANDLE_R = 8;

function minuteToAngle(minute: number): number {
  // 0 min = top (12 o'clock), clockwise
  return (minute / 60) * 2 * Math.PI - Math.PI / 2;
}

export function TimerDial({ minutes, onChangeMinutes }: TimerDialProps) {
  const { colors, typography } = useDesignSystem();
  const prevMinutesRef = useRef(minutes);

  const circumference = 2 * Math.PI * RING_R;
  const progress = minutes / 60;
  const dashOffset = circumference * (1 - progress);

  // Handle position on the ring
  const handleAngle = minuteToAngle(minutes);
  const hx = CENTER + RING_R * Math.cos(handleAngle);
  const hy = CENTER + RING_R * Math.sin(handleAngle);

  const resolveMinutes = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    const dx = locationX - CENTER;
    const dy = locationY - CENTER;
    // Convert touch position to angle (0° = top, clockwise)
    let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angleDeg < 0) angleDeg += 360;
    // Map angle to minutes (1-min granularity)
    let m = Math.round((angleDeg / 360) * 60);
    if (m === 0) m = 60;
    m = Math.max(1, Math.min(60, m));
    // Haptic on each minute change
    if (m !== prevMinutesRef.current) {
      Haptics.selectionAsync();
      prevMinutesRef.current = m;
    }
    onChangeMinutes(m);
  };

  // Minor ticks every minute, major every 15
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * 2 * Math.PI - Math.PI / 2;
    const isMajor = i % 15 === 0;
    const innerR = RING_R + RING_WIDTH / 2 + 4;
    const outerR = innerR + (isMajor ? 8 : 4);
    return {
      key: i,
      x1: CENTER + innerR * Math.cos(a),
      y1: CENTER + innerR * Math.sin(a),
      x2: CENTER + outerR * Math.cos(a),
      y2: CENTER + outerR * Math.sin(a),
      isMajor,
    };
  });

  // Label positions at 15/30/45/60
  const labels = [
    { text: '60', minute: 0 },
    { text: '15', minute: 15 },
    { text: '30', minute: 30 },
    { text: '45', minute: 45 },
  ];

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.container, { width: DIAL_SIZE, height: DIAL_SIZE }]}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={resolveMinutes}
        onResponderMove={resolveMinutes}
      >
        <Svg width={DIAL_SIZE} height={DIAL_SIZE} pointerEvents="none">
          <Defs>
            <LinearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={colors.accent} stopOpacity="0.9" />
              <Stop offset="1" stopColor={colors.focus} stopOpacity="1" />
            </LinearGradient>
          </Defs>

          {/* Subtle inner fill */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RING_R - RING_WIDTH / 2 - 2}
            fill={colors.accentMuted}
            opacity={0.5}
          />

          {/* Background track */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RING_R}
            stroke={colors.accentMuted}
            strokeWidth={RING_WIDTH}
            fill="none"
          />

          {/* Progress arc — gradient fill */}
          <G transform={`rotate(-90, ${CENTER}, ${CENTER})`}>
            <Circle
              cx={CENTER}
              cy={CENTER}
              r={RING_R}
              stroke="url(#ringGrad)"
              strokeWidth={RING_WIDTH}
              fill="none"
              strokeDasharray={`${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </G>

          {/* Handle — outer glow */}
          <Circle cx={hx} cy={hy} r={HANDLE_R + 6} fill={colors.accent} opacity={0.2} />
          {/* Handle — white dot */}
          <Circle cx={hx} cy={hy} r={HANDLE_R} fill="#fff" />
          {/* Handle — inner accent dot */}
          <Circle cx={hx} cy={hy} r={3.5} fill={colors.accent} />
        </Svg>

        {/* Outer tick marks + labels */}
        <View style={[StyleSheet.absoluteFill]} pointerEvents="none">
          <Svg width={DIAL_SIZE} height={DIAL_SIZE}>
            {ticks.map((t) => (
              <G key={t.key}>
                <Circle
                  cx={(t.x1 + t.x2) / 2}
                  cy={(t.y1 + t.y2) / 2}
                  r={t.isMajor ? 2 : 1}
                  fill={colors.textTertiary}
                  opacity={t.isMajor ? 0.6 : 0.25}
                />
              </G>
            ))}
          </Svg>
        </View>

        {/* Number labels around outside */}
        {labels.map(({ text, minute }) => {
          const a = minuteToAngle(minute);
          const lr = RING_R - RING_WIDTH / 2 - 24;
          const lx = CENTER + lr * Math.cos(a);
          const ly = CENTER + lr * Math.sin(a);
          return (
            <View
              key={text}
              pointerEvents="none"
              style={[
                styles.labelWrapper,
                {
                  left: lx - 14,
                  top: ly - 10,
                },
              ]}
            >
              <Text
                style={[
                  typography.footnote,
                  {
                    color: colors.textTertiary,
                    fontWeight: '500',
                    textAlign: 'center',
                    width: 28,
                  },
                ]}
              >
                {text}
              </Text>
            </View>
          );
        })}

        {/* Center display */}
        <View style={styles.centerOverlay} pointerEvents="none">
          <Text
            style={[
              styles.minutesText,
              { color: colors.textPrimary, fontFamily: FontFamily?.regular },
            ]}
          >
            {minutes}
          </Text>
          <Text
            style={[
              styles.minsLabel,
              {
                color: colors.textTertiary,
                fontFamily: FontFamily?.regular,
              },
            ]}
          >
            MINS
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrapper: {
    position: 'absolute',
  },
  centerOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  minutesText: {
    fontSize: 56,
    fontWeight: '700',
    letterSpacing: -2,
  },
  minsLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: -4,
  },
});
