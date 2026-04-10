'use client'

import { useEffect, useState, useRef } from 'react'
import { Check, Loader2 } from 'lucide-react'

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
  remarks: string | null
  createdAt: string
}

const typeColors: Record<string, string> = {
  immigration: 'bg-blue-100 text-blue-700',
  student:     'bg-purple-100 text-purple-700',
  loan:        'bg-green-100 text-green-700',
}

const statusColors: Record<string, string> = {
  pending:     'bg-yellow-100 text-yellow-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  completed:   'bg-green-100 text-green-700',
  rejected:    'bg-red-100 text-red-600',
}

function RemarksCell({ id, initial, onSaved }: { id: number; initial: string | null; onSaved: () => void }) {
  const [value, setValue] = useState(initial ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const prevRef = useRef(initial ?? '')

  async function save() {
    if (value === prevRef.current) return
    setSaving(true)
    await fetch('/api/admin/assessments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, remarks: value }),
    })
    prevRef.current = value
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    onSaved()
  }

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={save}
        rows={2}
        placeholder="Add remarks…"
        className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300 min-w-[160px]"
      />
      {saving && <Loader2 className="absolute top-1 right-1 w-3 h-3 text-blue-400 animate-spin" />}
      {saved && <Check className="absolute top-1 right-1 w-3 h-3 text-green-500" />}
    </div>
  )
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
    setItems(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    await fetch('/api/admin/assessments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
  }

  useEffect(() => { load() }, [])

  const filtered = filter === 'all' ? items : items.filter(a => a.type === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
        <span className="text-xs text-gray-400">{items.length} total</span>
      </div>

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
          <div className="p-8 text-center text-gray-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
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
                  <th className="px-4 py-3 font-semibold">Remarks</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 align-top">
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeColors[a.type] ?? 'bg-gray-100 text-gray-600'}`}>{a.type}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{a.name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <div>{a.email}</div>
                      <div className="text-gray-400 text-xs">{a.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {a.destination && <div>📍 {a.destination}</div>}
                      {a.education && <div>🎓 {a.education}</div>}
                      {a.country && <div>🌍 {a.country}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={ev => updateStatus(a.id, ev.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer ${statusColors[a.status] ?? 'bg-gray-100 text-gray-600'}`}
                      >
                        <option value="pending">pending</option>
                        <option value="in-progress">in-progress</option>
                        <option value="completed">completed</option>
                        <option value="rejected">rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <RemarksCell id={a.id} initial={a.remarks} onSaved={load} />
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">{new Date(a.createdAt).toLocaleDateString()}</td>
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
