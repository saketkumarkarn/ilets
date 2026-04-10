import { prisma } from '@/lib/db'
import BlogClient, { UnifiedPost } from './BlogClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog – Immigration News, Study Abroad Tips & Visa Guides',
  description: 'Stay updated with the latest immigration news, Canada PR tips, Australia visa guides, study abroad advice, IELTS resources, and education loan information from Beyond Borders experts.',
  keywords: ['immigration blog india', 'canada PR guide', 'australia immigration tips', 'study abroad blog', 'student visa tips', 'IELTS guide'],
  alternates: { canonical: 'https://beyondbordersimmigration.in/blog' },
  openGraph: {
    title: 'Blog & Resources | Beyond Borders',
    description: 'Expert immigration news, visa guides, study abroad tips and financial advice.',
    url: 'https://beyondbordersimmigration.in/blog',
    type: 'website',
  },
}

// ─── Static fallback posts ─────────────────────────────────────────────────────

const CATEGORY_GRADIENTS: Record<string, string> = {
  Immigration:    'from-blue-700 to-blue-500',
  'Study Abroad': 'from-indigo-600 to-blue-400',
  Finance:        'from-blue-600 to-cyan-500',
  Tips:           'from-blue-800 to-blue-600',
}

function defaultGradient(category: string) {
  return CATEGORY_GRADIENTS[category] ?? 'from-blue-700 to-blue-500'
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const staticPosts: UnifiedPost[] = [
  {
    slug: 'canada-express-entry-2025-guide',
    title: 'Canada Express Entry 2025: Complete Step-by-Step Guide',
    excerpt: 'Everything you need to know about the Express Entry system — CRS scores, draw history, profile optimization tips, and how to boost your chances of getting an ITA in 2025.',
    category: 'Immigration',
    date: 'March 28, 2025',
    readTime: '8 min read',
    image: 'from-blue-700 to-blue-500',
  },
  {
    slug: 'top-universities-australia-international-students',
    title: 'Top 10 Universities in Australia for International Students',
    excerpt: 'Australia is home to world-class universities. Explore the best institutions, their entry requirements, average fees, and scholarships available for international students in 2025.',
    category: 'Study Abroad',
    date: 'March 20, 2025',
    readTime: '6 min read',
    image: 'from-indigo-600 to-blue-400',
  },
  {
    slug: 'education-loan-without-collateral-india',
    title: 'How to Get an Education Loan Without Collateral in India',
    excerpt: 'Think you need property to secure a study abroad loan? Think again. Discover banks and NBFCs offering collateral-free education loans up to ₹75 lakhs and what you need to qualify.',
    category: 'Finance',
    date: 'March 14, 2025',
    readTime: '7 min read',
    image: 'from-blue-600 to-cyan-500',
  },
  {
    slug: 'ielts-vs-pte-which-is-better',
    title: 'IELTS vs PTE: Which English Test Should You Choose?',
    excerpt: 'Both tests are widely accepted, but which one is right for you? We break down the format, difficulty, score acceptance, and preparation strategies to help you decide.',
    category: 'Tips',
    date: 'March 7, 2025',
    readTime: '5 min read',
    image: 'from-blue-800 to-blue-600',
  },
  {
    slug: 'uk-skilled-worker-visa-2025',
    title: 'UK Skilled Worker Visa 2025: Eligibility, Process & Tips',
    excerpt: 'The UK Skilled Worker Visa is your gateway to working in Britain. Learn about the points-based eligibility criteria, required documents, salary thresholds, and how to find a sponsor.',
    category: 'Immigration',
    date: 'February 28, 2025',
    readTime: '9 min read',
    image: 'from-blue-700 to-indigo-600',
  },
  {
    slug: 'study-in-new-zealand-complete-guide',
    title: 'Study in New Zealand: Costs, Visas & Life as a Student',
    excerpt: "New Zealand offers quality education, stunning landscapes, and post-study work rights. Here's your complete guide to studying in NZ — from choosing a university to settling in.",
    category: 'Study Abroad',
    date: 'February 19, 2025',
    readTime: '7 min read',
    image: 'from-cyan-600 to-blue-500',
  },
]

// ─── Server Component ──────────────────────────────────────────────────────────

export default async function BlogPage() {
  let dbPosts: UnifiedPost[] = []

  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })

    dbPosts = rows.map(p => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      date: formatDate(p.createdAt),
      readTime: estimateReadTime(p.content),
      image: defaultGradient(p.category),
    }))
  } catch {
    // DB unavailable — fall back to static only
  }

  // Merge: DB posts first, then static posts not already covered by DB
  const dbSlugs = new Set(dbPosts.map(p => p.slug))
  const merged = [...dbPosts, ...staticPosts.filter(p => !dbSlugs.has(p.slug))]

  return <BlogClient posts={merged} />
}
