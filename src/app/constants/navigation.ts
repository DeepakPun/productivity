export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  disabled: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "shopping",
    label: "Shopping List",
    icon: "🛒",
    disabled: false,
  },
  {
    id: "notes",
    label: "System Notes",
    icon: "📝",
    disabled: false,
  },
  {
    id: "devops",
    label: "DevOps Pipeline",
    icon: "🛠️",
    disabled: true,
  },
];
