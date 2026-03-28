/**
 * Variant 3: Empty State — iOS 26 Liquid Glass redesign.
 * Glass circle for heart illustration, floating glass decoration,
 * glass suggestion chips, semi-transparent CTA with glass underlayer.
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { GlassCard, GlassView } from '@/components/ui/glass';
import { IconSymbol, type IconName } from '@/components/ui/icon-symbol';
import { useDesignSystem } from '@/hooks/use-design-system';

const AI_SUGGESTIONS: { icon: IconName; label: string }[] = [
  { icon: 'sparkles', label: 'Plan my day with AI' },
  { icon: 'chevron-right', label: 'Move unfinished tasks' },
  { icon: 'sun', label: 'Create a morning routine' },
  { icon: 'clock', label: 'What do I have time for?' },
  { icon: 'plus', label: 'Add a task' },
];

export function EmptyStateView() {
  const { colors, typography, spacing, radius, shadows } = useDesignSystem();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[styles.container, { paddingHorizontal: spacing.xl }]}
      showsVerticalScrollIndicator={false}>

      {/* Heart illustration with glass circle + floating decoration */}
      <View style={[styles.illustrationArea, { marginTop: spacing['4xl'] }]}>
        {/* Floating offset glass decoration for depth */}
        <GlassView
          intensity="subtle"
          style={[
            styles.floatingDecoration,
            { borderRadius: 9999 },
          ]}
        />

        {/* Main glass circle */}
        <GlassView
          intensity="subtle"
          style={[
            styles.heartCircle,
            { borderRadius: 9999 },
          ]}>
          <IconSymbol name="heart" size={64} color={colors.accent} />
        </GlassView>
      </View>

      {/* Main message */}
      <Text
        style={[
          typography.title1,
          { color: colors.textPrimary, textAlign: 'center', marginTop: spacing['3xl'] },
        ]}>
        What would feel good today?
      </Text>
      <Text
        style={[
          typography.body,
          {
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: spacing.sm,
            paddingHorizontal: spacing.lg,
          },
        ]}>
        No pressure — start with what feels right, or let us help plan your day.
      </Text>

      {/* Glass AI suggestion chips */}
      <View style={[styles.chipsContainer, { marginTop: spacing['3xl'] }]}>
        {AI_SUGGESTIONS.map((suggestion, index) => (
          <Pressable key={index} style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}>
            <GlassCard
              compact
              intensity="subtle"
              style={[
                styles.chip,
                {
                  borderRadius: radius.full,
                  marginRight: spacing.sm,
                  marginBottom: spacing.sm,
                },
              ]}>
              <View style={styles.chipInner}>
                <IconSymbol name={suggestion.icon} size={16} color={colors.accent} />
                <Text
                  style={[
                    typography.subheadline,
                    { color: colors.textPrimary, marginLeft: spacing.xs },
                  ]}>
                  {suggestion.label}
                </Text>
              </View>
            </GlassCard>
          </Pressable>
        ))}
      </View>

      {/* Primary CTA with glass underlayer */}
      <View style={[styles.ctaWrapper, { marginTop: spacing['4xl'] }]}>
        <GlassView
          intensity="subtle"
          style={[styles.ctaGlassBase, { borderRadius: 9999 }]}
        />
        <Pressable
          style={({ pressed }) => [
            styles.ctaButton,
            shadows.md,
            {
              backgroundColor: `rgba(232, 99, 43, ${pressed ? 0.78 : 0.9})`,
              borderRadius: 9999,
            },
          ]}>
          <IconSymbol name="sparkles" size={18} color="#FFFFFF" />
          <Text
            style={[
              typography.body,
              { color: '#FFFFFF', fontWeight: '600', marginLeft: spacing.sm },
            ]}>
            Plan my day
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 140,
  },
  illustrationArea: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartCircle: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingDecoration: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: -10,
    right: -10,
    opacity: 0.7,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    // padding handled by GlassCard compact
  },
  chipInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaWrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  ctaGlassBase: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});
