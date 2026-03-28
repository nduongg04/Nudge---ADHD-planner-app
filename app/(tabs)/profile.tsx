import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDesignSystem } from '@/hooks/use-design-system';

export default function ProfileScreen() {
  const { colors, typography, spacing } = useDesignSystem();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
      <View style={{ padding: spacing.xl, alignItems: 'center', marginTop: spacing['2xl'] }}>
        <Text style={[typography.largeTitle, { color: colors.textPrimary }]}>Me</Text>
        <Text style={[typography.subheadline, { color: colors.textSecondary, marginTop: spacing.sm }]}>
          Profile &amp; Settings coming soon
        </Text>
      </View>
    </View>
  );
}
