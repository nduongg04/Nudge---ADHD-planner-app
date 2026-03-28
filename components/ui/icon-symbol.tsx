/**
 * IconSymbol — Heroicons-based icon component.
 * Uses react-native-heroicons (solid by default, outline available).
 * Replaces the old SF Symbols / MaterialIcons approach for universal compatibility.
 */

import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";

// Solid icons
import {
  Bars3Icon,
  BookOpenIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  ComputerDesktopIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FireIcon,
  HeartIcon,
  HomeIcon,
  ListBulletIcon,
  MicrophoneIcon,
  MoonIcon,
  PauseIcon,
  PencilIcon,
  PhoneIcon,
  PlayIcon,
  PlusCircleIcon,
  PlusIcon,
  SparklesIcon,
  Squares2X2Icon,
  StarIcon,
  SunIcon,
  UserIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";

// Outline icons (for inactive/secondary states)
import {
  ChatBubbleLeftRightIcon as ChatBubbleOutline,
  CheckCircleIcon as CheckCircleOutline,
  HomeIcon as HomeOutline,
  MoonIcon as MoonOutline,
  UserIcon as UserOutline,
} from "react-native-heroicons/outline";

const ICON_MAP = {
  // Tab bar
  home: HomeIcon,
  "check-circle": CheckCircleIcon,
  chat: ChatBubbleLeftRightIcon,
  moon: MoonIcon,
  user: UserIcon,

  // Tab bar outline variants
  "home.outline": HomeOutline,
  "check-circle.outline": CheckCircleOutline,
  "chat.outline": ChatBubbleOutline,
  "moon.outline": MoonOutline,
  "user.outline": UserOutline,

  // Actions
  plus: PlusIcon,
  check: CheckIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-up": ChevronUpIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-left": ChevronLeftIcon,
  "ellipsis-horizontal": EllipsisHorizontalIcon,
  "ellipsis-vertical": EllipsisVerticalIcon,
  "plus-circle": PlusCircleIcon,
  "list-bullet": ListBulletIcon,
  pencil: PencilIcon,
  fire: FireIcon,
  "x-mark": XMarkIcon,
  play: PlayIcon,
  pause: PauseIcon,

  // UI elements
  sparkles: SparklesIcon,
  clock: ClockIcon,
  sun: SunIcon,
  calendar: CalendarIcon,
  "bars-3": Bars3Icon,
  squares: Squares2X2Icon,
  eye: EyeIcon,
  microphone: MicrophoneIcon,
  star: StarIcon,

  // Task icons
  clipboard: ClipboardDocumentIcon,
  computer: ComputerDesktopIcon,
  heart: HeartIcon,
  phone: PhoneIcon,
  book: BookOpenIcon,

  // Legacy SF Symbol name mappings (backward compat)
  "house.fill": HomeIcon,
  "checkmark.circle.fill": CheckCircleIcon,
  "bubble.left.and.bubble.right.fill": ChatBubbleLeftRightIcon,
  "moon.fill": MoonIcon,
  "person.fill": UserIcon,
  "chevron.right": ChevronRightIcon,
  "chevron.left.forwardslash.chevron.right": Bars3Icon,
  "paperplane.fill": SparklesIcon,
} as const;

export type IconName = keyof typeof ICON_MAP;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconName;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: string;
}) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    return null;
  }

  // Pass both `color` (for currentColor resolution) and `fill` (direct override)
  // to ensure SVG renders correctly on all platforms including iOS 26.
  return <IconComponent size={size} color={color} fill={color} style={style} />;
}
