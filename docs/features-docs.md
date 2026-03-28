# Nudge — ADHD AI Planner

> **App Store title:** Nudge — ADHD AI Planner
> **Tagline:** "A calmer way to plan your day"
> **Mascot:** Nimbus (a cloud companion)

---

## Product Overview

Nudge is an AI-powered planner designed specifically for adults with ADHD (18-35). Instead of rigid systems that punish missed tasks, Nudge uses gentle AI assistance to reduce decision fatigue, lower the barrier to getting started, and help users build a sustainable daily rhythm.

**Core philosophy:**
- Gentle structure — suggestions, not rigid rules
- Progress over perfection — no guilt for missed tasks
- Rest is progress — rest days are celebrated, never shamed
- One thing at a time — reduce overwhelm by focusing on what's next
- AI does the heavy lifting — planning, prioritizing, and adapting so you don't have to

**Target audience:** Young adults (18-35) diagnosed or self-identified with ADHD — students and early-career professionals who find traditional planners stressful, overwhelming, or hard to stick with.

---

## Nimbus — AI Companion & Body Double

Nimbus is a cloud mascot that lives across all screens, providing emotional presence and gentle encouragement. Inspired by the "body doubling" trend in ADHD support — having someone present while you work reduces activation cost and keeps you grounded.

**Nimbus states (shape-shifts based on user context):**

| State | Appearance | When |
|-------|-----------|------|
| Focused | Sunny, bright, small sun peeking through | During focus sessions, completing tasks |
| Calm | Soft, fluffy, gently floating | Default resting state, browsing tasks |
| Overwhelmed | Slightly foggy, gentle mist | Many overdue tasks, low mood logged |
| Resting | Cozy rain, warm droplets | Rest days, breaks — celebrating rest |
| Sleeping | Eyes closed, peaceful | Late night, user takes extended break |
| Celebrating | Rainbow edges, sparkles | Task completion, streak milestones |

**Behavior:**
- Provides gentle visual presence during focus sessions (body doubling)
- Reacts to task completion with happy animation
- Never judgmental — only supportive
- Optional — can be minimized or hidden in settings
- Does NOT block UI or demand attention

---

## Core Features

### 1. AI-Assisted To-Do Lists

Create and manage tasks with AI doing the cognitive heavy lifting.

**Capabilities:**
- Task creation with AI auto-suggestions as you type
- **AI task breakdown** — toggle "Break this down for me" and AI generates 2-5 subtasks with time estimates
- **AI-powered prioritization** — ranks by urgency x effort x current energy level
- Single-task focus mode — show one task at a time to reduce overwhelm
- Tags (color-coded), priority levels (Low / Medium / High / AI decide)
- **"AI Reorder"** — one-tap reprioritization with reasoning shown ("Moved 'Call dentist' up — it's quick and has a deadline")
- **Brain dump import** — paste or voice-dump unstructured thoughts, AI organizes them into tasks
- Search, filter (All / Today / Upcoming / Someday / By Tag), and sort (Manual / Priority / Due Date / AI Smart Sort)
- Multi-select mode for batch actions (schedule, delete, tag)

**AI breakdown example:**
```
Input: "Clean the house before guests arrive at 6pm"
AI output:
  - Declutter living room (20m)
  - Vacuum floors (15m)
  - Clean bathroom (20m)
  - Kitchen counters (10m)
  - Set up guest area (15m)
  Total: ~1h 20m
```

---

### 2. AI-Assisted Schedule Planning

Turn your task list into a realistic daily plan — AI handles the scheduling math.

**Capabilities:**
- Convert tasks into daily time-blocked plans with one tap
- Smart scheduling that adapts when your day changes
- **Realistic time estimates** — AI-adjusted based on your historical completion data
- Reschedule/reflow remaining tasks with one tap
- **Energy-aware scheduling** — lighter tasks when energy is low, harder tasks during peak hours
- Date switcher (horizontal swipe between days)
- Toggle: Timeline View (vertical time blocks) <-> List View (grouped by Morning/Afternoon/Evening)
- AI suggests free slots when rescheduling ("You have a free slot at 3pm, move it there?")
- Current-time indicator line on timeline

**Scheduling logic:**
- Considers: due dates, priority, estimated duration, user's productive hours (set during onboarding), current energy level
- Builds in buffer time between tasks (not back-to-back)
- Adapts to user's actual behavior over time (learns that "30-minute" tasks actually take 45 minutes for this user)

---

### 3. AI Chat Agent ("Plan by Chat")

The key differentiator — plan your day through natural conversation instead of forms and menus.

**Capabilities:**
- Conversational task creation ("I need to do X by Friday")
- Adjust, reorganize, and reschedule tasks and schedule via chat
- **Natural language input** — no forms, no complex UI
- **Voice input** — tap mic, speak, AI transcribes and acts
- **Context memory** — remembers your patterns, preferences, and history over weeks
- **Proactive suggestions** — "You usually struggle on Mondays — want a lighter plan?"
- **"What should I do next?"** — smart recommendation based on urgency, energy, and time available
- **"I'm stuck" micro-coaching** — AI suggests a micro-step to get unstuck ("Just open the document and write one sentence")
- **End-of-day reflections** — "You finished 6 of 8 tasks — great progress!" + option to move incomplete tasks to tomorrow
- **ADHD-friendly tips** — contextual encouragement and strategies
- Suggested prompt chips for quick actions: "Plan my morning", "Break down [task]", "What should I do next?", "Reschedule my afternoon"
- Chat history — resume previous conversations
- AI responds with inline task cards (tap to add) and schedule previews (tap to apply)

**AI personality:**
- Warm, encouraging, casual tone (not clinical, not robotic)
- Configurable: Encouraging / Neutral / Direct (in settings)
- Never guilt-trips — reframes missed tasks as "moved to tomorrow" not "overdue"
- Uses ADHD-friendly language throughout

**Example conversations:**

```
User: "I need to clean the house before guests arrive at 6pm"
Nimbus: "Let me break that down for you:
         - Declutter living room (20m)
         - Vacuum floors (15m)
         - Clean bathroom (20m)
         - Kitchen counters (10m)
         - Set up guest area (15m)
         That's about 1h 20m. Want me to schedule these
         starting at 4pm so you finish with time to spare?"
User: "Yes"
Nimbus: [Shows schedule preview card]
        "Done! I left a 20-minute buffer before 6pm. You got this."
```

```
User (voice): "What should I do next?"
Nimbus: "Based on your energy and what's due:
         -> Call dentist (5 min, due today)
         It's quick and you'll feel good checking it off.
         After that, you have 'Write report' scheduled at 2pm."
```

---

### 4. Focus Mode

Deep work sessions with Nimbus as your body double.

**Setup:**
- Pick a task (or "General focus" for unlinked sessions)
- Set duration: 15m / 25m / 45m / Custom
- Choose ambiance: None / Lo-fi / Nature / White noise
- Tap "Start"

**Active session:**
- Large circular countdown timer, minimal UI
- Current task name displayed
- Subtask checklist visible (if task has subtasks)
- Nimbus floats gently in corner — body doubling presence
- Pause / Stop buttons
- **"I'm stuck" button** — AI suggests:
  - A micro-step: "Try this: just open the document and write one sentence"
  - An easier subtask: "Switch to [subtask name] first"
  - A break: "Take a 2-min walk, then come back. I'll keep the timer."

**Pause behavior:**
- Timer freezes, shows "Take your time"
- Resume / End Session options
- If paused > 10 min: gentle nudge "Ready to jump back in?"

**Session complete:**
- Celebration animation (confetti/sparkles, optional in settings)
- Mark task: Complete / Partially done / Not done (no judgment)
- AI: "Take a 5-minute break before your next task"
- Time logged to focus history

**Focus stats:**
- Weekly focus time chart
- Streak counter
- Total focus time
- AI insight: "You focus best between 10am-12pm"

---

### 5. Mood & Energy Tracking

AI uses your emotional state to adapt your day — not just track it.

**Quick mood log:**
- 5 emoji faces (from great to struggling)
- Energy level slider (Low / Medium / High)
- Optional text note
- Takes < 5 seconds

**Integration with AI:**
- Mood/energy data feeds into AI scheduling — low energy triggers lighter tasks
- AI insight cards: "You're most productive on Tuesdays", "Your energy dips after 2pm"
- Weekly mood chart showing patterns

**End-of-day review (triggered by evening notification):**
- Completed vs. skipped tasks summary
- AI: "You finished 6 of 8 tasks — great progress!"
- Option: move incomplete tasks to tomorrow
- Optional mood log
- Gentle close animation

**Rest day celebration:**
- When user logs low energy or skips all tasks, Nimbus enters "cozy rain" state
- Message: "Rest is part of the process. You're recharging."
- No overdue labels, no guilt, no red warnings
- Rest days count as progress in streak logic (streak doesn't break)

---

### 6. Habits & Reminders (Post-Launch — Phase 3)

Recurring habits with gentle tracking — not a streak-obsessed guilt machine.

**Capabilities:**
- Create recurring habits (daily / weekdays / custom schedule)
- Visual habit tracking (not aggressive streak counters)
- Progress visibility — "You've meditated 4 of the last 7 days" (not "You missed 3 days!")
- AI-suggested habits based on user patterns
- Habits integrate into daily schedule on Home screen

---

## Notification System

ADHD users need reminders but get overwhelmed by aggressive notifications. Nudge uses a 3-tier system.

**Intensity levels:**

| Level | Behavior | Use case |
|-------|---------|----------|
| **Whisper** | Silent badge only, no sound/vibration | Low-priority reminders, habit check-ins |
| **Nudge** | Gentle sound + subtle vibration | Task reminders, daily planning prompt |
| **Push** | Standard alert with sound | Urgent deadlines, time-sensitive tasks |

**Smart features:**
- AI learns when you actually respond to notifications and adjusts timing
- Never interrupts during active focus sessions
- Default: Nudge level, minimal frequency
- User can override intensity per notification type

**Default notifications:**
- Morning: "Good morning! Ready to plan your day?" (Nudge)
- Evening: "Ready to wrap up your day?" (Whisper)
- Task reminders: Based on scheduled time (Nudge)
- Focus session nudges: Only if paused > 10 min (Whisper)

**Notification permission prompt (onboarding):**
- Headline: "Stay on track with gentle reminders"
- Body: "Get soft nudges for tasks, focus sessions, and daily planning — never spammy"
- Options: "Enable Notifications" / "Not now" (dismissible, enable later in Settings)

---

## Monetization

**Model:** 3-day free trial -> Monthly subscription

| | Free Trial (3 days) | Subscription |
|---|---|---|
| **Price** | $0 | $6-10/month |
| **Duration** | 3 days | Monthly / Annual |
| **Features** | All features unlocked | All features |
| **AI Chat** | Unlimited | Unlimited |
| **Focus Mode** | Full access + Nimbus | Full access + Nimbus |
| **AI Scheduling** | Full access | Full access |
| **Mood Insights** | Full access | Full access |

**Paywall placement:**
- Shown after onboarding (soft, dismissible)
- "Start Free Trial" primary CTA
- "Maybe Later" secondary — allows limited browsing
- Feature comparison: trial vs. expired (task creation remains free, AI features locked)

**Post-trial (no subscription):**
- Can still create/edit/complete tasks manually
- AI features locked (chat, breakdown, scheduling, reorder)
- Focus timer available but without Nimbus or "I'm stuck"
- Mood logging available, AI insights locked

---

## Onboarding Flow

```
Splash Screen
  -> Welcome ("A calmer way to plan your day" + Nimbus illustration)
    -> Sign Up / Log In (Email / Apple / Google)
      -> Personalization Quiz (3 quick screens):
         1. "What's your biggest challenge?"
            [ ] Starting tasks
            [ ] Staying on track
            [ ] Remembering things
            [ ] Feeling overwhelmed
         2. "When are you most productive?"
            [ ] Morning  [ ] Afternoon  [ ] Evening  [ ] It varies
         3. "How do you prefer to plan?"
            [ ] Quick daily lists
            [ ] Detailed schedules
            [ ] Just tell me what to do (AI decides)
      -> Add Morning Routine (optional, skip-able)
      -> Paywall (soft, dismissible)
      -> Notification Permission (dismissible)
      -> Home Screen (first day generated by AI)
```

---

## App Structure

```
Tab Bar (Bottom Navigation)
  |-- Home (Daily View)     — Timeline/list of today's schedule
  |-- To-Do (Backlog)       — All tasks, filterable + AI reorder
  |-- AI Chat               — Conversational planning with Nimbus
  |-- Focus                 — Focus sessions with timer + body doubling
  |-- Me (Profile)          — Mood, stats, knowledge hub, settings
```

---

## Design Principles

Defined in detail in `design-style.md` — Gentler Streak paradigm.

- **Calm UI / Organic** — warm, soft, never clinical
- **Warm color palette** — cream backgrounds, orange brand, teal accents
- **SF Pro Rounded** typography — soft, friendly letterforms
- **Progress over perfection** — no red "overdue" labels, no guilt mechanics
- **Rest days celebrated** — Nimbus goes cozy, streaks don't break
- **Distraction-free** — minimal interface, low visual noise
- **Gentle structure** — suggestions, not rigid rules
- **Thumb-zone optimized** — primary actions in lower 60% of screen

---

## Platform Features (iOS-First)

**Dynamic Island + Live Activities:**
- During focus sessions: timer countdown + task name (compact)
- Expanded: timer, task, pause/stop buttons
- Lock screen: timer + task + progress bar

**Widgets:**
- Small: Next task + time
- Medium: Next 3 tasks timeline
- Large: Today's full schedule with progress

**Other:**
- Haptic feedback on task completion
- Siri Shortcuts integration (future)

---

## MVP Roadmap

### Phase 1 — Core (Launch)
- Onboarding (sign up + personalization quiz)
- Home with timeline view + date switching
- Add/edit/delete/complete tasks
- AI Chat (text only): task creation, breakdown, scheduling
- Nimbus mascot (basic expressions: calm, focused, celebrating)
- Basic settings (account, theme, AI personality)
- 3-day trial + subscription paywall
- Gentle notification system (Nudge level)

### Phase 2 — Engagement
- AI Schedule Planning (auto-plan your day)
- To-Do backlog with search, filter, AI reorder
- Focus mode (timer + Nimbus body doubling + "I'm stuck")
- Subtasks + AI breakdown with time estimates
- Mood/energy quick log
- Task rescheduling with AI suggestions

### Phase 3 — Retention
- Full mood logging + energy tracking + AI insights
- Daily review flow (end-of-day summary)
- Habits & recurring tasks
- Voice input for AI Chat
- Knowledge hub (ADHD tips & strategies)
- Notification customization (Whisper/Nudge/Push per type)
- AI context memory (remembers patterns over weeks)
- Rest day celebration system

### Phase 4 — Delight
- Dynamic Island + Live Activities (iOS)
- Home screen widgets (small/medium/large)
- Calendar import (Google Calendar / Apple Calendar)
- Focus session ambiance (lo-fi / nature / white noise)
- AI proactive suggestions ("You usually struggle on Mondays...")
- Nimbus evolution (seasonal themes, more expressions, unlockable states)
- Data export
- Siri Shortcuts

---

## Competitive Positioning

| Feature | Nudge | Tiimo | Structured | Llama Life | Goblin Tools |
|---------|-------|-------|-----------|------------|-------------|
| AI task breakdown | Yes | Yes | No | No | Yes |
| AI scheduling | Yes | No | No | No | No |
| AI chat agent | Yes | No | No | No | No |
| Focus timer | Yes | Yes | No | Yes (countdown) | No |
| Body doubling (mascot) | Nimbus | No | No | No | No |
| Mood/energy tracking | Yes | No | No | No | No |
| Voice input | Yes | No | No | No | No |
| Visual timeline | Yes | Yes | Yes | No | No |
| ADHD-specific design | Yes | Yes | Partial | Partial | Yes |
| AI + planning + focus in one app | Yes | No | No | No | No |

**Key differentiator:** Nudge is the only app combining AI chat agent + visual planning + focus mode + body doubling mascot in a single, ADHD-designed experience. Competitors require 2-3 apps to achieve the same workflow.

---

## Success Metrics

- **Activation:** % of users who complete onboarding + create first task
- **Engagement:** Daily active users, tasks created/completed per day
- **Retention:** Day 7 / Day 30 retention rates
- **Focus:** Average focus session length, sessions per week
- **Conversion:** Free trial -> paid subscription rate
- **Sentiment:** App Store rating, Nimbus engagement (% of users who keep mascot visible)
- **ADHD-specific:** Rest days taken without churn, streak maintenance with rest days included
