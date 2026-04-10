import Link from 'next/link';
import Image from 'next/image';
import {
  Plane,
  Briefcase,
  Camera,
  Heart,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Users,
  Star,
  FileText,
  Languages,
  Banknote,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface VisaCard {
  icon: React.ElementType;
  title: string;
  image: string;
  description: string;
  eligibilityPoints: string[];
  countries?: string[];
  processingTime: string;
  ctaLabel: string;
  gradient: string;
  accentColor: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const visaCards: VisaCard[] = [
  {
    icon: Plane,
    title: 'Permanent Residency (PR) Visa',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80&fit=crop',
    description:
      'Achieve permanent resident status in your preferred destination. Express Entry, PNP, SkillSelect — handled end-to-end by certified advisors.',
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
    gradient: 'from-[#1a3faa] to-[#122d80]',
    accentColor: '#1a3faa',
  },
  {
    icon: Briefcase,
    title: 'Work Visa',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80&fit=crop',
    description:
      'Secure legal work authorisation abroad — through a skilled worker program, LMIA-backed offer, or employer-sponsored pathway.',
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
    gradient: 'from-[#e8321a] to-[#f97316]',
    accentColor: '#e8321a',
  },
  {
    icon: Camera,
    title: 'Visitor / Tourist Visa',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80&fit=crop',
    description:
      'Planning a trip abroad? Our consultants ensure your visitor visa application is accurate, complete, and optimised for first-time approval.',
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
    gradient: 'from-violet-600 to-purple-500',
    accentColor: '#7c3aed',
  },
  {
    icon: Heart,
    title: 'Family & Dependent Visa',
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80&fit=crop',
    description:
      'Reunite with your loved ones. Spousal sponsorship, partner visas, and dependent child applications — handled with care and expertise.',
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
    gradient: 'from-emerald-600 to-teal-500',
    accentColor: '#059669',
  },
];

const highlights = [
  { icon: Shield, label: 'RCIC & MARA Certified Advisors' },
  { icon: Star, label: '98% Visa Approval Rate' },
  { icon: Clock, label: 'Fast-Track Processing Available' },
  { icon: Users, label: '5,000+ Successful Applications' },
];

const requirements = [
  {
    icon: FileText,
    title: 'Documents Required',
    items: [
      'Valid passport (6+ months validity)',
      'National ID / Aadhaar card',
      'Educational certificates (10th, 12th, degree)',
      'Employment letters & payslips',
      'Bank statements (6 months)',
      'Photographs (as per country spec)',
    ],
    gradient: 'bg-blue-gradient',
  },
  {
    icon: Languages,
    title: 'Language Proficiency',
    items: [
      'IELTS — Academic or General (CLB 7 / 6.0)',
      'PTE Academic — 50+ overall score',
      'TOEFL iBT — 80+ overall score',
      'CELPIP — CLB 7 or above',
      'French — TEF Canada (for Quebec pathway)',
      'Certificate validity: 2 years from exam date',
    ],
    gradient: 'bg-orange-gradient',
  },
  {
    icon: Banknote,
    title: 'Financial Proof',
    items: [
      'Settlement funds (CAD 13,757+ for single)',
      'Consistent bank balance for 3–6 months',
      'Fixed deposits / investment proof',
      'No large unexplained transactions',
      'Source of funds documentation',
      'Sponsored funds with donor declaration',
    ],
    gradient: 'from-emerald-600 to-teal-500',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

import { getContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export default async function ImmigrationServicesPage() {
  type CmsVisaCard = { title?: string; description?: string; eligibilityPoints?: string[]; countries?: string[]; processingTime?: string; ctaLabel?: string }
  type CmsRequirement = { title?: string; items?: string[] }
  type CmsContent = { visaCards?: CmsVisaCard[]; requirements?: CmsRequirement[] }

  const cms = await getContent<CmsContent>('service-immigration', {})

  const mergedCards = visaCards.map((card, i) => ({
    ...card,
    ...(cms.visaCards?.[i] || {}),
    icon: card.icon,
    gradient: card.gradient,
    accentColor: card.accentColor,
  }))

  const mergedRequirements = requirements.map((req, i) => ({
    ...req,
    ...(cms.requirements?.[i] || {}),
    icon: req.icon,
    gradient: req.gradient,
  }))
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-brand-gradient text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80&fit=crop"
          alt=""
          fill
          priority
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="animate-blob absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <div className="animate-float-slow absolute bottom-8 -left-16 w-80 h-80 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <div className="animate-spin-slow absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full border border-white/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-36 text-center">
          <span className="animate-fade-in-up inline-flex items-center gap-2 mb-5 rounded-full glass px-5 py-2 text-sm font-semibold tracking-wide uppercase">
            <Shield className="w-4 h-4 text-[#f97316]" />
            Certified Immigration Advisors
          </span>
          <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight max-w-4xl mx-auto">
            Immigration <span className="shimmer-text">Services</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            From PR pathways to family reunification — our certified consultants handle every visa type with precision and care.
          </p>
          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#1a3faa] shadow-2xl hover:bg-blue-50 transition-all hover:scale-105"
            >
              Get Free Assessment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              Talk to an Expert
            </Link>
          </div>

          {/* Highlights */}
          <div className="animate-fade-in-up delay-400 mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="glass rounded-2xl px-4 py-4 flex flex-col items-center gap-2">
                <Icon className="w-5 h-5 text-[#f97316]" />
                <p className="text-xs text-white/85 text-center font-medium leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-16 sm:h-20">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#1a3faa] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#1a3faa] transition-colors">Services</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Immigration</span>
          </nav>
        </div>
      </div>

      {/* ── 4 Visa Type Cards ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">Visa Categories</span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900">
              Choose Your Immigration Pathway
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Our experts assess your profile and recommend the fastest, most reliable route for your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mergedCards.map(({ icon: Icon, title, image, description, eligibilityPoints, countries, processingTime, ctaLabel, gradient }) => (
              <div
                key={title}
                className="card-hover flex flex-col rounded-3xl shadow-lg bg-white overflow-hidden border border-slate-100"
              >
                {/* Image + Gradient header */}
                <div className={`relative bg-gradient-to-br ${gradient} p-7 text-white flex items-start gap-5 overflow-hidden`}>
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover opacity-20"
                  />
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="relative flex-1 min-w-0">
                    <h3 className="text-xl font-extrabold leading-snug">{title}</h3>
                    <p className="text-white/80 text-sm mt-1 leading-relaxed">{description}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 p-7 space-y-5">
                  {/* Countries */}
                  {countries && (
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Available For</p>
                      <div className="flex flex-wrap gap-2">
                        {countries.map((c) => (
                          <span key={c} className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-blue-100 hover:text-[#1a3faa] transition-colors">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Eligibility */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Key Eligibility Criteria</p>
                    <ul className="space-y-2">
                      {eligibilityPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#1a3faa] shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Processing time */}
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                    <Clock className="w-4 h-4 text-[#1a3faa] shrink-0" />
                    <p className="text-sm text-slate-700">
                      <span className="font-bold">Processing Time:</span>{' '}
                      <span className="text-[#e8321a] font-semibold">{processingTime}</span>
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-7 pb-7">
                  <Link
                    href="/assessment"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a3faa] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#122d80] transition-all hover:scale-[1.02]"
                  >
                    {ctaLabel} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requirements Section ── */}
      <section className="bg-blue-gradient py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-blob absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5" />
          <div className="animate-float-slow absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full glass px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 mb-4">
              Documentation
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
              Common Requirements
            </h2>
            <p className="mt-4 text-white/70 max-w-lg mx-auto">
              Most immigration applications require these three pillars. Our team helps you prepare every single one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mergedRequirements.map(({ icon: Icon, title, items, gradient }) => (
              <div key={title} className="glass rounded-3xl p-8 flex flex-col card-hover">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} mb-5 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-4">{title}</h3>
                <ul className="space-y-2.5 flex-1">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-orange-gradient py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-blob absolute -top-16 -right-16 w-80 h-80 rounded-full bg-white/10" />
          <div className="animate-float absolute bottom-0 left-1/4 w-56 h-56 rounded-full bg-white/10" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Ready to Begin Your<br className="hidden sm:block" /> Immigration Journey?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Book your free assessment with a certified immigration advisor today — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold text-[#e8321a] shadow-2xl hover:bg-orange-50 transition-all hover:scale-105"
            >
              Start Free Assessment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full glass border border-white/40 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
