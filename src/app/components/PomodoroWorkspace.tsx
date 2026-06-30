'use client'

import { useState, useEffect, useRef } from 'react'

type TimerPreset = 'pomodoro' | 'shortBreak' | 'longBreak' | 'custom'

export default function PomodoroWorkspace() {
  const presets: Record<Exclude<TimerPreset, 'custom'>, number> = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  }

  const [activeTab, setActiveTab] = useState<TimerPreset>('pomodoro')
  const [minutes, setMinutes] = useState(presets.pomodoro)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [customValue, setCustomValue] = useState('25')

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleTabChange = (tab: TimerPreset) => {
    setActiveTab(tab)
    setIsActive(false)
    setSeconds(0)

    if (tab !== 'custom') {
      setMinutes(presets[tab])
    } else {
      const parsed = parseInt(customValue, 10)
      setMinutes(isNaN(parsed) || parsed <= 0 ? 25 : parsed)
    }
  }

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prev => prev - 1)
        } else if (minutes > 0) {
          setMinutes(prev => prev - 1)
          setSeconds(59)
        } else {
          setIsActive(false)
          if (timerRef.current) clearInterval(timerRef.current)
          // alert('Interval completed! Take a break.')
        }
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive, minutes, seconds])

  const toggleTimer = () => setIsActive(!isActive)

  const resetTimer = () => {
    setIsActive(false)
    setSeconds(0)
    if (activeTab !== 'custom') {
      setMinutes(presets[activeTab])
    } else {
      const parsed = parseInt(customValue, 10)
      setMinutes(isNaN(parsed) || parsed <= 0 ? 25 : parsed)
    }
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsActive(false)
    setSeconds(0)
    const parsed = parseInt(customValue, 10)
    setMinutes(isNaN(parsed) || parsed <= 0 ? 25 : parsed)
  }

  const formatTime = (val: number) => String(val).padStart(2, '0')

  return (
    <div className='w-full border border-slate-900 bg-slate-950 p-6 rounded-xl font-mono text-left space-y-6'>
      {/* Preset Action Header Buttons */}
      <div className='flex flex-wrap gap-2 items-center justify-between border-b border-slate-900 pb-4'>
        <div className='flex gap-2 bg-slate-900/50 p-1 rounded-lg border border-slate-900'>
          {(['pomodoro', 'shortBreak', 'longBreak'] as const).map(tab => (
            <button
              key={tab}
              type='button'
              onClick={() => handleTabChange(tab)}
              className={`py-1.5 px-3 rounded-md text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'pomodoro'
                ? 'Focus'
                : tab === 'shortBreak'
                  ? 'Short'
                  : 'Long'}
            </button>
          ))}
        </div>

        {/* Custom Input Toggle Button */}
        <div className='flex items-center gap-3'>
          <button
            type='button'
            onClick={() => handleTabChange('custom')}
            className={`text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-md border transition-colors cursor-pointer ${
              activeTab === 'custom'
                ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20'
                : 'border-slate-900 text-slate-500 hover:text-slate-400'
            }`}
          >
            Custom
          </button>

          {activeTab === 'custom' && (
            <form
              onSubmit={handleCustomSubmit}
              className='flex gap-2 items-center animate-fade-in'
            >
              <input
                type='number'
                min='1'
                max='1440'
                value={customValue}
                onChange={e => setCustomValue(e.target.value)}
                className='w-16 bg-slate-900 border border-slate-800 text-slate-100 font-bold px-2 py-1 rounded-md text-center text-xs outline-none focus:border-cyan-500'
              />
              <button
                type='submit'
                className='bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold px-2 py-1 rounded-md transition-colors cursor-pointer'
              >
                Set
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Clock HUD Face Area */}
      <section className='flex justify-center items-center py-10 bg-slate-900/20 rounded-xl border border-slate-900/60 relative overflow-hidden'>
        <div className='text-7xl font-black tracking-tight text-slate-100 select-none tabular-nums z-10'>
          {formatTime(minutes)}:
          <span className='text-cyan-400'>{formatTime(seconds)}</span>
        </div>
        <div className='absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-14px_24px'></div>
      </section>

      {/* Control Pipeline Operations Footers */}
      <div className='flex gap-3 pt-2'>
        <button
          type='button'
          onClick={toggleTimer}
          className={`flex-1 font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer text-center ${
            isActive
              ? 'bg-amber-600 hover:bg-amber-500 text-slate-950'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
          }`}
        >
          {isActive ? 'Pause Operation' : 'Initialize Focus'}
        </button>

        <button
          type='button'
          onClick={resetTimer}
          className='px-6 bg-slate-950 hover:bg-slate-900 border border-slate-900 text-slate-400 hover:text-slate-200 font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer text-center'
        >
          Reset
        </button>
      </div>
    </div>
  )
}
