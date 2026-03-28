# Liquid Glass — Usage in Nudge

> Native iOS 26 glass via `expo-glass-effect` with `expo-blur` fallback.
> All screens import from `@/components/ui/glass` — never use native APIs directly.

---

## Components

### GlassView

```tsx
import { GlassView } from '@/components/ui/glass';

// Basic surface
<GlassView style={{ borderRadius: 16, padding: 16 }}>
  <Text>Content</Text>
</GlassView>

// Interactive button (native press effect)
<GlassView isInteractive style={{ width: 36, height: 36, borderRadius: 999 }}>
  <IconSymbol name="plus" size={18} color={colors.accent} />
</GlassView>

// Clear variant (more transparent)
<GlassView glassEffectStyle="clear" style={{ borderRadius: 12 }}>
  <Text>Lighter glass</Text>
</GlassView>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isInteractive` | `boolean` | `false` | Native press animation. Use on all buttons/tappables |
| `glassEffectStyle` | `'regular' \| 'clear'` | — | `'clear'` = more transparent |
| `tinted` | `boolean` | `false` | Tinted overlay. Maps to `clear` on native |
| `intensity` | `'subtle' \| 'medium' \| 'strong'` | `'medium'` | Fallback only — native handles automatically |

### GlassCard

GlassView + padding + shadow. Use for task cards, stat blocks.

```tsx
import { GlassCard } from '@/components/ui/glass';

<GlassCard compact tinted={isActive}>
  <Text>Task content</Text>
</GlassCard>
```

Extra prop: `compact` (boolean) — reduced padding.

---

## Patterns

**Circle buttons** (header actions):
```tsx
<Pressable onPress={onAction}>
  <GlassView isInteractive style={{ width: 36, height: 36, borderRadius: 999 }}>
    <IconSymbol name="ellipsis-vertical" size={18} color={colors.textSecondary} />
  </GlassView>
</Pressable>
```

**Section pills** (Morning, Afternoon, Evening):
```tsx
<GlassView isInteractive style={{ borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}>
  <IconSymbol name="sun" size={12} />
  <Text>MORNING (3)</Text>
</GlassView>
```

**Task cards** (active state):
```tsx
<GlassCard
  tinted={isActive}
  style={[
    { borderRadius: 16 },
    isActive && { borderLeftWidth: 3, borderLeftColor: colors.accent },
  ]}>
```

**Popovers**:
```tsx
<GlassView style={{ borderRadius: 16, padding: 4, minWidth: 150 }}>
```

---

## Rules

- Always use `@/components/ui/glass` — never import `expo-glass-effect` directly in screens
- Use `isInteractive` on every tappable glass surface
- Always set `borderRadius` — glass renders as sharp rectangle without it
- Never set `opacity: 0` on GlassView or parents — breaks the effect entirely
- Don't nest GlassView inside GlassView
