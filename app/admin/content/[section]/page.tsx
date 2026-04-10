'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react'
import { DEFAULT_CONTENT } from '@/lib/content'

// ---- types ----
type HeroContent = typeof DEFAULT_CONTENT.hero
type StatsContent = typeof DEFAULT_CONTENT.stats
type AboutContent = typeof DEFAULT_CONTENT.about
type ContactContent = typeof DEFAULT_CONTENT.contact
type FaqItem = { q: string; a: string }
type TeamMember = { name: string; role: string; initials: string; bio: string; color: string }
type SiteInfoContent = typeof DEFAULT_CONTENT.siteInfo

const TEAM_COLORS = [
  'bg-blue-600',
  'bg-orange-500',
  'bg-emerald-600',
  'bg-purple-600',
  'bg-red-600',
]

const SECTION_META: Record<string, { label: string; description: string }> = {
  hero: { label: 'Hero Section', description: 'Homepage banner content' },
  stats: { label: 'Stats & Numbers', description: 'Key metrics shown on homepage' },
  about: { label: 'About Us Story', description: 'Company story paragraphs' },
  contact: { label: 'Contact Info', description: 'Phone, email, address details' },
  faq: { label: 'FAQ', description: 'Frequently asked questions' },
  team: { label: 'Team Members', description: 'Team profiles' },
  siteInfo: { label: 'Site Info', description: 'Company name, tagline and footer text' },
  'country-canada': { label: 'Canada', description: 'Canada PR requirements, study requirements, universities, cities, costs' },
  'country-australia': { label: 'Australia', description: 'Australia PR requirements, study requirements, universities, cities, costs' },
  'country-uk': { label: 'United Kingdom', description: 'UK Skilled Worker, study requirements, universities, cities, costs' },
  'country-new-zealand': { label: 'New Zealand', description: 'NZ PR requirements, study requirements, universities, cities, costs' },
  'country-usa': { label: 'USA', description: 'USA immigration, study requirements, universities, cities, costs' },
  'country-europe': { label: 'Europe', description: 'EU Blue Card, study requirements, universities, cities, costs' },
  'service-immigration': { label: 'Immigration Services', description: 'Visa cards, eligibility points, processing times' },
  'service-study-abroad': { label: 'Study Abroad', description: 'Process steps, countries, requirements' },
  'service-loans': { label: 'Loan Assistance', description: 'Loan types, amounts, eligibility' },
}

// ---- shared input styles ----
const inputCls =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
const textareaCls =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none'
const labelCls = 'block text-sm font-semibold text-gray-700 mb-1'

// ---- Toast ----
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2">
      <span>✓</span>
      {message}
    </div>
  )
}

// ---- Skeleton ----
function Skeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-1">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-9 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  )
}

// ==================== HERO FORM ====================
function HeroForm({
  initial,
  onSave,
}: {
  initial: HeroContent
  onSave: (d: HeroContent) => Promise<void>
}) {
  const [data, setData] = useState<HeroContent>(initial)
  const [saving, setSaving] = useState(false)

  function set(key: keyof HeroContent, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }
  function setTrust(idx: number, value: string) {
    const arr = [...data.trustItems]
    arr[idx] = value
    setData((prev) => ({ ...prev, trustItems: arr }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const destinations = (data.destinations as unknown as string)
      .toString()
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    await onSave({ ...data, destinations })
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelCls}>Badge Text</label>
        <input className={inputCls} value={data.badge} onChange={(e) => set('badge', e.target.value)} />
      </div>
      <div>
        <label className={labelCls}>Headline</label>
        <input className={inputCls} value={data.headline} onChange={(e) => set('headline', e.target.value)} />
      </div>
      <div>
        <label className={labelCls}>Subtext</label>
        <input className={inputCls} value={data.subtext} onChange={(e) => set('subtext', e.target.value)} />
      </div>
      <div>
        <label className={labelCls}>Destinations (one per line)</label>
        <textarea
          className={textareaCls}
          rows={4}
          value={Array.isArray(data.destinations) ? data.destinations.join('\n') : data.destinations}
          onChange={(e) => setData((prev) => ({ ...prev, destinations: e.target.value as unknown as string[] }))}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>CTA Button 1</label>
          <input className={inputCls} value={data.cta1} onChange={(e) => set('cta1', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>CTA Button 2</label>
          <input className={inputCls} value={data.cta2} onChange={(e) => set('cta2', e.target.value)} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Trust Items (3 items)</label>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              className={inputCls}
              placeholder={`Item ${i + 1}`}
              value={data.trustItems[i] ?? ''}
              onChange={(e) => setTrust(i, e.target.value)}
            />
          ))}
        </div>
      </div>
      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== STATS FORM ====================
function StatsForm({
  initial,
  onSave,
}: {
  initial: StatsContent
  onSave: (d: StatsContent) => Promise<void>
}) {
  const [data, setData] = useState<StatsContent>(initial)
  const [saving, setSaving] = useState(false)

  function setItem(idx: number, key: 'value' | 'label', val: string) {
    const arr = [...data]
    arr[idx] = { ...arr[idx], [key]: val }
    setData(arr)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(data)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {data.map((item, i) => (
        <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs font-bold text-gray-400 uppercase mb-3">Stat {i + 1}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Value</label>
              <input
                className={inputCls}
                value={item.value}
                onChange={(e) => setItem(i, 'value', e.target.value)}
                placeholder="e.g. 5000+"
              />
            </div>
            <div>
              <label className={labelCls}>Label</label>
              <input
                className={inputCls}
                value={item.label}
                onChange={(e) => setItem(i, 'label', e.target.value)}
                placeholder="e.g. Visas Approved"
              />
            </div>
          </div>
        </div>
      ))}
      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== ABOUT FORM ====================
function AboutForm({
  initial,
  onSave,
}: {
  initial: AboutContent
  onSave: (d: AboutContent) => Promise<void>
}) {
  const [data, setData] = useState<AboutContent>(initial)
  const [saving, setSaving] = useState(false)

  function set(key: keyof AboutContent, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(data)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {(['story', 'story2', 'story3'] as const).map((key, i) => (
        <div key={key}>
          <label className={labelCls}>Paragraph {i + 1}</label>
          <textarea
            className={textareaCls}
            rows={4}
            value={data[key]}
            onChange={(e) => set(key, e.target.value)}
          />
        </div>
      ))}
      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== CONTACT FORM ====================
function ContactForm({
  initial,
  onSave,
}: {
  initial: ContactContent
  onSave: (d: ContactContent) => Promise<void>
}) {
  const [data, setData] = useState<ContactContent>(initial)
  const [saving, setSaving] = useState(false)

  function set(key: keyof ContactContent, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(data)
    setSaving(false)
  }

  const fields: { key: keyof ContactContent; label: string; placeholder: string }[] = [
    { key: 'phone', label: 'Phone Number', placeholder: '+91-9876543210' },
    { key: 'email', label: 'Email Address', placeholder: 'info@beyondborders.in' },
    { key: 'address', label: 'Office Address', placeholder: '123, Connaught Place...' },
    { key: 'whatsapp', label: 'WhatsApp Number (digits only)', placeholder: '919876543210' },
    { key: 'hours', label: 'Business Hours', placeholder: 'Mon–Sat: 9:00 AM – 7:00 PM IST' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className={labelCls}>{label}</label>
          <input
            className={inputCls}
            value={data[key]}
            placeholder={placeholder}
            onChange={(e) => set(key, e.target.value)}
          />
        </div>
      ))}
      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== FAQ FORM ====================
function FaqForm({
  initial,
  onSave,
}: {
  initial: FaqItem[]
  onSave: (d: FaqItem[]) => Promise<void>
}) {
  const [items, setItems] = useState<FaqItem[]>(initial)
  const [saving, setSaving] = useState(false)

  function setItem(idx: number, key: 'q' | 'a', val: string) {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, [key]: val } : it)))
  }

  function addItem() {
    if (items.length >= 20) return
    setItems((prev) => [...prev, { q: '', a: '' }])
  }

  function removeItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(items)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase">Question {i + 1}</span>
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="text-red-400 hover:text-red-600 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Question</label>
              <input
                className={inputCls}
                value={item.q}
                onChange={(e) => setItem(i, 'q', e.target.value)}
                placeholder="Enter question"
              />
            </div>
            <div>
              <label className={labelCls}>Answer</label>
              <textarea
                className={textareaCls}
                rows={3}
                value={item.a}
                onChange={(e) => setItem(i, 'a', e.target.value)}
                placeholder="Enter answer"
              />
            </div>
          </div>
        </div>
      ))}
      {items.length < 20 && (
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 text-sm font-medium transition-colors w-full justify-center"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      )}
      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== TEAM FORM ====================
function TeamForm({
  initial,
  onSave,
}: {
  initial: TeamMember[]
  onSave: (d: TeamMember[]) => Promise<void>
}) {
  const [members, setMembers] = useState<TeamMember[]>(initial)
  const [saving, setSaving] = useState(false)

  function setMember(idx: number, key: keyof TeamMember, val: string) {
    setMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, [key]: val } : m)))
  }

  function addMember() {
    setMembers((prev) => [
      ...prev,
      { name: '', role: '', initials: '', bio: '', color: 'bg-blue-600' },
    ])
  }

  function removeMember(idx: number) {
    setMembers((prev) => prev.filter((_, i) => i !== idx))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(members)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {members.map((m, i) => (
        <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase">Member {i + 1}</span>
            <button
              type="button"
              onClick={() => removeMember(i)}
              className="text-red-400 hover:text-red-600 transition-colors"
              aria-label="Remove member"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Name</label>
              <input
                className={inputCls}
                value={m.name}
                onChange={(e) => setMember(i, 'name', e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div>
              <label className={labelCls}>Role / Title</label>
              <input
                className={inputCls}
                value={m.role}
                onChange={(e) => setMember(i, 'role', e.target.value)}
                placeholder="e.g. CEO & Senior Advisor"
              />
            </div>
            <div>
              <label className={labelCls}>Initials (2 chars)</label>
              <input
                className={inputCls}
                value={m.initials}
                maxLength={2}
                onChange={(e) => setMember(i, 'initials', e.target.value.toUpperCase())}
                placeholder="RS"
              />
            </div>
            <div>
              <label className={labelCls}>Avatar Color</label>
              <select
                className={inputCls}
                value={m.color}
                onChange={(e) => setMember(i, 'color', e.target.value)}
              >
                {TEAM_COLORS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Bio</label>
              <input
                className={inputCls}
                value={m.bio}
                onChange={(e) => setMember(i, 'bio', e.target.value)}
                placeholder="Short bio"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addMember}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 text-sm font-medium transition-colors w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Member
      </button>
      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== SITE INFO FORM ====================
function SiteInfoForm({
  initial,
  onSave,
}: {
  initial: SiteInfoContent
  onSave: (d: SiteInfoContent) => Promise<void>
}) {
  const [data, setData] = useState<SiteInfoContent>(initial)
  const [saving, setSaving] = useState(false)

  function set(key: keyof SiteInfoContent, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(data)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelCls}>Company Name</label>
        <input
          className={inputCls}
          value={data.companyName}
          onChange={(e) => set('companyName', e.target.value)}
          placeholder="Beyond Borders"
        />
      </div>
      <div>
        <label className={labelCls}>Tagline</label>
        <input
          className={inputCls}
          value={data.tagline}
          onChange={(e) => set('tagline', e.target.value)}
          placeholder="Your Gateway to a New Life Abroad"
        />
      </div>
      <div>
        <label className={labelCls}>Logo Text (2 characters)</label>
        <input
          className={inputCls}
          value={data.logo}
          maxLength={2}
          onChange={(e) => set('logo', e.target.value.toUpperCase())}
          placeholder="BB"
        />
      </div>
      <div>
        <label className={labelCls}>Footer Tagline</label>
        <input
          className={inputCls}
          value={data.footerTagline}
          onChange={(e) => set('footerTagline', e.target.value)}
          placeholder="Your trusted partner for immigration..."
        />
      </div>
      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== COUNTRY FORM ====================

interface CountryContent {
  name: string
  flag: string
  heroHeadline: string
  description: string
  prRequirements: string[]
  studyRequirements: string[]
  popularCities: string[]
  topUniversities: string[]
  averageCost: { tuition: string; living: string; total: string }
  processingTime: { pr: string; studentVisa: string }
  keyFacts: { label: string; value: string }[]
}

const COUNTRY_DEFAULTS: Record<string, CountryContent> = {
  'country-canada': {
    name: 'Canada',
    flag: '🇨🇦',
    heroHeadline: 'Live, Work & Study in Canada',
    description:
      'Canada is consistently ranked among the top immigration destinations in the world, offering clear PR pathways, world-class universities, and an exceptional quality of life. With the Express Entry system, Provincial Nominee Programs (PNP), and the Atlantic Immigration Program, there is a pathway for almost every skilled worker and student.',
    prRequirements: [
      'Minimum CLB 7 (IELTS 6.0 in each band) for Federal Skilled Worker',
      'Educational Credential Assessment (ECA) from a designated body',
      'At least 1 year of skilled work experience (NOC TEER 0, 1, 2, or 3)',
      'Proof of settlement funds (varies by family size)',
      'Medical exam and police clearance certificate',
      'Valid job offer (optional but boosts CRS score by 50–200 points)',
    ],
    studyRequirements: [
      'Offer letter from a Designated Learning Institution (DLI)',
      'IELTS / TOEFL / PTE — minimum scores vary by university',
      'GIC (Guaranteed Investment Certificate) of CAD 10,000',
      'Proof of sufficient funds for first year + travel',
      'Valid passport and biometrics',
      'Statement of Purpose (SOP) and academic transcripts',
    ],
    popularCities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'],
    topUniversities: [
      'University of Toronto',
      'University of British Columbia (UBC)',
      'McGill University',
      'University of Waterloo',
      'University of Alberta',
      'McMaster University',
    ],
    averageCost: { tuition: '₹12 – ₹25 L per year', living: '₹7 – ₹12 L per year', total: '₹19 – ₹37 L per year' },
    processingTime: { pr: '6 – 12 months (Express Entry)', studentVisa: '4 – 8 weeks' },
    keyFacts: [
      { label: 'PR Pathway', value: 'Express Entry, PNP, Atlantic IP' },
      { label: 'Post-Study Work', value: 'PGWP — up to 3 years' },
      { label: 'Intakes', value: 'January & September (May optional)' },
      { label: 'Currency', value: 'Canadian Dollar (CAD)' },
      { label: 'Language', value: 'English & French' },
      { label: 'Lifestyle', value: 'Multicultural, safe, high-quality' },
    ],
  },
  'country-australia': {
    name: 'Australia',
    flag: '🇦🇺',
    heroHeadline: 'Build Your Future in Australia',
    description:
      'Australia offers a points-based immigration system (SkillSelect) with clear routes to permanent residency, alongside a world-class education system. The Temporary Graduate Visa (subclass 485) allows international graduates to live and work in Australia for 2–4 years after studies, making it a top destination for Indian students.',
    prRequirements: [
      'Skills assessment from the relevant assessing authority',
      'Minimum 65 points on the SkillSelect points test',
      'IELTS 6.0 / PTE 50 or above (competent English)',
      'Age below 45 years at time of invitation',
      'Occupation on the relevant skilled occupation list (CSOL/MLTSSL)',
      'Health and character requirements',
    ],
    studyRequirements: [
      'Offer letter from a CRICOS-registered institution',
      'IELTS 6.0 / TOEFL 60 / PTE 50 (minimum — varies by institution)',
      'Proof of financial capacity — AUD 21,041 per year',
      'Overseas Student Health Cover (OSHC)',
      'Genuine Temporary Entrant (GTE) statement',
      'Academic transcripts and 10th, 12th, UG certificates',
    ],
    popularCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra'],
    topUniversities: [
      'University of Melbourne',
      'Australian National University (ANU)',
      'University of Sydney',
      'University of Queensland',
      'Monash University',
      'University of New South Wales (UNSW)',
    ],
    averageCost: { tuition: '₹15 – ₹30 L per year', living: '₹10 – ₹18 L per year', total: '₹25 – ₹48 L per year' },
    processingTime: { pr: '8 – 18 months', studentVisa: '4 – 6 weeks' },
    keyFacts: [
      { label: 'PR Pathway', value: 'Skilled Independent (189), State-Sponsored (190)' },
      { label: 'Post-Study Work', value: 'Graduate Visa 485 — 2–4 years' },
      { label: 'Intakes', value: 'February & July' },
      { label: 'Currency', value: 'Australian Dollar (AUD)' },
      { label: 'Language', value: 'English' },
      { label: 'Lifestyle', value: 'Outdoor, multicultural, safe' },
    ],
  },
  'country-uk': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    heroHeadline: 'Study & Work in the United Kingdom',
    description:
      "The UK is home to some of the world's oldest and most prestigious universities. With the Skilled Worker Visa and the Graduate Route allowing 2 years of post-study work, the UK is an attractive destination for both immigration and education. The High Potential Individual (HPI) visa further opens doors for graduates of top global universities.",
    prRequirements: [
      'Valid job offer from a UK-licensed sponsor employer',
      'Minimum salary threshold: £26,200 per year (or role-specific threshold)',
      'English language requirement — B1 level or above',
      'Points-based system: 70 points required',
      'Healthcare surcharge payment',
      'Indefinite Leave to Remain (ILR) after 5 years on Skilled Worker Visa',
    ],
    studyRequirements: [
      'Confirmation of Acceptance for Studies (CAS) from UK institution',
      'IELTS UKVI minimum 5.5 – 6.5 (varies by institution)',
      'Proof of English language proficiency',
      'Proof of funds: £1,334/month for up to 9 months (London); £1,023/month outside London',
      'Valid passport',
      'Academic certificates and transcripts',
    ],
    popularCities: ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Leeds', 'Glasgow'],
    topUniversities: [
      'University of Oxford',
      'University of Cambridge',
      'Imperial College London',
      'UCL (University College London)',
      'University of Edinburgh',
      "King's College London",
    ],
    averageCost: { tuition: '₹15 – ₹35 L per year', living: '₹10 – ₹20 L per year', total: '₹25 – ₹55 L per year' },
    processingTime: { pr: 'ILR after 5 years (Skilled Worker)', studentVisa: '3 – 6 weeks' },
    keyFacts: [
      { label: 'PR Pathway', value: 'Skilled Worker → ILR after 5 years' },
      { label: 'Post-Study Work', value: 'Graduate Route — 2 years' },
      { label: 'Intakes', value: 'September & January' },
      { label: 'Currency', value: 'British Pound (GBP)' },
      { label: 'Language', value: 'English' },
      { label: 'Lifestyle', value: 'Historic, diverse, cosmopolitan' },
    ],
  },
  'country-new-zealand': {
    name: 'New Zealand',
    flag: '🇳🇿',
    heroHeadline: 'Start a New Life in New Zealand',
    description:
      'New Zealand offers exceptional quality of life, stunning natural beauty, and a welcoming immigration environment. The Accredited Employer Work Visa (AEWV) and Skilled Migrant Category (SMC) provide clear pathways to residency, while its universities are globally ranked. New Zealand is increasingly popular with Indian students and professionals alike.',
    prRequirements: [
      'Job offer from an accredited NZ employer (AEWV pathway)',
      'Skilled Migrant Category — minimum 100 points on EOI',
      'Minimum NZ Qualifications Framework Level 4 or above',
      'English language — IELTS 6.5 or above',
      'Health and good character requirements',
      'Age under 56 years (SMC pathway)',
    ],
    studyRequirements: [
      'Offer letter from a New Zealand Qualifications Authority (NZQA) institution',
      'IELTS 5.5 – 6.5 / PTE 42 – 58 (varies by institution)',
      'Proof of funds: NZD 15,000 per year for living costs',
      'Outward travel funds (return ticket)',
      'Health and character clearance',
      'Valid passport and academic certificates',
    ],
    popularCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Dunedin', 'Tauranga'],
    topUniversities: [
      'University of Auckland',
      'Victoria University of Wellington',
      'University of Otago',
      'Massey University',
      'University of Canterbury',
      'AUT University',
    ],
    averageCost: { tuition: '₹10 – ₹22 L per year', living: '₹8 – ₹13 L per year', total: '₹18 – ₹35 L per year' },
    processingTime: { pr: '6 – 12 months (SMC)', studentVisa: '4 – 8 weeks' },
    keyFacts: [
      { label: 'PR Pathway', value: 'SMC, AEWV, Family Category' },
      { label: 'Post-Study Work', value: 'Post-study work visa — 1–3 years' },
      { label: 'Intakes', value: 'February & July' },
      { label: 'Currency', value: 'New Zealand Dollar (NZD)' },
      { label: 'Language', value: 'English' },
      { label: 'Lifestyle', value: 'Outdoor, peaceful, family-friendly' },
    ],
  },
  'country-usa': {
    name: 'USA',
    flag: '🇺🇸',
    heroHeadline: 'Achieve Your American Dream',
    description:
      "The United States remains the world's premier destination for higher education and technology careers. Home to Ivy League universities and Silicon Valley, the US offers unparalleled academic and professional opportunities. The F-1 student visa, OPT, and STEM extension allow graduates to build a career in the US after completing their studies.",
    prRequirements: [
      'H-1B work visa sponsored by a US employer (lottery system)',
      'O-1 visa for extraordinary ability',
      'EB-1, EB-2, EB-3 employment-based green card categories',
      'PERM Labour Certification (most EB categories)',
      'Approved I-140 petition',
      'Priority date must be current (can take years)',
    ],
    studyRequirements: [
      'F-1 Student Visa — I-20 form from the US institution',
      'TOEFL iBT 80–100 / IELTS 6.5 / PTE 58 (varies by university)',
      'SAT/GRE/GMAT scores (as required)',
      'Proof of financial ability: USD 25,000 – 75,000 per year',
      'SEVIS fee (I-901) payment',
      'Strong SOP, LOR, and academic records',
    ],
    popularCities: ['New York', 'Boston', 'San Francisco', 'Chicago', 'Los Angeles', 'Seattle'],
    topUniversities: [
      'MIT (Massachusetts Institute of Technology)',
      'Harvard University',
      'Stanford University',
      'University of California, Berkeley',
      'Carnegie Mellon University',
      'University of Michigan',
    ],
    averageCost: { tuition: '₹20 – ₹50 L per year', living: '₹12 – ₹25 L per year', total: '₹32 – ₹75 L per year' },
    processingTime: { pr: '5 – 20+ years (varies by category & country of birth)', studentVisa: '3 – 8 weeks' },
    keyFacts: [
      { label: 'PR Pathway', value: 'H-1B → EB Green Card' },
      { label: 'Post-Study Work', value: 'OPT 12 months + STEM 24 months' },
      { label: 'Intakes', value: 'August/September & January' },
      { label: 'Currency', value: 'US Dollar (USD)' },
      { label: 'Language', value: 'English' },
      { label: 'Lifestyle', value: 'Diverse, fast-paced, opportunity-rich' },
    ],
  },
  'country-europe': {
    name: 'Europe',
    flag: '🇪🇺',
    heroHeadline: 'Study & Settle Across Europe',
    description:
      'Europe offers an incredible diversity of study and immigration opportunities. Countries like Germany, France, Netherlands, and Norway provide world-class education often at low or no tuition fees. The EU Blue Card provides a streamlined pathway to permanent residency for skilled workers across EU member states.',
    prRequirements: [
      'EU Blue Card — job offer with minimum salary of €56,400/year',
      'Country-specific skilled worker visas (e.g., Germany Skilled Immigration Act)',
      'Recognised academic qualification and work experience',
      'Language proficiency (varies — German, French, or English)',
      'Health insurance coverage',
      'Permanent Residency after 33 months with EU Blue Card (21 months with B1 language)',
    ],
    studyRequirements: [
      'Offer letter from a recognised European university',
      'IELTS / TOEFL (for English-taught programs) or local language test',
      'Academic transcripts — 10th, 12th, and undergraduate degree',
      'Proof of sufficient financial means (€800–€1,000/month)',
      'Health insurance (public or private)',
      'APS certificate (for Indian students applying to Germany)',
    ],
    popularCities: ['Berlin', 'Paris', 'Amsterdam', 'Munich', 'Vienna', 'Zurich'],
    topUniversities: [
      'TU Munich (Technical University of Munich)',
      'Ludwig Maximilian University (LMU), Munich',
      'University of Amsterdam',
      'KU Leuven (Belgium)',
      'ETH Zurich (Switzerland)',
      'Heidelberg University',
    ],
    averageCost: { tuition: '₹0 – ₹15 L per year (free in Germany/Norway)', living: '₹6 – ₹14 L per year', total: '₹6 – ₹29 L per year' },
    processingTime: { pr: '21 – 60 months (EU Blue Card)', studentVisa: '4 – 10 weeks' },
    keyFacts: [
      { label: 'PR Pathway', value: 'EU Blue Card, Country-specific permits' },
      { label: 'Post-Study Work', value: '18 months job search visa (Germany)' },
      { label: 'Intakes', value: 'October & April (Germany); varies by country' },
      { label: 'Currency', value: 'Euro (EUR); CHF in Switzerland' },
      { label: 'Language', value: 'English-taught programs widely available' },
      { label: 'Lifestyle', value: 'Cultural, historic, excellent work-life balance' },
    ],
  },
}

// ==================== SERVICE TYPES & DEFAULTS ====================

interface ImmigVisaCard {
  title: string
  description: string
  eligibilityPoints: string[]
  countries: string[]
  processingTime: string
  ctaLabel: string
}

interface ImmigRequirement {
  title: string
  items: string[]
}

interface ServiceImmigrationContent {
  visaCards: ImmigVisaCard[]
  requirements: ImmigRequirement[]
}

interface StudyStep {
  number: string
  title: string
  description: string
}

interface StudyCountry {
  flag: string
  name: string
  slug: string
  intakePeriods: string
  avgTuition: string
  topField: string
  keyFact: string
}

interface StudyRequirement {
  category: string
  items: string[]
}

interface ServiceStudyAbroadContent {
  steps: StudyStep[]
  countries: StudyCountry[]
  requirements: StudyRequirement[]
}

interface LoanType {
  type: string
  maxAmount: string
  interestRange: string
  tenure: string
  highlight: string
  features: string[]
}

interface ServiceLoansContent {
  loanTypes: LoanType[]
  eligibilityCriteria: string[]
  requiredDocuments: string[]
}

const SERVICE_DEFAULTS: Record<string, ServiceImmigrationContent | ServiceStudyAbroadContent | ServiceLoansContent> = {
  'service-immigration': {
    visaCards: [
      {
        title: 'Permanent Residency (PR) Visa',
        description: 'Achieve permanent resident status in your preferred destination. Express Entry, PNP, SkillSelect — handled end-to-end by certified advisors.',
        eligibilityPoints: [
          'Minimum CLB 7 / IELTS 6.0 band (language requirement)',
          'At least 1 year of skilled work experience',
          'Educational Credential Assessment (ECA) or Skills Assessment',
          'Valid job offer or sufficient points under points-based system',
          'Clean criminal and medical history',
          'Proof of sufficient settlement funds',
        ],
        countries: ['🇨🇦 Canada', '🇦🇺 Australia', '🇳🇿 New Zealand', '🇬🇧 UK', '🇺🇸 USA'],
        processingTime: '6 – 18 months',
        ctaLabel: 'Get PR Assessment',
      },
      {
        title: 'Work Visa',
        description: 'Secure legal work authorisation abroad — through a skilled worker program, LMIA-backed offer, or employer-sponsored pathway.',
        eligibilityPoints: [
          'Confirmed job offer from a foreign employer',
          'LMIA (Labour Market Impact Assessment) where applicable',
          'Relevant qualification or trade certification',
          'Adequate English / French language proficiency',
          'Valid passport with sufficient validity',
          'Medical and police clearance certificates',
        ],
        countries: ['🇨🇦 Canada', '🇦🇺 Australia', '🇳🇿 New Zealand', '🇬🇧 UK', '🇩🇪 Germany'],
        processingTime: '2 – 6 months',
        ctaLabel: 'Get Work Visa Assessment',
      },
      {
        title: 'Visitor / Tourist Visa',
        description: 'Planning a trip abroad? Our consultants ensure your visitor visa application is accurate, complete, and optimised for first-time approval.',
        eligibilityPoints: [
          'Genuine intent to visit and return home',
          'Proof of sufficient funds to cover trip expenses',
          'Strong ties to home country (job, property, family)',
          'Valid travel insurance (required for certain countries)',
          'Invitation letter (if visiting family or events)',
          'Previous travel history can strengthen your case',
        ],
        countries: ['🇨🇦 Canada', '🇦🇺 Australia', '🇬🇧 UK', '🇺🇸 USA', '🇸🇬 Schengen'],
        processingTime: '2 – 8 weeks',
        ctaLabel: 'Apply for Visitor Visa',
      },
      {
        title: 'Family & Dependent Visa',
        description: 'Reunite with your loved ones. Spousal sponsorship, partner visas, and dependent child applications — handled with care and expertise.',
        eligibilityPoints: [
          'Sponsor must be a permanent resident or citizen',
          'Proof of genuine relationship (certificate, photographs, history)',
          'Sponsor meets minimum income / financial requirements',
          'Dependent must meet health and character requirements',
          'Child dependants — must be under 22 years (varies by country)',
          'No outstanding immigration violations',
        ],
        countries: ['🇨🇦 Canada', '🇦🇺 Australia', '🇳🇿 New Zealand', '🇬🇧 UK', '🇺🇸 USA'],
        processingTime: '8 – 24 months',
        ctaLabel: 'Start Family Sponsorship',
      },
    ],
    requirements: [
      {
        title: 'Documents Required',
        items: [
          'Valid passport (6+ months validity)',
          'National ID / Aadhaar card',
          'Educational certificates (10th, 12th, degree)',
          'Employment letters & payslips',
          'Bank statements (6 months)',
          'Photographs (as per country spec)',
        ],
      },
      {
        title: 'Language Proficiency',
        items: [
          'IELTS — Academic or General (CLB 7 / 6.0)',
          'PTE Academic — 50+ overall score',
          'TOEFL iBT — 80+ overall score',
          'CELPIP — CLB 7 or above',
          'French — TEF Canada (for Quebec pathway)',
          'Certificate validity: 2 years from exam date',
        ],
      },
      {
        title: 'Financial Proof',
        items: [
          'Settlement funds (CAD 13,757+ for single)',
          'Consistent bank balance for 3–6 months',
          'Fixed deposits / investment proof',
          'No large unexplained transactions',
          'Source of funds documentation',
          'Sponsored funds with donor declaration',
        ],
      },
    ],
  } as ServiceImmigrationContent,
  'service-study-abroad': {
    steps: [
      { number: '01', title: 'Country Selection', description: 'We analyse your academic background, career goals, budget, and lifestyle preferences to shortlist the best destination country for your studies.' },
      { number: '02', title: 'Course Counselling', description: 'Our expert counsellors help you identify the right program — matching your qualifications, future employability, and post-study PR prospects.' },
      { number: '03', title: 'Admissions Assistance', description: 'We manage university applications end-to-end — shortlisting, form filling, academic transcript submission, and offer letter negotiation.' },
      { number: '04', title: 'SOP & LOR Guidance', description: 'Strong personal statements and recommendation letters make all the difference. Our writers craft compelling, admission-winning documents.' },
      { number: '05', title: 'Visa Filing', description: 'We prepare and file a complete, accurate student visa application with the GIC, biometrics, and all financial documentation required.' },
      { number: '06', title: 'Pre-Departure Support', description: 'From airport pickup recommendations to accommodation advice and banking setup — we ensure you land and settle smoothly.' },
    ],
    countries: [
      { flag: '🇨🇦', name: 'Canada', slug: 'canada', intakePeriods: 'Jan, Sep (May optional)', avgTuition: '₹12 – ₹25 L / year', topField: 'Engineering, Business, IT', keyFact: 'Post-Study Work Permit up to 3 years' },
      { flag: '🇦🇺', name: 'Australia', slug: 'australia', intakePeriods: 'Feb, Jul', avgTuition: '₹15 – ₹30 L / year', topField: 'Healthcare, IT, Engineering', keyFact: '485 Graduate Visa — stay 2–4 years post-study' },
      { flag: '🇬🇧', name: 'United Kingdom', slug: 'uk', intakePeriods: 'Sep, Jan', avgTuition: '₹15 – ₹35 L / year', topField: 'Business, Law, STEM', keyFact: 'Graduate Stay-back Route — 2 years' },
      { flag: '🇳🇿', name: 'New Zealand', slug: 'new-zealand', intakePeriods: 'Feb, Jul', avgTuition: '₹10 – ₹22 L / year', topField: 'Agriculture, IT, Nursing', keyFact: 'Post-Study Work Visa — up to 3 years' },
      { flag: '🇺🇸', name: 'USA', slug: 'usa', intakePeriods: 'Aug/Sep, Jan', avgTuition: '₹20 – ₹50 L / year', topField: 'STEM, Business, Arts', keyFact: 'OPT + 3-year STEM extension' },
      { flag: '🇩🇪', name: 'Europe', slug: 'europe', intakePeriods: 'Oct, Apr', avgTuition: '₹0 – ₹15 L / year', topField: 'Engineering, Medicine, Arts', keyFact: 'Low/no tuition in Germany, Norway, France' },
    ],
    requirements: [
      { category: 'Language Proficiency', items: ['IELTS Academic — minimum band 6.0 to 7.0 (varies by institution)', 'PTE Academic — minimum 58 to 65 (varies by institution)', 'TOEFL iBT — minimum 80 to 100', 'Some universities accept Duolingo English Test'] },
      { category: 'Academic Records', items: ['10th & 12th mark sheets and passing certificates', 'Undergraduate/Postgraduate transcripts and degree certificates', 'Minimum 60–70% academic score for most universities', 'Certified English translations of non-English documents'] },
      { category: 'Admission Documents', items: ['Statement of Purpose (SOP) — 1–2 pages tailored to each university', 'Letters of Recommendation (LOR) — typically 2–3 from academics or employers', 'Updated CV/Resume with academic and professional history', 'Offer letter from the university (required before visa application)'] },
      { category: 'Financial & Visa Documents', items: ['Proof of sufficient funds (bank statements — last 6 months)', 'Scholarship letters / education loan sanction letter', 'GIC (Guaranteed Investment Certificate) for Canada — CAD 10,000', 'Valid passport (minimum 6 months beyond intended stay)', 'Visa application forms + SEVIS fee receipt (USA)', 'Health insurance coverage proof'] },
    ],
  } as ServiceStudyAbroadContent,
  'service-loans': {
    loanTypes: [
      {
        type: 'With Collateral',
        maxAmount: '₹1.5 Crore',
        interestRange: '8.5% – 11%',
        tenure: 'Up to 15 years',
        highlight: 'Lower interest rates with secured collateral',
        features: [
          'Secured against property / fixed deposits / insurance',
          'Higher loan amounts — up to ₹1.5 Cr',
          'Lower interest rates (8.5% – 11% p.a.)',
          'Extended repayment tenure up to 15 years',
          'Moratorium period: course duration + 6–12 months',
          'Full tuition + living expenses covered',
          'Available from all major PSU & private banks',
        ],
      },
      {
        type: 'Without Collateral',
        maxAmount: '₹50 Lakhs',
        interestRange: '10% – 14%',
        tenure: 'Up to 10 years',
        highlight: 'No security required — ideal for eligible profiles',
        features: [
          'No property or asset collateral required',
          'Loan amount up to ₹50 L (select NBFCs offer more)',
          'Based on co-borrower income & credit profile',
          'Processing within 7–14 working days',
          'Moratorium period during course duration',
          'Covers tuition, accommodation, travel & misc.',
          'Available for top-ranked institutions worldwide',
        ],
      },
    ],
    eligibilityCriteria: [
      'Indian citizen enrolled or seeking admission in a recognised foreign university',
      'Course must be a full-time degree/diploma programme',
      'Co-applicant (parent/guardian) with stable income required',
      'Minimum academic score: 50–60% in qualifying examinations',
      'Age: 18–35 years at the time of application',
      'Valid offer letter / conditional admission from the institution',
      'CIBIL score of co-applicant: preferably 700 and above',
      'No existing loan defaults on the applicant or co-applicant',
    ],
    requiredDocuments: [
      'Completed loan application form',
      'Recent passport-size photographs',
      'Passport copy (applicant & co-applicant)',
      'Offer / Admission letter from the university',
      'Academic certificates (10th, 12th, UG/PG mark sheets)',
      'IELTS / TOEFL / PTE score card',
      'Income proof of co-applicant (salary slips / ITR)',
      'Bank statements — last 6–12 months',
      'Collateral documents (if secured loan)',
      'Fee schedule / cost breakdown from the university',
      'Scholarship letter (if applicable)',
      'Property documents / Fixed deposit receipts (for collateral loan)',
    ],
  } as ServiceLoansContent,
}

function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string
  items: string[]
  onChange: (items: string[]) => void
}) {
  function setItem(idx: number, val: string) {
    const arr = [...items]
    arr[idx] = val
    onChange(arr)
  }
  function addItem() {
    onChange([...items, ''])
  }
  function removeItem(idx: number) {
    onChange(items.filter((_, i) => i !== idx))
  }
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              className={`${textareaCls} flex-1`}
              rows={2}
              value={item}
              onChange={(e) => setItem(i, e.target.value)}
              placeholder={`${label} item ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="text-red-400 hover:text-red-600 transition-colors shrink-0 self-start mt-1"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 text-sm font-medium transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Item
      </button>
    </div>
  )
}

function KeyFactsEditor({
  facts,
  onChange,
}: {
  facts: { label: string; value: string }[]
  onChange: (facts: { label: string; value: string }[]) => void
}) {
  function setFact(idx: number, key: 'label' | 'value', val: string) {
    const arr = [...facts]
    arr[idx] = { ...arr[idx], [key]: val }
    onChange(arr)
  }
  function addFact() {
    onChange([...facts, { label: '', value: '' }])
  }
  function removeFact(idx: number) {
    onChange(facts.filter((_, i) => i !== idx))
  }
  return (
    <div>
      <label className={labelCls}>Key Facts</label>
      <div className="space-y-2">
        {facts.map((fact, i) => (
          <div key={i} className="flex gap-2 items-start">
            <input
              className={`${inputCls} w-40 shrink-0`}
              value={fact.label}
              onChange={(e) => setFact(i, 'label', e.target.value)}
              placeholder="Label"
            />
            <input
              className={`${inputCls} flex-1`}
              value={fact.value}
              onChange={(e) => setFact(i, 'value', e.target.value)}
              placeholder="Value"
            />
            <button
              type="button"
              onClick={() => removeFact(i)}
              className="text-red-400 hover:text-red-600 transition-colors shrink-0 mt-2"
              aria-label="Remove fact"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addFact}
        className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 text-sm font-medium transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Fact
      </button>
    </div>
  )
}

// ==================== SERVICE IMMIGRATION FORM ====================
function ServiceImmigrationForm({
  initial,
  onSave,
}: {
  initial: ServiceImmigrationContent
  onSave: (d: ServiceImmigrationContent) => Promise<void>
}) {
  const [data, setData] = useState<ServiceImmigrationContent>(initial)
  const [saving, setSaving] = useState(false)

  function setCard(idx: number, key: keyof ImmigVisaCard, val: string | string[]) {
    setData((prev) => {
      const cards = [...prev.visaCards]
      cards[idx] = { ...cards[idx], [key]: val }
      return { ...prev, visaCards: cards }
    })
  }

  function setReq(idx: number, key: keyof ImmigRequirement, val: string | string[]) {
    setData((prev) => {
      const reqs = [...prev.requirements]
      reqs[idx] = { ...reqs[idx], [key]: val }
      return { ...prev, requirements: reqs }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(data)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Visa Cards</h3>
        <div className="space-y-5">
          {data.visaCards.map((card, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase">Card {i + 1}</p>
              <div>
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={card.title} onChange={(e) => setCard(i, 'title', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea className={textareaCls} rows={3} value={card.description} onChange={(e) => setCard(i, 'description', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Processing Time</label>
                  <input className={inputCls} value={card.processingTime} onChange={(e) => setCard(i, 'processingTime', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>CTA Button Label</label>
                  <input className={inputCls} value={card.ctaLabel} onChange={(e) => setCard(i, 'ctaLabel', e.target.value)} />
                </div>
              </div>
              <StringListEditor
                label="Eligibility Points"
                items={card.eligibilityPoints}
                onChange={(items) => setCard(i, 'eligibilityPoints', items)}
              />
              <StringListEditor
                label="Countries (with flag emoji)"
                items={card.countries}
                onChange={(items) => setCard(i, 'countries', items)}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Requirements Sections</h3>
        <div className="space-y-4">
          {data.requirements.map((req, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
              <div>
                <label className={labelCls}>Section Title</label>
                <input className={inputCls} value={req.title} onChange={(e) => setReq(i, 'title', e.target.value)} />
              </div>
              <StringListEditor
                label="Items"
                items={req.items}
                onChange={(items) => setReq(i, 'items', items)}
              />
            </div>
          ))}
        </div>
      </div>

      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== SERVICE STUDY ABROAD FORM ====================
function ServiceStudyAbroadForm({
  initial,
  onSave,
}: {
  initial: ServiceStudyAbroadContent
  onSave: (d: ServiceStudyAbroadContent) => Promise<void>
}) {
  const [data, setData] = useState<ServiceStudyAbroadContent>(initial)
  const [saving, setSaving] = useState(false)

  function setStep(idx: number, key: keyof StudyStep, val: string) {
    setData((prev) => {
      const steps = [...prev.steps]
      steps[idx] = { ...steps[idx], [key]: val }
      return { ...prev, steps }
    })
  }

  function setCountry(idx: number, key: keyof StudyCountry, val: string) {
    setData((prev) => {
      const countries = [...prev.countries]
      countries[idx] = { ...countries[idx], [key]: val }
      return { ...prev, countries }
    })
  }

  function setReq(idx: number, key: keyof StudyRequirement, val: string | string[]) {
    setData((prev) => {
      const requirements = [...prev.requirements]
      requirements[idx] = { ...requirements[idx], [key]: val }
      return { ...prev, requirements }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(data)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Process Steps</h3>
        <div className="space-y-4">
          {data.steps.map((step, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase">Step {step.number}</p>
              <div>
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={step.title} onChange={(e) => setStep(i, 'title', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea className={textareaCls} rows={3} value={step.description} onChange={(e) => setStep(i, 'description', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Destination Countries</h3>
        <div className="space-y-4">
          {data.countries.map((c, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Flag Emoji</label>
                  <input className={inputCls} value={c.flag} onChange={(e) => setCountry(i, 'flag', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Country Name</label>
                  <input className={inputCls} value={c.name} onChange={(e) => setCountry(i, 'name', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Intake Periods</label>
                  <input className={inputCls} value={c.intakePeriods} onChange={(e) => setCountry(i, 'intakePeriods', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Avg. Tuition</label>
                  <input className={inputCls} value={c.avgTuition} onChange={(e) => setCountry(i, 'avgTuition', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Top Fields</label>
                  <input className={inputCls} value={c.topField} onChange={(e) => setCountry(i, 'topField', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Key Fact</label>
                  <input className={inputCls} value={c.keyFact} onChange={(e) => setCountry(i, 'keyFact', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Admission Requirements</h3>
        <div className="space-y-4">
          {data.requirements.map((req, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
              <div>
                <label className={labelCls}>Category</label>
                <input className={inputCls} value={req.category} onChange={(e) => setReq(i, 'category', e.target.value)} />
              </div>
              <StringListEditor
                label="Items"
                items={req.items}
                onChange={(items) => setReq(i, 'items', items)}
              />
            </div>
          ))}
        </div>
      </div>

      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== SERVICE LOANS FORM ====================
function ServiceLoansForm({
  initial,
  onSave,
}: {
  initial: ServiceLoansContent
  onSave: (d: ServiceLoansContent) => Promise<void>
}) {
  const [data, setData] = useState<ServiceLoansContent>(initial)
  const [saving, setSaving] = useState(false)

  function setLoan(idx: number, key: keyof LoanType, val: string | string[]) {
    setData((prev) => {
      const loanTypes = [...prev.loanTypes]
      loanTypes[idx] = { ...loanTypes[idx], [key]: val }
      return { ...prev, loanTypes }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(data)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Loan Types</h3>
        <div className="space-y-5">
          {data.loanTypes.map((loan, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase">Loan Type {i + 1}</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Type Label</label>
                  <input className={inputCls} value={loan.type} onChange={(e) => setLoan(i, 'type', e.target.value)} placeholder="With Collateral" />
                </div>
                <div>
                  <label className={labelCls}>Max Amount</label>
                  <input className={inputCls} value={loan.maxAmount} onChange={(e) => setLoan(i, 'maxAmount', e.target.value)} placeholder="₹1.5 Crore" />
                </div>
                <div>
                  <label className={labelCls}>Interest Range</label>
                  <input className={inputCls} value={loan.interestRange} onChange={(e) => setLoan(i, 'interestRange', e.target.value)} placeholder="8.5% – 11%" />
                </div>
                <div>
                  <label className={labelCls}>Tenure</label>
                  <input className={inputCls} value={loan.tenure} onChange={(e) => setLoan(i, 'tenure', e.target.value)} placeholder="Up to 15 years" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Highlight Text</label>
                <input className={inputCls} value={loan.highlight} onChange={(e) => setLoan(i, 'highlight', e.target.value)} />
              </div>
              <StringListEditor
                label="Features"
                items={loan.features}
                onChange={(items) => setLoan(i, 'features', items)}
              />
            </div>
          ))}
        </div>
      </div>

      <StringListEditor
        label="Eligibility Criteria"
        items={data.eligibilityCriteria}
        onChange={(items) => setData((prev) => ({ ...prev, eligibilityCriteria: items }))}
      />

      <StringListEditor
        label="Required Documents"
        items={data.requiredDocuments}
        onChange={(items) => setData((prev) => ({ ...prev, requiredDocuments: items }))}
      />

      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== COUNTRY FORM ====================
function CountryForm({
  initial,
  onSave,
}: {
  initial: CountryContent
  onSave: (d: CountryContent) => Promise<void>
}) {
  const [data, setData] = useState<CountryContent>(initial)
  const [saving, setSaving] = useState(false)

  function set(key: keyof CountryContent, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(data)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Country Name</label>
          <input className={inputCls} value={data.name} onChange={(e) => set('name', e.target.value)} placeholder="Canada" />
        </div>
        <div>
          <label className={labelCls}>Flag Emoji</label>
          <input className={inputCls} value={data.flag} onChange={(e) => set('flag', e.target.value)} placeholder="🇨🇦" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Hero Headline</label>
        <input className={inputCls} value={data.heroHeadline} onChange={(e) => set('heroHeadline', e.target.value)} placeholder="Live, Work & Study in Canada" />
      </div>

      <div>
        <label className={labelCls}>Description</label>
        <textarea className={textareaCls} rows={4} value={data.description} onChange={(e) => set('description', e.target.value)} placeholder="Country description..." />
      </div>

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
        <p className="text-xs font-bold text-gray-400 uppercase">Processing Time</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>PR Processing Time</label>
            <input className={inputCls} value={data.processingTime.pr} onChange={(e) => setData((prev) => ({ ...prev, processingTime: { ...prev.processingTime, pr: e.target.value } }))} placeholder="6 – 12 months" />
          </div>
          <div>
            <label className={labelCls}>Student Visa Processing Time</label>
            <input className={inputCls} value={data.processingTime.studentVisa} onChange={(e) => setData((prev) => ({ ...prev, processingTime: { ...prev.processingTime, studentVisa: e.target.value } }))} placeholder="4 – 8 weeks" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
        <p className="text-xs font-bold text-gray-400 uppercase">Average Cost</p>
        <div>
          <label className={labelCls}>Tuition Fees</label>
          <input className={inputCls} value={data.averageCost.tuition} onChange={(e) => setData((prev) => ({ ...prev, averageCost: { ...prev.averageCost, tuition: e.target.value } }))} placeholder="₹12 – ₹25 L per year" />
        </div>
        <div>
          <label className={labelCls}>Living Expenses</label>
          <input className={inputCls} value={data.averageCost.living} onChange={(e) => setData((prev) => ({ ...prev, averageCost: { ...prev.averageCost, living: e.target.value } }))} placeholder="₹7 – ₹12 L per year" />
        </div>
        <div>
          <label className={labelCls}>Total Annual Cost</label>
          <input className={inputCls} value={data.averageCost.total} onChange={(e) => setData((prev) => ({ ...prev, averageCost: { ...prev.averageCost, total: e.target.value } }))} placeholder="₹19 – ₹37 L per year" />
        </div>
      </div>

      <StringListEditor
        label="PR Requirements"
        items={data.prRequirements}
        onChange={(items) => setData((prev) => ({ ...prev, prRequirements: items }))}
      />

      <StringListEditor
        label="Study Requirements"
        items={data.studyRequirements}
        onChange={(items) => setData((prev) => ({ ...prev, studyRequirements: items }))}
      />

      <StringListEditor
        label="Top Universities"
        items={data.topUniversities}
        onChange={(items) => setData((prev) => ({ ...prev, topUniversities: items }))}
      />

      <StringListEditor
        label="Popular Cities"
        items={data.popularCities}
        onChange={(items) => setData((prev) => ({ ...prev, popularCities: items }))}
      />

      <KeyFactsEditor
        facts={data.keyFacts}
        onChange={(facts) => setData((prev) => ({ ...prev, keyFacts: facts }))}
      />

      <SaveButton saving={saving} />
    </form>
  )
}

// ==================== SAVE BUTTON ====================
function SaveButton({ saving }: { saving: boolean }) {
  return (
    <div className="pt-2">
      <button
        type="submit"
        disabled={saving}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 to-orange-500 hover:from-blue-800 hover:to-orange-600 disabled:opacity-60 transition-all shadow"
      >
        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </div>
  )
}

// ==================== PAGE ====================
export default function SectionEditorPage() {
  const params = useParams()
  const section = params?.section as string

  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState<unknown>(null)
  const [toast, setToast] = useState(false)

  const meta = SECTION_META[section]

  useEffect(() => {
    if (!section || !meta) {
      setLoading(false)
      return
    }
    fetch(`/api/content/${section}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (section.startsWith('country-')) {
          const defaults = COUNTRY_DEFAULTS[section]
          if (data.content !== null && data.content !== undefined) {
            setContent({ ...defaults, ...data.content })
          } else {
            setContent(defaults ?? null)
          }
        } else if (section.startsWith('service-')) {
          const defaults = SERVICE_DEFAULTS[section]
          if (data.content !== null && data.content !== undefined) {
            setContent(data.content)
          } else {
            setContent(defaults ?? null)
          }
        } else {
          const defaults = DEFAULT_CONTENT[section as keyof typeof DEFAULT_CONTENT]
          if (data.content !== null && data.content !== undefined) {
            if (Array.isArray(defaults) && Array.isArray(data.content)) {
              setContent(data.content)
            } else if (typeof defaults === 'object' && !Array.isArray(defaults)) {
              setContent({ ...defaults, ...data.content })
            } else {
              setContent(data.content)
            }
          } else {
            setContent(defaults)
          }
        }
        setLoading(false)
      })
      .catch(() => {
        if (section.startsWith('country-')) {
          setContent(COUNTRY_DEFAULTS[section] ?? null)
        } else if (section.startsWith('service-')) {
          setContent(SERVICE_DEFAULTS[section] ?? null)
        } else {
          setContent(DEFAULT_CONTENT[section as keyof typeof DEFAULT_CONTENT])
        }
        setLoading(false)
      })
  }, [section, meta])

  async function handleSave(data: unknown) {
    await fetch(`/api/content/${section}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setToast(true)
  }

  if (!meta) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-2xl font-bold mb-2">Section not found</p>
        <p className="text-sm mb-6">The section &quot;{section}&quot; does not exist.</p>
        <Link href="/admin/content" className="text-blue-600 hover:underline text-sm font-medium">
          ← Back to Content Manager
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      {toast && (
        <Toast message="Changes saved successfully!" onClose={() => setToast(false)} />
      )}

      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/content"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-700 font-medium mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Content Manager
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{meta.label}</h1>
        <p className="text-gray-500 text-sm mt-1">{meta.description}</p>
      </div>

      {/* Editor card */}
      <div className="bg-white rounded-xl shadow p-6">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {section === 'hero' && (
              <HeroForm
                initial={content as HeroContent}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
            {section === 'stats' && (
              <StatsForm
                initial={content as StatsContent}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
            {section === 'about' && (
              <AboutForm
                initial={content as AboutContent}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
            {section === 'contact' && (
              <ContactForm
                initial={content as ContactContent}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
            {section === 'faq' && (
              <FaqForm
                initial={content as FaqItem[]}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
            {section === 'team' && (
              <TeamForm
                initial={content as TeamMember[]}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
            {section === 'siteInfo' && (
              <SiteInfoForm
                initial={content as SiteInfoContent}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
            {section.startsWith('country-') && content && (
              <CountryForm
                initial={content as CountryContent}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
            {section === 'service-immigration' && content && (
              <ServiceImmigrationForm
                initial={content as ServiceImmigrationContent}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
            {section === 'service-study-abroad' && content && (
              <ServiceStudyAbroadForm
                initial={content as ServiceStudyAbroadContent}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
            {section === 'service-loans' && content && (
              <ServiceLoansForm
                initial={content as ServiceLoansContent}
                onSave={async (d) => { await handleSave(d) }}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
