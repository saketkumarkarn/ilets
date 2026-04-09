import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [enquiryCount, assessmentCount, blogCount, newEnquiries] = await Promise.all([
    prisma.enquiry.count(),
    prisma.assessment.count(),
    prisma.blogPost.count(),
    prisma.enquiry.count({ where: { status: 'new' } }),
  ])

  const recentEnquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const stats = [
    { label: 'Total Enquiries', value: enquiryCount, color: 'bg-blue-600', href: '/admin/enquiries' },
    { label: 'New / Unread', value: newEnquiries, color: 'bg-yellow-500', href: '/admin/enquiries' },
    { label: 'Assessments', value: assessmentCount, color: 'bg-green-600', href: '/admin/assessments' },
    { label: 'Blog Posts', value: blogCount, color: 'bg-purple-600', href: '/admin/blog' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500 mb-1">{s.label}</p>
            <p className={`text-3xl font-bold text-white ${s.color} rounded-lg px-3 py-1 inline-block mt-1`}>{s.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="text-blue-600 text-sm font-medium hover:underline">View All →</Link>
        </div>
        {recentEnquiries.length === 0 ? (
          <p className="text-gray-400 text-sm">No enquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Service</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentEnquiries.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{e.name}</td>
                    <td className="py-3 text-gray-600">{e.email}</td>
                    <td className="py-3 text-gray-600">{e.service}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${e.status === 'new' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{new Date(e.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
