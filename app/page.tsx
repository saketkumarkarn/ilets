'use client';

// CMS-enabled: hero, stats, and FAQ content is fetched from the DB on mount.
// All other sections use hardcoded data (they are not in the CMS).

/**
 * Beyond Borders – Home Page
 *
 * Architecture:
 *   • HeroSection        – client component  (useState, useEffect for word rotation)
 *   • StatsSection       – server-safe component (pure render, no hooks)
 *   • ServicesSection    – server-safe component (pure render, no hooks)
 *   • CountriesSection   – server-safe component (pure render, no hooks)
 *   • WhyUsSection       – server-safe component (pure render, no hooks)
 *   • ProcessSection     – server-safe component (pure render, no hooks)
 *   • TestimonialsSection– client component  (useState for slider)
 *   • FAQSection         – client component  (useState for accordion)
 *   • CTASection         – server-safe component (pure render, no hooks)
 *
 * All in one file as requested. 'use client' at the top is required because
 * HeroSection, TestimonialsSection and FAQSection use React hooks.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plane,
  GraduationCap,
  Building2,
  Star,
  CheckCircle,
  Users,
  TrendingUp,
  Shield,
  HeadphonesIcon,
  ClipboardList,
  FileText,
  Send,
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Clock,
  ThumbsUp,
  Phone,
  MessageCircle,
} from 'lucide-react';

// ─── Static Data ──────────────────────────────────────────────────────────────

const DESTINATIONS = ['Canada', 'Australia', 'UK', 'New Zealand', 'USA', 'Europe'];

const serviceCards = [
  {
    icon: Plane,
    title: 'Immigration Services',
    topGradient: 'linear-gradient(90deg, #1a3faa, #122d80)',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    bullets: [
      'Permanent Residency (PR) applications',
      'Work visa & employer sponsorship',
      'Family & spousal reunification',
      'Citizenship by investment pathways',
    ],
    href: '/services',
    linkColor: 'text-blue-700 hover:text-blue-900',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&fit=crop',
    imageAlt: 'Passport and visa documents',
  },
  {
    icon: GraduationCap,
    title: 'Study Abroad',
    topGradient: 'linear-gradient(90deg, #e8321a, #f97316)',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    bullets: [
      'University selection & applications',
      'Student visa processing',
      'Pre-departure & settlement support',
      'Scholarship guidance & SOP writing',
    ],
    href: '/services',
    linkColor: 'text-orange-600 hover:text-orange-800',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&fit=crop',
    imageAlt: 'Students studying abroad',
  },
  {
    icon: Building2,
    title: 'Loan Assistance',
    topGradient: 'linear-gradient(90deg, #059669, #10b981)',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    bullets: [
      'Education loan guidance',
      'Bank tie-ups & fast approvals',
      'Zero-collateral options available',
      'Forex & international transfers',
    ],
    href: '/loan-assistance',
    linkColor: 'text-emerald-700 hover:text-emerald-900',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&fit=crop',
    imageAlt: 'Banking and finance',
  },
];

const countries = [
  {
    flag: '🇨🇦',
    name: 'Canada',
    highlights: ['Express Entry | PNP Pathways', 'PR within 6–12 months'],
    href: '/countries/canada',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80&fit=crop',
  },
  {
    flag: '🇦🇺',
    name: 'Australia',
    highlights: ['SkillSelect Points System', '485 Graduate Visa'],
    href: '/countries/australia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop',
  },
  {
    flag: '🇬🇧',
    name: 'United Kingdom',
    highlights: ['Skilled Worker Visa', 'Graduate Stay-back 2 yrs'],
    href: '/countries/uk',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80&fit=crop',
  },
  {
    flag: '🇳🇿',
    name: 'New Zealand',
    highlights: ['Accredited Employer Work Visa', 'Quick PR Timelines'],
    href: '/countries/new-zealand',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80&fit=crop',
  },
  {
    flag: '🇺🇸',
    name: 'USA',
    highlights: ['H-1B & O-1 Work Visas', 'OPT & STEM Extension'],
    href: '/countries/usa',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80&fit=crop',
  },
  {
    flag: '🇪🇺',
    name: 'Europe',
    highlights: ['Schengen & EU Blue Card', 'Low Tuition Countries'],
    href: '/countries/europe',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80&fit=crop',
  },
];

const whyUsFeatures = [
  {
    icon: Users,
    title: 'Expert Consultants',
    desc: 'RCIC & MARA certified advisors with hands-on experience across 50+ countries.',
    color: 'bg-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'High Success Rate',
    desc: '98% visa approval rate backed by thousands of successful applications.',
    color: 'bg-orange-500',
  },
  {
    icon: Shield,
    title: 'Transparent Process',
    desc: 'No hidden fees, clear timelines, and regular status updates at every stage.',
    color: 'bg-emerald-600',
  },
  {
    icon: HeadphonesIcon,
    title: 'End-to-End Support',
    desc: 'From first assessment to airport arrival — we stay with you every step.',
    color: 'bg-purple-600',
  },
];

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Free Assessment',
    desc: 'Share your profile and goals for a no-obligation eligibility check.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Document Review',
    desc: 'Our team guides you through every document requirement precisely.',
  },
  {
    number: '03',
    icon: Send,
    title: 'Application Filing',
    desc: 'We prepare and submit a complete, error-free application on your behalf.',
  },
  {
    number: '04',
    icon: Award,
    title: 'Visa Approval',
    desc: 'Receive your visa and get ready for your exciting new life abroad!',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    country: 'Canada 🇨🇦',
    service: 'Express Entry PR',
    rating: 5,
    quote:
      'Beyond Borders made the entire Express Entry process seamless. I got my ITA within 3 months — absolutely outstanding service!',
    date: 'March 2024',
    initials: 'PS',
  },
  {
    name: 'Arjun Mehta',
    country: 'Australia 🇦🇺',
    service: 'Study Abroad',
    rating: 5,
    quote:
      'From university selection to student visa, the team was incredibly supportive and knowledgeable. Got into my dream university!',
    date: 'January 2024',
    initials: 'AM',
  },
  {
    name: 'Sneha Reddy',
    country: 'UK 🇬🇧',
    service: 'Skilled Worker Visa',
    rating: 5,
    quote:
      'My visa was approved in record time. Transparent fees and zero surprises — exactly what I needed. Highly recommend!',
    date: 'February 2024',
    initials: 'SR',
  },
  {
    name: 'Rohit Verma',
    country: 'New Zealand 🇳🇿',
    service: 'AEWV & PR',
    rating: 5,
    quote:
      `The team handled everything from my work visa to PR application flawlessly. Now I'm a permanent resident — thank you Beyond Borders!`,
    date: 'December 2023',
    initials: 'RV',
  },
  {
    name: 'Kavya Nair',
    country: 'Canada 🇨🇦',
    service: 'PNP Stream',
    rating: 5,
    quote:
      'Got my provincial nomination through the Ontario PNP stream. The step-by-step guidance made a complex process feel simple.',
    date: 'November 2023',
    initials: 'KN',
  },
  {
    name: 'Vikram Singh',
    country: 'Europe 🇪🇺',
    service: 'EU Blue Card',
    rating: 5,
    quote:
      'Beyond Borders helped me navigate the Germany Blue Card process. I am now working in Berlin — a dream come true!',
    date: 'October 2023',
    initials: 'VS',
  },
];

const faqs = [
  {
    question: 'What is Express Entry and how does it work?',
    answer:
      `Express Entry is Canada's primary immigration management system for skilled workers. It manages applications for three federal economic programs: FSWP, FSTP, and CEC. Candidates are ranked using the Comprehensive Ranking System (CRS) and the highest-scoring candidates receive an Invitation to Apply (ITA) for permanent residency.`,
  },
  {
    question: 'How long does the PR process take?',
    answer:
      'Processing times vary by country and stream. Canada Express Entry typically takes 6 months after receiving an ITA. Australia skilled migration takes 8–12 months. UK Skilled Worker visas can be decided within 3–8 weeks. Our team provides country-specific timelines during your free assessment.',
  },
  {
    question: 'Can I apply for PR while on a work visa?',
    answer:
      `Yes! In most countries, working legally on a valid work permit strengthens your PR application. For example, Canadian Experience Class (CEC) is specifically designed for those with Canadian work experience. Australia's Employer Nomination Scheme also rewards current workers. Our advisors will map the best PR pathway for your current status.`,
  },
  {
    question: 'What IELTS score do I need for immigration?',
    answer:
      'Requirements vary by country and program. Canada Express Entry typically requires CLB 7+ (IELTS 6.0 in each band). Australia skilled migration requires different scores depending on the occupation. UK Skilled Worker visa requires English proficiency at B1 level or higher. We assess your profile and recommend the optimal target score.',
  },
  {
    question: 'Do you offer education loans without collateral?',
    answer:
      'Yes! We have tie-ups with leading banks and NBFCs that offer collateral-free education loans up to ₹40 lakhs for top-ranked universities abroad. Eligibility depends on the university ranking, course, and your co-applicant\'s income. Book a free consultation to check your loan eligibility.',
  },
  {
    question: 'What documents are needed for a study visa?',
    answer:
      'Core documents typically include: valid passport, university offer letter, proof of financial funds (bank statements), academic transcripts, English language test scores (IELTS/TOEFL/PTE), Statement of Purpose (SOP), and letters of recommendation. Country-specific requirements may include medical exams, police clearance, or biometrics. We provide a personalized checklist.',
  },
  {
    question: 'How much does your consultancy service cost?',
    answer:
      'We offer transparent, fixed-fee packages with no hidden charges. Fees vary based on the country and visa type. The initial assessment and consultation are completely free. Our fees are discussed upfront before you commit to any service. We also offer EMI options for our complete packages.',
  },
  {
    question: 'Do you provide post-visa and settlement support?',
    answer:
      `Absolutely! Our support doesn't end at visa approval. We provide pre-departure orientation sessions, airport pickup coordination, accommodation guidance, SIM card and bank account setup assistance, and ongoing settlement support for your first 3 months abroad. We want you to thrive, not just arrive.`,
  },
];

// ─── 1. HeroSection (client – uses useState + useEffect) ──────────────────────

const DEFAULT_HERO = {
  badge: "India's #1 Immigration Consultants",
  headline: 'Your Dream of Living Abroad Starts Here',
  subtext: 'Expert immigration & study abroad consultants with 10+ years of experience and 5,000+ success stories across 50 countries.',
  destinations: DESTINATIONS,
  cta1: 'Start Free Assessment',
  cta2: 'Call Now',
  trustItems: ['5000+ Visas', '98% Success', '10+ Years'],
};

function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [qaName, setQaName] = useState('');
  const [qaEmail, setQaEmail] = useState('');
  const [qaPhone, setQaPhone] = useState('');
  const [qaService, setQaService] = useState('');
  const [qaStatus, setQaStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hero, setHero] = useState(DEFAULT_HERO);

  useEffect(() => {
    fetch('/api/content/hero', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => { if (data.content) setHero({ ...DEFAULT_HERO, ...data.content }) })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % (hero.destinations?.length || DESTINATIONS.length));
        setVisible(true);
      }, 400);
    }, 2000);
    return () => clearInterval(interval);
  }, [hero.destinations]);

  async function handleQuickAssessment(e: React.FormEvent) {
    e.preventDefault();
    if (!qaName.trim() || !qaService) return;
    setQaStatus('loading');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: qaName, email: qaEmail, phone: qaPhone, service: qaService, message: 'Quick assessment request from homepage' }),
      });
      const data = await res.json();
      setQaStatus(data.success ? 'success' : 'error');
    } catch {
      setQaStatus('error');
    }
  }

  return (
    <section
      className="relative overflow-hidden min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #1a3faa 0%, #e8321a 60%, #f97316 100%)' }}
    >
      {/* Background airport photo */}
      <Image
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80&fit=crop"
        alt=""
        fill
        priority
        className="object-cover opacity-10"
      />

      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl animate-blob"
          style={{ background: '#f97316' }}
        />
        <div
          className="absolute bottom-20 -left-32 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl animate-blob delay-300"
          style={{ background: '#ffffff' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{ background: '#ffffff' }}
        />
      </div>

      {/* Main content */}
      <div className="relative flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-16 pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Left column */}
        <div className="flex-1 text-white animate-fade-in-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm font-semibold">
            <span>🏆</span>
            <span>{hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4">
            {hero.headline}
          </h1>

          {/* Animated destination */}
          <div className="flex items-center gap-3 mb-2 text-xl sm:text-2xl font-bold text-white/80">
            <span>🌍 Destinations:</span>
            <span
              className="inline-block transition-all duration-300"
              style={{
                color: '#f97316',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              {(hero.destinations ?? DESTINATIONS)[wordIndex]}
            </span>
          </div>

          <p className="mt-4 text-lg sm:text-xl text-blue-100 max-w-xl leading-relaxed">
            {hero.subtext}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#1a3faa] shadow-2xl hover:bg-orange-50 hover:scale-105 transition-all duration-200"
            >
              {hero.cta1 ?? 'Start Free Assessment'}
            </Link>
            <a
              href="tel:+919999999999"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              {hero.cta2 ?? 'Call Now'}
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-white/90">
            {(hero.trustItems ?? DEFAULT_HERO.trustItems).map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-300" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — floating card */}
        <div className="flex-1 flex items-center justify-center relative min-h-[380px] w-full max-w-md lg:max-w-none animate-fade-in-right">
          {/* Blobs behind card */}
          <div
            className="absolute top-0 right-4 w-48 h-48 rounded-full opacity-30 blur-2xl"
            style={{ background: '#f97316' }}
          />
          <div
            className="absolute bottom-8 left-4 w-40 h-40 rounded-full opacity-25 blur-2xl"
            style={{ background: '#1a3faa' }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full opacity-20 blur-2xl"
            style={{ background: '#ffffff' }}
          />

          {/* Card */}
          <div className="relative z-10 animate-float w-full max-w-sm mx-auto">
            {/* Shadow card behind */}
            <div
              className="absolute inset-0 rounded-2xl translate-x-3 translate-y-3 opacity-40"
              style={{ background: 'rgba(0,0,0,0.3)' }}
            />
            <div className="relative rounded-2xl glass p-6 shadow-2xl border border-white/30">
              <h3 className="text-white font-bold text-lg mb-1">Quick Assessment</h3>
              <p className="text-white/70 text-sm mb-5">Get your eligibility checked free in 24 hrs</p>

              {qaStatus === 'success' ? (
                <div className="py-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-400/20 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7 text-green-300" />
                  </div>
                  <p className="text-white font-bold text-base mb-1">Request Received!</p>
                  <p className="text-white/70 text-sm">We'll contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleQuickAssessment} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={qaName}
                    onChange={(e) => setQaName(e.target.value)}
                    required
                    className="w-full rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={qaEmail}
                    onChange={(e) => setQaEmail(e.target.value)}
                    required
                    className="w-full rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={qaPhone}
                    onChange={(e) => setQaPhone(e.target.value)}
                    required
                    className="w-full rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <select
                    value={qaService}
                    onChange={(e) => setQaService(e.target.value)}
                    required
                    className="w-full rounded-xl bg-white/20 border border-white/30 text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="" className="text-slate-900">Select Service</option>
                    <option value="Permanent Residency" className="text-slate-900">Permanent Residency</option>
                    <option value="Study Abroad" className="text-slate-900">Study Abroad</option>
                    <option value="Work Visa" className="text-slate-900">Work Visa</option>
                    <option value="Loan Assistance" className="text-slate-900">Loan Assistance</option>
                  </select>
                  {qaStatus === 'error' && (
                    <p className="text-red-300 text-xs">Something went wrong. Please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={qaStatus === 'loading'}
                    className="w-full rounded-xl py-3 font-bold text-sm transition-all duration-200 hover:scale-105 disabled:opacity-60"
                    style={{ background: 'linear-gradient(90deg, #f97316, #e8321a)', color: '#fff' }}
                  >
                    {qaStatus === 'loading' ? 'Submitting…' : 'Get Free Assessment →'}
                  </button>
                </form>
              )}

              <div className="mt-4 flex items-center justify-center gap-1 text-white/70 text-xs">
                <Shield className="w-3.5 h-3.5" />
                <span>100% Free &amp; Confidential</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="wave-bottom">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

// ─── 2. StatsSection (fetches from CMS) ──────────────────────────────────────

const DEFAULT_STAT_ITEMS = [
  { value: '10+', label: 'Years Experience', icon: Clock },
  { value: '5000+', label: 'Visas Approved', icon: CheckCircle },
  { value: '50+', label: 'Countries Served', icon: Globe },
  { value: '98%', label: 'Success Rate', icon: ThumbsUp },
];

const STAT_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock, CheckCircle, Globe, ThumbsUp,
};

function StatsSection() {
  const [statItems, setStatItems] = useState(DEFAULT_STAT_ITEMS);

  useEffect(() => {
    fetch('/api/content/stats', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.content)) {
          setStatItems(data.content.map((s: { value: string; label: string; icon?: string }, i: number) => ({
            value: s.value ?? DEFAULT_STAT_ITEMS[i]?.value,
            label: s.label ?? DEFAULT_STAT_ITEMS[i]?.label,
            icon: STAT_ICON_MAP[s.icon ?? ''] ?? DEFAULT_STAT_ITEMS[i]?.icon,
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-blue-gradient py-16 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-white/10">
          {statItems.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
            >
              <Icon className="w-8 h-8 mb-3" style={{ color: '#f97316' }} />
              <span className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#f97316' }}>
                {value}
              </span>
              <span className="mt-2 text-sm sm:text-base font-medium text-blue-100">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. ServicesSection (server-safe – no hooks) ──────────────────────────────

function ServicesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: '#1a3faa' }}
          >
            What We Offer
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Our Services
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-base sm:text-lg">
            Comprehensive support for every step of your immigration or study-abroad journey.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map(({ icon: Icon, title, topGradient, iconBg, iconColor, bullets, href, linkColor, image, imageAlt }) => (
            <div
              key={title}
              className="card-hover flex flex-col rounded-2xl shadow-xl bg-white overflow-hidden"
            >
              {/* Image with gradient overlay */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 opacity-80"
                  style={{ background: topGradient }}
                />
              </div>

              <div className="flex flex-col flex-1 p-8">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 ${iconBg}`}>
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>

                <ul className="flex-1 space-y-2.5 mb-6">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-slate-600 text-sm">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className={`inline-flex items-center gap-1 text-sm font-bold transition-colors ${linkColor}`}
                >
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. CountriesSection (server-safe – no hooks) ─────────────────────────────

function CountriesSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: '#e8321a' }}
          >
            Where We Help You Go
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Top Destinations
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-base sm:text-lg">
            Explore opportunities in the world&apos;s most sought-after immigration destinations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map(({ flag, name, highlights, href, image }) => (
            <div
              key={name}
              className="card-hover bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              {/* Country image */}
              <Image
                src={image}
                alt={`${name} landmark`}
                width={400}
                height={200}
                className="w-full h-40 object-cover rounded-t-2xl"
              />

              <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl leading-none">{flag}</span>
                <h3 className="text-xl font-bold text-slate-900">{name}</h3>
              </div>

              <ul className="flex-1 space-y-2 mb-5">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#f97316' }} />
                    {h}
                  </li>
                ))}
              </ul>

              <Link
                href={href}
                className="mt-auto inline-flex items-center gap-1 text-sm font-bold transition-colors"
                style={{ color: '#f97316' }}
              >
                Explore →
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. WhyUsSection (server-safe – no hooks) ─────────────────────────────────

const awards = [
  { icon: '🏅', label: 'ICCRC Registered' },
  { icon: '⭐', label: 'MARA Agent' },
  { icon: '🌟', label: '4.9★ Google Rating' },
  { icon: '🏆', label: 'Top Rated 2024' },
];

function WhyUsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div>
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: '#1a3faa' }}
            >
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
              10 Years of Making
              <br />
              <span className="text-brand-gradient">Immigration Dreams</span>
              <br />
              Come True
            </h2>

            <div className="space-y-6">
              {whyUsFeatures.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex gap-5 items-start group">
                  <div
                    className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-2xl ${color} shadow-md group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white shadow-lg hover:scale-105 transition-all duration-200"
              style={{ background: 'linear-gradient(90deg, #1a3faa, #e8321a)' }}
            >
              Learn About Us →
            </Link>
          </div>

          {/* Right — awards panel */}
          <div className="relative">
            {/* Main dark box */}
            <div
              className="rounded-3xl p-8 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #0f1f6e 0%, #1a3faa 100%)' }}
            >
              <h3 className="text-white font-bold text-xl mb-6">Our Credentials &amp; Awards</h3>

              <div className="grid grid-cols-2 gap-4">
                {awards.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="glass rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-200"
                  >
                    <div className="text-3xl mb-2">{icon}</div>
                    <p className="text-white font-semibold text-sm">{label}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['PS', 'AM', 'RV'].map((init) => (
                      <div
                        key={init}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white/30"
                        style={{ background: 'linear-gradient(135deg, #e8321a, #f97316)' }}
                      >
                        {init}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">5,000+ Happy Clients</p>
                    <p className="text-blue-300 text-xs">Trusted since 2014</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-4 rounded-2xl px-5 py-3 shadow-xl animate-float-slow"
              style={{ background: 'linear-gradient(135deg, #f97316, #e8321a)' }}
            >
              <p className="text-white font-extrabold text-lg">98%</p>
              <p className="text-white/90 text-xs font-medium">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. ProcessSection (server-safe – no hooks) ───────────────────────────────

function ProcessSection() {
  return (
    <section className="bg-brand-gradient py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-orange-300">
            Simple &amp; Clear
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            How It Works
          </h2>
          <p className="mt-4 text-blue-100 max-w-xl mx-auto">
            Our streamlined 4-step process takes you from assessment to visa approval.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Dashed connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-12 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] border-t-2 border-dashed border-white/30"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map(({ number, icon: Icon, title, desc }) => (
              <div key={number} className="flex flex-col items-center text-center">
                {/* Circle */}
                <div className="relative z-10 mb-6">
                  <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center shadow-xl backdrop-blur-sm">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shadow-lg"
                    style={{ background: '#f97316', color: '#fff' }}
                  >
                    {number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold shadow-2xl hover:bg-orange-50 hover:scale-105 transition-all duration-200"
            style={{ color: '#1a3faa' }}
          >
            Start Your Assessment →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── 7. TestimonialsSection (client – uses useState) ──────────────────────────

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  const visible = testimonials.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: '#e8321a' }}
          >
            Real Results
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Success Stories
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Thousands of families have trusted Beyond Borders. Here are a few of their stories.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map(({ name, country, service, rating, quote, date, initials }) => (
              <div
                key={name}
                className="card-hover flex flex-col rounded-2xl shadow-lg bg-white border border-slate-100 p-8"
              >
                {/* Quote mark */}
                <div
                  className="text-5xl font-serif leading-none mb-3 font-extrabold"
                  style={{ color: '#f97316' }}
                >
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 text-slate-600 text-sm leading-relaxed italic mb-6">
                  {quote}
                </blockquote>

                {/* Footer */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1a3faa, #e8321a)' }}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">{name}</p>
                    <p className="text-xs text-slate-500">{country} · {date}</p>
                    <span
                      className="inline-block mt-1 text-xs font-semibold rounded-full px-2.5 py-0.5"
                      style={{ background: '#eff6ff', color: '#1a3faa' }}
                    >
                      {service}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110"
              style={{ borderColor: '#1a3faa', color: '#1a3faa' }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: currentIndex === i ? 24 : 8,
                    height: 8,
                    background: currentIndex === i ? '#1a3faa' : '#cbd5e1',
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110"
              style={{ borderColor: '#1a3faa', color: '#1a3faa' }}
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 8. FAQSection (client – uses useState, fetches from CMS) ────────────────

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqItems, setFaqItems] = useState(faqs);

  useEffect(() => {
    fetch('/api/content/faq', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.content)) {
          // CMS stores as { q, a }, component uses { question, answer }
          setFaqItems(data.content.map((f: { q?: string; question?: string; a?: string; answer?: string }) => ({
            question: f.question ?? f.q ?? '',
            answer: f.answer ?? f.a ?? '',
          })));
        }
      })
      .catch(() => {});
  }, []);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: '#1a3faa' }}
          >
            Got Questions?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Everything you need to know about our services and the immigration process.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqItems.map(({ question, answer }, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors duration-150 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">{question}</span>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {/* Answer — smooth reveal */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? 300 : 0 }}
                >
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm mb-4">Still have questions? We&apos;re here to help.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white shadow-lg hover:scale-105 transition-all duration-200"
            style={{ background: 'linear-gradient(90deg, #1a3faa, #e8321a)' }}
          >
            Contact Us →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── 9. CTASection (server-safe – no hooks) ───────────────────────────────────

function CTASection() {
  return (
    <section className="bg-brand-gradient py-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block glass rounded-full px-5 py-2 text-sm font-semibold text-white mb-6">
          🚀 Start Your Journey Today
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
          Ready to Begin Your
          <br />
          <span className="shimmer-text">Immigration Journey?</span>
        </h2>

        <p className="text-lg text-blue-100 mb-10 max-w-xl mx-auto">
          Join 5,000+ families who trusted Beyond Borders to make their dream of living abroad a
          reality.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold shadow-2xl hover:bg-orange-50 hover:scale-105 transition-all duration-200"
            style={{ color: '#1a3faa' }}
          >
            Get Free Assessment
          </Link>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white px-10 py-4 text-base font-bold text-white hover:bg-white/10 transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5" style={{ color: '#25d366' }} />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Main Export (no 'use client' — composes all sections) ────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <CountriesSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
