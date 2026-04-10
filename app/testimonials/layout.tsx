import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Reviews & Success Stories',
  description: 'Read real success stories from Beyond Borders clients who moved to Canada, Australia, UK & more. 5000+ visas approved, 98% success rate.',
  keywords: ['immigration consultants reviews', 'beyond borders reviews', 'visa success stories', 'immigration testimonials india'],
  alternates: { canonical: 'https://beyondbordersimmigration.in/testimonials' },
  openGraph: {
    title: 'Client Reviews | Beyond Borders',
    description: '5000+ visa approvals. Read real success stories from our clients across Canada, Australia & UK.',
    url: 'https://beyondbordersimmigration.in/testimonials',
  },
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
