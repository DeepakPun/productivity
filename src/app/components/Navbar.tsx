"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "../constants/navigation";
import { logoutAction } from "../actions/auth";

interface NavbarProps {
  isAuthenticated: boolean;
}

export default function Navbar({ isAuthenticated }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentActiveItem = MENU_ITEMS.find((item) => pathname === item.href);

  // Filter items: show if it doesn't require auth OR if the user is authenticated
  const visibleMenuItems = MENU_ITEMS.filter(
    (item) => !item.requiresAuth || isAuthenticated,
  );

  const handleLogout = () => {
    setIsOpen(false);
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between z-50">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="h-6 w-6 rounded bg-linear-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-xs font-black text-slate-950">
          Ω
        </div>
        <span className="font-bold tracking-tight text-sm text-slate-200 group-hover:text-white transition-colors">
          DevHQ // System
        </span>
      </Link>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Status indicator always visible, text dynamically changes */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
          <span
            className={`h-1.5 w-1.5 rounded-full mr-1 ${
              isAuthenticated ? "bg-emerald-400 animate-pulse" : "bg-rose-500"
            }`}
          ></span>
          {isAuthenticated ? "System Core Active" : "Guest Mode"}
        </div>

        {/* Menu Trigger Button - Rendered at all times */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors cursor-pointer select-none"
        >
          <span>{currentActiveItem ? currentActiveItem.label : "Menu"}</span>
          <span
            className={`transition-transform duration-200 block text-[9px] ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {/* Dropdown Container */}
        {isOpen && (
          <div className="absolute right-0 top-10 w-56 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-2 z-50">
            <p className="px-3 pt-2 pb-1 text-[9px] font-bold tracking-widest text-slate-500 uppercase">
              Switch Context
            </p>

            <div className="space-y-1 mt-1">
              {visibleMenuItems.map((item) => {
                const isActive = pathname === item.href;
                if (item.disabled) {
                  return (
                    <span
                      key={item.id}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left text-slate-500 opacity-40 cursor-not-allowed border border-transparent"
                    >
                      <span className="text-sm">{item.icon}</span> {item.label}
                    </span>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left border transition-all ${
                      isActive
                        ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                        : "bg-transparent text-slate-400 border-transparent hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span> {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Render termination action block only if authenticated */}
            {isAuthenticated && (
              <div className="border-t border-slate-900 mt-2 pt-2 px-1">
                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-mono rounded-lg text-left text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-colors border border-transparent duration-75 cursor-pointer disabled:opacity-50"
                >
                  <span>🛑</span>
                  {isPending ? "Terminating..." : "Terminate Session"}
                </button>
              </div>
            )}

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
