'use client'

import { useState } from 'react'

interface ShoppingItem {
  id: string
  name: string
  quantity: number
}

const DEFAULT_ITEMS: ShoppingItem[] = []

export default function ShoppingList() {
  // Pure lazy state initialization. No useEffect, no state-set-in-effects.
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('devhq_shopping_pool')
      if (cached) {
        try {
          return JSON.parse(cached)
        } catch {
          return DEFAULT_ITEMS
        }
      }
    }
    return DEFAULT_ITEMS
  })

  // Action pipeline modifications commit directly to memory
  const handleAddItem = (formData: FormData) => {
    const name = formData.get('itemName') as string
    const quantityStr = formData.get('itemQty') as string
    if (!name || !name.trim()) return

    const quantity = parseInt(quantityStr) || 1
    const nextItems = [
      ...items,
      {
        id: `shop-${crypto.randomUUID()}`,
        name: name.trim(),
        quantity: Math.max(1, quantity),
      },
    ]

    setItems(nextItems)
    localStorage.setItem('devhq_shopping_pool', JSON.stringify(nextItems))
  }

  const handleDeleteItem = (idToKill: string) => {
    const nextItems = items.filter(item => item.id !== idToKill)
    setItems(nextItems)
    localStorage.setItem('devhq_shopping_pool', JSON.stringify(nextItems))
  }

  return (
    <div className='space-y-6' suppressHydrationWarning={true}>
      <form
        action={handleAddItem}
        className='flex flex-col sm:flex-row gap-3 bg-slate-900 border border-slate-800/80 p-4 rounded-xl shadow-lg'
      >
        <input
          type='text'
          name='itemName'
          placeholder='Item name (e.g., Coffee)...'
          className='bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-hidden focus:border-indigo-500 grow'
          required
        />
        <div className='flex gap-2 sm:w-auto w-full'>
          <div className='flex items-center bg-slate-950 border border-slate-800 rounded-lg px-2 shrink-0'>
            <span className='text-[10px] font-mono text-slate-500 uppercase mr-1.5 select-none'>
              Qty:
            </span>
            <input
              type='number'
              name='itemQty'
              min='1'
              defaultValue='1'
              className='bg-transparent text-sm font-mono font-bold text-indigo-400 w-12 text-center focus:outline-hidden'
            />
          </div>
          <button
            type='submit'
            className='bg-indigo-600 hover:bg-indigo-500 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-lg transition-colors cursor-pointer w-full sm:w-auto'
          >
            Add
          </button>
        </div>
      </form>

      <div className='space-y-2'>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`p-2 md:p-4 flex items-center justify-between gap-6 border border-slate-800/80 rounded-xl shadow-md transition-all duration-150 ${
              index % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'
            }`}
          >
            <div className='flex items-center gap-4 grow min-w-0'>
              <span className='h-3 w-3 rounded-full bg-indigo-400 shadow-md shadow-indigo-500/30 shrink-0'></span>
              <span className='text-base font-semibold text-slate-200 tracking-wide truncate'>
                {item.name}
              </span>
            </div>

            <div className='flex items-center gap-3 shrink-0'>
              <div className='flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl'>
                <span className='text-[10px] font-mono tracking-wider text-slate-500 font-bold uppercase'>
                  Qty:
                </span>
                <span className='text-base font-mono font-black text-indigo-400'>
                  {item.quantity}
                </span>
              </div>

              <button
                type='button'
                onClick={() => handleDeleteItem(item.id)}
                title='Remove from inventory'
                className='h-9 w-9 flex items-center justify-center bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-900/50 rounded-xl text-slate-500 hover:text-red-400 transition-all cursor-pointer text-xs font-mono'
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className='p-12 text-center text-sm text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl'>
            Provisions clear. No assets pending purchase.
          </div>
        )}
      </div>
    </div>
  )
}
