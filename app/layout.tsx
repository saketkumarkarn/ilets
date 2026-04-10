import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = 'https://beyondbordersimmigration.in';
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Beyond Borders | Immigration & Study Abroad Consultants India',
    template: '%s | Beyond Borders',
  },
  description:
    'Beyond Borders — India\'s trusted immigration & study abroad consultancy. Expert guidance for Canada PR, Australia skilled migration, UK visa, student visas & education loans. 5000+ visas approved. Free assessment.',
  keywords: [
    'immigration consultants india',
    'immigration consultancy new delhi',
    'study abroad consultants',
    'canada PR visa',
    'canada express entry',
    'australia skilled migration',
    'australia PR visa',
    'uk skilled worker visa',
    'new zealand immigration',
    'usa immigration',
    'student visa consultants',
    'education loan abroad',
    'IELTS coaching',
    'PNP provincial nominee program',
    'beyond borders immigration',
  ],
  authors: [{ name: 'Beyond Borders Immigration Consultancy' }],
  creator: 'Beyond Borders',
  publisher: 'Beyond Borders',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Beyond Borders',
    title: 'Beyond Borders | Immigration & Study Abroad Consultants India',
    description:
      'Expert immigration & study abroad consultancy. Canada PR, Australia, UK, New Zealand, USA. 5000+ visas approved. Free assessment.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Beyond Borders Immigration Consultancy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beyond Borders | Immigration & Study Abroad Consultants',
    description:
      'Expert immigration & study abroad consultancy. Canada PR, Australia, UK, New Zealand, USA. 5000+ visas approved. Free assessment.',
    images: [OG_IMAGE],
    creator: '@beyondbordersIN',
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: 'e061f137839950e1',
  },
};

// JSON-LD: Organization + LocalBusiness structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Beyond Borders',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
      sameAs: [
        'https://www.facebook.com/beyondbordersimmigration',
        'https://www.instagram.com/beyondbordersimmigration',
        'https://www.linkedin.com/company/beyondbordersimmigration',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9876543210',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'Beyond Borders Immigration Consultancy',
      description:
        'Expert immigration and study abroad consultancy services in India. Helping individuals move to Canada, Australia, UK, New Zealand, USA, and Europe.',
      url: SITE_URL,
      telephone: '+91-9876543210',
      email: 'info@beyondborders.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123, Connaught Place',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi',
        postalCode: '110001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.6315,
        longitude: 77.2167,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '450',
      },
      priceRange: '₹₹',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
