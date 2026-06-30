'use client'

import { useState } from 'react'

interface TaskItem {
  id: string
  text: string
  completed: boolean
}

const DEFAULT_TASKS: TaskItem[] = []

export default function TaskTracker() {
  // 1. Safe Lazy Initializer function runs exactly once on the client mount loop
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    // Return early during Server-Side Rendering (SSR) to match the HTML structure
    if (typeof window === 'undefined') return DEFAULT_TASKS

    const cached = localStorage.getItem('devhq_tasks_pool')
    if (!cached) return DEFAULT_TASKS
    try {
      return JSON.parse(cached) as TaskItem[]
    } catch {
      return DEFAULT_TASKS
    }
  })

  const saveAndSyncTasks = (nextTasks: TaskItem[]) => {
    setTasks(nextTasks)
    localStorage.setItem('devhq_tasks_pool', JSON.stringify(nextTasks))
  }

  const handleAddTask = (formData: FormData) => {
    const text = formData.get('taskText') as string
    if (!text || !text.trim()) return

    const nextTasks = [
      ...tasks,
      {
        id: `task-${crypto.randomUUID()}`,
        text: text.trim(),
        completed: false,
      },
    ]
    saveAndSyncTasks(nextTasks)
  }

  const handleToggleTask = (idToToggle: string) => {
    const nextTasks = tasks.map(task =>
      task.id === idToToggle ? { ...task, completed: !task.completed } : task,
    )
    saveAndSyncTasks(nextTasks)
  }

  const handleDeleteTask = (idToKill: string) => {
    const nextTasks = tasks.filter(task => task.id !== idToKill)
    saveAndSyncTasks(nextTasks)
  }

  return (
    <div className='space-y-6'>
      <header className='mb-2'>
        <div className='flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest'>
          <span>System Matrix</span> {' // '} <span>Procurement</span>
        </div>
        <h1 className='text-2xl font-black tracking-tight text-slate-100 sm:text-3xl'>
          Task Tracker
        </h1>
      </header>

      <form
        action={handleAddTask}
        className='flex flex-col sm:flex-row gap-3 bg-slate-900 border border-slate-800/80 p-4 rounded-xl shadow-lg'
      >
        <input
          type='text'
          name='taskText'
          placeholder='Deploy next system node container...'
          className='bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-hidden focus:border-indigo-500 grow'
          required
        />
        <button
          type='submit'
          className='bg-indigo-600 hover:bg-indigo-500 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-lg transition-colors cursor-pointer shrink-0'
        >
          Add Task
        </button>
      </form>

      <div className='space-y-2'>
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`p-3 md:p-4 flex items-center justify-between gap-6 border border-slate-800/80 rounded-xl shadow-md transition-all duration-150 ${index % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'}`}
          >
            <div className='flex items-center gap-4 grow min-w-0'>
              <button
                type='button'
                onClick={() => handleToggleTask(task.id)}
                className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all cursor-pointer ${task.completed ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'border-slate-700 hover:border-slate-600 bg-slate-900'}`}
              >
                {task.completed && (
                  <span className='text-xs font-black'>✓</span>
                )}
              </button>
              <span
                onClick={() => handleToggleTask(task.id)}
                className={`text-sm font-medium tracking-wide truncate cursor-pointer select-none grow ${task.completed ? 'line-through text-slate-600' : 'text-slate-200'}`}
              >
                {task.text}
              </span>
            </div>
            <div className='flex items-center gap-3 shrink-0 min-h-8'>
              <span
                className={`hidden sm:inline text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${task.completed ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-500' : 'bg-amber-950/30 border-amber-900/50 text-amber-500'}`}
              >
                {task.completed ? 'Done' : 'Pending'}
              </span>
              {task.completed ? (
                <button
                  type='button'
                  onClick={() => handleDeleteTask(task.id)}
                  title='Remove task from log'
                  className='h-8 w-8 flex items-center justify-center bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-900/50 rounded-xl text-slate-500 hover:text-red-400 transition-all cursor-pointer text-xs font-mono'
                >
                  ✕
                </button>
              ) : (
                <div className='h-8 w-8' />
              )}
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className='p-12 text-center text-sm text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl'>
            Pipeline clear. No active sprint objectives monitored.
          </div>
        )}
      </div>
    </div>
  )
}
