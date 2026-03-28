/**
 * Me Screen — Nudge ADHD AI Planner.
 * Profile header, weekly insights, mood tracking, streaks, and links.
 * iOS 26 Liquid Glass aesthetic with Heroicons.
 */

import { FeedbackBottomSheet } from "@/components/feedback/feedback-bottom-sheet";
import { GlassView } from "@/components/ui/glass";
import { GlassCard } from "@/components/ui/glass/glass-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useDesignSystem } from "@/hooks/use-design-system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Constants ─────────────────────────────────────────────────────────────

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Mock mood data — day index (0 = Sunday) → emoji + background tint
const MOCK_MOODS: Record<number, { emoji: string; bg: string }> = {
  0: { emoji: "😊", bg: "#FDBA74" },
  1: { emoji: "😌", bg: "#93C5FD" },
};

const MOCK_STREAK = { daysInRow: 1, totalDays: 3 };

// ─── ProfileHeader ─────────────────────────────────────────────────────────

function ProfileHeader({
  userName,
  onNamePress,
  onSettingsPress,
}: {
  userName: string;
  onNamePress: () => void;
  onSettingsPress: () => void;
}) {
  const { colors, typography, spacing, radius, shadows } = useDesignSystem();

  return (
    <View style={[styles.header, { paddingHorizontal: spacing.xl }]}>
      {/* Name pill button */}
      <Pressable onPress={onNamePress} hitSlop={8}>
        <GlassView
          isInteractive
          style={[
            shadows.glass,
            {
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm + 2,
              borderRadius: radius.full,
            },
          ]}
        >
          <Text
            style={[typography.bodySemibold, { color: colors.textPrimary }]}
          >
            {userName}
          </Text>
        </GlassView>
      </Pressable>

      {/* Gear button */}
      <Pressable onPress={onSettingsPress} hitSlop={8}>
        <GlassView
          isInteractive
          style={[
            styles.circleButton,
            shadows.glass,
            { width: 44, height: 44, borderRadius: radius.full },
          ]}
        >
          <IconSymbol name="cog" size={22} color={colors.textSecondary} />
        </GlassView>
      </Pressable>
    </View>
  );
}

// ─── MoodCard ──────────────────────────────────────────────────────────────

function MoodCard() {
  const { colors, typography, spacing } = useDesignSystem();
  const today = new Date().getDay();

  return (
    <GlassCard style={{ marginTop: spacing.lg }}>
      <Text
        style={[
          typography.calloutSemibold,
          { color: colors.textPrimary, marginBottom: spacing.lg },
        ]}
      >
        Mood and Daily Reflections
      </Text>

      <View style={styles.moodRow}>
        {DAYS_OF_WEEK.map((day, index) => {
          const mood = MOCK_MOODS[index];
          const isToday = index === today;
          const isFuture = index > today;

          return (
            <View key={day} style={styles.moodDay}>
              {mood ? (
                <View
                  style={[
                    styles.moodCircle,
                    { backgroundColor: mood.bg + "30" },
                  ]}
                >
                  <Text style={{ fontSize: 20 }}>{mood.emoji}</Text>
                </View>
              ) : (
                <View
                  style={[
                    styles.moodCircle,
                    {
                      backgroundColor: isToday
                        ? colors.textPrimary
                        : isFuture
                          ? "transparent"
                          : colors.backgroundSubtle,
                    },
                    !isToday &&
                      !isFuture && {
                        borderWidth: 1,
                        borderColor: colors.border,
                      },
                  ]}
                >
                  <IconSymbol
                    name="plus"
                    size={16}
                    color={
                      isToday ? colors.backgroundPure : colors.textTertiary
                    }
                  />
                </View>
              )}

              <Text
                style={[
                  typography.caption2,
                  {
                    color: isToday ? colors.textPrimary : colors.textSecondary,
                    marginTop: spacing.xs,
                    fontWeight: isToday ? "600" : "400",
                  },
                ]}
              >
                {day}
              </Text>
            </View>
          );
        })}
      </View>
    </GlassCard>
  );
}

// ─── StreakCard ─────────────────────────────────────────────────────────────

function StreakCard() {
  const { colors, typography, spacing, radius } = useDesignSystem();

  return (
    <GlassCard style={{ marginTop: spacing.lg }}>
      <Text
        style={[
          typography.callout,
          { color: colors.textPrimary, marginBottom: spacing.md },
        ]}
      >
        I&apos;ve been planning every day for
      </Text>

      <View style={styles.streakRow}>
        {/* Days in a row */}
        <View
          style={[
            styles.streakBox,
            {
              backgroundColor: colors.focusSoft,
              borderRadius: radius.xl,
              padding: spacing.lg,
              marginRight: spacing.sm,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[typography.largeTitle, { color: colors.textPrimary }]}
            >
              {MOCK_STREAK.daysInRow}
            </Text>
            <Text style={{ fontSize: 20, marginLeft: spacing.xs }}>🌱</Text>
          </View>
          <Text
            style={[
              typography.caption1,
              {
                color: colors.textSecondary,
                fontWeight: "600",
                marginTop: spacing.xs,
                letterSpacing: 0.5,
              },
            ]}
          >
            DAYS IN ROW
          </Text>
        </View>

        {/* Total days */}
        <View
          style={[
            styles.streakBox,
            {
              backgroundColor: colors.accentMuted,
              borderRadius: radius.xl,
              padding: spacing.lg,
              marginLeft: spacing.sm,
            },
          ]}
        >
          <Text style={[typography.largeTitle, { color: colors.textPrimary }]}>
            {MOCK_STREAK.totalDays}
          </Text>
          <Text
            style={[
              typography.caption1,
              {
                color: colors.textSecondary,
                fontWeight: "600",
                marginTop: spacing.xs,
                letterSpacing: 0.5,
              },
            ]}
          >
            TOTAL DAYS
          </Text>
        </View>
      </View>

      {/* Share button */}
      <Pressable style={[styles.shareButton, { marginTop: spacing.lg }]}>
        <Text style={[typography.subheadline, { color: colors.textSecondary }]}>
          Share
        </Text>
        <IconSymbol
          name="arrow-up-square"
          size={16}
          color={colors.textSecondary}
          style={{ marginLeft: spacing.xs }}
        />
      </Pressable>
    </GlassCard>
  );
}

// ─── LinkRow ───────────────────────────────────────────────────────────────

function LinkRow({
  icon,
  label,
  onPress,
  showDivider = true,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  showDivider?: boolean;
}) {
  const { colors, typography, spacing } = useDesignSystem();

  return (
    <>
      <Pressable
        onPress={onPress}
        style={[
          styles.linkRow,
          { padding: spacing.lg },
        ]}
      >
        {icon}
        <Text
          style={[
            typography.body,
            { color: colors.textPrimary, flex: 1, marginLeft: spacing.md },
          ]}
        >
          {label}
        </Text>
        <IconSymbol
          name="chevron-right"
          size={16}
          color={colors.textTertiary}
        />
      </Pressable>
      {showDivider && (
        <View
          style={{
            height: 1,
            backgroundColor: colors.border,
          }}
        />
      )}
    </>
  );
}

// ─── NameBottomSheet ───────────────────────────────────────────────────────

function NameBottomSheet({
  visible,
  currentName,
  onClose,
}: {
  visible: boolean;
  currentName: string;
  onClose: (newName: string) => void;
}) {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(currentName);
  const nameRef = useRef(currentName);
  const closingRef = useRef(false);

  // Separate animations: overlay fades, sheet slides
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      setName(currentName);
      nameRef.current = currentName;
      closingRef.current = false;
      // Overlay fades in immediately, sheet slides up
      Animated.parallel([
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 24,
          stiffness: 300,
          mass: 0.8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, currentName, overlayAnim, slideAnim]);

  const handleChange = (text: string) => {
    setName(text);
    nameRef.current = text;
  };

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const finalName = nameRef.current.trim() || currentName;
    // Animate out: sheet slides down, overlay fades
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose(finalName);
    });
  }, [currentName, onClose, overlayAnim, slideAnim]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.sheetContainer}
      >
        {/* Overlay — fades in independently */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.backdrop,
            { opacity: overlayAnim },
          ]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        </Animated.View>

        {/* Sheet — slides up independently */}
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.backgroundPure,
              borderTopLeftRadius: radius["3xl"],
              borderTopRightRadius: radius["3xl"],
              paddingBottom: insets.bottom + spacing["2xl"],
              paddingHorizontal: spacing.xl,
              paddingTop: spacing.md,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Handle */}
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          </View>

          {/* Title */}
          <Text
            style={[
              typography.title3,
              {
                color: colors.textPrimary,
                marginTop: spacing.xl,
                marginBottom: spacing.lg,
              },
            ]}
          >
            What should we call you?
          </Text>

          {/* Input row */}
          <View
            style={[
              styles.inputRow,
              {
                backgroundColor: colors.backgroundPure,
                borderRadius: radius.full,
                height: 48,
                paddingRight: spacing.xs,
              },
            ]}
          >
            <TextInput
              value={name}
              onChangeText={handleChange}
              autoFocus
              onBlur={handleClose}
              onSubmitEditing={handleClose}
              style={{
                fontFamily: typography.body.fontFamily,
                fontSize: typography.body.fontSize,
                fontWeight: typography.body.fontWeight,
                letterSpacing: typography.body.letterSpacing,
                color: colors.textPrimary,
                flex: 1,
                alignSelf: "stretch",
                paddingVertical: 0,
              }}
              placeholder="Your name"
              placeholderTextColor={colors.textTertiary}
              returnKeyType="done"
              selectTextOnFocus
            />
            <Pressable
              onPress={handleClose}
              style={[
                styles.submitButton,
                {
                  backgroundColor: colors.accent,
                  borderRadius: radius.full,
                  width: 36,
                  height: 36,
                },
              ]}
            >
              <IconSymbol
                name="chevron-up"
                size={18}
                color={colors.textInverse}
              />
            </Pressable>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const { colors, typography, spacing } = useDesignSystem();
  const insets = useSafeAreaInsets();

  const [userName, setUserName] = useState("Alex");
  const [showNameSheet, setShowNameSheet] = useState(false);
  const [showFeedbackSheet, setShowFeedbackSheet] = useState(false);

  const handleNamePress = useCallback(() => {
    setShowNameSheet(true);
  }, []);

  const handleFeedbackPress = useCallback(() => {
    setShowFeedbackSheet(true);
  }, []);

  const handleFeedbackClose = useCallback(() => {
    setShowFeedbackSheet(false);
  }, []);

  const handleSettingsPress = useCallback(() => {
    // TODO: navigate to settings
  }, []);

  const handleNameClose = useCallback((newName: string) => {
    setUserName(newName);
    setShowNameSheet(false);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top },
      ]}
    >
      <ProfileHeader
        userName={userName}
        onNamePress={handleNamePress}
        onSettingsPress={handleSettingsPress}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingHorizontal: spacing.xl,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section title */}
        <Text
          style={[
            typography.title2,
            { color: colors.textPrimary, marginTop: spacing.xl },
          ]}
        >
          My Weekly Insights
        </Text>

        <MoodCard />
        <StreakCard />

        {/* Links */}
        <GlassCard style={{ marginTop: spacing["2xl"], padding: 0, backgroundColor: colors.backgroundElevated }}>
          <LinkRow
            icon={
              <IconSymbol
                name="star.outline"
                size={20}
                color={colors.textSecondary}
              />
            }
            label="Rate the app"
          />
          <LinkRow
            icon={
              <IconSymbol
                name="heart.outline"
                size={20}
                color={colors.textSecondary}
              />
            }
            label="Share feedback"
            showDivider={false}
            onPress={handleFeedbackPress}
          />
        </GlassCard>

        {/* Footer */}
        <View style={[styles.footer, { marginTop: spacing["2xl"] }]}>
          <Text
            style={[
              typography.subheadline,
              {
                color: colors.textSecondary,
                fontWeight: "600",
                textAlign: "center",
              },
            ]}
          >
            Nudge — Your ADHD AI Planner
          </Text>
          <Text
            style={[
              typography.caption1,
              {
                color: colors.textTertiary,
                textAlign: "center",
                marginTop: spacing.xs,
              },
            ]}
          >
            Plan smarter, focus better, get things done.
          </Text>

          <View style={[styles.footerMeta, { marginTop: spacing.lg }]}>
            <Text style={[typography.caption2, { color: colors.textTertiary }]}>
              alex@example.com
            </Text>
            <Text style={[typography.caption2, { color: colors.textTertiary }]}>
              Free Plan
            </Text>
            <Text style={[typography.caption2, { color: colors.textTertiary }]}>
              Version 1.0.0 (1)
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Name change bottom sheet */}
      <NameBottomSheet
        visible={showNameSheet}
        currentName={userName}
        onClose={handleNameClose}
      />

      {/* Feedback bottom sheet */}
      <FeedbackBottomSheet
        visible={showFeedbackSheet}
        onClose={handleFeedbackClose}
      />
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  circleButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  // Mood
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  moodDay: {
    alignItems: "center",
  },
  moodCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  // Streak
  streakRow: {
    flexDirection: "row",
  },
  streakBox: {
    flex: 1,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // Links
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Bottom sheet
  sheetContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  sheet: {
    // Shadow for sheet elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 20,
  },
  handleContainer: {
    alignItems: "center",
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  // Footer
  footer: {
    alignItems: "center",
  },
  footerMeta: {
    alignItems: "center",
    gap: 4,
  },
});
