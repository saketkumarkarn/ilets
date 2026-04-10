import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? 'admin@beyondborders.in'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'Admin@1234'
const AUTH_SECRET    = process.env.AUTH_SECRET    ?? 'bb-secret-change-in-production'

export function buildToken(email: string) {
  return createHmac('sha256', AUTH_SECRET).update(email).digest('hex')
}

// POST /api/admin/auth  →  login
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 },
      )
    }

    const token = buildToken(email)
    const res = NextResponse.json({ success: true })
    res.cookies.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 })
  }
}

// DELETE /api/admin/auth  →  logout
export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.set('admin-session', '', { maxAge: 0, path: '/' })
  return res
}
