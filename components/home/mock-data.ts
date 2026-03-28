/**
 * Mock data for Home screen variants.
 * Uses Heroicon names instead of emoji for cross-platform compatibility.
 */

import type { IconName } from '@/components/ui/icon-symbol';

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';
export type TimeOfDay = 'anytime' | 'morning' | 'day' | 'evening';

export interface Task {
  id: string;
  title: string;
  icon: IconName;
  duration: number; // minutes
  startTime?: string; // HH:mm
  timeOfDay: TimeOfDay;
  status: TaskStatus;
  subtasksDone?: number;
  subtasksTotal?: number;
  color?: string;
}

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Morning meditation',
    icon: 'sparkles',
    duration: 15,
    startTime: '07:00',
    timeOfDay: 'morning',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Breakfast & vitamins',
    icon: 'sun',
    duration: 30,
    startTime: '07:30',
    timeOfDay: 'morning',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Review daily goals',
    icon: 'clipboard',
    duration: 10,
    startTime: '08:00',
    timeOfDay: 'morning',
    status: 'in_progress',
    subtasksDone: 1,
    subtasksTotal: 3,
  },
  {
    id: '4',
    title: 'Deep work: Project report',
    icon: 'computer',
    duration: 90,
    startTime: '09:00',
    timeOfDay: 'day',
    status: 'pending',
    subtasksDone: 0,
    subtasksTotal: 5,
  },
  {
    id: '5',
    title: 'Quick walk break',
    icon: 'heart',
    duration: 15,
    startTime: '10:30',
    timeOfDay: 'day',
    status: 'pending',
  },
  {
    id: '6',
    title: 'Team standup call',
    icon: 'phone',
    duration: 15,
    startTime: '11:00',
    timeOfDay: 'day',
    status: 'pending',
  },
  {
    id: '7',
    title: 'Lunch & rest',
    icon: 'clock',
    duration: 60,
    startTime: '12:00',
    timeOfDay: 'day',
    status: 'pending',
  },
  {
    id: '8',
    title: 'Read 20 pages',
    icon: 'book',
    duration: 30,
    startTime: '18:00',
    timeOfDay: 'evening',
    status: 'pending',
  },
  {
    id: '9',
    title: 'Wind-down routine',
    icon: 'moon',
    duration: 20,
    startTime: '21:00',
    timeOfDay: 'evening',
    status: 'pending',
  },
];

export function getTasksByTimeOfDay(tasks: Task[]) {
  return {
    anytime: tasks.filter((t) => t.timeOfDay === 'anytime'),
    morning: tasks.filter((t) => t.timeOfDay === 'morning'),
    day: tasks.filter((t) => t.timeOfDay === 'day'),
    evening: tasks.filter((t) => t.timeOfDay === 'evening'),
  };
}

export function getCompletedCount(tasks: Task[]) {
  return tasks.filter((t) => t.status === 'completed').length;
}

export function getCurrentTask(tasks: Task[]) {
  return tasks.find((t) => t.status === 'in_progress') ?? tasks.find((t) => t.status === 'pending');
}

export function getNextTask(tasks: Task[]) {
  const current = getCurrentTask(tasks);
  if (!current) return undefined;
  const idx = tasks.indexOf(current);
  return tasks.slice(idx + 1).find((t) => t.status === 'pending');
}
