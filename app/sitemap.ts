import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

const BASE = 'https://beyondbordersimmigration.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`,                lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/immigration`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/study-abroad`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/loans`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/loan-assistance`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/countries/canada`,        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/countries/australia`,     lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/countries/uk`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/countries/new-zealand`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/countries/usa`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/countries/europe`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,                    lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/assessment`,              lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contact`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/testimonials`,            lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Dynamic blog post routes from DB
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
    blogRoutes = posts.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // DB unavailable — skip dynamic routes
  }

  return [...staticRoutes, ...blogRoutes]
}
