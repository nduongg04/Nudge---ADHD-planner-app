## 2. HOME (Daily View)

> **Components:** iOS 26 Liquid Glass, Heroicons
> **Layout goal:** Maximize vertical space for task accordions
> **Actions:** `⫶` (EllipsisVerticalIcon) = view switcher, `＋` (PlusCircleIcon) = add task
> **Nimbus:** Floating bottom-right, liquid glass pill

---

### S2.1 — Home: Timeline View

```
┌─────────────────────────────────┐
│  Good morning, Alex        ⫶ ⊕ │  ← ⫶ EllipsisVerticalIcon (view)
│                                 │    ⊕ PlusCircleIcon (add task)
│  ◄ M  T  W  T [F] S  S  ►     │  ← week calendar, today = [F]
│     3  4  5  6  7  8  9        │     date numbers below days
│╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌│  ← liquid glass divider
│                                 │
│  ─── Morning ──────────────     │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │  ← liquid glass card
│  │ 🔵 9:00  Team standup    │  │
│  │          15m         ▸   │  │    ▸ expand accordion
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  │ 🟢 9:30  Review PR       │  │
│  │          30m  ●● 2 subs▸ │  │    subtask indicator
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                 │
│  ─·─ now 10:15 ─·─·─·─·─·──   │  ← current time indicator
│                                 │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  │ 🟠 10:30 Write blog post │  │
│  │          1h   ●●● 3 sub▸ │  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                 │
│  ─── Afternoon ────────────     │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  │ 🔴 2:00  Client call     │  │
│  │          45m         ▸   │  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                 │
│                          ☁️     │  ← floating Nimbus (liquid glass pill)
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │  ← liquid glass tab bar
│    🏠    │    🎯    │    👤     │
└──────────┴──────────┴───────────┘
```

**Accordion expanded state (tap ▸ on a task):**

```
  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
  │ 🟢 9:30  Review PR    ▾  │   ← ▾ = collapse
  │          30m              │
  │╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌│
  │  ☐ Check failing tests    │   ← subtasks revealed
  │  ☐ Review auth changes    │
  │╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌│
  │  🎯 Focus   ✏️ Edit       │   ← quick actions row
  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
```

---

### S2.1b — View Switcher (⫶ tap)

> Liquid glass popover anchored to ⫶ button

```
              ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
              │  View            │
              │╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌│
              │  ◉ Timeline      │  ← ClockIcon
              │  ○ List          │  ← ListBulletIcon
              └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
```

---

### S2.2 — Home: List View

```
┌─────────────────────────────────┐
│  Good morning, Alex        ⫶ ⊕ │
│                                 │
│  ◄ M  T  W  T [F] S  S  ►     │
│     3  4  5  6  7  8  9        │
│╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌│
│                                 │
│  Morning                        │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  │ ☐ 🔵 Team standup   15m ▸│  │
│  │╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌│  │
│  │ ☑ 🟢 Review PR      30m ▸│  │  ← completed = muted
│  │╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌│  │
│  │ ☐ 🟠 Write blog     1h  ▸│  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                 │
│  Afternoon                      │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  │ ☐ 🔴 Client call    45m ▸│  │
│  │╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌│  │
│  │ ☐ 🟡 Groceries      30m ▸│  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                 │
│  Evening                        │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  │ ☐ 🟣 Read ch. 5     20m ▸│  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                 │
│  ✅ 1 of 6 done                │
│                          ☁️     │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │    🎯    │    👤     │
└──────────┴──────────┴───────────┘
```

---

### S2.3 — Home: Empty State

```
┌─────────────────────────────────┐
│  Good morning, Alex        ⫶ ⊕ │
│                                 │
│  ◄ M  T  W  T [F] S  S  ►     │
│     3  4  5  6  7  8  9        │
│╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌│
│                                 │
│                                 │
│                                 │
│    ┌───────────────────────┐    │
│    │                       │    │
│    │   ☁️ Nimbus floating  │    │
│    │   peacefully          │    │
│    │                       │    │
│    └───────────────────────┘    │
│                                 │
│    No plan yet for today        │
│                                 │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │  ← liquid glass button
│  │    💬 Plan with Nimbus    │  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                 │
│                          ☁️     │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │    🎯    │    👤     │
└──────────┴──────────┴───────────┘
```

---

## Component Reference

| Element | Heroicon | iOS 26 Style |
|---------|----------|-------------|
| View switcher | `EllipsisVerticalIcon` (⫶) | Liquid glass popover |
| Add task | `PlusCircleIcon` (⊕) | Liquid glass circle button |
| Task cards | — | Liquid glass cards, rounded-2xl |
| Tab bar | `HomeIcon`, `FireIcon`, `UserIcon` | Liquid glass tab bar |
| Nimbus FAB | — | Liquid glass floating pill |
| Accordion expand | `ChevronRightIcon` (▸) | Rotate 90° on expand |
| Accordion collapse | `ChevronDownIcon` (▾) | — |
| Week calendar | — | Horizontal scroll, today highlighted with brand accent |
| Time divider | — | Dashed line + liquid glass badge for "now" |
| Quick actions | `FireIcon` (focus), `PencilIcon` (edit) | Inside expanded accordion |

---

## Layout Notes

- **Header:** single line — greeting left, ⫶ and ⊕ right-aligned. No date subtitle (calendar handles it).
- **Week calendar:** compact — 2 rows (day letters + date numbers), horizontally scrollable, today pill-highlighted.
- **Divider:** liquid glass hairline below calendar. Everything below scrolls.
- **Task cards:** full-width liquid glass cards. Tap anywhere = expand accordion. Swipe right = complete. Swipe left = quick actions.
- **Spacing:** 8px between task cards, 16px section gap (Morning/Afternoon/Evening headers). Minimal padding to maximize visible tasks.
- **Nimbus FAB:** 56px circle, bottom-right, 16px from edges, above tab bar. Liquid glass with cloud icon.
- **⊕ Add task:** 28px circle in header row. Tapping opens Add Task bottom sheet.
- **⫶ View switcher:** 28px tap target in header row. Opens liquid glass popover with Timeline/List options.
