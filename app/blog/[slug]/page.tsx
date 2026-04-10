import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, BookOpen, HelpCircle } from 'lucide-react'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'Immigration' | 'Study Abroad' | 'Finance' | 'Tips'

interface StaticBlogPost {
  slug: string
  title: string
  excerpt: string
  category: Category
  date: string
  readTime: string
  image: string
  content: string[]
}

// ─── Static Blog Data ─────────────────────────────────────────────────────────

const staticBlogPosts: StaticBlogPost[] = [
  {
    slug: 'canada-express-entry-2025-guide',
    title: 'Canada Express Entry 2025: Complete Step-by-Step Guide',
    excerpt: 'Everything you need to know about the Express Entry system — CRS scores, draw history, profile optimization tips, and how to boost your chances of getting an ITA in 2025.',
    category: 'Immigration',
    date: 'March 28, 2025',
    readTime: '8 min read',
    image: 'from-blue-700 to-blue-500',
    content: [
      "Canada's Express Entry system remains one of the most sought-after immigration pathways for skilled workers worldwide. In 2025, the system continues to evolve with targeted draws for specific occupations and provinces, making strategic planning more important than ever.",
      "The Comprehensive Ranking System (CRS) is the backbone of Express Entry. Your CRS score is calculated based on factors such as age, education, language proficiency, Canadian work experience, and adaptability factors. The higher your score, the better your chances of receiving an Invitation to Apply (ITA) in a draw.",
      "In recent months, IRCC has been conducting category-based draws targeting healthcare workers, STEM professionals, trade workers, and French-language speakers. These draws often have lower CRS cutoffs, making them an excellent opportunity for candidates in these fields.",
      "To optimize your Express Entry profile, focus on improving your language test scores — even a half-band improvement in IELTS can add 20–50 CRS points. Additionally, a valid provincial nomination adds 600 points, virtually guaranteeing an ITA. Research Provincial Nominee Programs (PNPs) aligned with your occupation.",
      "The average CRS cutoff in general draws has ranged between 480 and 530 over the past year. However, category-specific draws have seen cutoffs as low as 420. Monitoring IRCC's draw history and staying updated on new categories will help you time your application strategically.",
      "If you're unsure about your eligibility or how to boost your CRS score, Beyond Borders's certified RCIC consultants can evaluate your profile, identify gaps, and create a tailored action plan. Book your free assessment today and take the first step toward Canadian permanent residency.",
    ],
  },
  {
    slug: 'top-universities-australia-international-students',
    title: 'Top 10 Universities in Australia for International Students',
    excerpt: 'Australia is home to world-class universities. Explore the best institutions, their entry requirements, average fees, and scholarships available for international students in 2025.',
    category: 'Study Abroad',
    date: 'March 20, 2025',
    readTime: '6 min read',
    image: 'from-indigo-600 to-blue-400',
    content: [
      "Australia consistently ranks among the top study destinations globally, home to eight universities in the QS World University Rankings top 100. With a welcoming culture, post-study work rights of 2–4 years, and world-class research facilities, Australia is an excellent choice for international students.",
      "The Group of Eight (Go8) universities — including the University of Melbourne, Australian National University, University of Sydney, and UNSW Sydney — are the most prestigious. They offer diverse programs across engineering, medicine, business, law, and the arts, attracting students from over 150 countries.",
      "Tuition fees for international students typically range from AUD 20,000 to AUD 50,000 per year depending on the course and university. Business and management programs at Go8 institutions can exceed AUD 45,000, while vocational and diploma courses are more affordable.",
      "Scholarships can significantly offset costs. The Australia Awards Scholarships, Destination Australia Program, and individual university scholarships are available for international students. Many universities also offer merit-based partial scholarships ranging from AUD 5,000 to full tuition.",
      "Entry requirements generally include an IELTS score of 6.0–7.0 (or equivalent PTE), a strong academic record, and relevant work experience for postgraduate programs. Some universities now accept Duolingo English Test scores as well.",
      "Beyond academics, Australia offers a safe living environment, vibrant multicultural cities, excellent healthcare, and a high standard of living. Part-time work rights (up to 48 hours per fortnight) allow students to supplement their income while studying. Beyond Borders can help you with university selection, application, and student visa processing.",
    ],
  },
  {
    slug: 'education-loan-without-collateral-india',
    title: 'How to Get an Education Loan Without Collateral in India',
    excerpt: 'Think you need property to secure a study abroad loan? Think again. Discover banks and NBFCs offering collateral-free education loans up to ₹75 lakhs and what you need to qualify.',
    category: 'Finance',
    date: 'March 14, 2025',
    readTime: '7 min read',
    image: 'from-blue-600 to-cyan-500',
    content: [
      "Financing a study abroad degree is one of the biggest challenges for Indian students. However, the landscape of education loans has changed dramatically. Several banks and Non-Banking Financial Companies (NBFCs) now offer collateral-free loans for studying at top international universities.",
      "Banks like State Bank of India (under the Global Ed-Vantage scheme), Union Bank of India, and Bank of Baroda offer unsecured education loans up to ₹40 lakhs for students admitted to premier institutions. NBFCs like Avanse, HDFC Credila, InCred, and Auxilo extend this limit up to ₹75 lakhs based on the university ranking and future earning potential.",
      "Eligibility for collateral-free loans typically requires admission to a recognized foreign university (Top 200 QS ranking preferred), a strong academic background (60%+ throughout), and a co-applicant (parent or guardian) with stable income. Some lenders also consider the student's potential future salary when evaluating the loan.",
      "The loan typically covers tuition fees, living expenses, travel, study materials, and health insurance. Interest rates for unsecured loans range from 10% to 14% per annum, with repayment periods of up to 15 years. A moratorium period (study duration + 6–12 months) means you don't need to repay until after you graduate.",
      "Key documents required include the admission letter, fee structure from the university, academic records (10th, 12th, graduation mark sheets), co-applicant's income proof (ITR, salary slips, bank statements), and KYC documents.",
      "Beyond Borders's loan assistance team works with 15+ lending partners to help you find the best loan deal. We handle documentation, liaise with banks on your behalf, and ensure fast disbursement so your university fee deadline is never missed. Contact us for a free loan assessment.",
    ],
  },
  {
    slug: 'ielts-vs-pte-which-is-better',
    title: 'IELTS vs PTE: Which English Test Should You Choose?',
    excerpt: 'Both tests are widely accepted, but which one is right for you? We break down the format, difficulty, score acceptance, and preparation strategies to help you decide.',
    category: 'Tips',
    date: 'March 7, 2025',
    readTime: '5 min read',
    image: 'from-blue-800 to-blue-600',
    content: [
      "Choosing between IELTS and PTE Academic is a common dilemma for students and immigrants. Both are internationally recognized, but they differ significantly in format, scoring, and the experience they offer test-takers.",
      "IELTS (International English Language Testing System) is the older and more widely known test. It comes in two formats: Academic (for university admissions) and General Training (for immigration). The test includes four sections — Listening, Reading, Writing, and Speaking — with the Speaking test conducted face-to-face with an examiner. Results are available within 3–13 days.",
      "PTE Academic (Pearson Test of English) is a fully computer-based test. It uses AI for scoring, which many candidates find more objective. The test integrates skills — for example, you may listen to audio and then write a summary, testing both listening and writing simultaneously. Results are typically available within 48 hours, making it ideal for tight deadlines.",
      "In terms of acceptance, IELTS is accepted by virtually all universities, immigration authorities (including Canada, Australia, UK, New Zealand, and USA), and employers. PTE is also widely accepted, including by Australian and UK immigration authorities and most universities, though some institutions still prefer IELTS.",
      "Which is easier? It depends on your strengths. Test-takers who struggle with speaking under pressure often find PTE easier because there's no human examiner. Those with strong grammar and writing skills tend to score better in IELTS Writing. PTE's integrated tasks can be confusing at first, so practice is essential.",
      "Our recommendation: Attempt a free mock test for both and see where you score better. Beyond Borders partners with top IELTS and PTE coaching institutes and can guide you on which test best suits your visa or university requirements. Book a free counselling session today.",
    ],
  },
  {
    slug: 'uk-skilled-worker-visa-2025',
    title: 'UK Skilled Worker Visa 2025: Eligibility, Process & Tips',
    excerpt: 'The UK Skilled Worker Visa is your gateway to working in Britain. Learn about the points-based eligibility criteria, required documents, salary thresholds, and how to find a sponsor.',
    category: 'Immigration',
    date: 'February 28, 2025',
    readTime: '9 min read',
    image: 'from-blue-700 to-indigo-600',
    content: [
      "The UK Skilled Worker Visa replaced the Tier 2 (General) Visa and is the primary route for skilled workers from outside the UK to live and work in Britain. Under the points-based immigration system introduced post-Brexit, eligibility is determined by accumulating at least 70 points.",
      "Mandatory points (50) are awarded for having a job offer from a UK-licensed sponsor, the job being at an eligible skill level (RQF Level 3 or above), and meeting the English language requirement. The remaining 20 points can come from salary, shortage occupation status, or having a PhD relevant to the role.",
      "The minimum general salary threshold is £38,700 per year (as of 2024 rules), up from the previous £26,200. However, certain roles on the Shortage Occupation List have lower salary thresholds. Healthcare and education roles also have specific salary scales aligned with NHS or national pay bands.",
      "Finding a licensed UK sponsor is often the biggest challenge. You can search the UKVI's public register of licensed sponsors on the gov.uk website. Alternatively, applying for jobs in companies already listed as sponsors significantly increases your chances. Roles in healthcare, engineering, IT, finance, and construction are in high demand.",
      "Required documents include a valid passport, Certificate of Sponsorship (CoS) reference number from your employer, proof of English language proficiency (IELTS, PTE, or degree in English), and financial evidence showing you can support yourself (unless your sponsor certifies maintenance).",
      "The visa is typically granted for up to 5 years and can be extended. After 5 years of continuous residence, you may be eligible to apply for Indefinite Leave to Remain (ILR). Beyond Borders has extensive experience with UK Skilled Worker Visa applications. Our team manages document preparation, liaises with sponsors, and ensures your application is error-free. Get in touch for a free consultation.",
    ],
  },
  {
    slug: 'study-in-new-zealand-complete-guide',
    title: 'Study in New Zealand: Costs, Visas & Life as a Student',
    excerpt: "New Zealand offers quality education, stunning landscapes, and post-study work rights. Here's your complete guide to studying in NZ — from choosing a university to settling in.",
    category: 'Study Abroad',
    date: 'February 19, 2025',
    readTime: '7 min read',
    image: 'from-cyan-600 to-blue-500',
    content: [
      "New Zealand has emerged as one of the most attractive study destinations for international students, offering high-quality education, a safe environment, generous post-study work rights, and a pathway to permanent residency through the Skilled Migrant Category.",
      "New Zealand has eight universities, all of which are ranked in the top 3% globally. The University of Auckland, Victoria University of Wellington, and University of Otago are particularly well-regarded for research output. Institutes of Technology and Polytechnics (ITPs) offer practical, career-focused programs at lower costs.",
      "Annual tuition fees range from NZD 22,000 to NZD 45,000 depending on the program and institution. Living costs typically run NZD 15,000 to NZD 20,000 per year in cities like Auckland and Wellington. Christchurch and Dunedin offer more affordable living options.",
      "The New Zealand Student Visa requires an Offer of Place from a registered institution, proof of sufficient funds, English language proficiency (IELTS 5.5–6.5 for most programs), and evidence of good character and health. Processing times vary from 3 to 8 weeks.",
      "Post-study work rights are a major draw. After completing a qualification of at least 30 weeks at Level 7 or above, graduates can apply for a Post-Study Work Visa valid for 1–3 years depending on the level of study and location. This provides valuable New Zealand work experience to boost future residency applications.",
      "Life as a student in New Zealand is enriching. Students can work up to 20 hours per week during term time. The country's stunning natural beauty, from fjords to beaches, adds to the quality of life. With Beyond Borders's guidance, navigating university applications, visa processing, and pre-departure planning becomes seamless. Reach out for a free consultation today.",
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_GRADIENTS: Record<string, string> = {
  Immigration:    'from-blue-700 to-blue-500',
  'Study Abroad': 'from-indigo-600 to-blue-400',
  Finance:        'from-blue-600 to-cyan-500',
  Tips:           'from-blue-800 to-blue-600',
}

const categoryColors: Record<string, string> = {
  Immigration:    'bg-blue-100 text-blue-700',
  'Study Abroad': 'bg-indigo-100 text-indigo-700',
  Finance:        'bg-cyan-100 text-cyan-700',
  Tips:           'bg-sky-100 text-sky-700',
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

// ─── Generate Static Params (for the hardcoded 6 posts) ──────────────────────

export async function generateStaticParams() {
  return staticBlogPosts.map(post => ({ slug: post.slug }))
}

// ─── Unified post shape for rendering ────────────────────────────────────────

interface RenderPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  paragraphs: string[]
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params

  let post: RenderPost | null = null

  // 1. Try database first
  try {
    const dbPost = await prisma.blogPost.findUnique({
      where: { slug, published: true },
    })

    if (dbPost) {
      post = {
        slug: dbPost.slug,
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        category: dbPost.category,
        date: dbPost.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: estimateReadTime(dbPost.content),
        image: CATEGORY_GRADIENTS[dbPost.category] ?? 'from-blue-700 to-blue-500',
        // Split on blank lines (or single newlines) to form paragraphs
        paragraphs: dbPost.content
          .split(/\n\n+/)
          .map(p => p.replace(/\n/g, ' ').trim())
          .filter(Boolean),
      }
    }
  } catch {
    // DB unavailable — fall through to static
  }

  // 2. Fall back to static data
  if (!post) {
    const staticPost = staticBlogPosts.find(p => p.slug === slug)
    if (staticPost) {
      post = {
        slug: staticPost.slug,
        title: staticPost.title,
        excerpt: staticPost.excerpt,
        category: staticPost.category,
        date: staticPost.date,
        readTime: staticPost.readTime,
        image: staticPost.image,
        paragraphs: staticPost.content,
      }
    }
  }

  if (!post) notFound()

  // Related posts: other static posts of same category (sidebar)
  const relatedPosts = staticBlogPosts
    .filter(p => p.slug !== post!.slug && p.category === post!.category)
    .slice(0, 2)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${post.image} h-56 md:h-72 flex items-center justify-center relative`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center px-4">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <h1 className="text-white text-2xl md:text-3xl font-bold max-w-3xl mx-auto leading-snug">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 font-medium mb-6 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            {/* Article body */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-5">
              {post.paragraphs.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* CTA footer */}
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900 text-sm">Found this helpful?</p>
                <p className="text-xs text-gray-500 mt-0.5">Share it with someone who might benefit.</p>
              </div>
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
              >
                Get Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-72 space-y-6 flex-shrink-0">
            {/* CTA Box */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-600 text-white rounded-2xl p-6">
              <HelpCircle className="w-8 h-8 mb-3 text-blue-200" />
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                Our certified consultants are ready to evaluate your profile and guide you to the
                right visa pathway — completely free.
              </p>
              <Link
                href="/assessment"
                className="block text-center bg-white text-blue-700 font-semibold text-sm py-2.5 rounded-lg hover:bg-blue-50 transition"
              >
                Book Free Assessment
              </Link>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map(related => (
                    <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                      <div className={`bg-gradient-to-br ${related.image} h-20 rounded-lg flex items-center justify-center mb-2`}>
                        <BookOpen className="w-6 h-6 text-white opacity-40" />
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[related.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {related.category}
                      </span>
                      <p className="text-sm font-semibold text-gray-800 mt-1 group-hover:text-blue-700 transition leading-snug line-clamp-2">
                        {related.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{related.date}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                Our Services
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'Immigration Assessment', href: '/assessment' },
                  { label: 'Student Visa', href: '/assessment' },
                  { label: 'Education Loan', href: '/loan-assistance' },
                  { label: 'Contact Us', href: '/contact' },
                ].map(link => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 transition"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
