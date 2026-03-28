/**
 * ADHD-Friendly Design System
 * iOS 26 Liquid Glass / Glassmorphism aesthetic
 *
 * Design principles:
 * - Focus-friendly: minimal visual noise, calm palette
 * - Progress over perfection: no guilt for missed tasks
 * - Gentle structure: suggestions, not rigid rules
 * - ADHD-optimized: clear hierarchy, soft transitions, rewarding feedback
 *
 * Color variants: 5 curated palettes below — uncomment ONE variant block.
 * Current active: Variant 2 — Lavender Cloud
 */

import { Platform } from 'react-native';

// ─── Shared Color Palette ───────────────────────────────────────────────────
// Foundational colors shared across all variants

export const Palette = {
  // Calm sage green — completed / positive / nature states
  sage: {
    50: '#F6F7F5',
    100: '#E8EBE4',
    200: '#D1D7C9',
    300: '#B0BDA1',
    400: '#8FA37A',
    500: '#6B8C5A',
  },

  // Soft lavender — focus / mindfulness states
  lavender: {
    50: '#F8F7FC',
    100: '#EDEBF7',
    200: '#DDD8F0',
    300: '#C4BBE5',
    400: '#A594D6',
    500: '#8B74C8',
  },

  // Warm neutrals (not cold grays — friendlier for ADHD)
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAF9',
    100: '#F5F5F4',
    150: '#EEEEEC',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
  },

  // Semantic
  red: '#EF4444',
  redSoft: '#FEF2F2',
  blue: '#3B82F6',
  blueSoft: '#EFF6FF',
};

// ─── Theme Variant ──────────────────────────────────────────────────────────
// Each variant defines accent, background, and state colors.
// Uncomment ONE block to activate it; comment out the rest.
//
// All variants use warm cream backgrounds, ADHD-friendly muted tones,
// and connect to Nimbus (cloud companion) through sky/nature hues.
// No harsh brights, no heavy darks — just calm, cozy, encouraging.

/* ═══════════════════════════════════════════════════════════════════════════
 * VARIANT 1 — Sage Mist
 * Botanical sage green + warm cream. Garden-calm, nature-grounded.
 * Inspired by: Gentler Streak's earthy warmth
 * Accent: muted sage | Completed: teal | Focus: lavender
 * Best for: users who find nature tones most calming
 * ═══════════════════════════════════════════════════════════════════════════ */
// const V = {
//   accent:         '#6B9E7E',
//   accentSoft:     '#D4E4DA',
//   accentMuted:    '#EEF4F0',
//   bg:             '#F8F7F4',
//   bgSubtle:       '#F2EFEB',
//   glassTint:      'rgba(238, 244, 240, 0.50)',
//   completed:      '#4ECDC4',
//   completedSoft:  '#E8F5F2',
//   focus:          '#A594D6',
//   focusSoft:      '#F4F0FC',
//   tintGreen:      '#E8F5F2',
//   tintAccent:     '#EEF4F0',
//   accentDk:         '#82B594',
//   accentSoftDk:     'rgba(107, 158, 126, 0.15)',
//   accentMutedDk:    'rgba(107, 158, 126, 0.08)',
//   bgDk:             '#161A17',
//   completedSoftDk:  'rgba(78, 205, 196, 0.15)',
//   focusDk:          '#B0A3D4',
//   focusSoftDk:      'rgba(165, 148, 214, 0.15)',
//   tintGreenDk:      '#1A2E28',
//   tintAccentDk:     '#1A2B20',
// };

/* ═══════════════════════════════════════════════════════════════════════════
 * VARIANT 2 — Lavender Cloud  (ACTIVE)
 * Dreamy lavender tied to Nimbus's sky identity. Soft, calming, premium.
 * Inspired by: Tiimo + Arc's pastel elegance
 * Accent: dusty lavender | Completed: teal | Focus: sky blue
 * Best for: connecting the UI emotionally to Nimbus the cloud companion
 * ═══════════════════════════════════════════════════════════════════════════ */
// const V = {
//   accent:         '#8B7FC0',
//   accentSoft:     '#D5CEE8',
//   accentMuted:    '#F0EDF7',
//   bg:             '#F9F7F5',
//   bgSubtle:       '#F3F0ED',
//   glassTint:      'rgba(240, 237, 247, 0.50)',
//   completed:      '#4ECDC4',
//   completedSoft:  '#E8F5F2',
//   focus:          '#7BA4C4',
//   focusSoft:      '#ECF2F8',
//   tintGreen:      '#E8F5F2',
//   tintAccent:     '#F0EDF7',
//   accentDk:         '#A294CC',
//   accentSoftDk:     'rgba(139, 127, 192, 0.15)',
//   accentMutedDk:    'rgba(139, 127, 192, 0.08)',
//   bgDk:             '#17151E',
//   completedSoftDk:  'rgba(78, 205, 196, 0.15)',
//   focusDk:          '#8FB5D0',
//   focusSoftDk:      'rgba(123, 164, 196, 0.15)',
//   tintGreenDk:      '#1A2E28',
//   tintAccentDk:     '#221E30',
// };

/* ═══════════════════════════════════════════════════════════════════════════
 * VARIANT 3 — Morning Dew
 * Dusty rose meets botanical sage. A gentle dawn-like warmth.
 * Inspired by: Gentler Streak warmth + TIDE's earthy sophistication
 * Accent: dusty rose | Completed: sage | Focus: lavender
 * Best for: a softer, more feminine-leaning cozy feel
 * ═══════════════════════════════════════════════════════════════════════════ */
// const V = {
//   accent:         '#B48A9B',
//   accentSoft:     '#E2CED6',
//   accentMuted:    '#F7F0F3',
//   bg:             '#FAF7F5',
//   bgSubtle:       '#F4F0EC',
//   glassTint:      'rgba(247, 240, 243, 0.50)',
//   completed:      '#7BA68C',
//   completedSoft:  '#E8F0EB',
//   focus:          '#A594D6',
//   focusSoft:      '#F4F0FC',
//   tintGreen:      '#E8F0EB',
//   tintAccent:     '#F7F0F3',
//   accentDk:         '#C8A0B0',
//   accentSoftDk:     'rgba(180, 138, 155, 0.15)',
//   accentMutedDk:    'rgba(180, 138, 155, 0.08)',
//   bgDk:             '#1A1618',
//   completedSoftDk:  'rgba(123, 166, 140, 0.15)',
//   focusDk:          '#B0A3D4',
//   focusSoftDk:      'rgba(165, 148, 214, 0.15)',
//   tintGreenDk:      '#1A2B20',
//   tintAccentDk:     '#2A1E24',
// };

/* ═══════════════════════════════════════════════════════════════════════════
 * VARIANT 4 — Twilight Sage
 * Muted plum + sage depth. Sophisticated, introspective, grounded.
 * Inspired by: Arc browser's muted palette + Tiimo's calm depth
 * Accent: muted plum | Completed: sage | Focus: sky blue
 * Best for: a more gender-neutral, intellectual, calm aesthetic
 * ═══════════════════════════════════════════════════════════════════════════ */
// const V = {
//   accent:         '#8B7198',
//   accentSoft:     '#D5C8DC',
//   accentMuted:    '#F2EDF5',
//   bg:             '#fff',
//   bgSubtle:       '#F2EFEB',
//   glassTint:      'rgba(242, 237, 245, 0.50)',
//   completed:      '#6B9E7E',
//   completedSoft:  '#E5F0EA',
//   focus:          '#7BA4C4',
//   focusSoft:      '#ECF2F8',
//   tintGreen:      '#E5F0EA',
//   tintAccent:     '#F2EDF5',
//   accentDk:         '#A088AE',
//   accentSoftDk:     'rgba(139, 113, 152, 0.15)',
//   accentMutedDk:    'rgba(139, 113, 152, 0.08)',
//   bgDk:             '#19171C',
//   completedSoftDk:  'rgba(107, 158, 126, 0.15)',
//   focusDk:          '#8FB5D0',
//   focusSoftDk:      'rgba(123, 164, 196, 0.15)',
//   tintGreenDk:      '#1A2B20',
//   tintAccentDk:     '#241E2A',
// };

/* ═══════════════════════════════════════════════════════════════════════════
 * VARIANT 5 — Cloud Dawn
 * Warm teal + cream. Nimbus at sunrise — fresh, optimistic, airy.
 * Inspired by: TIDE's warm earthiness + Nimbus sky connection
 * Accent: warm teal | Completed: soft gold | Focus: lavender
 * Best for: an uplifting, fresh feel while staying warm and cozy
 * ═══════════════════════════════════════════════════════════════════════════ */
const V = {
  accent:         '#62B5BE',
  accentSoft:     '#C5E4E8',
  accentMuted:    '#EAF5F7',
  bg:             '#fff',
  bgSubtle:       '#F3F0EC',
  glassTint:      'rgba(198, 228, 232, 0.45)',
  completed:      '#C4B078',
  completedSoft:  '#F5F0E2',
  focus:          '#A594D6',
  focusSoft:      '#F4F0FC',
  tintGreen:      '#E8F5F2',
  tintAccent:     '#EAF5F7',
  accentDk:         '#7EC8D0',
  accentSoftDk:     'rgba(98, 181, 190, 0.18)',
  accentMutedDk:    'rgba(98, 181, 190, 0.10)',
  bgDk:             '#151919',
  completedSoftDk:  'rgba(196, 176, 120, 0.15)',
  focusDk:          '#B0A3D4',
  focusSoftDk:      'rgba(165, 148, 214, 0.15)',
  tintGreenDk:      '#1A2820',
  tintAccentDk:     '#1A2628',
};

// ─── Theme Colors ────────────────────────────────────────────────────────────

export const LightTheme = {
  // Backgrounds
  background: V.bg,
  backgroundPure: '#FFFFFF',
  backgroundSubtle: V.bgSubtle,
  backgroundElevated: 'rgba(255, 255, 255, 0.72)',

  // Glass / Blur surfaces
  glass: 'rgba(255, 255, 255, 0.55)',
  glassBorder: 'rgba(255, 255, 255, 0.35)',
  glassHeavy: 'rgba(255, 255, 255, 0.78)',
  glassTint: V.glassTint,

  // Text
  textPrimary: '#1A1A1A',       // warm near-black
  textSecondary: Palette.neutral[600],
  textTertiary: Palette.neutral[400],
  textInverse: Palette.neutral[0],

  // Accent
  accent: V.accent,
  accentSoft: V.accentSoft,
  accentMuted: V.accentMuted,

  // Task category colors (soft, not loud)
  categoryMorning: '#FDBA74',   // warm peach
  categoryDay: '#93C5FD',       // soft blue
  categoryEvening: '#C4B5FD',   // soft purple
  categoryAnytime: Palette.neutral[300],

  // States
  completed: V.completed,
  completedSoft: V.completedSoft,
  focus: V.focus,
  focusSoft: V.focusSoft,
  destructive: Palette.red,
  destructiveSoft: Palette.redSoft,

  // Tinted surfaces
  surfaceTintedGreen: V.tintGreen,
  surfaceTintedOrange: V.tintAccent,

  // UI elements
  border: '#E8E5E1',            // warm border
  borderSubtle: Palette.neutral[150],
  separator: 'rgba(0, 0, 0, 0.06)',
  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowHeavy: 'rgba(0, 0, 0, 0.15)',

  // Tab bar
  tabBar: 'rgba(255, 255, 255, 0.82)',
  tabBarBorder: 'rgba(0, 0, 0, 0.06)',
  tabIconDefault: Palette.neutral[400],
  tabIconSelected: V.accent,

  // Current time indicator
  timeIndicator: V.accent,
};

export const DarkTheme = {
  // Backgrounds
  background: V.bgDk,
  backgroundPure: '#000000',
  backgroundSubtle: Palette.neutral[900],
  backgroundElevated: 'rgba(28, 25, 23, 0.85)',

  // Glass / Blur surfaces
  glass: 'rgba(40, 36, 33, 0.6)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  glassHeavy: 'rgba(40, 36, 33, 0.82)',
  glassTint: 'rgba(40, 36, 33, 0.5)',

  // Text
  textPrimary: Palette.neutral[100],
  textSecondary: Palette.neutral[400],
  textTertiary: Palette.neutral[500],
  textInverse: Palette.neutral[900],

  // Accent
  accent: V.accentDk,
  accentSoft: V.accentSoftDk,
  accentMuted: V.accentMutedDk,

  // Task category colors (muted for dark)
  categoryMorning: '#92400E',
  categoryDay: '#1E3A5F',
  categoryEvening: '#3B2D6B',
  categoryAnytime: Palette.neutral[700],

  // States
  completed: V.completed,
  completedSoft: V.completedSoftDk,
  focus: V.focusDk,
  focusSoft: V.focusSoftDk,
  destructive: '#F87171',
  destructiveSoft: 'rgba(239, 68, 68, 0.12)',

  // Tinted surfaces
  surfaceTintedGreen: V.tintGreenDk,
  surfaceTintedOrange: V.tintAccentDk,

  // UI elements
  border: Palette.neutral[800],
  borderSubtle: Palette.neutral[800],
  separator: 'rgba(255, 255, 255, 0.06)',
  shadow: 'rgba(0, 0, 0, 0.4)',
  shadowHeavy: 'rgba(0, 0, 0, 0.6)',

  // Tab bar
  tabBar: 'rgba(12, 10, 9, 0.88)',
  tabBarBorder: 'rgba(255, 255, 255, 0.06)',
  tabIconDefault: Palette.neutral[500],
  tabIconSelected: V.accentDk,

  // Current time indicator
  timeIndicator: V.accentDk,
};

export type ThemeColors = typeof LightTheme;

// ─── Typography ──────────────────────────────────────────────────────────────
// Rounded font on iOS for friendlier feel (like Tiimo)
// Clear hierarchy to reduce decision fatigue

export const FontFamily = Platform.select({
  ios: {
    regular: 'ui-rounded',       // SF Pro Rounded
    serif: 'ui-serif',
    mono: 'ui-monospace',
  },
  default: {
    regular: 'normal',
    serif: 'serif',
    mono: 'monospace',
  },
});

export const Typography = {
  // Large display — date, greeting
  largeTitle: {
    fontFamily: FontFamily?.regular,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,
    letterSpacing: 0.37,
  },

  // Section titles
  title1: {
    fontFamily: FontFamily?.regular,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.36,
  },

  title2: {
    fontFamily: FontFamily?.regular,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
    letterSpacing: 0.35,
  },

  title3: {
    fontFamily: FontFamily?.regular,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600' as const,
    letterSpacing: 0.38,
  },

  // Body text
  body: {
    fontFamily: FontFamily?.regular,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: -0.41,
  },

  bodySemibold: {
    fontFamily: FontFamily?.regular,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.41,
  },

  // Secondary info — duration, time, labels
  callout: {
    fontFamily: FontFamily?.regular,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400' as const,
    letterSpacing: -0.32,
  },

  calloutSemibold: {
    fontFamily: FontFamily?.regular,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600' as const,
    letterSpacing: -0.32,
  },

  // Smaller labels, chips
  subheadline: {
    fontFamily: FontFamily?.regular,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: -0.24,
  },

  subheadlineSemibold: {
    fontFamily: FontFamily?.regular,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600' as const,
    letterSpacing: -0.24,
  },

  // Footnotes, timestamps
  footnote: {
    fontFamily: FontFamily?.regular,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: -0.08,
  },

  footnoteSemibold: {
    fontFamily: FontFamily?.regular,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600' as const,
    letterSpacing: -0.08,
  },

  // Tiny labels
  caption1: {
    fontFamily: FontFamily?.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },

  caption2: {
    fontFamily: FontFamily?.regular,
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400' as const,
    letterSpacing: 0.07,
  },

  // Timer display (Focus Mode)
  timer: {
    fontFamily: FontFamily?.mono,
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '300' as const,
    letterSpacing: -1,
  },
};

// ─── Spacing ─────────────────────────────────────────────────────────────────
// 4px base grid, generous spacing to reduce visual clutter

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

// ─── Border Radius ───────────────────────────────────────────────────────────
// Large radii for friendly, approachable feel

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// ─── Shadows ─────────────────────────────────────────────────────────────────
// Soft, diffused shadows — never harsh

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  glass: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
};

// ─── Animation Presets ───────────────────────────────────────────────────────
// Smooth, non-jarring transitions

export const Animation = {
  spring: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },
  springGentle: {
    damping: 20,
    stiffness: 100,
    mass: 1,
  },
  springBouncy: {
    damping: 12,
    stiffness: 250,
    mass: 0.6,
  },
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
};

// ─── Blur Intensities ────────────────────────────────────────────────────────
// iOS 26 liquid glass levels

export const BlurIntensity = {
  subtle: 20,
  medium: 40,
  heavy: 60,
  sheet: 80,
};

// ─── Task Category Config ────────────────────────────────────────────────────

export const TaskCategories = {
  anytime: {
    label: 'Anytime',
    emoji: '\u{1F550}',
    lightBg: 'rgba(168, 162, 158, 0.1)',
    darkBg: 'rgba(168, 162, 158, 0.08)',
  },
  morning: {
    label: 'Morning',
    emoji: '\u{1F305}',
    lightBg: 'rgba(253, 186, 116, 0.15)',
    darkBg: 'rgba(253, 186, 116, 0.08)',
  },
  day: {
    label: 'Day',
    emoji: '\u{2600}\u{FE0F}',
    lightBg: 'rgba(147, 197, 253, 0.15)',
    darkBg: 'rgba(147, 197, 253, 0.08)',
  },
  evening: {
    label: 'Evening',
    emoji: '\u{1F319}',
    lightBg: 'rgba(196, 181, 253, 0.15)',
    darkBg: 'rgba(196, 181, 253, 0.08)',
  },
};

// ─── Mood Emoji Set ──────────────────────────────────────────────────────────
// Non-judgmental mood options

// ─── Content Style Tokens ───────────────────────────────────────────────────
// Shared sizing tokens for screen content (excludes tab bar / nav).

export const HomeContent = {
  // Typography sizes
  headingSize: 24,
  titleSize: 18,
  titleCompactSize: 16,
  labelSize: 13,
  captionSize: 12,

  // Card density
  cardPadding: 12,
  cardPaddingCompact: 8,
  cardGap: 8,
  cardIconSize: 40,
  cardIconSizeCompact: 32,
  cardCheckboxSize: 24,
  cardCheckboxSizeCompact: 20,
};

export const MoodEmojis = [
  { key: 'great', emoji: '\u{1F60A}', label: 'Great' },
  { key: 'good', emoji: '\u{1F642}', label: 'Good' },
  { key: 'okay', emoji: '\u{1F610}', label: 'Okay' },
  { key: 'low', emoji: '\u{1F614}', label: 'Low' },
  { key: 'tough', emoji: '\u{1F623}', label: 'Tough' },
];
