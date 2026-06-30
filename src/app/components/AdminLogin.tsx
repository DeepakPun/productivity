'use client'

import { useActionState } from 'react'
import { loginAction } from '../actions/auth'

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  console.log(state)

  return (
    <div className='w-full max-w-sm bg-slate-900/50 border border-slate-800 p-6 rounded-xl text-left backdrop-blur-sm shadow-2xl'>
      <h2 className='text-xs font-mono tracking-wider text-slate-400 uppercase mb-4 border-b border-slate-800 pb-2'>
        Authorize Security Clearance
      </h2>

      <form action={formAction} className='space-y-4'>
        <div>
          <label className='block text-[11px] font-mono uppercase text-slate-400 mb-1'>
            Username
          </label>
          <input
            type='text'
            name='username'
            required
            className='w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors font-mono'
            placeholder='operator'
          />
        </div>

        <div>
          <label className='block text-[11px] font-mono uppercase text-slate-400 mb-1'>
            Password
          </label>
          <input
            type='password'
            name='password'
            required
            className='w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors'
            placeholder='••••••••'
          />
        </div>

        <div>
          <label className='block text-[11px] font-mono uppercase text-slate-400 mb-1'>
            Admin Code
          </label>
          <input
            type='password'
            name='adminCode'
            required
            className='w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors font-mono tracking-widest'
            placeholder='000000'
          />
        </div>

        {state?.error && (
          <p className='text-xs font-mono text-rose-400 bg-rose-950/20 border border-rose-900/30 px-3 py-2 rounded text-center animate-pulse'>
            {state.error}
          </p>
        )}

        <button
          type='submit'
          disabled={isPending}
          className='w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-slate-100 font-mono text-xs uppercase tracking-wider py-2.5 px-4 rounded transition-colors duration-150 shadow-lg shadow-indigo-600/10'
        >
          {isPending ? 'Validating Matrix...' : 'Mount Context'}
        </button>
      </form>
    </div>
  )
}
