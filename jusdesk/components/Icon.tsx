import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon, ArrowTurnBackwardIcon, BubbleChatIcon, CheckmarkCircle02Icon, Clock01Icon, CreditCardIcon,
  DeliveryTruck01Icon, GitMergeIcon, InboxIcon, Key01Icon, Location01Icon, Mail01Icon, MaximizeIcon,
  MinimizeIcon, MoreHorizontalIcon, PackageIcon, PlayIcon, Search01Icon, SentIcon, SquareLock02Icon,
  Tick02Icon, UserAdd01Icon, UserIcon,
} from "@hugeicons/core-free-icons";

// Hugeicons, Stroke Rounded (free set).
const ICONS = {
  alert: Alert02Icon,
  undo: ArrowTurnBackwardIcon,
  chat: BubbleChatIcon,
  done: CheckmarkCircle02Icon,
  clock: Clock01Icon,
  card: CreditCardIcon,
  truck: DeliveryTruck01Icon,
  merge: GitMergeIcon,
  inbox: InboxIcon,
  key: Key01Icon,
  pin: Location01Icon,
  mail: Mail01Icon,
  expand: MaximizeIcon,
  shrink: MinimizeIcon,
  more: MoreHorizontalIcon,
  box: PackageIcon,
  play: PlayIcon,
  search: Search01Icon,
  send: SentIcon,
  lock: SquareLock02Icon,
  check: Tick02Icon,
  assign: UserAdd01Icon,
  user: UserIcon,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return <HugeiconsIcon icon={ICONS[name]} size={size} strokeWidth={1.5} color="currentColor" aria-hidden="true" />;
}
