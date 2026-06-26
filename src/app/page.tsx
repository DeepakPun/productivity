export default function LandingPage() {
  return (
    <main className='bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto text-center'>
      {/* Visual System Anchor */}
      <div className='mb-6 font-mono text-[10px] tracking-widest text-indigo-400 bg-indigo-950/30 border border-indigo-900/50 px-3 py-1 rounded-full uppercase'>
        System Core // Offline
      </div>

      {/* Minimal Hero Header */}
      <h1 className='text-3xl font-black tracking-tight text-slate-100 sm:text-4xl'>
        Workspace Initialized
      </h1>

      <p className='text-sm text-slate-400 mt-3 leading-relaxed max-w-md'>
        Select a productivity tool from the Navbar dropdown to mount a context
        matrix and begin working.
      </p>

      {/* Visual Indicator Pointing Upward */}
      {/* <div className='mt-8 text-slate-700 font-mono text-xs animate-bounce'>
        ↑ Navigation Cluster Pending
      </div> */}
    </main>
  )
}
