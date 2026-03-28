/**
 * FAB — iOS 26 Liquid Glass floating action button.
 * BlurView + translucent orange overlay = vibrant glass FAB.
 */

import React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useDesignSystem } from '@/hooks/use-design-system';

interface FABProps {
  onPress?: () => void;
}

export function FAB({ onPress }: FABProps) {
  const { colors, shadows, typography, isDark } = useDesignSystem();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          shadows.glass,
          { opacity: pressed ? 0.85 : 1 },
        ]}>
        <BlurView
          intensity={40}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.accent,
              opacity: 0.92,
              borderRadius: 9999,
            },
          ]}
        />
        <Text style={styles.plus}>+</Text>
        <Text style={[typography.subheadline, styles.label]}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 9999,
    gap: 6,
    overflow: 'hidden',
  },
  plus: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: -1,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
