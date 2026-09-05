"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "../lib/Icons";
import { scheduleData } from "../data/scheduleData"; // 👈 Your clean import path

// 🎨 CATEGORY COLOR MAP ENGINE
const categoryStyles: Record<
  | "Routine"
  | "Deep Work"
  | "Health"
  | "Break"
  | "Fitness"
  | "Finance"
  | "Leisure",
  string
> = {
  Routine: "border-slate-800 text-slate-400 bg-slate-900/40",
  "Deep Work": "border-cyan-500/30 text-cyan-400 bg-cyan-950/10",
  Health: "border-emerald-500/30 text-emerald-400 bg-emerald-950/10",
  Break: "border-zinc-800 text-zinc-500 bg-zinc-950/20",
  Fitness: "border-orange-500/30 text-orange-400 bg-orange-950/10",
  Finance: "border-amber-500/30 text-amber-400 bg-amber-950/10",
  Leisure: "border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-950/10",
};

const DAY_NAMES = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

// ─── External Time Subscriptions Store ───
const timeStore = {
  subscribe(onStoreChange: () => void) {
    const timer = setInterval(onStoreChange, 1000);
    return () => clearInterval(timer);
  },
  getSnapshot() {
    return new Date().getTime();
  },
  getServerSnapshot() {
    return 0;
  },
};

export default function ScheduleTrackerComponent() {
  const timeTimestamp = useSyncExternalStore(
    timeStore.subscribe,
    timeStore.getSnapshot,
    timeStore.getServerSnapshot,
  );

  const isServer = timeTimestamp === 0;
  const currentTime = isServer
    ? new Date(1772832000000)
    : new Date(timeTimestamp);

  const currentHour = currentTime.getHours();
  const currentDay = currentTime.getDay();

  const todaysSchedule = scheduleData.filter((item) =>
    item.dayOfWeek.includes(currentDay),
  );

  return (
    <div className="space-y-6">
      {/* MATRIX STATUS BAR */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border border-slate-900 rounded-lg font-mono text-xs text-slate-500">
        <div>
          [SYSTEM_STATUS:{" "}
          <span className="text-cyan-400">
            {isServer ? "SYNCHRONIZING..." : DAY_NAMES[currentDay]}
          </span>
          ]
        </div>
        <div>
          TIME:{" "}
          <span className="text-slate-300">
            {isServer ? "--:--:--" : currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* HARDWARE REMINDER */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-500/40 bg-amber-950/10 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <span className="text-sm font-black">!</span>
        </div>
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">
            Hardware Link Alert
          </div>
          <p className="text-sm text-slate-300 font-medium mt-0.5">
            Don&apos;t forget to put on your{" "}
            <span className="text-amber-400 font-bold">Apple Watch</span> to log
            biometrics and health rings.
          </p>
        </div>
      </div>

      {/* TIMETABLE LIST */}
      <div className="space-y-4">
        {isServer ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 border border-slate-900 rounded-xl animate-pulse">
            {"//"} EVALUATING_CHRONO_MANIFEST...
          </div>
        ) : todaysSchedule.length === 0 ? (
          <div className="p-8 text-center text-sm font-mono text-slate-500 border border-dashed border-slate-900 rounded-xl">
            {"//"} NO_SCHEDULED_TASKS_FOR_TODAY
          </div>
        ) : (
          todaysSchedule.map((item, index) => {
            const isActive =
              currentHour >= item.startHour && currentHour < item.endHour;

            return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)] opacity-100 scale-[1.01]"
                    : "bg-slate-950 border-slate-900 opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="font-mono text-xs text-slate-500 min-w-22.5 pt-1">
                    [{item.timeSlot}]
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono uppercase px-2 py-0.5 rounded border ${categoryStyles[item.category]}`}
                      >
                        {item.category}
                      </span>
                      {isActive && (
                        <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 animate-pulse bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/40">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          LIVE_EXECUTION
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-200 mt-2 flex items-center gap-2">
                      {item.activity}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center justify-end sm:justify-center pl-12 sm:pl-0">
                  <Icon
                    name={item.icon}
                    className={`size-6 ${isActive ? "text-cyan-400" : "text-slate-600"}`}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
