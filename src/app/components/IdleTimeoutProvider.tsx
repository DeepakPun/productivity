'use client'
import { useEffect, useRef, useState, useTransition } from 'react'
import { logoutAction } from '../actions/auth'

interface IdleTimeoutProviderProps {
  children: React.ReactNode
  isAuthenticated: boolean
}

const ENV_LIMIT = process.env.NEXT_PUBLIC_TIMEOUT_LIMIT
const TIMEOUT_LIMIT = ENV_LIMIT ? parseInt(ENV_LIMIT, 10) : 15 * 60 * 1000
const WARNING_WINDOW = 60 * 1000
const THROTTLE_LIMIT = 2000

export default function IdleTimeoutProvider({
  children,
  isAuthenticated,
}: IdleTimeoutProviderProps) {
  const [, startTransition] = useTransition()
  const [showWarning, setShowWarning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(60)

  const showWarningRef = useRef(false)
  const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(0)

  useEffect(() => {
    showWarningRef.current = showWarning
  }, [showWarning])

  useEffect(() => {
    if (!isAuthenticated) return

    const handleAutomaticLogout = () => {
      startTransition(async () => {
        console.warn('Session expired due to inactivity. Terminating Matrix...')
        await logoutAction()
      })
    }

    const clearAllTimers = () => {
      if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current)
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current)
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current)
    }

    const startWarningCountdown = () => {
      setShowWarning(true)

      // FIX: Guard rail for testing. If TIMEOUT_LIMIT is 10s, warning window adapts to 5s.
      const dynamicWarningWindow =
        TIMEOUT_LIMIT <= WARNING_WINDOW ? TIMEOUT_LIMIT / 2 : WARNING_WINDOW
      const initialSeconds = Math.max(
        1,
        Math.round(dynamicWarningWindow / 1000),
      )
      setSecondsLeft(initialSeconds)

      countdownIntervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            if (countdownIntervalRef.current)
              clearInterval(countdownIntervalRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    const startInactivityTimers = () => {
      clearAllTimers()
      setShowWarning(false)

      // FIX: Adjust warning delays when testing thresholds are smaller than 60 seconds
      const dynamicWarningWindow =
        TIMEOUT_LIMIT <= WARNING_WINDOW ? TIMEOUT_LIMIT / 2 : WARNING_WINDOW
      const warningDelay = Math.max(0, TIMEOUT_LIMIT - dynamicWarningWindow)

      warningTimeoutRef.current = setTimeout(
        startWarningCountdown,
        warningDelay,
      )
      logoutTimeoutRef.current = setTimeout(
        handleAutomaticLogout,
        TIMEOUT_LIMIT,
      )
    }

    const handleUserActivity = () => {
      if (showWarningRef.current) return

      const now = Date.now()
      if (now - lastActivityRef.current > THROTTLE_LIMIT) {
        lastActivityRef.current = now
        startInactivityTimers()
      }
    }

    const activityEvents = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
    ]

    // FIX: Changed { passive: true } to { capture: true, passive: true }
    // This intercepts dropdown clicks before components can stop event propagation.
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity, {
        capture: true,
        passive: true,
      })
    })

    startInactivityTimers()

    return () => {
      clearAllTimers()
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity, { capture: true })
      })
    }
  }, [isAuthenticated, startTransition])

  const handleExtendSession = () => {
    setShowWarning(false)
    lastActivityRef.current = Date.now()
    window.dispatchEvent(new Event('mousedown'))
  }

  const handleManualLogout = async () => {
    await logoutAction()
  }

  return (
    <>
      {children}
      {showWarning && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in'>
          <div className='w-full max-w-md bg-slate-900 border border-red-900/60 p-6 rounded-2xl shadow-2xl space-y-6 font-mono text-left'>
            <header className='space-y-2 border-b border-slate-800 pb-4'>
              <div className='flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest animate-pulse'>
                <span>⚠️ Security Protocol</span> {' // '}{' '}
                <span>Inactivity Alert</span>
              </div>
              <h2 className='text-xl font-black text-slate-100 tracking-tight'>
                Session Terminating
              </h2>
            </header>
            <p className='text-sm text-slate-400 leading-relaxed'>
              System detected zero input operations. Terminating secure matrix
              container connection in{' '}
              <span className='text-red-400 font-bold text-base px-1 bg-red-950/30 border border-red-900/40 rounded-md'>
                {secondsLeft}s
              </span>{' '}
              .
            </p>
            <div className='flex gap-3 pt-2'>
              <button
                type='button'
                onClick={handleExtendSession}
                className='flex-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer text-center'
              >
                Extend Connection
              </button>
              <button
                type='button'
                onClick={handleManualLogout}
                className='px-4 bg-slate-950 hover:bg-red-950/30 border border-slate-800 hover:border-red-900/40 text-slate-400 hover:text-red-400 font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer text-center'
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
