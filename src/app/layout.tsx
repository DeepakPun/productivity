import type { Metadata } from 'next'
import '@/app/globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { isAuthenticatedCheck } from './actions/auth'

export const metadata: Metadata = {
  title: 'DevHQ Internal Hub',
  description: 'Personal asset tracking and utility workspace.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuth = await isAuthenticatedCheck()
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className='h-full bg-slate-950 text-slate-50'
    >
      <body
        className='h-full flex flex-col antialiased selection:bg-indigo-500 selection:text-white'
        suppressHydrationWarning
      >
        <Navbar isAuthenticated={isAuth} />
        <div className='flex-1 pt-14 h-[calc(100vh-3.5rem)] overflow-hidden flex flex-col bg-slate-900'>
          <div className='flex-1 overflow-y-auto flex flex-col'>
            <main className='flex-1 p-6 md:p-12 max-w-4xl w-full mx-auto'>
              {children}
            </main>

            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
