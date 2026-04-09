'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useState } from 'react'

export default function AdminLogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-1.5 text-blue-200 hover:text-white text-sm transition-colors disabled:opacity-60"
    >
      <LogOut className="w-4 h-4" />
      {loading ? 'Signing out…' : 'Sign Out'}
    </button>
  )
}
