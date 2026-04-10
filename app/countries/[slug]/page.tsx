export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getContent } from '@/lib/content';
import {
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Building,
  Globe,
  TrendingUp,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CountryData {
  name: string;
  flag: string;
  heroImage: string;
  heroHeadline: string;
  description: string;
  prRequirements: string[];
  studyRequirements: string[];
  popularCities: string[];
  topUniversities: string[];
  averageCost: {
    tuition: string;
    living: string;
    total: string;
  };
  processingTime: {
    pr: string;
    studentVisa: string;
  };
  keyFacts: { label: string; value: string }[];
}

// ─── Country Data ─────────────────────────────────────────────────────────────

const countryData: Record<string, CountryData> = {
  canada: {
    name: 'Canada',
    flag: '🇨🇦',
    heroImage: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1600&q=80&fit=crop',
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
    averageCost: {
      tuition: '₹12 – ₹25 L per year',
      living: '₹7 – ₹12 L per year',
      total: '₹19 – ₹37 L per year',
    },
    processingTime: {
      pr: '6 – 12 months (Express Entry)',
      studentVisa: '4 – 8 weeks',
    },
    keyFacts: [
      { label: 'PR Pathway', value: 'Express Entry, PNP, Atlantic IP' },
      { label: 'Post-Study Work', value: 'PGWP — up to 3 years' },
      { label: 'Intakes', value: 'January & September (May optional)' },
      { label: 'Currency', value: 'Canadian Dollar (CAD)' },
      { label: 'Language', value: 'English & French' },
      { label: 'Lifestyle', value: 'Multicultural, safe, high-quality' },
    ],
  },
  australia: {
    name: 'Australia',
    flag: '🇦🇺',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&fit=crop',
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
    averageCost: {
      tuition: '₹15 – ₹30 L per year',
      living: '₹10 – ₹18 L per year',
      total: '₹25 – ₹48 L per year',
    },
    processingTime: {
      pr: '8 – 18 months',
      studentVisa: '4 – 6 weeks',
    },
    keyFacts: [
      { label: 'PR Pathway', value: 'Skilled Independent (189), State-Sponsored (190)' },
      { label: 'Post-Study Work', value: 'Graduate Visa 485 — 2–4 years' },
      { label: 'Intakes', value: 'February & July' },
      { label: 'Currency', value: 'Australian Dollar (AUD)' },
      { label: 'Language', value: 'English' },
      { label: 'Lifestyle', value: 'Outdoor, multicultural, safe' },
    ],
  },
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80&fit=crop',
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
    averageCost: {
      tuition: '₹15 – ₹35 L per year',
      living: '₹10 – ₹20 L per year',
      total: '₹25 – ₹55 L per year',
    },
    processingTime: {
      pr: 'ILR after 5 years (Skilled Worker)',
      studentVisa: '3 – 6 weeks',
    },
    keyFacts: [
      { label: 'PR Pathway', value: 'Skilled Worker → ILR after 5 years' },
      { label: 'Post-Study Work', value: 'Graduate Route — 2 years' },
      { label: 'Intakes', value: 'September & January' },
      { label: 'Currency', value: 'British Pound (GBP)' },
      { label: 'Language', value: 'English' },
      { label: 'Lifestyle', value: 'Historic, diverse, cosmopolitan' },
    ],
  },
  'new-zealand': {
    name: 'New Zealand',
    flag: '🇳🇿',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80&fit=crop',
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
    averageCost: {
      tuition: '₹10 – ₹22 L per year',
      living: '₹8 – ₹13 L per year',
      total: '₹18 – ₹35 L per year',
    },
    processingTime: {
      pr: '6 – 12 months (SMC)',
      studentVisa: '4 – 8 weeks',
    },
    keyFacts: [
      { label: 'PR Pathway', value: 'SMC, AEWV, Family Category' },
      { label: 'Post-Study Work', value: 'Post-study work visa — 1–3 years' },
      { label: 'Intakes', value: 'February & July' },
      { label: 'Currency', value: 'New Zealand Dollar (NZD)' },
      { label: 'Language', value: 'English' },
      { label: 'Lifestyle', value: 'Outdoor, peaceful, family-friendly' },
    ],
  },
  usa: {
    name: 'USA',
    flag: '🇺🇸',
    heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1600&q=80&fit=crop',
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
    averageCost: {
      tuition: '₹20 – ₹50 L per year',
      living: '₹12 – ₹25 L per year',
      total: '₹32 – ₹75 L per year',
    },
    processingTime: {
      pr: '5 – 20+ years (varies by category & country of birth)',
      studentVisa: '3 – 8 weeks',
    },
    keyFacts: [
      { label: 'PR Pathway', value: 'H-1B → EB Green Card' },
      { label: 'Post-Study Work', value: 'OPT 12 months + STEM 24 months' },
      { label: 'Intakes', value: 'August/September & January' },
      { label: 'Currency', value: 'US Dollar (USD)' },
      { label: 'Language', value: 'English' },
      { label: 'Lifestyle', value: 'Diverse, fast-paced, opportunity-rich' },
    ],
  },
  europe: {
    name: 'Europe',
    flag: '🇪🇺',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80&fit=crop',
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
    averageCost: {
      tuition: '₹0 – ₹15 L per year (free in Germany/Norway)',
      living: '₹6 – ₹14 L per year',
      total: '₹6 – ₹29 L per year',
    },
    processingTime: {
      pr: '21 – 60 months (EU Blue Card)',
      studentVisa: '4 – 10 weeks',
    },
    keyFacts: [
      { label: 'PR Pathway', value: 'EU Blue Card, Country-specific permits' },
      { label: 'Post-Study Work', value: '18 months job search visa (Germany)' },
      { label: 'Intakes', value: 'October & April (Germany); varies by country' },
      { label: 'Currency', value: 'Euro (EUR); CHF in Switzerland' },
      { label: 'Language', value: 'English-taught programs widely available' },
      { label: 'Lifestyle', value: 'Cultural, historic, excellent work-life balance' },
    ],
  },
};

// ─── Static Params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return [
    { slug: 'canada' },
    { slug: 'australia' },
    { slug: 'uk' },
    { slug: 'new-zealand' },
    { slug: 'usa' },
    { slug: 'europe' },
  ];
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = countryData[slug];
  if (!country) return { title: 'Country Not Found' };
  return {
    title: `${country.name} Immigration & Study Abroad | Beyond Borders`,
    description: `Explore ${country.name} PR visa, student visa, top universities, costs, and requirements. Get expert guidance from Beyond Borders.`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = countryData[slug];

  if (!country) notFound();

  const content = await getContent(`country-${slug}`, country)

  // Pick 4 key facts for the bar (processing time, cost, language, PR pathway)
  const barFacts = [
    {
      icon: Clock,
      label: 'PR Processing Time',
      value: content.processingTime.pr,
      iconColor: 'text-[#1a3faa]',
      borderColor: 'border-t-[#1a3faa]',
    },
    {
      icon: DollarSign,
      label: 'Average Annual Cost',
      value: content.averageCost.total,
      iconColor: 'text-[#e8321a]',
      borderColor: 'border-t-[#e8321a]',
    },
    {
      icon: Globe,
      label: 'Language Requirement',
      value: content.keyFacts.find((f) => f.label === 'Language')?.value ?? 'English',
      iconColor: 'text-[#f97316]',
      borderColor: 'border-t-[#f97316]',
    },
    {
      icon: TrendingUp,
      label: 'PR Pathway',
      value: content.keyFacts.find((f) => f.label === 'PR Pathway')?.value ?? '—',
      iconColor: 'text-emerald-600',
      borderColor: 'border-t-emerald-500',
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-brand-gradient text-white overflow-hidden">
        {/* Country landmark photo */}
        <Image
          src={country.heroImage}
          alt={`${content.name} landmark`}
          fill
          priority
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="animate-blob absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          />
          <div
            className="animate-float-slow absolute bottom-10 -left-20 w-80 h-80 rounded-full opacity-10"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          />
          <div className="animate-spin-slow absolute top-1/2 left-1/4 w-64 h-64 rounded-full border border-white/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-40 text-center">
          <span className="animate-float block text-7xl sm:text-8xl leading-none mb-6">
            {content.flag}
          </span>
          <h1 className="animate-fade-in-up text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight max-w-4xl mx-auto">
            {content.heroHeadline}
          </h1>
          <p className="animate-fade-in-up delay-100 mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {content.description}
          </p>
          <div className="animate-fade-in-up delay-200 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#1a3faa] shadow-2xl hover:bg-blue-50 transition-all hover:scale-105"
            >
              Apply Now — It&apos;s Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-16 sm:h-20">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#0f2778" />
          </svg>
        </div>
      </section>

      {/* ── Key Facts Bar ── */}
      <section style={{ background: '#0f2778' }} className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {barFacts.map(({ icon: Icon, label, value, iconColor, borderColor }) => (
              <div
                key={label}
                className={`card-hover bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-lg border-t-4 ${borderColor}`}
              >
                <Icon className={`w-6 h-6 mb-2 ${iconColor}`} />
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm font-bold text-slate-900 leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#1a3faa] transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-[#1a3faa] cursor-pointer transition-colors">Countries</span>
            <span>/</span>
            <span className="text-slate-900 font-medium">{content.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Landmark full-width image ── */}
      <section className="w-full h-72 sm:h-96 relative overflow-hidden">
        <Image
          src={country.heroImage}
          alt={`${content.name} scenery`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3faa]/80 to-[#e8321a]/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-300 mb-2">Destination Spotlight</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold">{content.heroHeadline}</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto text-base sm:text-lg">{content.description.slice(0, 100)}…</p>
          </div>
        </div>
      </section>

      {/* ── Two-Column Requirements ── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">Visa Pathways</span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900">
              Requirements for {content.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PR / Immigration */}
            <div className="card-hover flex flex-col rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-100">
              <div className="bg-blue-gradient p-7 text-white flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">Permanent Residency (PR)</h3>
                  <p className="text-white/80 text-sm mt-0.5">
                    Processing time: <span className="font-semibold text-[#f97316]">{content.processingTime.pr}</span>
                  </p>
                </div>
              </div>
              <div className="flex-1 p-7">
                <ul className="space-y-3">
                  {content.prRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[#1a3faa] shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm leading-snug">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-7 pb-7">
                <Link
                  href="/assessment"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a3faa] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#122d80] transition-all hover:scale-[1.02]"
                >
                  Get PR Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Study Abroad */}
            <div className="card-hover flex flex-col rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-100">
              <div className="bg-orange-gradient p-7 text-white flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">Student Visa</h3>
                  <p className="text-white/80 text-sm mt-0.5">
                    Processing time: <span className="font-semibold">{content.processingTime.studentVisa}</span>
                  </p>
                </div>
              </div>
              <div className="flex-1 p-7">
                <ul className="space-y-3">
                  {content.studyRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[#e8321a] shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm leading-snug">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-7 pb-7">
                <Link
                  href="/assessment"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-gradient px-6 py-3.5 text-sm font-bold text-white hover:opacity-90 transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg,#e8321a,#f97316)' }}
                >
                  Apply for Student Visa <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular Universities ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Universities */}
            <div>
              <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">Academic Excellence</span>
              <h2 className="mt-2 text-4xl font-extrabold text-slate-900 mb-8">
                Top Universities in {content.name}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {content.topUniversities.map((uni, i) => (
                  <div
                    key={uni}
                    className="card-hover flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 shadow-sm"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1a3faa] text-white text-xs font-extrabold">
                      {i + 1}
                    </div>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Building className="w-4 h-4 text-[#1a3faa] shrink-0" />
                      <span className="text-slate-800 font-medium text-sm truncate">{uni}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost + Cities */}
            <div className="space-y-10">
              {/* Cost */}
              <div>
                <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">Financial Planning</span>
                <h2 className="mt-2 text-4xl font-extrabold text-slate-900 mb-6">
                  Average Cost
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: GraduationCap, label: 'Tuition Fees', value: content.averageCost.tuition, iconColor: 'text-[#1a3faa]', bg: 'bg-blue-50 border-blue-100' },
                    { icon: DollarSign, label: 'Living Expenses', value: content.averageCost.living, iconColor: 'text-slate-600', bg: 'bg-slate-50 border-slate-200' },
                    { icon: TrendingUp, label: 'Total Annual Cost', value: content.averageCost.total, iconColor: 'text-[#e8321a]', bg: 'bg-orange-50 border-orange-100' },
                  ].map(({ icon: Icon, label, value, iconColor, bg }) => (
                    <div key={label} className={`flex items-center gap-4 rounded-2xl border ${bg} px-6 py-4`}>
                      <Icon className={`w-6 h-6 ${iconColor} shrink-0`} />
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{label}</p>
                        <p className="text-lg font-bold text-slate-900">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <Link
                    href="/loan-assistance"
                    className="inline-flex items-center gap-2 rounded-full bg-[#1a3faa] px-6 py-3 text-sm font-bold text-white hover:bg-[#122d80] transition-all"
                  >
                    Explore Loan Options <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Popular Cities */}
              <div>
                <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">Where to Live</span>
                <h2 className="mt-2 text-4xl font-extrabold text-slate-900 mb-5">
                  Popular Cities
                </h2>
                <div className="flex flex-wrap gap-3">
                  {content.popularCities.map((city) => (
                    <span
                      key={city}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#1a3faa] text-white px-5 py-2.5 text-sm font-semibold shadow-md hover:bg-[#122d80] transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Key Facts ── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#1a3faa] font-semibold text-sm uppercase tracking-widest">Quick Overview</span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">{content.name} at a Glance</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {content.keyFacts.map(({ label, value }) => (
              <div key={label} className="card-hover bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">{label}</p>
                <p className="text-sm font-bold text-slate-900 leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-gradient py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-blob absolute -top-16 -right-16 w-80 h-80 rounded-full bg-white/10" />
          <div className="animate-float absolute bottom-0 left-1/4 w-56 h-56 rounded-full bg-white/10" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="animate-float block text-5xl mb-5">{content.flag}</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Ready to Move to {content.name}?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Get a free eligibility assessment and let our certified advisors guide you through the entire process — step by step.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold text-[#1a3faa] shadow-2xl hover:bg-blue-50 transition-all hover:scale-105"
            >
              Apply Now — It&apos;s Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full glass border border-white/40 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
