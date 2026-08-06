"use client";

import { useState } from "react";

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
}

export default function BillsWorkspace() {
  // Pure mockup data pipeline
  const [bills] = useState<Bill[]>([
    {
      id: "1",
      name: "Main Power Grid",
      amount: 142.5,
      dueDate: "2026-07-15",
    },
    {
      id: "2",
      name: "Quantum Fiber Net",
      amount: 79.99,
      dueDate: "2026-07-18",
    },
    {
      id: "3",
      name: "Database Core Stream",
      amount: 14.99,
      dueDate: "2026-07-22",
    },
    {
      id: "4",
      name: "Cloud Compute Instance",
      amount: 245.0,
      dueDate: "2026-07-28",
    },
  ]);

  // Pure derived total calculation
  const totalBillsAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="w-full font-mono text-left space-y-4">
      {/* Bill List Processing Deck - Expanding naturally without wrappers or scrollbars */}
      <div className="border border-slate-900 rounded-lg overflow-hidden bg-slate-950">
        {bills.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-600 uppercase tracking-wider">
            {"//"} No ledger items present in this pipeline
          </div>
        ) : (
          bills.map((bill, index) => (
            <div
              key={bill.id}
              className={`flex items-center justify-between p-4 border-b border-slate-900/60 last:border-0 transition-colors ${
                index % 2 === 0 ? "bg-slate-950" : "bg-slate-900/30"
              }`}
            >
              <div>
                <div className="text-sm font-bold text-slate-200">
                  {bill.name}
                </div>
                <div className="text-[10px] text-slate-500 uppercase mt-0.5">
                  Term: {bill.dueDate}
                </div>
              </div>

              <div className="text-sm font-black tabular-nums text-cyan-400">
                ${bill.amount.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Financial HUD Summary Footer Panel */}
      <section className="flex justify-between items-center p-4 bg-slate-900/20 rounded-lg border border-slate-900/60 relative overflow-hidden">
        <div className="text-xs uppercase tracking-widest text-slate-400 font-bold z-10">
          Total Matrix Cost
        </div>
        <div className="text-xl font-black tracking-tight text-slate-100 select-none tabular-nums z-10">
          $<span className="text-cyan-400">{totalBillsAmount.toFixed(2)}</span>
        </div>
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-14px_24px"></div>
      </section>
    </div>
  );
}
