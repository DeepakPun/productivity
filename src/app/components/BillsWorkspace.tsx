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
      name: "Rent",
      amount: 1424.0,
      dueDate: "2026-07-15",
    },
    {
      id: "2",
      name: "Car",
      amount: 563,
      dueDate: "2026-07-18",
    },
    {
      id: "3",
      name: "GEICO",
      amount: 277,
      dueDate: "2026-07-22",
    },
    {
      id: "4",
      name: "Phone + Internet",
      amount: 145.0,
      dueDate: "2026-07-28",
    },
    {
      id: "5",
      name: "DO Droplet Lab hosting",
      amount: 12.63,
      dueDate: "2026-07-28",
    },
    {
      id: "6",
      name: "AWS Cloud Infra",
      amount: 2.0,
      dueDate: "2026-07-28",
    },
  ]);

  // Pure derived total calculation
  const totalBillsAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="w-full font-mono text-left space-y-4">
      {/* Bill List Processing Deck - Expanding naturally without wrappers or scrollbars */}
      <div className="border border-zinc-800 rounded-xl overflow-hidden bg-black shadow-2xl">
        {bills.length === 0 ? (
          <div className="text-center py-10 text-sm text-zinc-600 uppercase tracking-widest">
            {"//"} No ledger items present in this pipeline
          </div>
        ) : (
          bills.map((bill, index) => (
            <div
              key={bill.id}
              className={`flex items-center justify-between p-5 border-b border-zinc-900 last:border-0 transition-colors hover:bg-zinc-900/40 ${
                index % 2 === 0 ? "bg-black" : "bg-zinc-950"
              }`}
            >
              <div>
                <div className="text-2xl font-bold tracking-tight text-zinc-100">
                  {bill.name}
                </div>
                {/* <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                  Term: {bill.dueDate}
                </div> */}
              </div>

              <div className="text-2xl font-black tabular-nums text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.15)]">
                ${bill.amount.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Financial HUD Summary Footer Panel */}
      <section className="flex justify-between items-center p-6 bg-zinc-950/60 rounded-xl border border-zinc-800 backdrop-blur-sm relative overflow-hidden shadow-xl">
        <div className="text-2xl uppercase tracking-widest text-zinc-400 font-extrabold z-10">
          Total Cost
        </div>
        <div className="text-4xl font-black tracking-tight text-white select-none tabular-nums z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          $<span className="text-cyan-400">{totalBillsAmount.toFixed(2)}</span>
        </div>
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[16px_28px]"></div>
      </section>
    </div>
  );
}
