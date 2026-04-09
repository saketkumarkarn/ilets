'use client'

import { useEffect, useState } from 'react'

type Enquiry = {
  id: number
  name: string
  email: string
  phone: string
  service: string
  message: string | null
  status: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-700',
  converted: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-600',
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  async function loadEnquiries() {
    const res = await fetch('/api/admin/enquiries')
    const data = await res.json()
    setEnquiries(data.enquiries ?? [])
    setLoading(false)
  }

  async function updateStatus(id: number, status: string) {
    await fetch('/api/admin/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    loadEnquiries()
  }

  useEffect(() => { loadEnquiries() }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Enquiries</h1>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading…</div>
        ) : enquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No enquiries yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-500">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email / Phone</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{e.name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <div>{e.email}</div>
                      <div className="text-gray-400">{e.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{e.service}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{e.message ?? '—'}</td>
                    <td className="px-4 py-3">
                      <select
                        value={e.status}
                        onChange={ev => updateStatus(e.id, ev.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[e.status] ?? 'bg-gray-100 text-gray-600'}`}
                      >
                        <option value="new">new</option>
                        <option value="contacted">contacted</option>
                        <option value="converted">converted</option>
                        <option value="closed">closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(e.createdAt).toLocaleDateString()}</td>
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
