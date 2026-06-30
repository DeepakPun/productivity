import React from 'react'
import { isAuthenticatedCheck } from '../actions/auth'
import { redirect } from 'next/navigation'
// import IdleTimeoutProvider from '../components/IdleTimeoutProvider'

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuth = await isAuthenticatedCheck()

  if (!isAuth) redirect('/')

  return (
    // <IdleTimeoutProvider isAuthenticated={isAuth}>
    <>{children}</>
    // </IdleTimeoutProvider>
  )
}
