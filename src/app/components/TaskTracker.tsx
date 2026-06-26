'use client'

import { useState } from 'react'

interface TaskItem {
  id: string
  text: string
  completed: boolean
}

const DEFAULT_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    text: 'Implement Terraform modules for cloud infrastructure',
    completed: false,
  },
  {
    id: 'task-2',
    text: 'Configure VS Code local settings configuration file',
    completed: true,
  },
  {
    id: 'task-3',
    text: 'Audit browser local storage hydration boundaries',
    completed: false,
  },
]

export default function TaskTracker() {
  // Lazy state initialization runs exactly once on browser load
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('devhq_tasks_pool')
      if (cached) {
        try {
          return JSON.parse(cached)
        } catch {
          return DEFAULT_TASKS
        }
      }
    }
    return DEFAULT_TASKS
  })

  // State update wrapper that syncs straight to storage sequentially
  const saveAndSyncTasks = (nextTasks: TaskItem[]) => {
    setTasks(nextTasks)
    localStorage.setItem('devhq_tasks_pool', JSON.stringify(nextTasks))
  }

  // React 19 Form Action registers new line elements directly into memory
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

  // Flips completion boolean parameters dynamically
  const handleToggleTask = (idToToggle: string) => {
    const nextTasks = tasks.map(task =>
      task.id === idToToggle ? { ...task, completed: !task.completed } : task,
    )
    saveAndSyncTasks(nextTasks)
  }

  // Splices targeted list elements out of the tracking loop
  const handleDeleteTask = (idToKill: string) => {
    const nextTasks = tasks.filter(task => task.id !== idToKill)
    saveAndSyncTasks(nextTasks)
  }

  return (
    <div className='space-y-6' suppressHydrationWarning={true}>
      {/* Inline Task Registration Form */}
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

      {/* Row-by-Row Simple Pipeline List */}
      <div className='space-y-2'>
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`p-3 md:p-4 flex items-center justify-between gap-6 border border-slate-800/80 rounded-xl shadow-md transition-all duration-150 ${
              index % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'
            }`}
          >
            {/* Interactive Left Side: Toggle Trigger and Descriptor */}
            <div className='flex items-center gap-4 grow min-w-0'>
              <button
                type='button'
                onClick={() => handleToggleTask(task.id)}
                className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                  task.completed
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400'
                    : 'border-slate-700 hover:border-slate-600 bg-slate-900'
                }`}
              >
                {task.completed && (
                  <span className='text-xs font-black'>✓</span>
                )}
              </button>

              <span
                onClick={() => handleToggleTask(task.id)}
                className={`text-sm font-medium tracking-wide truncate cursor-pointer select-none grow ${
                  task.completed
                    ? 'line-through text-slate-600'
                    : 'text-slate-200'
                }`}
              >
                {task.text}
              </span>
            </div>

            {/* Right Side Controls: Status indicator badge & dismiss trigger */}
            <div className='flex items-center gap-3 shrink-0'>
              <span
                className={`hidden sm:inline text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                  task.completed
                    ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-500'
                    : 'bg-amber-950/30 border-amber-900/50 text-amber-500'
                }`}
              >
                {task.completed ? 'Done' : 'Pending'}
              </span>

              <button
                type='button'
                onClick={() => handleDeleteTask(task.id)}
                title='Remove task from log'
                className='h-8 w-8 flex items-center justify-center bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-900/50 rounded-xl text-slate-500 hover:text-red-400 transition-all cursor-pointer text-xs font-mono'
              >
                ✕
              </button>
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
