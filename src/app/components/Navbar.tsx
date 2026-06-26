"use client";

import { useState, useEffect, useRef } from "react";
import { MENU_ITEMS } from "../constants/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Create a reference boundary around the dropdown element
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Global window mouse listener to check click targets
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Attach listeners directly to global execution contexts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between z-50">

      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded bg-linear-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-xs font-black text-slate-950">
          Ω
        </div>
        <span className="font-bold tracking-tight text-sm text-slate-200">DevHQ // System</span>
      </div>

      {/* Action Controls & Navigation Dropdown */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>

        {/* Status Light System */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse mr-1"></span>
          Root Auth Active
        </div>

        {/* Dropdown Menu Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors cursor-pointer select-none"
        >
          <span>Menu</span>
          <span className={`transition-transform duration-200 block text-[9px] ${isOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>

        {/* Floating Dropdown Overlay Container */}
        {isOpen && (
          <div className="absolute right-0 top-10 w-56 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-2 z-50">
            <p className="px-3 pt-2 pb-1 text-[9px] font-bold tracking-widest text-slate-500 uppercase">
              Switch Context
            </p>

            <div className="space-y-1 mt-1">
              {/* Dynamic looping array iteration mapping over your items matrix */}
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  disabled={item.disabled}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left border transition-all ${item.disabled
                    ? "text-slate-500 opacity-40 cursor-not-allowed border-transparent"
                    : "bg-indigo-950/40 text-indigo-400 border-indigo-900/30 hover:bg-indigo-900/40"
                    }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="border-t border-slate-900 mt-2 pt-2 px-3 pb-1 flex justify-between text-[9px] font-mono text-slate-600">
              <span>v2.4.0-alpha</span>
              <span>Local Pool</span>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
