import { IconName } from "../lib/Icons";

export interface ScheduleItem {
  dayOfWeek: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  timeSlot: string;
  startHour: number;
  endHour: number;
  activity: string;
  category:
    | "Routine"
    | "Deep Work"
    | "Health"
    | "Break"
    | "Fitness"
    | "Finance"
    | "Leisure";
  icon: IconName;
}

export const scheduleData: ScheduleItem[] = [
  {
    dayOfWeek: [1, 2, 3, 4, 5],
    timeSlot: "07:30 - 09:00",
    startHour: 7,
    endHour: 9,
    activity: "Morning Trail Hike & Fresh Air",
    category: "Fitness",
    icon: "hike",
  },
  {
    dayOfWeek: [1, 2, 3, 4, 5],
    timeSlot: "09:30 - 12:00",
    startHour: 9,
    endHour: 12,
    activity: "CompTIA Security+ Study Session",
    category: "Deep Work",
    icon: "code",
  },
  {
    dayOfWeek: [1, 2, 3, 4, 5],
    timeSlot: "12:00 - 13:00",
    startHour: 12,
    endHour: 13,
    activity: "Midday Fuel & System Cooldown",
    category: "Break",
    icon: "rest",
  },
  {
    dayOfWeek: [1, 2, 3, 4, 5],
    timeSlot: "13:00 - 17:00",
    startHour: 13,
    endHour: 17,
    activity: "Lyft Driving / Income Generation Blocks",
    category: "Finance",
    icon: "shell",
  },
  {
    dayOfWeek: [1, 2, 3, 4, 5],
    timeSlot: "18:00 - 20:00",
    startHour: 18,
    endHour: 20,
    activity: "AWS Certified Solutions Architect Labs",
    category: "Deep Work",
    icon: "cloud",
  },

  {
    dayOfWeek: [6],
    timeSlot: "09:00 - 10:30",
    startHour: 9,
    endHour: 11,
    activity: "Light Exercise (Soccer Pre-Match Warmup)",
    category: "Fitness",
    icon: "hike",
  },
  {
    dayOfWeek: [6],
    timeSlot: "11:00 - 13:00",
    startHour: 11,
    endHour: 13,
    activity: "Scenic Trail Hike",
    category: "Fitness",
    icon: "hike",
  },
  {
    dayOfWeek: [6], // Change to 6
    timeSlot: "15:00 - 18:00",
    startHour: 15,
    endHour: 18,
    activity: "Cinematic Screening / Movie Break",
    category: "Leisure",
    icon: "rest",
  },

  {
    dayOfWeek: [0],
    timeSlot: "06:00 - 09:30",
    startHour: 6,
    endHour: 10,
    activity: "Competitive Soccer Match",
    category: "Fitness",
    icon: "hike",
  },
  {
    dayOfWeek: [0],
    timeSlot: "10:30 - 12:00",
    startHour: 10,
    endHour: 12,
    activity: "Domestic Operations & Laundry Reset",
    category: "Routine",
    icon: "shell",
  },
  {
    dayOfWeek: [0],
    timeSlot: "13:00 - 22:00",
    startHour: 13,
    endHour: 22,
    activity: "Unstructured Time / Free Space",
    category: "Leisure",
    icon: "development",
  },
];
