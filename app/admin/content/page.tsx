import Link from 'next/link'
import {
  Star,
  BarChart2,
  BookOpen,
  Phone,
  HelpCircle,
  Users,
  Info,
  Globe,
  Briefcase,
} from 'lucide-react'

const sections = [
  {
    key: 'hero',
    label: 'Hero Section',
    description: 'Main headline, badge, subtext, destinations and CTA buttons on the homepage.',
    Icon: Star,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    key: 'stats',
    label: 'Stats & Numbers',
    description: 'Key statistics displayed prominently: years, visas approved, countries, success rate.',
    Icon: BarChart2,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    key: 'about',
    label: 'About Us Story',
    description: 'Three paragraphs telling the company origin story and mission statement.',
    Icon: BookOpen,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    key: 'contact',
    label: 'Contact Info',
    description: 'Phone, email, address, WhatsApp number and business hours.',
    Icon: Phone,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    key: 'faq',
    label: 'FAQ',
    description: 'Frequently asked questions and answers shown on the homepage and FAQ page.',
    Icon: HelpCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    key: 'team',
    label: 'Team Members',
    description: 'Team member names, roles, initials, bios and avatar colours.',
    Icon: Users,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    key: 'siteInfo',
    label: 'Site Info',
    description: 'Company name, tagline, logo text and footer tagline used site-wide.',
    Icon: Info,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
]

const countrySections = [
  { key: 'country-canada', label: 'Canada', flag: '🇨🇦', description: 'Edit requirements, universities, costs & more' },
  { key: 'country-australia', label: 'Australia', flag: '🇦🇺', description: 'Edit requirements, universities, costs & more' },
  { key: 'country-uk', label: 'United Kingdom', flag: '🇬🇧', description: 'Edit requirements, universities, costs & more' },
  { key: 'country-new-zealand', label: 'New Zealand', flag: '🇳🇿', description: 'Edit requirements, universities, costs & more' },
  { key: 'country-usa', label: 'USA', flag: '🇺🇸', description: 'Edit requirements, universities, costs & more' },
  { key: 'country-europe', label: 'Europe', flag: '🇪🇺', description: 'Edit requirements, universities, costs & more' },
]

const serviceSections = [
  {
    key: 'service-immigration',
    label: 'Immigration Services',
    description: 'Visa cards, eligibility points, processing times',
  },
  {
    key: 'service-study-abroad',
    label: 'Study Abroad',
    description: 'Process steps, countries, requirements',
  },
  {
    key: 'service-loans',
    label: 'Loan Assistance',
    description: 'Loan types, amounts, eligibility',
  },
]

function SectionCard({
  href,
  bg,
  icon,
  title,
  description,
}: {
  href: string
  bg: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow flex flex-col">
      <div className="p-6 flex-1">
        <div className={`w-11 h-11 rounded-lg ${bg} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h2 className="text-base font-bold text-gray-900 mb-1">{title}</h2>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
      <div className="px-6 pb-5">
        <Link
          href={href}
          className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white transition-all shadow-sm"
        >
          Edit
        </Link>
      </div>
    </div>
  )
}

export default function ContentManagerPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Content Manager</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Edit the live content of your website. Changes take effect immediately.
        </p>
      </div>

      {/* General Content */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">General Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {sections.map(({ key, label, description, Icon, color, bg }) => (
            <SectionCard
              key={key}
              href={`/admin/content/${key}`}
              bg={bg}
              icon={<Icon className={`w-5 h-5 ${color}`} />}
              title={label}
              description={description}
            />
          ))}
        </div>
      </div>

      {/* Country Pages */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Country Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {countrySections.map(({ key, label, flag, description }) => (
            <SectionCard
              key={key}
              href={`/admin/content/${key}`}
              bg="bg-sky-50"
              icon={
                <span className="text-xl leading-none" role="img" aria-label={label}>
                  {flag}
                </span>
              }
              title={label}
              description={description}
            />
          ))}
        </div>
      </div>

      {/* Service Pages */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Service Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {serviceSections.map(({ key, label, description }) => (
            <SectionCard
              key={key}
              href={`/admin/content/${key}`}
              bg="bg-amber-50"
              icon={<Briefcase className="w-5 h-5 text-amber-600" />}
              title={label}
              description={description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
