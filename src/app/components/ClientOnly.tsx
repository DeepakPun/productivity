'use client'

import { use, cache } from 'react'

const clientPromise = cache(() => Promise.resolve(true))

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode
}) {
  use(clientPromise())
  return <>{children}</>
}
