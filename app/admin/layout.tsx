import type { Metadata } from 'next'
import Link from 'next/link'
import { Layers } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Panel – Beyond Borders',
}

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: null },
  { label: 'Enquiries', href: '/admin/enquiries', icon: null },
  { label: 'Assessments', href: '/admin/assessments', icon: null },
  { label: 'Blog', href: '/admin/blog', icon: null },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Admin Topbar */}
      <header className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
            <span className="text-blue-900 font-black text-sm">IP</span>
          </div>
          <span className="font-bold text-lg">Beyond Borders Admin</span>
        </div>
        <Link href="/" className="text-blue-200 hover:text-white text-sm transition-colors">← View Site</Link>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-white shadow-sm shrink-0">
          <nav className="py-6 px-3 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/content"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-800 font-medium text-sm transition-colors"
            >
              <Layers className="w-4 h-4 shrink-0" />
              Content Manager
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
