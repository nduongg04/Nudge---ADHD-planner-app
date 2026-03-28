/**
 * FeedbackBottomSheet — Share Feedback form.
 * Mirrors NameBottomSheet animation pattern from profile.tsx.
 */

import { IconSymbol } from "@/components/ui/icon-symbol";
import { MoodEmojis } from "@/constants/design-system";
import { useDesignSystem } from "@/hooks/use-design-system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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

// ─── Types ────────────────────────────────────────────────────────────────

const CATEGORIES = ["Bug", "Feature Request", "General"] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Placeholder API ──────────────────────────────────────────────────────

async function submitFeedback(payload: {
  mood: string;
  category: Category;
  message: string;
  email: string;
}) {
  // TODO: Replace with real API call
  console.log("[Feedback] Submitting:", payload);
  await new Promise((r) => setTimeout(r, 600));
}

// ─── Component ────────────────────────────────────────────────────────────

export function FeedbackBottomSheet({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { colors, typography, spacing, radius } = useDesignSystem();
  const insets = useSafeAreaInsets();

  // Form state
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("General");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Animation refs
  const closingRef = useRef(false);
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  // Reset form when sheet opens
  useEffect(() => {
    if (visible) {
      setSelectedMood(null);
      setSelectedCategory("General");
      setMessage("");
      setSubmitting(false);
      setSubmitted(false);
      closingRef.current = false;

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
  }, [visible, overlayAnim, slideAnim]);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

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
      onClose();
    });
  }, [onClose, overlayAnim, slideAnim]);

  const handleSubmit = useCallback(async () => {
    if (!selectedMood || !message.trim()) return;
    setSubmitting(true);
    try {
      await submitFeedback({
        mood: selectedMood,
        category: selectedCategory,
        message: message.trim(),
        email: "alex@example.com",
      });
      setSubmitted(true);
      setTimeout(() => handleClose(), 1200);
    } catch {
      setSubmitting(false);
    }
  }, [selectedMood, selectedCategory, message, handleClose]);

  const canSubmit = !!selectedMood && message.trim().length > 0 && !submitting;

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
        {/* Overlay */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.backdrop,
            { opacity: overlayAnim },
          ]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        </Animated.View>

        {/* Sheet */}
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

          {submitted ? (
            // ─── Success State ──────────────────────────────────────
            <View style={[styles.successContainer, { paddingVertical: spacing["3xl"] }]}>
              <View
                style={[
                  styles.successCircle,
                  {
                    backgroundColor: colors.accentMuted,
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                  },
                ]}
              >
                <IconSymbol name="check" size={28} color={colors.accent} />
              </View>
              <Text
                style={[
                  typography.title3,
                  {
                    color: colors.textPrimary,
                    marginTop: spacing.xl,
                    textAlign: "center",
                  },
                ]}
              >
                Thanks for your feedback!
              </Text>
              <Text
                style={[
                  typography.callout,
                  {
                    color: colors.textSecondary,
                    marginTop: spacing.sm,
                    textAlign: "center",
                  },
                ]}
              >
                We appreciate you taking the time.
              </Text>
            </View>
          ) : (
            // ─── Form ───────────────────────────────────────────────
            <ScrollView
              bounces={false}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
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
                Share Feedback
              </Text>

              {/* Emoji Rating */}
              <Text
                style={[
                  typography.callout,
                  {
                    color: colors.textSecondary,
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                How are you feeling about the app?
              </Text>
              <View style={[styles.emojiRow, { gap: spacing.sm }]}>
                {MoodEmojis.map((mood) => {
                  const isSelected = selectedMood === mood.key;
                  return (
                    <Pressable
                      key={mood.key}
                      onPress={() => setSelectedMood(mood.key)}
                      style={[
                        styles.emojiPill,
                        {
                          backgroundColor: isSelected
                            ? colors.accent
                            : colors.accentMuted,
                          borderRadius: radius.lg,
                          paddingVertical: spacing.sm,
                          paddingHorizontal: spacing.md,
                        },
                      ]}
                    >
                      <Text style={{ fontSize: 24 }}>{mood.emoji}</Text>
                      <Text
                        style={[
                          typography.caption1,
                          {
                            color: isSelected
                              ? colors.textInverse
                              : colors.textSecondary,
                            marginTop: 2,
                          },
                        ]}
                      >
                        {mood.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Category Selector */}
              <Text
                style={[
                  typography.callout,
                  {
                    color: colors.textSecondary,
                    marginTop: spacing.xl,
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                What's this about?
              </Text>
              <View style={[styles.categoryRow, { gap: spacing.sm }]}>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <Pressable
                      key={cat}
                      onPress={() => setSelectedCategory(cat)}
                      style={[
                        styles.categoryPill,
                        {
                          backgroundColor: isSelected
                            ? colors.accent
                            : colors.accentMuted,
                          borderRadius: radius.full,
                          paddingVertical: spacing.sm,
                          paddingHorizontal: spacing.lg,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          typography.callout,
                          {
                            color: isSelected
                              ? colors.textInverse
                              : colors.textSecondary,
                            fontWeight: isSelected ? "600" : "400",
                          },
                        ]}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Message Input */}
              <Text
                style={[
                  typography.callout,
                  {
                    color: colors.textSecondary,
                    marginTop: spacing.xl,
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                Your feedback
              </Text>
              <TextInput
                value={message}
                onChangeText={setMessage}
                multiline
                textAlignVertical="top"
                placeholder="Tell us what's on your mind..."
                placeholderTextColor={colors.textTertiary}
                style={[
                  typography.body,
                  {
                    color: colors.textPrimary,
                    backgroundColor: colors.backgroundSubtle,
                    borderRadius: radius.xl,
                    padding: spacing.lg,
                    minHeight: 100,
                  },
                ]}
              />

              {/* Submit Button */}
              <Pressable
                onPress={handleSubmit}
                disabled={!canSubmit}
                style={[
                  styles.submitButton,
                  {
                    backgroundColor: canSubmit
                      ? colors.accent
                      : colors.accentMuted,
                    borderRadius: radius.xl,
                    height: 48,
                    marginTop: spacing.xl,
                  },
                ]}
              >
                {submitting ? (
                  <ActivityIndicator color={colors.textInverse} />
                ) : (
                  <Text
                    style={[
                      typography.callout,
                      {
                        color: canSubmit
                          ? colors.textInverse
                          : colors.textTertiary,
                        fontWeight: "600",
                      },
                    ]}
                  >
                    Submit Feedback
                  </Text>
                )}
              </Pressable>
            </ScrollView>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  sheet: {
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
  emojiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emojiPill: {
    flex: 1,
    alignItems: "center",
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryPill: {},
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  successCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
});
