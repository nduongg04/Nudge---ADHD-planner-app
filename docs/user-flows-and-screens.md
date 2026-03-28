# ADHD AI Planner — User Flows & Screen Design
> Inspired by Tiimo's structure, adapted for AI-first planning

---

## App Structure Overview

```
Tab Bar (Bottom Navigation)
├── Home (Daily View)
├── To-Do
├── AI Chat
├── Focus
└── Me (Profile/Settings)
```

---

## 1. ONBOARDING

### Flow: First Launch → Ready to Use

```
Splash Screen
  → Welcome Screen (value prop + illustrations)
    → Sign Up / Log In
      → Personalization Quiz
        → "What's your biggest challenge?"
          [ ] Starting tasks
          [ ] Staying on track
          [ ] Remembering things
          [ ] Feeling overwhelmed
        → "When are you most productive?"
          [ ] Morning   [ ] Afternoon   [ ] Evening   [ ] It varies
        → "How do you prefer to plan?"
          [ ] Quick daily lists
          [ ] Detailed schedules
          [ ] Just tell me what to do (AI decides)
      → Add Morning Routine (optional, skip-able)
        → Suggested routines based on quiz answers
        → Tap to add, drag to reorder
      → Paywall / Subscribe to Pro (soft, dismissible)
      → Notification Permission (dismissible)
        → "Stay on track with gentle reminders"
        → "Enable Notifications" → system prompt
        → "Not now" → skip, can enable later in Settings
      → Home Screen (first day generated)
```

### Screens

| Screen | Key Elements |
|--------|-------------|
| **S1.1 Welcome** | App logo, tagline "A calmer way to plan your day", illustration, "Get Started" button |
| **S1.2 Sign Up** | Email/Apple/Google sign-in, minimal form |
| **S1.3 Quiz (3 steps)** | Single question per screen, pill-style multi-select, progress dots |
| **S1.4 Morning Routine Setup** | Pre-built routine cards (e.g., "Wake up", "Brush teeth", "Breakfast"), + custom, skip button |
| **S1.5 Paywall** | Feature comparison Free vs Pro, "Start Free Trial", "Maybe Later" |
| **S1.6 Notification Permission** | Illustration (bell icon + gentle reminder visual), headline "Stay on track with gentle reminders", body text "Get soft nudges for tasks, focus sessions, and daily planning — never spammy", "Enable Notifications" primary button, "Not now" text link (dismissible, can enable later in Settings) |

---

## 2. HOME (Daily View)

### Flow: Daily Planning & Execution

```
Home Screen (Today)
  ├── Date Switcher (swipe left/right for days)
  ├── Greeting + Mood Check-in (optional, tap to log)
  ├── Daily Schedule (timeline view)
  │   ├── Time blocks with tasks
  │   ├── Tap task → Task Detail
  │   ├── Swipe right → Mark done
  │   ├── Swipe left → Reschedule
  │   └── Long press → Quick actions (edit, duplicate, delete)
  ├── "Add Task" FAB (floating action button)
  └── Toggle: Timeline View ↔ List View
```

### Screens

| Screen | Key Elements |
|--------|-------------|
| **S2.1 Home - Timeline View** | Vertical timeline with color-coded time blocks, current-time indicator line, task cards showing title + duration + icon |
| **S2.2 Home - List View** | Simple checklist, grouped by Morning/Afternoon/Evening |
| **S2.3 Date Switcher** | Horizontal scrollable date bar (like Tiimo), today highlighted, tap any date |
| **S2.4 Empty State** | Friendly illustration: "No plan yet for today", CTA: "Plan with AI" or "Add a task" |

### Sub-flows

**Marking a task as done:**
```
Swipe right on task → Checkmark animation → Task greys out with strikethrough
→ Confetti/gentle celebration (optional setting)
→ Next task auto-highlights
```

**Rescheduling a task:**
```
Swipe left on task → Reschedule sheet
  → "Later today" / "Tomorrow" / "Pick a date"
  → AI suggestion: "You have a free slot at 3pm, move it there?"
  → Confirm → Timeline reflows
```

**Completing a daily review (end of day):**
```
Notification: "Ready to wrap up your day?"
  → Review screen: completed vs skipped tasks
  → AI: "You finished 6 of 8 tasks — great progress!"
  → Option: move incomplete tasks to tomorrow
  → Mood log (optional)
  → Done → gentle close animation
```

---

## 3. ADDING A TASK

### Flow: Manual Task Creation

```
Tap "+" FAB or "Add Task"
  → Add Task Sheet (bottom sheet)
    ├── Task title (text input, AI auto-suggests as you type)
    ├── AI Breakdown toggle: "Break this down for me"
    │   └── AI generates 2-5 subtasks → user edits/confirms
    ├── Schedule: Today / Tomorrow / Pick date
    ├── Time: Set time or "AI decide"
    ├── Duration: 15m / 30m / 1h / Custom
    ├── Tags: select or create (color-coded)
    ├── Priority: Low / Medium / High (or "AI decide")
    ├── Repeat: None / Daily / Weekdays / Custom
    └── Save
```

### Screens

| Screen | Key Elements |
|--------|-------------|
| **S3.1 Add Task (Bottom Sheet)** | Large text input at top, smart defaults pre-filled, collapsible "More options" section |
| **S3.2 AI Breakdown** | Task title at top, AI-generated subtask list below with checkboxes, "Add more" and "Regenerate" buttons |
| **S3.3 Tag Picker** | Grid of colored tag pills, "+" to create new tag |
| **S3.4 Time/Duration Picker** | Scroll wheels or tap presets (15m, 30m, 1h, 2h) |

### Sub-flows

**Adding a subtask:**
```
Inside task detail → Tap "Add subtask"
  → Inline text input below parent task
  → Or: "AI suggest subtasks" → generates list
  → Drag to reorder subtasks
```

**Editing visuals (icons/colors):**
```
Task detail → Tap icon/color area
  → Icon picker (emoji or icon set)
  → Color picker (preset palette, matches Tiimo style)
```

---

## 4. TO-DO (Backlog / Inbox)

### Flow: Manage All Tasks

```
To-Do Tab
  ├── Search bar (top)
  ├── Filter: All / Today / Upcoming / Someday / By Tag
  ├── Task list (sortable)
  │   ├── Tap → Task Detail
  │   ├── Swipe right → Mark done
  │   ├── Swipe left → Schedule it (move to Home)
  │   └── Long press → Multi-select mode
  ├── Sort: Manual / Priority / Due Date / AI Smart Sort
  ├── "AI Reorder" button → AI reprioritizes the list
  └── "+" Add Task
```

### Screens

| Screen | Key Elements |
|--------|-------------|
| **S4.1 To-Do List** | Clean list with task title, tag chips, due date badge, priority dot |
| **S4.2 Search** | Full-screen search with recent tasks, filter chips |
| **S4.3 Multi-Select** | Checkboxes appear, bottom bar: "Schedule", "Delete", "Tag" |
| **S4.4 AI Reorder Confirmation** | Before/after preview of reordered list, "Apply" / "Undo" |

### Sub-flows

**Moving a task to schedule (To-Do → Home):**
```
Swipe left on task in To-Do → "Schedule" sheet
  → Pick date + time (or "AI decide")
  → Task appears on Home timeline for that day
```

**AI Smart Sort:**
```
Tap "AI Reorder" → Loading shimmer
  → AI reorders by: urgency × effort × energy level
  → Shows reasoning: "Moved 'Call dentist' up — it's quick and has a deadline"
  → Accept / Undo
```

---

## 5. AI CHAT AGENT

### Flow: Conversational Planning

```
AI Chat Tab
  ├── Chat history list (previous conversations)
  │   └── Tap → Resume conversation
  ├── New Chat
  │   ├── Text input (keyboard)
  │   ├── Voice input (microphone button)
  │   ├── Suggested prompts:
  │   │   "Plan my morning"
  │   │   "Break down [task]"
  │   │   "What should I do next?"
  │   │   "Reschedule my afternoon"
  │   └── AI responds with:
  │       ├── Text responses
  │       ├── Inline task cards (tap to add to To-Do/Schedule)
  │       ├── Schedule previews (tap to apply)
  │       └── Follow-up suggestions
  └── Context: AI sees your current tasks, schedule, and habits
```

### Screens

| Screen | Key Elements |
|--------|-------------|
| **S5.1 Chat List** | Previous conversations with preview text, date, tap to resume |
| **S5.2 Chat (Active)** | Message bubbles, AI suggestions as tappable cards, input bar with mic + text |
| **S5.3 Voice Input** | Waveform animation while recording, "Tap to stop", transcription preview |
| **S5.4 AI Task Card (in chat)** | Embedded card: task name, time, "Add to schedule" button |
| **S5.5 AI Schedule Preview** | Mini timeline preview in chat, "Apply this plan" button |

### Example Conversations

```
User: "I need to clean the house before guests arrive at 6pm"
AI: "Let me break that down for you:
     □ Declutter living room (20m)
     □ Vacuum floors (15m)
     □ Clean bathroom (20m)
     □ Kitchen counters (10m)
     □ Set up guest area (15m)

     That's about 1h 20m. Want me to schedule these
     starting at 4pm so you finish with time to spare?"

User: "Yes"
AI: [Shows schedule preview card]
    "Done! I left a 20-minute buffer before 6pm. You got this."
```

```
User (voice): "What should I do next?"
AI: "Based on your energy and what's due:
     → Call dentist (5 min, due today)
     It's quick and you'll feel good checking it off.
     After that, you have 'Write report' scheduled at 2pm."
```

---

## 6. FOCUS MODE

### Flow: Deep Work Sessions

```
Focus Tab (or triggered from task)
  ├── Start Focus Session
  │   ├── Pick a task (or "General focus")
  │   ├── Set duration: 15m / 25m / 45m / Custom
  │   ├── Choose ambiance: None / Lo-fi / Nature / White noise
  │   └── Start
  ├── Active Session Screen
  │   ├── Large countdown timer (circular)
  │   ├── Current task name
  │   ├── Pause / Stop buttons
  │   ├── "I'm stuck" → AI suggests micro-step
  │   └── Subtask checklist (if task has subtasks)
  ├── Session Complete
  │   ├── "Well done!" celebration
  │   ├── Mark task complete? Yes/No/Partially
  │   └── AI: "Take a 5-minute break before next task"
  └── Focus History (streaks, stats)
```

### Screens

| Screen | Key Elements |
|--------|-------------|
| **S6.1 Focus Setup** | Task selector, duration presets, music/ambiance row, big "Start" button |
| **S6.2 Active Focus** | Minimal screen: circular timer, task name, pause/stop, dark/calm theme |
| **S6.3 Focus Complete** | Celebration animation, time logged, "Mark done" toggle, break suggestion |
| **S6.4 Focus Stats** | Weekly chart, total focus time, streak counter |

### Sub-flows

**"I'm stuck" during focus:**
```
Tap "I'm stuck" → AI micro-coach
  → "Try this: just open the document and write one sentence."
  → Or: "Switch to an easier subtask first: [subtask name]"
  → Or: "Take a 2-min walk, then come back. I'll keep the timer."
```

**Pausing a session:**
```
Tap Pause → Timer freezes → "Take your time"
  → Resume / End Session
  → If paused > 10 min: gentle nudge "Ready to jump back in?"
```

---

## 7. ME (Profile & Wellbeing)

### Flow: Self-Tracking & Settings

```
Me Tab
  ├── Profile header (name, avatar, streak)
  ├── Mood Logging
  │   ├── Quick mood: emoji row (5 options)
  │   ├── Optional: energy level slider
  │   └── Mood history (weekly chart)
  ├── Progress & Stats
  │   ├── Tasks completed this week
  │   ├── Focus time this week
  │   ├── Streak counter
  │   └── AI insight: "You're most productive on Tuesdays"
  ├── Knowledge (like Tiimo)
  │   ├── ADHD tips & courses
  │   └── Previously asked questions
  └── Settings → (see below)
```

### Screens

| Screen | Key Elements |
|--------|-------------|
| **S7.1 Me - Overview** | Avatar, name, weekly stats cards, mood chart, quick mood log |
| **S7.2 Mood Log** | 5 emoji faces, energy slider, "Add note" optional, history below |
| **S7.3 Stats Dashboard** | Bar charts (tasks/week), focus time graph, AI insights card |
| **S7.4 Knowledge Hub** | Article cards with ADHD tips, categorized (Focus, Habits, Motivation) |

---

## 8. SETTINGS

### Flow: App Configuration

```
Settings (from Me tab)
  ├── Account
  │   ├── Pro account info / Manage subscription
  │   ├── Edit profile
  │   ├── Add/switch profile
  │   ├── Delete account
  │   └── Log out
  ├── Planning Preferences
  │   ├── Default task duration
  │   ├── Productive hours (morning/afternoon/evening)
  │   ├── Week starts on (Mon/Sun)
  │   └── AI personality (Encouraging / Neutral / Direct)
  ├── Notifications & Reminders
  │   ├── Task reminders (on/off, timing)
  │   ├── Daily planning reminder (morning)
  │   ├── Daily review reminder (evening)
  │   ├── Focus session nudges
  │   └── Gentle vs. persistent mode
  ├── Integrations
  │   ├── Import calendar (Google/Apple)
  │   ├── Import reminders
  │   └── Export data
  ├── Appearance
  │   ├── Theme (Light / Dark / Auto)
  │   ├── App icon picker
  │   ├── Font size/style
  │   └── Color palette
  └── About / Help / Feedback
```

---

## 9. AUTHENTICATION

### Screens

| Screen | Key Elements |
|--------|-------------|
| **S9.1 Log In** | Email + password, Apple/Google SSO, "Forgot password?" |
| **S9.2 Sign Up** | Email or SSO, terms checkbox |
| **S9.3 Reset Password** | Email input, "Check your inbox" confirmation |

---

## 10. PLATFORM FEATURES (iOS)

### Live Activities & Dynamic Island
```
During Focus Session:
  → Dynamic Island: shows timer countdown + task name (compact)
  → Expanded: timer, task, pause/stop buttons
  → Lock Screen Live Activity: timer + task + progress bar
```

### Widget
```
Home Screen Widgets:
  → Small: Next task + time
  → Medium: Next 3 tasks timeline
  → Large: Today's full schedule with progress
```

---

## Navigation Map (Complete)

```
App Launch
├── [Not logged in] → Auth Flow → Onboarding → Home
├── [Logged in] → Home
│
├── Tab: Home
│   ├── Timeline View / List View toggle
│   ├── Date Switcher
│   ├── Task → Task Detail → Edit / Subtasks / Reschedule / Delete
│   ├── + FAB → Add Task Sheet
│   └── Daily Review (end of day notification)
│
├── Tab: To-Do
│   ├── Task List (filterable, sortable)
│   ├── Search
│   ├── AI Reorder
│   ├── Task → Task Detail
│   └── + Add Task
│
├── Tab: AI Chat
│   ├── Chat History
│   ├── New Chat (text + voice)
│   └── AI-generated task cards → Add to schedule
│
├── Tab: Focus
│   ├── Start Session (pick task, duration, music)
│   ├── Active Session (timer, pause, "I'm stuck")
│   ├── Session Complete (mark done, break)
│   └── Focus History / Stats
│
└── Tab: Me
    ├── Mood Log
    ├── Stats & Progress
    ├── Knowledge Hub
    └── Settings
        ├── Account (profile, subscription, logout)
        ├── Planning Preferences
        ├── Notifications
        ├── Integrations (calendar import)
        └── Appearance (theme, icon, font)
```

---

## MVP Scope (What to build first)

### Phase 1 — Core (Launch)
- Onboarding (simple: sign up + 1 quiz screen)
- Home with timeline view + date switching
- Add/edit/delete/complete tasks
- AI Chat (text only, task creation + breakdown)
- Basic settings (account, theme)

### Phase 2 — Engagement
- AI Schedule Planning (auto-plan your day)
- To-Do backlog with AI reorder
- Focus mode (timer + task linking)
- Subtasks + AI breakdown

### Phase 3 — Retention
- Mood logging + energy tracking
- Daily review flow
- Habits & recurring tasks
- Voice input for AI Chat
- Knowledge hub

### Phase 4 — Delight
- Dynamic Island + Live Activities
- Widgets
- Calendar import
- Focus music/ambiance
- AI insights ("You're most productive on...")
