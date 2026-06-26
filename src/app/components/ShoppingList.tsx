"use client";

import { useState } from "react";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
}

export default function ShoppingList() {
  // Mock shopping array representing structural or project provisions
  const [items] = useState<ShoppingItem[]>([
    { id: "shop-1", name: "Croissants", quantity: 3 },
    { id: "shop-2", name: "Water", quantity: 1 },
    { id: "shop-3", name: "Eggs", quantity: 1 },
    { id: "shop-4", name: "Dogs", quantity: 1 },
    { id: "shop-5", name: "Chicken", quantity: 1 },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight md:text-4xl">
          Grocey List
        </h2>
        {/* <p className="text-slate-400 text-sm mt-2">
          Hardware assets and resources required for infrastructure optimization deployments.
        </p> */}
      </div>

      {/* Grid container with larger gaps between independent row blocks */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`p-6 md:p-8 flex items-center justify-between gap-6 border border-slate-800/80 rounded-xl shadow-md transition-all duration-150 ${index % 2 === 0
              ? "bg-slate-950"
              : "bg-slate-900/40"
              }`}
          >
            {/* Left side: Enhanced font sizes and indicators */}
            <div className="flex items-center gap-4">
              <span className="h-3 w-3 rounded-full bg-indigo-500 shadow-md shadow-indigo-500/50 shrink-0"></span>
              <span className="text-lg md:text-xl font-semibold text-slate-200 tracking-wide">
                {item.name}
              </span>
            </div>

            {/* Right side: Static, prominent badge displays */}
            <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl shrink-0">
              <span className="text-xs font-mono tracking-wider text-slate-500 font-bold uppercase mr-1">
                Qty:
              </span>
              <span className="text-xl md:text-2xl font-mono font-black text-indigo-400">
                {item.quantity}
              </span>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="p-12 text-center text-base text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl">
            Provisions clear. No assets pending purchase.
          </div>
        )}
      </div>
    </div>
  );
}
