export interface MenuItem {
  id: string
  label: string
  icon: string
  disabled: boolean
  href: string
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'shopping',
    label: 'Shopping Inventory',
    icon: '🛒',
    href: '/shopping',
    disabled: false,
  },
  {
    id: 'tasks',
    label: 'Task Tracker',
    icon: '✅',
    href: '/tasks',
    disabled: false,
  },
  {
    id: 'notes',
    label: 'Implementation Notes',
    icon: '📝',
    href: '/notes',
    disabled: false,
  },
  {
    id: 'pomodoro',
    label: 'Focus Matrix',
    icon: '⏱️',
    href: '/pomodoro',
    disabled: false,
  },
]
