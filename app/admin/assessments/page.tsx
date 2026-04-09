'use client'

import { useEffect, useState } from 'react'

type Assessment = {
  id: number
  type: string
  name: string
  email: string
  phone: string
  country: string | null
  education: string | null
  destination: string | null
  status: string
  createdAt: string
}

const typeColors: Record<string, string> = {
  immigration: 'bg-blue-100 text-blue-700',
  student: 'bg-purple-100 text-purple-700',
  loan: 'bg-green-100 text-green-700',
}

export default function AssessmentsPage() {
  const [items, setItems] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  async function load() {
    const res = await fetch('/api/admin/assessments')
    const data = await res.json()
    setItems(data.assessments ?? [])
    setLoading(false)
  }

  async function updateStatus(id: number, status: string) {
    await fetch('/api/admin/assessments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    load()
  }

  useEffect(() => { load() }, [])

  const filtered = filter === 'all' ? items : items.filter(a => a.type === filter)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Assessments</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'immigration', 'student', 'loan'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${filter === f ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No assessments yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-500">
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Details</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeColors[a.type] ?? 'bg-gray-100 text-gray-600'}`}>{a.type}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <div>{a.email}</div>
                      <div className="text-gray-400">{a.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {a.destination && <div>Dest: {a.destination}</div>}
                      {a.education && <div>Edu: {a.education}</div>}
                      {a.country && <div>Country: {a.country}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={ev => updateStatus(a.id, ev.target.value)}
                        className="text-xs font-semibold px-2 py-1 rounded border border-gray-200 cursor-pointer"
                      >
                        <option value="pending">pending</option>
                        <option value="in-progress">in-progress</option>
                        <option value="completed">completed</option>
                        <option value="rejected">rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(a.createdAt).toLocaleDateString()}</td>
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
