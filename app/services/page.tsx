import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services – Immigration, Study Abroad & Education Loans',
  description: 'Explore Beyond Borders\' services: immigration consulting for Canada, Australia & UK; study abroad guidance; and education loan assistance up to ₹75 lakhs.',
  alternates: { canonical: 'https://beyondbordersimmigration.in/services' },
  openGraph: {
    title: 'Services | Beyond Borders',
    description: 'Immigration consulting, study abroad & education loans. Expert guidance for your global journey.',
    url: 'https://beyondbordersimmigration.in/services',
  },
};
import {
  Plane,
  GraduationCap,
  Building2,
  CheckCircle,
  ArrowRight,
  Globe,
  Briefcase,
  Users,
  BookOpen,
  FileText,
  ChevronRight,
  Clock,
  MessageCircle,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceCard {
  icon: React.ElementType;
  title: string;
  tagline: string;
  items: string[];
  href: string;
  gradientClass: string;
  iconBg: string;
  learnHref: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const serviceCards: ServiceCard[] = [
  {
    icon: Plane,
    title: 'Immigration',
    tagline: 'Navigate global pathways with certified advisors',
    items: ['PR Visa', 'Work Visa', 'Tourist Visa', 'Family Visa'],
    href: '/services/immigration',
    gradientClass: 'bg-blue-gradient',
    iconBg: 'bg-white/20',
    learnHref: '/services/immigration',
  },
  {
    icon: GraduationCap,
    title: 'Study Abroad',
    tagline: 'From application to arrival — full support',
    items: [
      'Country Selection',
      'Course Counselling',
      'Admissions',
      'SOP / LOR',
      'Visa Filing',
      'Pre-departure',
    ],
    href: '/services/study-abroad',
    gradientClass: 'bg-orange-gradient',
    iconBg: 'bg-white/20',
    learnHref: '/services/study-abroad',
  },
  {
    icon: Building2,
    title: 'Loan Assistance',
    tagline: 'Fund your future without financial stress',
    items: [
      'Education Loan',
      'With Collateral',
      'Without Collateral',
      'Bank Tie-ups',
    ],
    href: '/loan-assistance',
    gradientClass: 'from-emerald-600 to-teal-500',
    iconBg: 'bg-white/20',
    learnHref: '/loan-assistance',
  },
];

const processSteps = [
  {
    icon: FileText,
    step: '01',
    title: 'Free Assessment',
    desc: 'Share your profile and goals. Our experts evaluate your eligibility at zero cost.',
    color: 'text-[#1a3faa]',
    dot: 'bg-[#1a3faa]',
  },
  {
    icon: BookOpen,
    step: '02',
    title: 'Personalised Plan',
    desc: 'Receive a tailored roadmap with clear timelines, documents, and next steps.',
    color: 'text-[#e8321a]',
    dot: 'bg-[#e8321a]',
  },
  {
    icon: Briefcase,
    step: '03',
    title: 'Application Filing',
    desc: 'Our team prepares and files a complete, error-free application on your behalf.',
    color: 'text-[#f97316]',
    dot: 'bg-[#f97316]',
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Visa Approval',
    desc: 'Celebrate your approval! We support you through arrival and settlement too.',
    color: 'text-emerald-600',
    dot: 'bg-emerald-500',
  },
];

const stats = [
  { icon: Globe, label: 'Countries Covered', value: '50+' },
  { icon: Users, label: 'Happy Clients', value: '5,000+' },
  { icon: Briefcase, label: 'Years Experience', value: '10+' },
  { icon: CheckCircle, label: 'Success Rate', value: '98%' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-brand-gradient text-white overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="animate-blob absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <div className="animate-float-slow absolute bottom-10 -left-20 w-72 h-72 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <div className="animate-spin-slow absolute top-1/2 left-1/3 w-56 h-56 rounded-full border border-white/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-36 text-center">
          <span className="animate-fade-in-up inline-flex items-center gap-2 mb-5 rounded-full glass px-5 py-2 text-sm font-semibold tracking-wide uppercase">
            <Clock className="w-4 h-4 text-[#f97316]" />
            Beyond Borders — Full-Spectrum Support
          </span>
          <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight max-w-4xl mx-auto">
            Our <span className="shimmer-text">Services</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Immigration, study abroad, and education loan assistance — everything you need under one roof, handled by certified experts.
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
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-16 sm:h-20">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center py-8 px-6 text-center">
                <Icon className="w-6 h-6 text-[#1a3faa] mb-2" />
                <p className="text-3xl font-extrabold text-brand-gradient">{value}</p>
                <p className="text-sm text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900">
              Comprehensive Services, Tailored for You
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Whether you&apos;re immigrating for work, pursuing higher education, or need financial support — we have you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map(({ icon: Icon, title, tagline, items, gradientClass, learnHref }) => (
              <div
                key={title}
                className="card-hover flex flex-col rounded-3xl overflow-hidden shadow-lg bg-white"
              >
                {/* Gradient header */}
                <div className={`bg-gradient-to-br ${gradientClass} p-8 text-white`}>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 mb-5 shadow-lg">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-1">{title}</h3>
                  <p className="text-white/80 text-sm">{tagline}</p>
                </div>

                {/* Items list */}
                <div className="flex-1 p-7">
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item}>
                        <Link
                          href={learnHref}
                          className="flex items-center justify-between group rounded-xl bg-slate-50 hover:bg-blue-50 px-4 py-3 transition-all"
                        >
                          <span className="text-slate-700 text-sm font-medium group-hover:text-[#1a3faa] transition-colors">
                            {item}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1a3faa] transition-colors" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer CTA */}
                <div className="px-7 pb-7">
                  <Link
                    href={learnHref}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a3faa] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#122d80] transition-all hover:scale-[1.02]"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Section: How It Works ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">
              Simple &amp; Transparent
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900">
              How It Works
            </h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">
              Four streamlined steps from your first consultation to your life abroad.
            </p>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:flex items-start gap-0 relative">
            {/* connector line */}
            <div className="absolute top-10 left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] h-0.5 bg-slate-200 z-0" />
            {processSteps.map(({ icon: Icon, step, title, desc, color, dot }, i) => (
              <div key={step} className="relative flex-1 flex flex-col items-center text-center px-4 z-10">
                {/* Step circle */}
                <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-white border-2 border-slate-200 shadow-lg mb-5 ${color}`}>
                  <Icon className="w-9 h-9" />
                  <span className={`absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full ${dot} text-white text-xs font-extrabold shadow`}>
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="flex flex-col gap-6 lg:hidden">
            {processSteps.map(({ icon: Icon, step, title, desc, color, dot }) => (
              <div key={step} className="flex gap-5 items-start">
                <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white border-2 border-slate-200 shadow-md ${color}`}>
                  <Icon className="w-7 h-7" />
                  <span className={`absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full ${dot} text-white text-[10px] font-extrabold`}>
                    {step}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="bg-brand-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-blob absolute -top-10 right-0 w-80 h-80 rounded-full bg-white/10" />
          <div className="animate-float absolute bottom-0 left-10 w-48 h-48 rounded-full bg-white/10" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-[#f97316]" />
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Not sure which service you need?<br className="hidden sm:block" /> Talk to our expert for free.
          </h2>
          <p className="text-white/75 text-lg mb-10">
            Book a free 30-minute consultation — no commitment, just clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold text-[#1a3faa] shadow-2xl hover:bg-blue-50 transition-all hover:scale-105"
            >
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full glass border border-white/40 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
