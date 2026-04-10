import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us – Book a Free Consultation',
  description: 'Contact Beyond Borders immigration consultants in New Delhi. Call, email or visit us. Book a free consultation for Canada PR, Australia, UK visa or study abroad enquiries.',
  keywords: ['contact immigration consultants', 'book free consultation immigration', 'beyond borders contact', 'immigration office new delhi'],
  alternates: { canonical: 'https://beyondbordersimmigration.in/contact' },
  openGraph: {
    title: 'Contact Us | Beyond Borders',
    description: 'Book a free immigration or study abroad consultation. New Delhi office. Call or email us.',
    url: 'https://beyondbordersimmigration.in/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
