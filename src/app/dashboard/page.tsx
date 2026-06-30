import Link from 'next/link'
import { MENU_ITEMS } from '../constants/navigation'

export default function DashboardPage() {
  return (
    <main className='text-slate-100 pt-8 px-6 md:px-12 max-w-5xl mx-auto pb-12 min-h-[calc(100vh-3.5rem)]'>
      <header className='mb-8 border-b border-slate-900 pb-6'>
        <div className='flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest'>
          <span>System Matrix</span> {' // '} <span>Operational Command</span>
        </div>
        <h1 className='text-2xl font-black tracking-tight text-slate-100 sm:text-3xl'>
          DevHQ Mainframe
        </h1>
        <p className='text-sm text-slate-400 mt-1 max-w-xl'>
          Core node is online. Secure environment mounted. Choose an active
          utility submodule below to manipulate the data matrix.
        </p>
      </header>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {MENU_ITEMS.map(item => (
          <div
            key={item.id}
            className={`group relative border rounded-xl p-5 text-left transition-all backdrop-blur-sm ${
              item.disabled
                ? 'border-slate-900 bg-slate-950/20 opacity-40 cursor-not-allowed'
                : 'border-slate-800 bg-slate-900/30 hover:border-indigo-500/50 hover:bg-slate-900/60 shadow-xl'
            }`}
          >
            <div className='flex items-start justify-between mb-3'>
              <div
                className={`text-2xl h-10 w-10 rounded-lg border flex items-center justify-center ${
                  item.disabled
                    ? 'border-slate-800 bg-slate-950'
                    : 'border-slate-800 bg-slate-950 group-hover:border-indigo-500/30 transition-colors'
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${
                  item.disabled
                    ? 'text-slate-600 border-slate-900 bg-transparent'
                    : 'text-emerald-400 border-emerald-950 bg-emerald-950/30'
                }`}
              >
                {item.disabled ? 'Offline' : 'Ready'}
              </span>
            </div>

            <h3
              className={`text-sm font-bold tracking-tight ${item.disabled ? 'text-slate-500' : 'text-slate-200 group-hover:text-indigo-400 transition-colors'}`}
            >
              {item.label}
            </h3>

            <p className='text-xs text-slate-400 mt-1 leading-relaxed'>
              {item.disabled
                ? 'This structural contextual core node is currently locked.'
                : `Mount the persistent ${item.label} matrix workspace.`}
            </p>

            {!item.disabled && (
              <Link
                href={item.href}
                className='absolute inset-0 rounded-xl z-10'
                aria-label={`Open ${item.label}`}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
