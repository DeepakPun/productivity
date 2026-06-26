import ShoppingList from '../components/ShoppingList'

export default function ShoppingPage() {
  return (
    <main className='text-slate-100 pt-5 px-6 md:px-12 max-w-4xl mx-auto pb-5'>
      {/* Scope Header */}
      <header className='mb-2'>
        <div className='flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest'>
          <span>System Matrix</span>
          {' // '}
          <span>Procurement</span>
        </div>
        <h1 className='text-2xl font-black tracking-tight text-slate-100 sm:text-3xl'>
          Shopping Inventory
        </h1>
      </header>

      <ShoppingList />
    </main>
  )
}
