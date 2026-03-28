/**
 * CustomTabBar — Floating pill liquid glass tab bar.
 *
 * A single pill shape floating above the bottom safe area.
 * Uses expo-glass-effect GlassView for native iOS 26 liquid glass.
 * Active tab has a sliding glass bubble that animates between tabs.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, LayoutChangeEvent } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GlassView, GlassContainer } from 'expo-glass-effect';
import { useDesignSystem } from '@/hooks/use-design-system';
import { IconSymbol, type IconName } from '@/components/ui/icon-symbol';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const IS_IOS = Platform.OS === 'ios';

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 200,
  mass: 0.8,
};

const AnimatedGlassView = Animated.createAnimatedComponent(GlassView);

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, typography, isDark } = useDesignSystem();
  const insets = useSafeAreaInsets();

  const visibleRoutes = state.routes.filter((route) => {
    const { options } = descriptors[route.key];
    return (options as any).href !== null;
  });

  // Track tab layouts for positioning the sliding bubble
  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>([]);
  const bubbleX = useSharedValue(0);
  const bubbleWidth = useSharedValue(0);

  // Find the focused index within visible routes
  const focusedVisibleIndex = visibleRoutes.findIndex((route) => {
    const index = state.routes.indexOf(route);
    return state.index === index;
  });

  // Animate bubble when tab changes
  useEffect(() => {
    if (tabLayouts.length > 0 && focusedVisibleIndex >= 0 && focusedVisibleIndex < tabLayouts.length) {
      const layout = tabLayouts[focusedVisibleIndex];
      bubbleX.value = withSpring(layout.x, SPRING_CONFIG);
      bubbleWidth.value = withSpring(layout.width, SPRING_CONFIG);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedVisibleIndex, tabLayouts]);

  const onTabLayout = useCallback((index: number, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => {
      const next = [...prev];
      next[index] = { x, width };
      return next;
    });
  }, []);

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: bubbleX.value }],
    width: bubbleWidth.value,
  }));

  const hasBubbleLayout = tabLayouts.length === visibleRoutes.length && tabLayouts.every(Boolean);

  // Sliding glass bubble — positioned absolutely behind tab items
  const renderBubble = () => {
    if (!hasBubbleLayout) return null;

    if (IS_IOS) {
      return (
        <AnimatedGlassView
          glassEffectStyle="regular"
          isInteractive
          style={[styles.bubble, bubbleStyle]}
        />
      );
    }
    return (
      <Animated.View
        style={[
          styles.bubble,
          bubbleStyle,
          { backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)' },
        ]}
      />
    );
  };

  const tabItems = visibleRoutes.map((route, visibleIndex) => {
    const index = state.routes.indexOf(route);
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;
    const label = (options.title ?? route.name) as string;
    const iconName = (options as any).tabBarIconName as IconName | undefined;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        if (IS_IOS) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        navigation.navigate(route.name, route.params);
      }
    };

    const iconColor = isFocused ? colors.accent : colors.textPrimary;
    const labelColor = isFocused ? colors.accent : colors.textTertiary;

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        onLayout={(e) => onTabLayout(visibleIndex, e)}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={label}
        style={styles.tabItem}>
        <View style={styles.tabInner}>
          {iconName && <IconSymbol name={iconName} size={24} color={iconColor} />}
          <Text style={[typography.caption2, { color: labelColor, marginTop: 3 }]}>
            {label}
          </Text>
        </View>
      </Pressable>
    );
  });

  // Bottom margin: safe area inset + extra spacing to float above home indicator
  const bottomMargin = Math.max(insets.bottom, 8) + 4;

  // iOS: native liquid glass floating pill
  if (IS_IOS) {
    return (
      <View style={[styles.floatingWrapper, { bottom: bottomMargin }]}>
        <GlassContainer style={styles.pillContainer}>
          <GlassView glassEffectStyle="regular" style={styles.pillGlass}>
            <View style={styles.tabRow}>
              {renderBubble()}
              {tabItems}
            </View>
          </GlassView>
        </GlassContainer>
      </View>
    );
  }

  // Non-iOS: BlurView floating pill
  return (
    <View style={[styles.floatingWrapper, { bottom: bottomMargin }]}>
      <View style={styles.pillFallback}>
        <BlurView
          intensity={80}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isDark ? 'rgba(18,18,18,0.6)' : 'rgba(255,255,255,0.5)',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
              borderRadius: 9999,
            },
          ]}
        />
        <View style={styles.tabRow}>
          {renderBubble()}
          {tabItems}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Floating wrapper — centered horizontally, above bottom safe area
  floatingWrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
  },

  // iOS glass pill
  pillContainer: {
    width: '100%',
  },
  pillGlass: {
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },

  // Non-iOS fallback pill
  pillFallback: {
    width: '100%',
    borderRadius: 9999,
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },

  // Tab row inside the pill — relative for absolute bubble positioning
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  tabItem: {
    flex: 1,
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Sliding glass bubble — absolutely positioned behind tab items
  bubble: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 9999,
  },
});
