'use client'

import { useEffect, useState, useRef } from 'react'
import { Check, Loader2 } from 'lucide-react'

type Enquiry = {
  id: number
  name: string
  email: string
  phone: string
  service: string
  message: string | null
  status: string
  remarks: string | null
  createdAt: string
}

const statusColors: Record<string, string> = {
  new:       'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-700',
  converted: 'bg-green-100 text-green-700',
  closed:    'bg-gray-100 text-gray-600',
}

function RemarksCell({ id, initial, onSaved }: { id: number; initial: string | null; onSaved: () => void }) {
  const [value, setValue] = useState(initial ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const prevRef = useRef(initial ?? '')

  async function save() {
    if (value === prevRef.current) return
    setSaving(true)
    await fetch('/api/admin/enquiries', {
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

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const res = await fetch('/api/admin/enquiries')
    const data = await res.json()
    setEnquiries(data.enquiries ?? [])
    setLoading(false)
  }

  async function updateStatus(id: number, status: string) {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e))
    await fetch('/api/admin/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
        <span className="text-xs text-gray-400">{enquiries.length} total</span>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
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
                  <th className="px-4 py-3 font-semibold">Remarks</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50 align-top">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{e.name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <div>{e.email}</div>
                      <div className="text-gray-400 text-xs">{e.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{e.service}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[160px]">
                      <p className="text-xs line-clamp-2">{e.message ?? '—'}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select
                        value={e.status}
                        onChange={ev => updateStatus(e.id, ev.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer ${statusColors[e.status] ?? 'bg-gray-100 text-gray-600'}`}
                      >
                        <option value="new">new</option>
                        <option value="contacted">contacted</option>
                        <option value="converted">converted</option>
                        <option value="closed">closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <RemarksCell id={e.id} initial={e.remarks} onSaved={load} />
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">{new Date(e.createdAt).toLocaleDateString()}</td>
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
