import Link from 'next/link';
import {
  Globe,
  BookOpen,
  ClipboardList,
  FileText,
  Send,
  Luggage,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Star,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  icon: React.ElementType;
  number: string;
  title: string;
  description: string;
}

interface Country {
  flag: string;
  name: string;
  slug: string;
  intakePeriods: string;
  avgTuition: string;
  topField: string;
  keyFact: string;
}

interface Requirement {
  category: string;
  items: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const steps: Step[] = [
  {
    icon: Globe,
    number: '01',
    title: 'Country Selection',
    description:
      'We analyse your academic background, career goals, budget, and lifestyle preferences to shortlist the best destination country for your studies.',
  },
  {
    icon: BookOpen,
    number: '02',
    title: 'Course Counselling',
    description:
      'Our expert counsellors help you identify the right program — matching your qualifications, future employability, and post-study PR prospects.',
  },
  {
    icon: ClipboardList,
    number: '03',
    title: 'Admissions Assistance',
    description:
      'We manage university applications end-to-end — shortlisting, form filling, academic transcript submission, and offer letter negotiation.',
  },
  {
    icon: FileText,
    number: '04',
    title: 'SOP & LOR Guidance',
    description:
      'Strong personal statements and recommendation letters make all the difference. Our writers craft compelling, admission-winning documents.',
  },
  {
    icon: Send,
    number: '05',
    title: 'Visa Filing',
    description:
      'We prepare and file a complete, accurate student visa application with the GIC, biometrics, and all financial documentation required.',
  },
  {
    icon: Luggage,
    number: '06',
    title: 'Pre-Departure Support',
    description:
      'From airport pickup recommendations to accommodation advice and banking setup — we ensure you land and settle smoothly.',
  },
];

const countries: Country[] = [
  {
    flag: '🇨🇦',
    name: 'Canada',
    slug: 'canada',
    intakePeriods: 'Jan, Sep (May optional)',
    avgTuition: '₹12 – ₹25 L / year',
    topField: 'Engineering, Business, IT',
    keyFact: 'Post-Study Work Permit up to 3 years',
  },
  {
    flag: '🇦🇺',
    name: 'Australia',
    slug: 'australia',
    intakePeriods: 'Feb, Jul',
    avgTuition: '₹15 – ₹30 L / year',
    topField: 'Healthcare, IT, Engineering',
    keyFact: '485 Graduate Visa — stay 2–4 years post-study',
  },
  {
    flag: '🇬🇧',
    name: 'United Kingdom',
    slug: 'uk',
    intakePeriods: 'Sep, Jan',
    avgTuition: '₹15 – ₹35 L / year',
    topField: 'Business, Law, STEM',
    keyFact: 'Graduate Stay-back Route — 2 years',
  },
  {
    flag: '🇳🇿',
    name: 'New Zealand',
    slug: 'new-zealand',
    intakePeriods: 'Feb, Jul',
    avgTuition: '₹10 – ₹22 L / year',
    topField: 'Agriculture, IT, Nursing',
    keyFact: 'Post-Study Work Visa — up to 3 years',
  },
  {
    flag: '🇺🇸',
    name: 'USA',
    slug: 'usa',
    intakePeriods: 'Aug/Sep, Jan',
    avgTuition: '₹20 – ₹50 L / year',
    topField: 'STEM, Business, Arts',
    keyFact: 'OPT + 3-year STEM extension',
  },
  {
    flag: '🇩🇪',
    name: 'Europe',
    slug: 'europe',
    intakePeriods: 'Oct, Apr',
    avgTuition: '₹0 – ₹15 L / year',
    topField: 'Engineering, Medicine, Arts',
    keyFact: 'Low/no tuition in Germany, Norway, France',
  },
];

const requirements: Requirement[] = [
  {
    category: 'Language Proficiency',
    items: [
      'IELTS Academic — minimum band 6.0 to 7.0 (varies by institution)',
      'PTE Academic — minimum 58 to 65 (varies by institution)',
      'TOEFL iBT — minimum 80 to 100',
      'Some universities accept Duolingo English Test',
    ],
  },
  {
    category: 'Academic Records',
    items: [
      '10th & 12th mark sheets and passing certificates',
      'Undergraduate/Postgraduate transcripts and degree certificates',
      'Minimum 60–70% academic score for most universities',
      'Certified English translations of non-English documents',
    ],
  },
  {
    category: 'Admission Documents',
    items: [
      'Statement of Purpose (SOP) — 1–2 pages tailored to each university',
      'Letters of Recommendation (LOR) — typically 2–3 from academics or employers',
      'Updated CV/Resume with academic and professional history',
      'Offer letter from the university (required before visa application)',
    ],
  },
  {
    category: 'Financial & Visa Documents',
    items: [
      'Proof of sufficient funds (bank statements — last 6 months)',
      'Scholarship letters / education loan sanction letter',
      'GIC (Guaranteed Investment Certificate) for Canada — CAD 10,000',
      'Valid passport (minimum 6 months beyond intended stay)',
      'Visa application forms + SEVIS fee receipt (USA)',
      'Health insurance coverage proof',
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

import { getContent } from '@/lib/content'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Study Abroad – University Admissions & Student Visa Guidance',
  description: 'Study abroad consultants helping you apply to top universities in Canada, Australia, UK, New Zealand & USA. Student visa, SOP writing, scholarship guidance. Free counselling.',
  keywords: ['study abroad consultants india', 'student visa consultants', 'university admissions india', 'canada student visa', 'australia student visa', 'uk student visa'],
  alternates: { canonical: 'https://beyondbordersimmigration.in/services/study-abroad' },
  openGraph: {
    title: 'Study Abroad Services | Beyond Borders',
    description: 'Expert study abroad guidance. University admissions, student visas & scholarships.',
    url: 'https://beyondbordersimmigration.in/services/study-abroad',
  },
}

export default async function StudyAbroadPage() {
  type CmsStep = { title?: string; description?: string }
  type CmsCountry = { flag?: string; name?: string; slug?: string; intakePeriods?: string; avgTuition?: string; topField?: string; keyFact?: string }
  type CmsReq = { category?: string; items?: string[] }
  type CmsContent = { steps?: CmsStep[]; countries?: CmsCountry[]; requirements?: CmsReq[] }

  const cms = await getContent<CmsContent>('service-study-abroad', {})

  const mergedSteps = steps.map((step, i) => ({ ...step, ...(cms.steps?.[i] || {}), icon: step.icon }))
  const mergedCountries = countries.map((c, i) => ({ ...c, ...(cms.countries?.[i] || {}) }))
  const mergedRequirements = requirements.map((r, i) => ({ ...r, ...(cms.requirements?.[i] || {}) }))
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-600 opacity-20 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          <span className="inline-block mb-4 rounded-full bg-white/10 px-4 py-1 text-sm font-medium tracking-wide uppercase">
            Expert Study Abroad Counselling
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto">
            Study <span className="text-yellow-300">Abroad</span> Services
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            From choosing the right country to landing at your university — our counsellors guide you through every milestone of your international education journey.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-blue-900 shadow-lg hover:bg-blue-50 transition-colors"
            >
              Get Free Counselling <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Talk to a Counsellor
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/20 rounded-2xl overflow-hidden max-w-3xl mx-auto">
            {[
              { value: '500+', label: 'University Partners' },
              { value: '2,000+', label: 'Students Placed' },
              { value: '6', label: 'Destination Countries' },
              { value: '95%', label: 'Admission Success Rate' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm px-4 py-5">
                <p className="text-3xl font-extrabold text-yellow-300">{s.value}</p>
                <p className="text-xs text-blue-100 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-blue-700 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Study Abroad</span>
          </nav>
        </div>
      </div>

      {/* ── Steps ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Step-by-Step Process
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Your Study Abroad Roadmap
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              A proven 6-step process that has helped 2,000+ students secure admissions in their dream universities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mergedSteps.map(({ icon: Icon, number, title, description }) => (
              <div
                key={number}
                className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow">
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-blue-900 text-xs font-extrabold">
                      {number}
                    </span>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Country Grid ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Top Destinations
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Where Do You Want to Study?
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Explore our top study destinations — each with unique benefits for Indian students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mergedCountries.map(({ flag, name, slug, intakePeriods, avgTuition, topField, keyFact }) => (
              <div
                key={slug}
                className="bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl leading-none">{flag}</span>
                  <h3 className="text-xl font-bold text-slate-900">{name}</h3>
                </div>

                <ul className="flex-1 space-y-2 mb-5">
                  {[
                    { label: 'Intake Periods', value: intakePeriods },
                    { label: 'Avg. Tuition', value: avgTuition },
                    { label: 'Top Fields', value: topField },
                  ].map(({ label, value }) => (
                    <li key={label} className="flex items-start justify-between gap-2 text-sm">
                      <span className="text-slate-400 shrink-0">{label}</span>
                      <span className="text-slate-800 font-medium text-right">{value}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-start gap-2 rounded-lg bg-blue-50 px-3 py-2 mb-5">
                  <Star className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 font-medium">{keyFact}</p>
                </div>

                <Link
                  href={`/countries/${slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
                >
                  Explore {name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requirements ── */}
      <section className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              What You Need
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Admission Requirements Overview
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              General requirements vary by country and institution. Our counsellors create a tailored checklist for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mergedRequirements.map(({ category, items }) => (
              <div key={category} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">{category}</h3>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-700 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Start Your Study Abroad Journey Today
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Book a free counselling session and let us guide you to your dream university abroad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold text-blue-900 shadow-xl hover:bg-blue-50 transition-colors"
            >
              Free Study Abroad Counselling <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services/loans"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-10 py-4 text-base font-bold text-white hover:bg-white/10 transition-colors"
            >
              Explore Loan Options
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
