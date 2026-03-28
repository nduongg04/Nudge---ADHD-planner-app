/**
 * Tab layout — Native iOS 26 liquid glass tab bar.
 * Uses NativeTabs from expo-router for native glass effect with sliding bubble.
 */

import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { useDesignSystem } from '@/hooks/use-design-system';

export default function TabLayout() {
  const { colors } = useDesignSystem();

  return (
    <NativeTabs
      iconColor={{
        default: colors.textPrimary,
        selected: colors.accent,
      }}
      labelStyle={{
        default: { color: colors.textTertiary },
        selected: { color: colors.accent },
      }}
    >
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: 'house', selected: 'house.fill' }} />
        <Label>Home</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="focus">
        <Icon sf={{ default: 'flame', selected: 'flame.fill' }} />
        <Label>Focus</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile" hidden={false}>
        <Icon sf={{ default: 'person', selected: 'person.fill' }} />
        <Label>Me</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="todo" hidden />
      <NativeTabs.Trigger name="chat" hidden />
      <NativeTabs.Trigger name="explore" hidden />
    </NativeTabs>
  );
}
