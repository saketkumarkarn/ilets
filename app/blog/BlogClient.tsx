'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowRight, BookOpen } from 'lucide-react'

export type Category = 'All' | 'Immigration' | 'Study Abroad' | 'Finance' | 'Tips'

export interface UnifiedPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
}

const categoryColors: Record<string, string> = {
  Immigration:   'bg-blue-100 text-blue-700',
  'Study Abroad': 'bg-indigo-100 text-indigo-700',
  Finance:       'bg-cyan-100 text-cyan-700',
  Tips:          'bg-sky-100 text-sky-700',
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category] ?? 'bg-gray-100 text-gray-600'}`}>
      <Tag className="w-3 h-3" />
      {category}
    </span>
  )
}

function BlogCard({ post }: { post: UnifiedPost }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
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
  )
}

const filterTabs: Category[] = ['All', 'Immigration', 'Study Abroad', 'Finance', 'Tips']

export default function BlogClient({ posts }: { posts: UnifiedPost[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter(p => p.category === activeCategory)

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
          {filterTabs.map(tab => (
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
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span>{' '}
          article{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' && (
            <> in <span className="font-semibold text-blue-700">{activeCategory}</span></>
          )}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
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
  )
}
