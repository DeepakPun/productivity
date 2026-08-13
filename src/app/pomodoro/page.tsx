// Test timer for temporary use.
"use client";

import PomodoroWorkspace from "@/app/components/PomodoroWorkspace";
import { Suspense, useEffect, useState } from "react";

const TARGET = new Date(2026, 7, 25, 7, 0, 0);
const REMINDER_TEXT = "Get Endgame-Encore re-release tickets";

function getCountdown(target: Date) {
  const now = new Date();
  let diff = target.getTime() - now.getTime();
  if (diff <= 0)
    return {
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
      expired: true,
    };

  let months = 0;
  let anchor = new Date(now);
  while (true) {
    const next = new Date(anchor);
    next.setMonth(next.getMonth() + 1);
    if (next <= target) {
      months++;
      anchor = next;
    } else break;
  }
  diff = target.getTime() - anchor.getTime();
  const msInSec = 1000,
    msInMin = 60 * msInSec,
    msInHour = 60 * msInMin,
    msInDay = 24 * msInHour,
    msInWeek = 7 * msInDay;
  const weeks = Math.floor(diff / msInWeek);
  diff -= weeks * msInWeek;
  const days = Math.floor(diff / msInDay);
  diff -= days * msInDay;
  const hours = Math.floor(diff / msInHour);
  diff -= hours * msInHour;
  const mins = Math.floor(diff / msInMin);
  diff -= mins * msInMin;
  const secs = Math.floor(diff / msInSec);
  return { months, weeks, days, hours, mins, secs, expired: false };
}

function SimpleCountdown() {
  const [target, setTarget] = useState<Date>(TARGET);
  const [timeLeft, setTimeLeft] = useState(() => getCountdown(TARGET));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getCountdown(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "months", value: timeLeft.months },
    { label: "weeks", value: timeLeft.weeks },
    { label: "days", value: timeLeft.days },
    { label: "hours", value: timeLeft.hours },
    { label: "mins", value: timeLeft.mins },
    { label: "secs", value: timeLeft.secs, highlight: true },
  ];

  return (
    <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/50 p-4 font-mono">
      {/* Permanent Reminder - always visible */}
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2">
        <span className="text-amber-400">●</span>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
          {REMINDER_TEXT}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="text-sm uppercase tracking-widest text-cyan-400">
          // COUNTDOWN_ACTIVE :: {timeLeft.expired ? "EXPIRED" : "TICKING"}
        </div>
        <input
          type="datetime-local"
          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text- text-slate-300 outline-none focus:border-cyan-500/50"
          value={new Date(target.getTime() - target.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16)}
          onChange={(e) => setTarget(new Date(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {units.map((u) => (
          <div
            key={u.label}
            className={`text-4xl rounded-lg border bg-slate-950 p-3 text-center ${u.highlight ? "border-cyan-500/30" : "border-slate-800"}`}
          >
            <div
              className={`text-4xl sm:text-4xl font-black tabular-nums ${u.highlight ? "text-cyan-400" : "text-slate-100"}`}
            >
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="text-sm uppercase tracking-widest text-slate-500 mt-1">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PomodoroPage() {
  return (
    <main className="text-slate-100 pt-1 px-6 md:px-12 max-w-5xl mx-auto pb-2">
      <SimpleCountdown />
      <header className="mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest">
          <span>System Focus Matrix</span>
          {" // "}
          <span>Metrics</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-100 sm:text-3xl">
          Interval Manager
        </h1>
      </header>
      <Suspense
        fallback={
          <div className="p-12 text-center text-xs font-mono text-slate-500 border border-slate-900 rounded-xl animate-pulse">
            {"//"} STREAMING_CORE_PIPELINE_MARKUP...
          </div>
        }
      >
        <PomodoroWorkspace />
      </Suspense>
    </main>
  );
}
// Working component
// import PomodoroWorkspace from '@/app/components/PomodoroWorkspace'
// import { Suspense } from 'react'

// export default function PomodoroPage() {
//   return (
//     <main className='text-slate-100 pt-1 px-6 md:px-12 max-w-5xl mx-auto pb-2'>
//       {/* Workspace Context Header */}
//       <header className='mb-4'>
//         <div className='flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest'>
//           <span>System Focus Matrix</span> {' // '} <span>Metrics</span>
//         </div>
//         <h1 className='text-2xl font-black tracking-tight text-slate-100 sm:text-3xl'>
//           Interval Manager
//         </h1>
//       </header>

//       {/* Wrap with Suspense to safely stream the terminal UI skeleton */}
//       <Suspense
//         fallback={
//           <div className='p-12 text-center text-xs font-mono text-slate-500 border border-slate-900 rounded-xl animate-pulse'>
//             {'//'} STREAMING_CORE_PIPELINE_MARKUP...
//           </div>
//         }
//       >
//         <PomodoroWorkspace />
//       </Suspense>
//     </main>
//   )
// }
