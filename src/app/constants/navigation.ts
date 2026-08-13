export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  disabled: boolean;
  href: string;
  requiresAuth: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "shopping",
    label: "Shopping Inventory",
    icon: "🛒",
    href: "/shopping",
    disabled: false,
    requiresAuth: true,
  },
  {
    id: "tasks",
    label: "Task Tracker",
    icon: "✅",
    href: "/tasks",
    disabled: false,
    requiresAuth: true,
  },
  {
    id: "notes",
    label: "Implementation Notes",
    icon: "📝",
    href: "/notes",
    disabled: false,
    requiresAuth: true,
  },
  {
    id: "pomodoro",
    label: "Focus Matrix",
    icon: "⏱️",
    href: "/pomodoro",
    disabled: false,
    requiresAuth: false,
  },
  {
    id: "bills",
    label: "Monthly Bills",
    icon: "💳",
    href: "/bills",
    disabled: false,
    requiresAuth: true,
  },
];
