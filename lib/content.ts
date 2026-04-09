import { prisma } from '@/lib/db'

export async function getContent<T>(section: string, defaults: T): Promise<T> {
  try {
    const record = await prisma.siteContent.findUnique({ where: { section } })
    if (!record) return defaults
    const parsed = JSON.parse(record.content)
    if (Array.isArray(defaults) && Array.isArray(parsed)) {
      return parsed as T
    }
    if (typeof defaults === 'object' && defaults !== null && !Array.isArray(defaults)) {
      return { ...defaults, ...parsed } as T
    }
    return parsed as T
  } catch {
    return defaults
  }
}

export const DEFAULT_CONTENT = {
  hero: {
    badge: "India's #1 Immigration Consultants",
    headline: "Your Dream of Living Abroad Starts Here",
    subtext:
      "Expert immigration & study abroad consultants with 10+ years experience and 5,000+ success stories",
    destinations: ["Canada", "Australia", "UK", "New Zealand", "USA", "Europe"],
    cta1: "Start Free Assessment",
    cta2: "Call Now",
    trustItems: ["5000+ Visas", "98% Success", "10+ Years"],
  },
  stats: [
    { value: "10+", label: "Years Experience", icon: "Clock" },
    { value: "5000+", label: "Visas Approved", icon: "CheckCircle" },
    { value: "50+", label: "Countries Served", icon: "Globe" },
    { value: "98%", label: "Success Rate", icon: "ThumbsUp" },
  ],
  about: {
    story:
      "Founded in 2014 and headquartered in New Delhi, Beyond Borders has grown from a single-room consultancy into one of India's leading immigration and study-abroad firms — with offices in Mumbai, Bengaluru, and Hyderabad.",
    story2:
      "We serve clients across the country — and the globe — with a dedicated team of ICCRC and MARA certified advisors who bring genuine expertise and unwavering commitment to every case.",
    story3:
      "Whether you're a student eyeing a world-class university, a skilled professional seeking permanent residency, or a family looking to reunite abroad — Beyond Borders has a proven pathway for you.",
  },
  contact: {
    phone: "+91-9876543210",
    email: "info@beyondborders.in",
    address: "123, Connaught Place, New Delhi, India – 110001",
    whatsapp: "919876543210",
    hours: "Mon–Sat: 9:00 AM – 7:00 PM IST",
  },
  faq: [
    {
      q: "What is Express Entry?",
      a: "Express Entry is Canada's main immigration system for skilled workers...",
    },
    {
      q: "How long does PR take?",
      a: "Processing times vary by country: Canada 6-12 months, Australia 8-18 months...",
    },
    {
      q: "Can I apply for PR while on a work visa?",
      a: "Yes, in most countries you can apply for PR while holding a valid work visa...",
    },
    {
      q: "What IELTS score do I need?",
      a: "Most countries require a minimum CLB 7 / IELTS 6.0 in each band...",
    },
    {
      q: "Do you offer loan without collateral?",
      a: "Yes, we assist with education loans both with and without collateral...",
    },
    {
      q: "What documents are needed for a study visa?",
      a: "Typically: offer letter, IELTS/PTE score, financial proof, SOP, transcripts...",
    },
    {
      q: "How much does your service cost?",
      a: "Our fees are transparent and vary by service type. Contact us for a free quote...",
    },
    {
      q: "Do you provide post-visa support?",
      a: "Absolutely! We offer pre-departure briefings, accommodation guidance, and more...",
    },
  ],
  team: [
    {
      name: "Rajiv Sharma",
      role: "CEO & Senior Immigration Advisor",
      initials: "RS",
      bio: "15+ years in immigration consulting",
      color: "bg-blue-600",
    },
    {
      name: "Priya Mehta",
      role: "Head of Study Abroad",
      initials: "PM",
      bio: "Expert in international admissions",
      color: "bg-orange-500",
    },
    {
      name: "Anil Verma",
      role: "Lead Visa Consultant",
      initials: "AV",
      bio: "ICCRC certified, 10+ years experience",
      color: "bg-emerald-600",
    },
    {
      name: "Sunita Rao",
      role: "Loan Assistance Head",
      initials: "SR",
      bio: "Specialist in education financing",
      color: "bg-purple-600",
    },
  ],
  siteInfo: {
    companyName: "Beyond Borders",
    tagline: "Your Gateway to a New Life Abroad",
    logo: "BB",
    footerTagline:
      "Your trusted partner for immigration and study abroad. Turning dreams into destinations since 2014.",
  },
}
