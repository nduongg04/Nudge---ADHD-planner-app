/**
 * GlassCard — Elevated glass surface for task cards, stat blocks, etc.
 * Combines GlassView with design-system shadows and padding.
 */

import React from 'react';
import { GlassView, type GlassViewProps } from './glass-view';
import { useDesignSystem } from '@/hooks/use-design-system';
import { HomeContent } from '@/constants/design-system';

export type GlassCardProps = GlassViewProps & {
  compact?: boolean;
};

export function GlassCard({
  compact = false,
  style,
  children,
  ...rest
}: GlassCardProps) {
  const { shadows } = useDesignSystem();

  return (
    <GlassView
      style={[
        shadows.glass,
        {
          padding: compact ? HomeContent.cardPaddingCompact : HomeContent.cardPadding,
        },
        style,
      ]}
      {...rest}>
      {children}
    </GlassView>
  );
}
