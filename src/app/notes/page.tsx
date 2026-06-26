import NotesWorkspace from '../components/NotesWorkspace'

export default function NotesPage() {
  return (
    <main className='text-slate-100 pt-1 px-6 md:px-12 max-w-5xl mx-auto pb-2'>
      {/* Workspace Context Header */}
      <header className='mb-4'>
        <div className='flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest'>
          <span>System Knowledge Base</span>
          {' // '}
          <span>Logs</span>
        </div>
        <h1 className='text-2xl font-black tracking-tight text-slate-100 sm:text-3xl'>
          Implementation Notes
        </h1>
      </header>

      {/* Embedded Persistent Notes Workspace */}
      <NotesWorkspace />
    </main>
  )
}
