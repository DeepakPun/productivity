'use client'

import { useState, useEffect } from 'react'

interface DevNote {
  id: string
  title: string
  text: string
}

const DEFAULT_NOTES: DevNote[] = []

export default function NotesWorkspace() {
  const [notes, setNotes] = useState<DevNote[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // 1. Mark the component as mounted after client-side hydration completes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  // 2. Safely parse data from localStorage exactly once when mounting concludes
  useEffect(() => {
    if (!isMounted) return

    const cached = localStorage.getItem('devhq_notes_pool')
    if (cached) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNotes(JSON.parse(cached))
      } catch {
        setNotes(DEFAULT_NOTES)
      }
    } else {
      setNotes(DEFAULT_NOTES)
    }
  }, [isMounted])

  const handleAddNote = (formData: FormData) => {
    const title = formData.get('noteTitle') as string
    const text = formData.get('noteText') as string
    if (!title?.trim() || !text?.trim()) return

    const nextNotes = [
      ...notes,
      {
        id: `note-${crypto.randomUUID()}`,
        title: title.trim(),
        text: text.trim(),
      },
    ]
    setNotes(nextNotes)
    localStorage.setItem('devhq_notes_pool', JSON.stringify(nextNotes))
  }

  const handleDeleteNote = (idToKill: string) => {
    const nextNotes = notes.filter(note => note.id !== idToKill)
    setNotes(nextNotes)
    localStorage.setItem('devhq_notes_pool', JSON.stringify(nextNotes))
  }

  // 3. Render a clean structural loader placeholder until the browser finishes mounting
  if (!isMounted) {
    return (
      <div className='p-12 text-center text-xs font-mono text-slate-500 border border-slate-900 rounded-xl animate-pulse'>
        {'//'} INITIALIZING_NOTES_WORKSPACE_PIPELINE...
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Inline Registration Form */}
      <form
        action={handleAddNote}
        className='bg-slate-900 border border-slate-800/80 p-4 rounded-xl shadow-lg flex flex-col gap-3'
      >
        <div className='flex flex-col sm:flex-row gap-3 w-full'>
          <input
            type='text'
            name='noteTitle'
            placeholder='Title (e.g., Implement Terraform)...'
            className='sm:w-1/3 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-hidden focus:border-cyan-500'
            required
          />
          <input
            type='text'
            name='noteText'
            placeholder='Text contents...'
            className='grow bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-hidden focus:border-cyan-500'
            required
          />
          <button
            type='submit'
            className='bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-lg transition-colors cursor-pointer shrink-0'
          >
            Save
          </button>
        </div>
      </form>

      {/* Row-by-Row Simple List Stack */}
      <div className='space-y-2'>
        {notes.map((note, index) => (
          <div
            key={note.id}
            className={`p-4 border border-slate-800/80 rounded-xl shadow-md flex items-start justify-between gap-6 transition-all ${
              index % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'
            }`}
          >
            {/* Structured Text Alignment */}
            <div className='min-w-0 grow'>
              <div className='text-xs font-mono text-cyan-400 select-none uppercase tracking-wide mb-1'>
                Title: {note.title}
              </div>
              <p className='text-sm text-slate-300 font-sans leading-relaxed wrap-break-word'>
                <span className='font-mono text-xs text-slate-500 mr-1'>
                  Text:
                </span>{' '}
                {note.text}
              </p>
            </div>

            {/* List Row Delete Control */}
            <button
              type='button'
              onClick={() => handleDeleteNote(note.id)}
              title='Remove log entry'
              className='h-8 w-8 flex items-center justify-center bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-900/50 rounded-xl text-slate-500 hover:text-red-400 transition-all cursor-pointer text-xs font-mono shrink-0'
            >
              ✕
            </button>
          </div>
        ))}

        {notes.length === 0 && (
          <div className='p-12 text-center text-sm text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl'>
            No notes tracked in the active pool.
          </div>
        )}
      </div>
    </div>
  )
}
