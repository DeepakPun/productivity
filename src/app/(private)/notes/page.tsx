import { Suspense } from 'react'
import NotesWorkspace from '@/app/components/NotesWorkspace'

export default function NotesPage() {
  return (
    <main className='text-slate-100 pt-1 px-6 md:px-12 max-w-5xl mx-auto pb-2'>
      {/* Workspace Context Header */}
      <header className='mb-4'>
        <div className='flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest'>
          <span>System Knowledge Base</span> {' // '} <span>Logs</span>
        </div>
        <h1 className='text-2xl font-black tracking-tight text-slate-100 sm:text-3xl'>
          Implementation Notes
        </h1>
      </header>

      {/* 
        Wrap with Suspense to allow Server Components to instantly stream a matching 
        skeleton layout shell without runtime hydration errors.
      */}
      <Suspense
        fallback={
          <div className='p-12 text-center text-xs font-mono text-slate-500 border border-slate-900 rounded-xl animate-pulse'>
            {'//'} STREAMING_CORE_PIPELINE_MARKUP...
          </div>
        }
      >
        <NotesWorkspace />
      </Suspense>
    </main>
  )
}
