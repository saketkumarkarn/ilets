import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Calendar,
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Shield,
  Award,
  CheckCircle,
  ArrowRight,
  Globe,
  BadgeCheck,
  ExternalLink,
  Star,
  Zap,
  DollarSign,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Beyond Borders',
  description:
    'Learn about Beyond Borders — our story, mission, values, and the expert team helping thousands build their lives abroad since 2014.',
};

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: '10+', label: 'Years in Business', icon: Calendar },
  { value: '5000+', label: 'Happy Clients', icon: Users },
  { value: '50+', label: 'Countries Covered', icon: Globe },
  { value: '98%', label: 'Success Rate', icon: TrendingUp },
];

const mvv = [
  {
    icon: Target,
    label: 'Our Mission',
    text: 'To make international immigration and education accessible to every aspiring individual through honest guidance, expert knowledge, and unwavering support.',
    gradient: 'from-[#1a3faa] to-[#122d80]',
    iconBg: 'bg-blue-600',
    border: 'border-t-4 border-[#1a3faa]',
  },
  {
    icon: Eye,
    label: 'Our Vision',
    text: 'To be the most trusted immigration consultancy in Asia, recognised globally for our ethical practices, high success rates, and client-first approach.',
    gradient: 'from-[#e8321a] to-[#f97316]',
    iconBg: 'bg-orange-500',
    border: 'border-t-4 border-[#e8321a]',
  },
  {
    icon: Heart,
    label: 'Our Values',
    text: 'Integrity, Transparency, Excellence, and Empathy — these are the pillars that guide every consultation, every document, and every milestone we achieve together.',
    gradient: 'from-emerald-600 to-teal-500',
    iconBg: 'bg-emerald-500',
    border: 'border-t-4 border-emerald-500',
  },
];

const whyUs = [
  {
    icon: Users,
    title: 'Expert Team',
    desc: 'Certified ICCRC & MARA advisors with a decade of hands-on experience across 50+ countries.',
  },
  {
    icon: TrendingUp,
    title: 'High Success Rate',
    desc: 'Our meticulous preparation and expert review process delivers a 98% visa approval rate.',
  },
  {
    icon: Shield,
    title: 'Transparent Process',
    desc: 'No hidden costs. No vague timelines. You always know exactly where your application stands.',
  },
  {
    icon: Zap,
    title: 'End-to-End Support',
    desc: 'From first assessment to post-landing settlement — we are with you at every single step.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    desc: 'Partnerships with universities, legal firms, and immigration bodies across 50+ countries.',
  },
  {
    icon: DollarSign,
    title: 'Affordable Fees',
    desc: 'Transparent, competitive pricing with flexible payment options to suit every budget.',
  },
];

const team = [
  {
    name: 'Rajiv Anand',
    role: 'Founder & CEO',
    initials: 'RA',
    bio: '15+ years in global immigration law. Former ICCRC board member.',
    bg: 'from-[#1a3faa] to-[#122d80]',
  },
  {
    name: 'Meera Patel',
    role: 'Head of Immigration',
    initials: 'MP',
    bio: 'Specialist in Express Entry & Australian SkillSelect with 1,000+ approvals.',
    bg: 'from-[#e8321a] to-[#f97316]',
  },
  {
    name: 'Sanjay Verma',
    role: 'Study Abroad Director',
    initials: 'SV',
    bio: 'Counselled 2,000+ students into top-100 universities across 20+ countries.',
    bg: 'from-emerald-600 to-teal-500',
  },
  {
    name: 'Anjali Singh',
    role: 'Senior Visa Consultant',
    initials: 'AS',
    bio: 'Family reunification & spousal visa expert. Multilingual advisor.',
    bg: 'from-violet-600 to-purple-500',
  },
];

const certifications = [
  {
    code: 'ICCRC',
    name: 'Immigration Consultants of Canada Regulatory Council',
    desc: 'Officially regulated by the Government of Canada to practise immigration consulting.',
    icon: BadgeCheck,
    color: 'border-l-[#1a3faa]',
    iconColor: 'text-[#1a3faa]',
  },
  {
    code: 'MARA',
    name: 'Migration Agents Registration Authority (Australia)',
    desc: 'Registered migration agent authorised to provide Australian immigration advice.',
    icon: Award,
    color: 'border-l-[#e8321a]',
    iconColor: 'text-[#e8321a]',
  },
  {
    code: 'AIRC',
    name: 'American Immigration Representation Council',
    desc: 'Recognised representative body for immigration professionals serving US pathways.',
    icon: Shield,
    color: 'border-l-emerald-500',
    iconColor: 'text-emerald-500',
  },
  {
    code: 'ISO 9001',
    name: 'ISO 9001:2015 Quality Management System',
    desc: 'Internationally certified quality management — consistent, reliable service delivery.',
    icon: Star,
    color: 'border-l-amber-500',
    iconColor: 'text-amber-500',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-brand-gradient text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div
            className="animate-blob absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          />
          <div
            className="animate-blob absolute bottom-10 -left-20 w-80 h-80 rounded-full opacity-20"
            style={{ background: 'rgba(255,255,255,0.1)', animationDelay: '2s' }}
          />
          <div className="animate-spin-slow absolute top-1/2 right-1/4 w-64 h-64 rounded-full border border-white/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-36 text-center">
          <span className="animate-fade-in-up inline-flex items-center gap-2 mb-5 rounded-full glass px-5 py-2 text-sm font-semibold tracking-wide uppercase">
            <Star className="w-4 h-4 text-[#f97316]" />
            Trusted Since 2014
          </span>
          <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight max-w-4xl mx-auto">
            About{' '}
            <span className="shimmer-text">Beyond Borders</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            A decade of turning dreams into destinations — one life-changing visa at a time.
          </p>
          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#1a3faa] shadow-2xl hover:bg-blue-50 transition-all hover:scale-105"
            >
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* White wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="block w-full h-16 sm:h-20"
          >
            <path
              d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <span className="inline-block text-[#1a3faa] font-semibold text-sm uppercase tracking-widest mb-3">
                Our Story
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                10 Years of Turning{' '}
                <span className="text-brand-gradient">Dreams Into Reality</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5 text-lg">
                Founded in 2014 and headquartered in New Delhi, Beyond Borders has grown from a single-room consultancy into one of India&apos;s leading immigration and study-abroad firms — with offices in Mumbai, Bengaluru, and Hyderabad.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                We serve clients across the country — and the globe — with a dedicated team of ICCRC and MARA certified advisors who bring genuine expertise and unwavering commitment to every case.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Whether you&apos;re a student eyeing a world-class university, a skilled professional seeking permanent residency, or a family looking to reunite abroad — Beyond Borders has a proven pathway for you.
              </p>
              <Link
                href="#team"
                className="inline-flex items-center gap-2 rounded-full bg-[#1a3faa] px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#122d80] transition-all hover:scale-105"
              >
                Meet Our Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: stats card */}
            <div className="relative">
              <div className="relative bg-blue-gradient rounded-3xl p-10 text-white shadow-2xl overflow-hidden">
                {/* Background office photo */}
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&fit=crop"
                  alt=""
                  fill
                  className="object-cover opacity-20"
                />
                <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white/70 text-xs uppercase tracking-widest">By the numbers</p>
                    <p className="font-bold text-lg">Beyond Borders Impact</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map(({ value, label, icon: Icon }) => (
                    <div
                      key={label}
                      className="glass rounded-2xl p-5 text-center group hover:bg-white/20 transition-all"
                    >
                      <Icon className="w-5 h-5 text-[#f97316] mx-auto mb-2" />
                      <p className="text-3xl font-extrabold text-[#f97316]">{value}</p>
                      <p className="text-xs text-blue-100 mt-1 leading-snug">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Badges */}
                <div className="flex gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-4 py-2 text-xs font-semibold">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#f97316]" /> ICCRC Registered
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-4 py-2 text-xs font-semibold">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#f97316]" /> MARA Agent
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-4 py-2 text-xs font-semibold">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#f97316]" /> ISO 9001:2015
                  </span>
                </div>
              </div>
              </div>

              {/* floating meta badge */}
              <div className="absolute -bottom-5 -left-5 flex items-center gap-3 bg-white rounded-2xl shadow-xl px-5 py-3.5 border border-slate-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a3faa] text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">HQ</p>
                  <p className="text-sm font-bold text-slate-900">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Values ── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">What Drives Us</span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900">
              Mission, Vision &amp; Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mvv.map(({ icon: Icon, label, text, border, iconBg }) => (
              <div
                key={label}
                className={`card-hover bg-white rounded-3xl p-8 shadow-sm flex flex-col ${border}`}
              >
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} text-white shadow-md`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{label}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-brand-gradient py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-blob absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'white' }} />
          <div className="animate-float-slow absolute bottom-0 left-10 w-64 h-64 rounded-full opacity-10" style={{ background: 'white' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full glass px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 mb-4">
              Our Edge
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
              Why Choose Beyond Borders?
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">
              Six reasons 5,000+ families have trusted us with their biggest life decision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="card-hover glass rounded-2xl p-7 flex gap-5"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[#f97316]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section id="team" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">The Experts</span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900">Meet Our Experts</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Certified consultants who bring deep expertise, genuine empathy, and a passion for helping people achieve their global dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(({ name, role, initials, bio, bg }) => (
              <div
                key={name}
                className="card-hover flex flex-col items-center text-center rounded-3xl border border-slate-100 p-8 shadow-sm bg-white group"
              >
                {/* Avatar */}
                <div className={`mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${bg} text-white text-2xl font-extrabold shadow-lg ring-4 ring-offset-2 ring-slate-100 group-hover:ring-[#1a3faa]/20 transition-all`}>
                  {initials}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{name}</h3>
                <p className="mt-1 text-sm font-semibold text-[#1a3faa]">{role}</p>
                <p className="mt-3 text-xs text-slate-500 leading-relaxed">{bio}</p>
                <div className="mt-5 flex items-center justify-center">
                  <button
                    aria-label={`LinkedIn profile of ${name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1a3faa]/10 text-[#1a3faa] hover:bg-[#1a3faa] hover:text-white transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">Accreditations</span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900">
              Our Certifications &amp; Memberships
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Officially certified by the world&apos;s leading immigration regulatory bodies — your case is always in accredited hands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certifications.map(({ code, name, desc, icon: Icon, color, iconColor }) => (
              <div
                key={code}
                className={`card-hover flex items-start gap-5 bg-white rounded-2xl px-7 py-6 shadow-sm border-l-4 ${color}`}
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 ${iconColor}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-extrabold text-slate-900 text-lg">{code}</p>
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-xs font-medium text-slate-500 mb-1">{name}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-orange-gradient py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-blob absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10" />
          <div className="animate-float absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-white/10" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Start Your Immigration Journey Today
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Join 5,000+ individuals who trusted Beyond Borders to open the door to their new life abroad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold text-[#e8321a] shadow-2xl hover:bg-orange-50 transition-all hover:scale-105"
            >
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full glass border-2 border-white/50 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
