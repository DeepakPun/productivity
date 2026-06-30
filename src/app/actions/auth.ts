'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export interface FormState {
  error: string | null
}

export async function loginAction(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const username = formData.get('username')
  const password = formData.get('password')
  const adminCode = formData.get('adminCode')

  if (
    username !== process.env.INTERNAL_USERNAME ||
    password !== process.env.INTERNAL_PASSWORD ||
    adminCode !== process.env.INTERNAL_ADMIN_CODE
  ) {
    return { error: 'Access Denied: Invalid Credentials' }
  }

  const cookieStore = await cookies()
  cookieStore.set('internal_session', 'authenticated_admin', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    // maxAge: 180,
    maxAge: 60 * 60 * 2,
    path: '/',
  })

  redirect('/')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('internal_session')
  redirect('/')
}

export async function isAuthenticatedCheck(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('internal_session')
  return session?.value === 'authenticated_admin'
}
