import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminDashboard() {
  const [enquiryCount, assessmentCount, blogCount, newEnquiries, pendingAssessments] = await Promise.all([
    prisma.enquiry.count(),
    prisma.assessment.count(),
    prisma.blogPost.count(),
    prisma.enquiry.count({ where: { status: 'new' } }),
    prisma.assessment.count({ where: { status: 'pending' } }),
  ])

  const recentEnquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const recentAssessments = await prisma.assessment.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const stats = [
    { label: 'Total Enquiries',      value: enquiryCount,        color: 'bg-blue-600',   href: '/admin/enquiries' },
    { label: 'New / Unread',         value: newEnquiries,        color: 'bg-yellow-500', href: '/admin/enquiries' },
    { label: 'Total Assessments',    value: assessmentCount,     color: 'bg-green-600',  href: '/admin/assessments' },
    { label: 'Pending Assessments',  value: pendingAssessments,  color: 'bg-red-500',    href: '/admin/assessments' },
    { label: 'Blog Posts',           value: blogCount,           color: 'bg-purple-600', href: '/admin/blog' },
  ]

  const statusColors: Record<string, string> = {
    new: 'bg-yellow-100 text-yellow-700',
    contacted: 'bg-blue-100 text-blue-700',
    converted: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-600',
    pending: 'bg-yellow-100 text-yellow-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-600',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <span className="text-xs text-gray-400">Live data · refreshes on every visit</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl shadow p-5 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-500 mb-2 font-medium">{s.label}</p>
            <p className={`text-3xl font-black text-white ${s.color} rounded-lg px-3 py-1 inline-block`}>{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-blue-600 text-sm font-medium hover:underline">View All →</Link>
          </div>
          {recentEnquiries.length === 0 ? (
            <p className="text-gray-400 text-sm">No enquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map(e => (
                <div key={e.id} className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{e.name}</p>
                    <p className="text-xs text-gray-400 truncate">{e.email} · {e.service}</p>
                    {(e as {remarks?: string | null}).remarks && (
                      <p className="text-xs text-blue-600 truncate mt-0.5 italic">"{(e as {remarks?: string | null}).remarks}"</p>
                    )}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusColors[e.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Assessments */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900">Recent Assessments</h2>
            <Link href="/admin/assessments" className="text-blue-600 text-sm font-medium hover:underline">View All →</Link>
          </div>
          {recentAssessments.length === 0 ? (
            <p className="text-gray-400 text-sm">No assessments yet.</p>
          ) : (
            <div className="space-y-3">
              {recentAssessments.map(a => (
                <div key={a.id} className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{a.name}</p>
                    <p className="text-xs text-gray-400 truncate">{a.email} · {a.type}</p>
                    {(a as {remarks?: string | null}).remarks && (
                      <p className="text-xs text-blue-600 truncate mt-0.5 italic">"{(a as {remarks?: string | null}).remarks}"</p>
                    )}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusColors[a.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
