export default function Footer() {
  return (
    <footer className='border-t border-slate-800/40 bg-slate-900/30 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] font-mono text-slate-500'>
      <p suppressHydrationWarning>
        © {new Date().getFullYear()} Deepak Pun. Internal administration
        terminal.
      </p>
      {/* <p className="text-slate-600">Free Tier Account Instance</p> */}
    </footer>
  )
}
