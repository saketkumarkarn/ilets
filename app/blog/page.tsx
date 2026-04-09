'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowRight, BookOpen } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'All' | 'Immigration' | 'Study Abroad' | 'Finance' | 'Tips';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<Category, 'All'>;
  date: string;
  readTime: string;
  image: string;
}

// ─── Static Blog Data ─────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    slug: 'canada-express-entry-2025-guide',
    title: 'Canada Express Entry 2025: Complete Step-by-Step Guide',
    excerpt:
      'Everything you need to know about the Express Entry system — CRS scores, draw history, profile optimization tips, and how to boost your chances of getting an ITA in 2025.',
    category: 'Immigration',
    date: 'March 28, 2025',
    readTime: '8 min read',
    image: 'from-blue-700 to-blue-500',
  },
  {
    slug: 'top-universities-australia-international-students',
    title: 'Top 10 Universities in Australia for International Students',
    excerpt:
      'Australia is home to world-class universities. Explore the best institutions, their entry requirements, average fees, and scholarships available for international students in 2025.',
    category: 'Study Abroad',
    date: 'March 20, 2025',
    readTime: '6 min read',
    image: 'from-indigo-600 to-blue-400',
  },
  {
    slug: 'education-loan-without-collateral-india',
    title: 'How to Get an Education Loan Without Collateral in India',
    excerpt:
      'Think you need property to secure a study abroad loan? Think again. Discover banks and NBFCs offering collateral-free education loans up to ₹75 lakhs and what you need to qualify.',
    category: 'Finance',
    date: 'March 14, 2025',
    readTime: '7 min read',
    image: 'from-blue-600 to-cyan-500',
  },
  {
    slug: 'ielts-vs-pte-which-is-better',
    title: 'IELTS vs PTE: Which English Test Should You Choose?',
    excerpt:
      'Both tests are widely accepted, but which one is right for you? We break down the format, difficulty, score acceptance, and preparation strategies to help you decide.',
    category: 'Tips',
    date: 'March 7, 2025',
    readTime: '5 min read',
    image: 'from-blue-800 to-blue-600',
  },
  {
    slug: 'uk-skilled-worker-visa-2025',
    title: 'UK Skilled Worker Visa 2025: Eligibility, Process & Tips',
    excerpt:
      'The UK Skilled Worker Visa is your gateway to working in Britain. Learn about the points-based eligibility criteria, required documents, salary thresholds, and how to find a sponsor.',
    category: 'Immigration',
    date: 'February 28, 2025',
    readTime: '9 min read',
    image: 'from-blue-700 to-indigo-600',
  },
  {
    slug: 'study-in-new-zealand-complete-guide',
    title: 'Study in New Zealand: Costs, Visas & Life as a Student',
    excerpt:
      'New Zealand offers quality education, stunning landscapes, and post-study work rights. Here\'s your complete guide to studying in NZ — from choosing a university to settling in.',
    category: 'Study Abroad',
    date: 'February 19, 2025',
    readTime: '7 min read',
    image: 'from-cyan-600 to-blue-500',
  },
];

// ─── Category Badge ───────────────────────────────────────────────────────────

const categoryColors: Record<Exclude<Category, 'All'>, string> = {
  Immigration: 'bg-blue-100 text-blue-700',
  'Study Abroad': 'bg-indigo-100 text-indigo-700',
  Finance: 'bg-cyan-100 text-cyan-700',
  Tips: 'bg-sky-100 text-sky-700',
};

function CategoryBadge({ category }: { category: Exclude<Category, 'All'> }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category]}`}
    >
      <Tag className="w-3 h-3" />
      {category}
    </span>
  );
}

// ─── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Image placeholder */}
      <div className={`bg-gradient-to-br ${post.image} h-44 flex items-center justify-center`}>
        <BookOpen className="w-12 h-12 text-white opacity-40" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={post.category} />
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        <h2 className="text-base font-bold text-gray-900 mb-2 leading-snug line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800 transition"
          >
            Read More <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const filterTabs: Category[] = ['All', 'Immigration', 'Study Abroad', 'Finance', 'Tips'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">
            Knowledge Hub
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Blog & Resources</h1>
          <p className="text-blue-100 text-base max-w-xl mx-auto">
            Stay up to date with the latest immigration news, study abroad guides, visa tips, and
            financial advice from our expert team.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === tab
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6 text-center">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> article
          {filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' && (
            <> in <span className="font-semibold text-blue-700">{activeCategory}</span></>
          )}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No articles found</p>
            <p className="text-sm mt-1">Try selecting a different category.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to Start Your Journey?</h2>
          <p className="text-blue-100 mb-6 text-sm">
            Get a free assessment from our certified immigration and study abroad experts.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Get Free Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
