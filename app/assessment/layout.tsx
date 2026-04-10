import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Immigration & Study Abroad Assessment',
  description: 'Get your free immigration or study abroad eligibility assessment from Beyond Borders\' certified consultants. Canada PR, Australia, UK, student visa & education loans.',
  keywords: ['free immigration assessment', 'visa eligibility check', 'canada PR assessment', 'australia immigration assessment', 'study abroad assessment'],
  alternates: { canonical: 'https://beyondbordersimmigration.in/assessment' },
  openGraph: {
    title: 'Free Assessment | Beyond Borders',
    description: 'Free immigration & study abroad eligibility assessment. Results within 24 hours.',
    url: 'https://beyondbordersimmigration.in/assessment',
  },
}

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
