import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='text-slate-50 flex flex-col items-center justify-center p-6 text-center select-none font-sans'>
      <div className='space-y-6 max-w-md border border-slate-800 bg-slate-900/40 p-8 md:p-12 rounded-2xl shadow-2xl backdrop-blur relative overflow-hidden'>
        {/* Visual Terminal Styling Glow Anchor */}
        <div className='absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-red-500 via-amber-500 to-indigo-500'></div>

        <div className='space-y-2'>
          <span className='text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-900/60 px-2.5 py-1 rounded'>
            Error Code: 404
          </span>
          <h1 className='text-2xl font-black text-slate-100 tracking-tight pt-2'>
            Context Node Unreachable
          </h1>
          <p className='text-slate-400 text-xs leading-relaxed font-mono'>
            The route instance you requested does not exist or has been shifted
            from internal memory registers.
          </p>
        </div>

        <div className='pt-2'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-slate-950 hover:bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-lg transition-all shadow-md'
          >
            ← Terminate & Return to Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
