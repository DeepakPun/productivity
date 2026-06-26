"use client";

import { useState } from "react";

interface NoteItem {
  id: string;
  title: string;
  definition: string;
  timestamp: string;
}

export default function Notes() {
  // Mock notes data tracking internal engineering terms
  const [notes] = useState<NoteItem[]>([
    {
      id: "note_1",
      title: "Docker BuildKit Layer Optimization",
      definition: "A mechanism that caches container build layers. By sequencing commands intelligently (e.g., copying package.json before source files), subsequent builds run instantly if dependencies have not changed.",
      timestamp: "Today, 10:14 AM",
    },
    {
      id: "note_2",
      title: "Nginx Reverse Proxy & SSL Termination",
      definition: "An architectural pattern where Nginx intercepts incoming public traffic, validates SSL/TLS handshakes, and routes clean HTTP requests over internal container networks to hidden application frameworks.",
      timestamp: "Yesterday, 4:32 PM",
    },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight md:text-4xl">
          System Knowledge Base
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Technical references, definitions, and code concepts for rapid onboarding.
        </p>
      </div>

      {/* Grid container responsive for different viewport contexts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-6 bg-slate-950 border border-slate-800/80 hover:border-slate-700/60 rounded-xl shadow-xl flex flex-col justify-between gap-4 transition-all duration-150"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-indigo-400 tracking-wide">
                {note.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                {note.definition}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
              <span>ID: {note.id}</span>
              <span>{note.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
