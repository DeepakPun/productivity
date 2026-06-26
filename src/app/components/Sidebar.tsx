export default function Sidebar() {
  return (
    <>
      {/* 💻 Desktop Sidebar Panel (Unchanged for Larger Monitors) */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col justify-between p-4 hidden md:flex h-full">
        <div className="space-y-6">
          <div>
            <p className="px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase">Internal Assets</p>
            <ul className="mt-2 space-y-1">
              <li>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-indigo-950/50 text-indigo-400 border border-indigo-900/40 shadow-sm shadow-indigo-950/20 text-left">
                  🛒 Shopping List
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 transition-all text-left opacity-50 cursor-not-allowed" disabled>
                  🛠️ DevOps Pipeline
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-4 px-3 text-[11px] font-mono text-slate-600">
          v2.4.0-alpha
        </div>
      </aside>

      {/* 📱 Mobile Bottom Sticky Bar (Visible only below md breakpoint) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/95 backdrop-blur border-t border-slate-800 px-6 flex items-center justify-around z-50">
        <button className="flex flex-col items-center justify-center gap-1 text-indigo-400">
          <span className="text-xl">🛒</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Shopping</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 text-slate-500 opacity-50 cursor-not-allowed" disabled>
          <span className="text-xl">🛠️</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">DevOps</span>
        </button>
      </div>
    </>
  );
}
