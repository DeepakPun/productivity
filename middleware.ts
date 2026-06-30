import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('internal_session')
  const isUserAuthenticated = sessionCookie?.value === 'authenticated_admin'

  // 1. Bypass asset bundles and dynamic media assets immediately
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // 2. Protect any explicit internal routing nodes if you add them later
  // (e.g., if you click a menu item that goes to a real sub-route)
  if (pathname !== '/' && !isUserAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
