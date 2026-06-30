import PomodoroWorkspace from '@/app/components/PomodoroWorkspace'
import { Suspense } from 'react'

export default function PomodoroPage() {
  return (
    <main className='text-slate-100 pt-1 px-6 md:px-12 max-w-5xl mx-auto pb-2'>
      {/* Workspace Context Header */}
      <header className='mb-4'>
        <div className='flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest'>
          <span>System Focus Matrix</span> {' // '} <span>Metrics</span>
        </div>
        <h1 className='text-2xl font-black tracking-tight text-slate-100 sm:text-3xl'>
          Interval Manager
        </h1>
      </header>

      {/* Wrap with Suspense to safely stream the terminal UI skeleton */}
      <Suspense
        fallback={
          <div className='p-12 text-center text-xs font-mono text-slate-500 border border-slate-900 rounded-xl animate-pulse'>
            {'//'} STREAMING_CORE_PIPELINE_MARKUP...
          </div>
        }
      >
        <PomodoroWorkspace />
      </Suspense>
    </main>
  )
}
