# Nudge — Screen Layouts (MVP: Phase 1 + 2)

> 3 nav tabs: Home | Focus | Me
> AI Chat: floating Nimbus mascot button (bottom-right)
> To-Do: accessible from Home via toggle
> Scope: Phase 1+2 (no mood log, no rescheduling)

---

## Navigation Structure

```
┌─────────────────────────────────┐
│                                 │
│        Screen Content           │
│                                 │
│                          ☁️     │  ← Floating Nimbus (tap → AI Chat)
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │    🎯    │    👤     │
└──────────┴──────────┴───────────┘
```

---

## 1. ONBOARDING

### S1.1 — Splash Screen

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│          ☁️ ☁️ ☁️              │
│                                 │
│        ┌───────────┐            │
│        │  Nimbus    │            │
│        │  (cloud)   │            │
│        └───────────┘            │
│                                 │
│           nudge                 │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

### S1.2 — Welcome Screen

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│    ┌───────────────────────┐    │
│    │                       │    │
│    │    ☁️  Nimbus waving  │    │
│    │    (illustration)     │    │
│    │                       │    │
│    └───────────────────────┘    │
│                                 │
│    A calmer way to              │
│    plan your day                │
│                                 │
│    AI-powered planning for      │
│    minds that work differently  │
│                                 │
│  ┌───────────────────────────┐  │
│  │       Get Started         │  │
│  └───────────────────────────┘  │
│                                 │
│       Already have an account?  │
│              Log in             │
│                                 │
└─────────────────────────────────┘
```

### S1.3 — Sign Up

```
┌─────────────────────────────────┐
│  ←                              │
│                                 │
│    Create your account          │
│                                 │
│  ┌───────────────────────────┐  │
│  │  🍎  Continue with Apple  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  G   Continue with Google │  │
│  └───────────────────────────┘  │
│                                 │
│  ──────── or ────────           │
│                                 │
│  ┌───────────────────────────┐  │
│  │  Email                    │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Password                 │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │        Sign Up            │  │
│  └───────────────────────────┘  │
│                                 │
│  By signing up you agree to     │
│  Terms of Service & Privacy     │
│                                 │
└─────────────────────────────────┘
```

### S1.4 — Quiz Step 1 / 3

```
┌─────────────────────────────────┐
│                                 │
│    ● ○ ○          Step 1 of 3   │
│                                 │
│    What's your biggest          │
│    challenge?                   │
│                                 │
│  ┌───────────────────────────┐  │
│  │  😵  Starting tasks       │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  🔄  Staying on track     │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  🧠  Remembering things   │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  😰  Feeling overwhelmed  │  │
│  └───────────────────────────┘  │
│                                 │
│                                 │
│  ┌───────────────────────────┐  │
│  │         Continue          │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

### S1.5 — Quiz Step 2 / 3

```
┌─────────────────────────────────┐
│  ←                              │
│    ● ● ○          Step 2 of 3   │
│                                 │
│    When are you most            │
│    productive?                  │
│                                 │
│  ┌─────────────┐ ┌────────────┐ │
│  │  🌅 Morning │ │ 🌤 After-  │ │
│  │             │ │   noon     │ │
│  └─────────────┘ └────────────┘ │
│  ┌─────────────┐ ┌────────────┐ │
│  │  🌙 Evening │ │ 🤷 It      │ │
│  │             │ │   varies   │ │
│  └─────────────┘ └────────────┘ │
│                                 │
│                                 │
│                                 │
│                                 │
│  ┌───────────────────────────┐  │
│  │         Continue          │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

### S1.6 — Quiz Step 3 / 3

```
┌─────────────────────────────────┐
│  ←                              │
│    ● ● ●          Step 3 of 3   │
│                                 │
│    How do you prefer            │
│    to plan?                     │
│                                 │
│  ┌───────────────────────────┐  │
│  │  📝  Quick daily lists    │  │
│  │  Short and simple         │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  📅  Detailed schedules   │  │
│  │  Time-blocked days        │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  🤖  AI decides for me    │  │
│  │  Just tell me what to do  │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │         Continue          │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

### S1.7 — Morning Routine Setup

```
┌─────────────────────────────────┐
│  ←                       Skip → │
│                                 │
│    ☁️ Nimbus suggests a         │
│    morning routine              │
│                                 │
│    Tap to add, drag to reorder  │
│                                 │
│  ┌───────────────────────────┐  │
│  │  ☀️  Wake up       7:00am │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  🪥  Brush teeth   7:05am │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  🍳  Breakfast     7:15am │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  🧘  Stretch       7:45am │  │
│  └───────────────────────────┘  │
│                                 │
│  + Add custom step              │
│                                 │
│  ┌───────────────────────────┐  │
│  │      Looks good!          │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

### S1.8 — Paywall

```
┌─────────────────────────────────┐
│                          ╳      │
│                                 │
│        ☁️ Nimbus happy          │
│                                 │
│    Unlock your full             │
│    potential                    │
│                                 │
│  ┌───────────────────────────┐  │
│  │ ✓  Unlimited AI Chat      │  │
│  │ ✓  AI Task Breakdown      │  │
│  │ ✓  Smart Scheduling       │  │
│  │ ✓  Focus Mode + Nimbus    │  │
│  │ ✓  AI Insights            │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │  Start 3-Day Free Trial   │  │
│  │  then $7.99/month         │  │
│  └───────────────────────────┘  │
│                                 │
│        Maybe later              │
│                                 │
└─────────────────────────────────┘
```

### S1.9 — Notification Permission

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│    ┌───────────────────────┐    │
│    │                       │    │
│    │   🔔 ☁️               │    │
│    │   (Nimbus with bell)  │    │
│    │                       │    │
│    └───────────────────────┘    │
│                                 │
│    Stay on track with           │
│    gentle reminders             │
│                                 │
│    Get soft nudges for tasks,   │
│    focus sessions, and daily    │
│    planning — never spammy      │
│                                 │
│  ┌───────────────────────────┐  │
│  │   Enable Notifications    │  │
│  └───────────────────────────┘  │
│                                 │
│          Not now                │
│                                 │
└─────────────────────────────────┘
```

---

## 2. HOME (Daily View)

### S2.1 — Home: Timeline View

```
┌─────────────────────────────────┐
│  Good morning, Alex ☁️          │
│  Friday, Mar 28                 │
│                                 │
│  ◄ Wed  Thu [Fri] Sat  Sun ►   │
│                                 │
│  ─── Morning ───────────────    │
│  ┌───────────────────────────┐  │
│  │ 🔵 9:00  Team standup     │  │
│  │          15m              │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ 🟢 9:30  Review PR        │  │
│  │          30m    ●● 2 subs │  │
│  └───────────────────────────┘  │
│  ─── now ─── 10:15 ─────────   │
│  ┌───────────────────────────┐  │
│  │ 🟠 10:30 Write blog post  │  │
│  │          1h     ●●● 3 sub│  │
│  └───────────────────────────┘  │
│                                 │
│  ─── Afternoon ─────────────    │
│  ┌───────────────────────────┐  │
│  │ 🔴 2:00  Client call      │  │
│  │          45m              │  │
│  └───────────────────────────┘  │
│                                 │
│  📋 All Tasks          ☁️      │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │    🎯    │    👤     │
└──────────┴──────────┴───────────┘
```

> `📋 All Tasks` → navigates to To-Do list
> `☁️` floating Nimbus → opens AI Chat

### S2.2 — Home: List View

```
┌─────────────────────────────────┐
│  Good morning, Alex ☁️          │
│  Friday, Mar 28                 │
│                                 │
│  ◄ Wed  Thu [Fri] Sat  Sun ►   │
│                                 │
│  [Timeline]  [List ✓]          │
│                                 │
│  Morning                        │
│  ☐ 🔵 Team standup      15m   │
│  ☑ 🟢 Review PR         30m   │
│  ☐ 🟠 Write blog post   1h    │
│                                 │
│  Afternoon                      │
│  ☐ 🔴 Client call       45m   │
│  ☐ 🟡 Grocery shopping  30m   │
│                                 │
│  Evening                        │
│  ☐ 🟣 Read chapter 5    20m   │
│                                 │
│  ──────────────────────         │
│  ✅ 1 of 6 done                │
│                                 │
│  📋 All Tasks          ☁️      │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │    🎯    │    👤     │
└──────────┴──────────┴───────────┘
```

### S2.3 — Home: Empty State

```
┌─────────────────────────────────┐
│  Good morning, Alex             │
│  Friday, Mar 28                 │
│                                 │
│  ◄ Wed  Thu [Fri] Sat  Sun ►   │
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
│  ┌───────────────────────────┐  │
│  │    💬 Plan with Nimbus    │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │    ＋ Add a task           │  │
│  └───────────────────────────┘  │
│                                 │
│                          ☁️     │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │    🎯    │    👤     │
└──────────┴──────────┴───────────┘
```

---

## 3. ADD TASK

### S3.1 — Add Task (Bottom Sheet)

> Triggered by `+` FAB or "Add a task" button

```
┌─────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░ (dimmed background) ░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
├─────────────────────────────────┤
│  ── handle ──                   │
│                                 │
│  ┌───────────────────────────┐  │
│  │  What do you need to do?  │  │
│  └───────────────────────────┘  │
│                                 │
│  🤖 Break this down for me  ○  │
│                                 │
│  ┌─────────┐ ┌────────────────┐ │
│  │📅 Today │ │⏱ 30m          │ │
│  └─────────┘ └────────────────┘ │
│  ┌─────────┐ ┌────────────────┐ │
│  │🏷 Tag   │ │⚡ Priority     │ │
│  └─────────┘ └────────────────┘ │
│  ┌─────────┐                    │
│  │🔁 Repeat│                    │
│  └─────────┘                    │
│                                 │
│  ┌───────────────────────────┐  │
│  │        Save Task          │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

### S3.2 — AI Task Breakdown

> When "Break this down for me" is toggled ON

```
┌─────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░ (dimmed background) ░░░  │
├─────────────────────────────────┤
│  ── handle ──                   │
│                                 │
│  Clean the house          ✏️   │
│                                 │
│  🤖 Nimbus broke it down:      │
│                                 │
│  ┌───────────────────────────┐  │
│  │ ☐  Declutter living room  │  │
│  │    20m                    │  │
│  ├───────────────────────────┤  │
│  │ ☐  Vacuum floors          │  │
│  │    15m                    │  │
│  ├───────────────────────────┤  │
│  │ ☐  Clean bathroom         │  │
│  │    20m                    │  │
│  ├───────────────────────────┤  │
│  │ ☐  Kitchen counters       │  │
│  │    10m                    │  │
│  ├───────────────────────────┤  │
│  │ ☐  Set up guest area      │  │
│  │    15m                    │  │
│  └───────────────────────────┘  │
│  Total: ~1h 20m                 │
│                                 │
│  + Add more    🔄 Regenerate   │
│                                 │
│  ┌───────────────────────────┐  │
│  │     Save All Subtasks     │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## 4. TO-DO LIST

> Accessed via "📋 All Tasks" link on Home screen

### S4.1 — To-Do List

```
┌─────────────────────────────────┐
│  ←  All Tasks                   │
│                                 │
│  ┌───────────────────────────┐  │
│  │  🔍 Search tasks...       │  │
│  └───────────────────────────┘  │
│                                 │
│  [All] [Today] [Upcoming] [Tag] │
│                                 │
│  ☐ 🔴 Client call        Fri  │
│  ☐ 🟠 Write blog post    Fri  │
│  ☐ 🟡 Grocery shopping   Fri  │
│  ☐ 🔵 Team standup       Fri  │
│  ☐ 🟢 Review PR          Fri  │
│  ☐ 🟣 Read chapter 5     Fri  │
│  ─── Upcoming ───────────────  │
│  ☐ 🔴 Tax filing         Mon  │
│  ☐ 🟠 Dentist appt       Tue  │
│  ─── Someday ────────────────  │
│  ☐ 🟡 Learn guitar              │
│  ☐ 🟢 Organize photos           │
│                                 │
│  Sort: Manual ▼   [🤖 AI Sort] │
│                                 │
│  ＋ Add Task              ☁️    │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │    🎯    │    👤     │
└──────────┴──────────┴───────────┘
```

### S4.2 — AI Reorder Confirmation

```
┌─────────────────────────────────┐
│  ←  AI Smart Sort               │
│                                 │
│  🤖 Nimbus reordered your       │
│  tasks by urgency × effort      │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 1. 🔴 Client call        │  │
│  │    "Due today, 45m"       │  │
│  ├───────────────────────────┤  │
│  │ 2. 🟠 Write blog post    │  │
│  │    "High effort but       │  │
│  │     you have a free 1h    │  │
│  │     slot this morning"    │  │
│  ├───────────────────────────┤  │
│  │ 3. 🔵 Team standup       │  │
│  │    "Quick, gets it done"  │  │
│  ├───────────────────────────┤  │
│  │ 4. 🟡 Grocery shopping   │  │
│  │    "Low effort, do after  │  │
│  │     energy dips"          │  │
│  ├───────────────────────────┤  │
│  │ 5. 🟣 Read chapter 5     │  │
│  │    "Wind-down task"       │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌────────────┐ ┌─────────────┐ │
│  │   Apply    │ │    Undo     │ │
│  └────────────┘ └─────────────┘ │
│                                 │
└─────────────────────────────────┘
```

---

## 5. AI CHAT (via Floating Nimbus)

> Tapping the floating ☁️ Nimbus opens chat as a full-screen overlay

### S5.1 — Chat (Active Conversation)

```
┌─────────────────────────────────┐
│  ←  Chat with Nimbus      ···  │
│─────────────────────────────────│
│                                 │
│  ☁️ Hey Alex! What can I       │
│     help you plan today?        │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 💬 "Plan my morning"     │  │
│  │ 💬 "Break down a task"   │  │
│  │ 💬 "What should I do?"   │  │
│  └───────────────────────────┘  │
│                                 │
│            I need to clean the  │
│            house before guests  │
│            arrive at 6pm     🧑 │
│                                 │
│  ☁️ Let me break that down:    │
│  ┌───────────────────────────┐  │
│  │ ☐ Declutter living  20m  │  │
│  │ ☐ Vacuum floors     15m  │  │
│  │ ☐ Clean bathroom    20m  │  │
│  │ ☐ Kitchen counters  10m  │  │
│  │ ☐ Guest area        15m  │  │
│  │ ─────────────────────────│  │
│  │ Total: ~1h 20m           │  │
│  │ ┌─────────────────────┐  │  │
│  │ │ Add to schedule ✓   │  │  │
│  │ └─────────────────────┘  │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌────────────────────────┐ 🎤 │
│  │  Type a message...     │     │
│  └────────────────────────┘     │
└─────────────────────────────────┘
```

### S5.2 — Chat: Schedule Preview Card

```
┌─────────────────────────────────┐
│  ←  Chat with Nimbus      ···  │
│─────────────────────────────────│
│                                 │
│                        Yes,     │
│                     schedule 🧑 │
│                                 │
│  ☁️ Here's your plan:          │
│  ┌───────────────────────────┐  │
│  │  4:00  Declutter living   │  │
│  │  4:20  Vacuum floors      │  │
│  │  4:35  Clean bathroom     │  │
│  │  4:55  Kitchen counters   │  │
│  │  5:05  Guest area         │  │
│  │  5:20  ✨ Buffer time     │  │
│  │  6:00  Guests arrive!     │  │
│  │                           │  │
│  │ ┌─────────────────────┐   │  │
│  │ │  Apply this plan ✓  │   │  │
│  │ └─────────────────────┘   │  │
│  └───────────────────────────┘  │
│                                 │
│  ☁️ Done! I left a 20-minute   │
│     buffer before 6pm.          │
│     You got this. 💪            │
│                                 │
│  ┌────────────────────────┐ 🎤 │
│  │  Type a message...     │     │
│  └────────────────────────┘     │
└─────────────────────────────────┘
```

### S5.3 — Chat History

```
┌─────────────────────────────────┐
│  ←  Nimbus Chats         + New  │
│─────────────────────────────────│
│                                 │
│  ┌───────────────────────────┐  │
│  │  Today                    │  │
│  │  "Clean house before..."  │  │
│  │  3 tasks created     2m ago│  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Yesterday                │  │
│  │  "Plan my morning"        │  │
│  │  5 tasks scheduled       │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Mar 25                   │  │
│  │  "I need to do taxes..."  │  │
│  │  2 tasks created         │  │
│  └───────────────────────────┘  │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │    🎯    │    👤     │
└──────────┴──────────┴───────────┘
```

---

## 6. FOCUS MODE

### S6.1 — Focus Setup

```
┌─────────────────────────────────┐
│                                 │
│  Focus Session                  │
│                                 │
│  What are you working on?       │
│  ┌───────────────────────────┐  │
│  │ 🟠 Write blog post    ▼  │  │
│  └───────────────────────────┘  │
│  or: General focus              │
│                                 │
│  How long?                      │
│  ┌──────┐┌──────┐┌──────┐┌───┐ │
│  │ 15m  ││[25m] ││ 45m  ││ + │ │
│  └──────┘└──────┘└──────┘└───┘ │
│                                 │
│  Ambiance                       │
│  ┌──────┐┌──────┐┌──────┐┌───┐ │
│  │ None ││Lo-fi ││Nature││ 🔇│ │
│  └──────┘└──────┘└──────┘└───┘ │
│                                 │
│    ┌───────────────────────┐    │
│    │   ☁️ Nimbus ready     │    │
│    │   "Let's do this!"    │    │
│    └───────────────────────┘    │
│                                 │
│  ┌───────────────────────────┐  │
│  │       Start Focus         │  │
│  └───────────────────────────┘  │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │   [🎯]   │    👤     │
└──────────┴──────────┴───────────┘
```

### S6.2 — Active Focus Session

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│         ┌──────────┐            │
│        ╱            ╲           │
│       │    18:42     │          │
│       │   remaining  │          │
│        ╲            ╱           │
│         └──────────┘            │
│      ████████████░░░░░░         │
│                                 │
│    🟠 Write blog post           │
│                                 │
│  Subtasks:                      │
│  ☑  Draft outline               │
│  ☐  Write intro paragraph       │
│  ☐  Add examples                │
│                                 │
│              ☁️                  │
│         Nimbus focused          │
│         (sunny glow)            │
│                                 │
│  ┌───────────┐ ┌──────────────┐ │
│  │  ⏸ Pause  │ │  ⏹ Stop     │ │
│  └───────────┘ └──────────────┘ │
│                                 │
│        😵 I'm stuck             │
│                                 │
└─────────────────────────────────┘
```

### S6.3 — "I'm Stuck" Overlay

```
┌─────────────────────────────────┐
│  ░░░░░░░ (timer dimmed) ░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
├─────────────────────────────────┤
│  ── handle ──                   │
│                                 │
│  ☁️ Nimbus has ideas:           │
│                                 │
│  ┌───────────────────────────┐  │
│  │  ✏️  Micro-step            │  │
│  │  "Just write 1 sentence   │  │
│  │   — that's enough to      │  │
│  │   get started"            │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  🔀  Switch subtask       │  │
│  │  "Try 'Add examples'     │  │
│  │   instead — it's easier"  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  🚶  Take a break         │  │
│  │  "2-min walk. I'll keep   │  │
│  │   the timer paused."      │  │
│  └───────────────────────────┘  │
│                                 │
│       Back to focus             │
│                                 │
└─────────────────────────────────┘
```

### S6.4 — Focus Complete

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│    ┌───────────────────────┐    │
│    │                       │    │
│    │   ☁️ ✨ 🌈            │    │
│    │   Nimbus celebrating  │    │
│    │                       │    │
│    └───────────────────────┘    │
│                                 │
│        Well done! 🎉           │
│        25 minutes focused       │
│                                 │
│  How did it go?                 │
│  ┌──────┐ ┌────────┐ ┌───────┐ │
│  │ Done │ │Partial │ │Not yet│ │
│  │  ✅  │ │  〰️   │ │  ➡️   │ │
│  └──────┘ └────────┘ └───────┘ │
│                                 │
│  ☁️ "Take a 5-minute break     │
│     before your next task.      │
│     You earned it."             │
│                                 │
│  ┌───────────────────────────┐  │
│  │       Back to Home        │  │
│  └───────────────────────────┘  │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │   [🎯]   │    👤     │
└──────────┴──────────┴───────────┘
```

### S6.5 — Focus Stats

```
┌─────────────────────────────────┐
│  Focus History                  │
│                                 │
│  This week: 3h 45m              │
│  ┌───────────────────────────┐  │
│  │  M  T  W  T [F] S  S     │  │
│  │  █  █  ▄  █  ░  ░  ░     │  │
│  │  45 50 20 55              │  │
│  └───────────────────────────┘  │
│                                 │
│  🔥 Streak: 4 days              │
│                                 │
│  ☁️ "You focus best between    │
│     10am-12pm. Nice pattern!"   │
│                                 │
│  Recent sessions                │
│  ┌───────────────────────────┐  │
│  │  Today  Write blog  25m ✅│  │
│  ├───────────────────────────┤  │
│  │  Today  Review PR   15m ✅│  │
│  ├───────────────────────────┤  │
│  │  Yday   Tax prep    45m 〰│  │
│  └───────────────────────────┘  │
│                                 │
│                          ☁️     │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │   [🎯]   │    👤     │
└──────────┴──────────┴───────────┘
```

---

## 7. ME (Profile & Settings)

### S7.1 — Me: Overview

```
┌─────────────────────────────────┐
│                                 │
│  ┌────┐                         │
│  │ 👤 │  Alex                   │
│  └────┘  Joined Mar 2026        │
│          🔥 4-day streak        │
│                                 │
│  This week                      │
│  ┌────────────┐ ┌─────────────┐ │
│  │ Tasks done  │ │ Focus time  │ │
│  │    12/18    │ │   3h 45m    │ │
│  │    67%      │ │   ↑ 15%     │ │
│  └────────────┘ └─────────────┘ │
│                                 │
│  ☁️ "You're most productive     │
│     on Tuesdays and Thursdays!" │
│                                 │
│  ┌───────────────────────────┐  │
│  │  📚  Knowledge Hub        │  │
│  │  ADHD tips & strategies   │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  ⚙️  Settings              │  │
│  └───────────────────────────┘  │
│                                 │
│                          ☁️     │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │    🎯    │   [👤]    │
└──────────┴──────────┴───────────┘
```

### S7.2 — Settings

```
┌─────────────────────────────────┐
│  ←  Settings                    │
│                                 │
│  ACCOUNT                        │
│  ┌───────────────────────────┐  │
│  │  Profile                 ▸│  │
│  │  Subscription      Pro   ▸│  │
│  │  Log out                  │  │
│  └───────────────────────────┘  │
│                                 │
│  PLANNING                       │
│  ┌───────────────────────────┐  │
│  │  Default duration   30m  ▸│  │
│  │  Productive hours        ▸│  │
│  │  Week starts on     Mon  ▸│  │
│  │  AI personality          ▸│  │
│  │   Encouraging ✓           │  │
│  └───────────────────────────┘  │
│                                 │
│  NOTIFICATIONS                  │
│  ┌───────────────────────────┐  │
│  │  Intensity       Nudge   ▸│  │
│  │  Morning reminder  8am   ▸│  │
│  │  Evening review    9pm   ▸│  │
│  │  Task reminders     On   ▸│  │
│  └───────────────────────────┘  │
│                                 │
│  APPEARANCE                     │
│  ┌───────────────────────────┐  │
│  │  Theme            Auto   ▸│  │
│  │  App icon                ▸│  │
│  │  Show Nimbus        On    │  │
│  └───────────────────────────┘  │
│                                 │
│  ABOUT                          │
│  ┌───────────────────────────┐  │
│  │  Help & FAQ              ▸│  │
│  │  Send feedback           ▸│  │
│  │  Version          1.0.0   │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

---

## 8. TASK INTERACTIONS

### S8.1 — Task Detail

```
┌─────────────────────────────────┐
│  ←  Task                  ···  │
│                                 │
│  🟠  Write blog post           │
│                                 │
│  📅  Friday, Mar 28             │
│  ⏱  10:30 AM — 11:30 AM (1h)  │
│  ⚡  High priority              │
│  🏷  Work                       │
│                                 │
│  Subtasks (1/3 done)            │
│  ┌───────────────────────────┐  │
│  │  ☑  Draft outline         │  │
│  │  ☐  Write intro paragraph │  │
│  │  ☐  Add examples          │  │
│  └───────────────────────────┘  │
│  + Add subtask                  │
│  🤖 AI suggest subtasks        │
│                                 │
│  ┌───────────────────────────┐  │
│  │    🎯 Start Focus Session │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │    ✅ Mark Complete       │  │
│  └───────────────────────────┘  │
│                                 │
│  🗑 Delete task                 │
│                                 │
└─────────────────────────────────┘
```

### S8.2 — Task Swipe Actions (on Home/To-Do)

```
Swipe RIGHT → Complete:
┌─────────────────────────────────┐
│ ✅✅✅│ 🟠 Write blog post      │
│  Done  │                        │
└────────┴────────────────────────┘

Swipe LEFT → Quick Actions:
┌─────────────────────────────────┐
│  🟠 Write blog post  │📅│🎯│🗑│
│                       │Sch│Foc│Del│
└───────────────────────┴───┴───┴──┘
```

---

## 9. REST DAY

### S9.1 — Rest Day State (Home)

```
┌─────────────────────────────────┐
│  Hey Alex                       │
│  Saturday, Mar 29               │
│                                 │
│  ◄ Thu  Fri [Sat] Sun  Mon ►   │
│                                 │
│                                 │
│                                 │
│    ┌───────────────────────┐    │
│    │                       │    │
│    │   ☁️ 🌧️               │    │
│    │   Nimbus in cozy rain │    │
│    │   (warm droplets)     │    │
│    │                       │    │
│    └───────────────────────┘    │
│                                 │
│    Rest is part of the          │
│    process. You're              │
│    recharging. ✨               │
│                                 │
│    🔥 Streak: 5 days            │
│    (rest days count!)           │
│                                 │
│  ┌───────────────────────────┐  │
│  │  Plan something light?    │  │
│  └───────────────────────────┘  │
│                          ☁️     │
│                                 │
├──────────┬──────────┬───────────┤
│   Home   │  Focus   │    Me     │
│    🏠    │    🎯    │    👤     │
└──────────┴──────────┴───────────┘
```

---

## Screen Inventory (MVP Phase 1 + 2)

| # | Screen | Section | Phase |
|---|--------|---------|-------|
| 1 | Splash | Onboarding | 1 |
| 2 | Welcome | Onboarding | 1 |
| 3 | Sign Up | Onboarding | 1 |
| 4 | Quiz Step 1 | Onboarding | 1 |
| 5 | Quiz Step 2 | Onboarding | 1 |
| 6 | Quiz Step 3 | Onboarding | 1 |
| 7 | Morning Routine Setup | Onboarding | 1 |
| 8 | Paywall | Onboarding | 1 |
| 9 | Notification Permission | Onboarding | 1 |
| 10 | Home: Timeline View | Home | 1 |
| 11 | Home: List View | Home | 1 |
| 12 | Home: Empty State | Home | 1 |
| 13 | Add Task (Bottom Sheet) | Task | 1 |
| 14 | AI Task Breakdown | Task | 1 |
| 15 | Task Detail | Task | 1 |
| 16 | Task Swipe Actions | Task | 1 |
| 17 | To-Do List | To-Do | 2 |
| 18 | AI Reorder Confirmation | To-Do | 2 |
| 19 | Chat: Active Conversation | AI Chat | 1 |
| 20 | Chat: Schedule Preview | AI Chat | 1 |
| 21 | Chat History | AI Chat | 1 |
| 22 | Focus Setup | Focus | 2 |
| 23 | Active Focus Session | Focus | 2 |
| 24 | "I'm Stuck" Overlay | Focus | 2 |
| 25 | Focus Complete | Focus | 2 |
| 26 | Focus Stats | Focus | 2 |
| 27 | Me: Overview | Me | 1 |
| 28 | Settings | Me | 1 |
| 29 | Rest Day State | Home | 1 |

**Total: 29 screens**
