import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Beyond Borders | Immigration & Study Abroad Consultants',
  description:
    'Beyond Borders offers expert immigration consultancy and study abroad guidance for Canada, Australia, UK, New Zealand, USA, and Europe. Get your free assessment today.',
  keywords: [
    'immigration consultants',
    'study abroad',
    'PR visa',
    'work visa',
    'Canada immigration',
    'Australia immigration',
    'UK visa',
    'IELTS',
    'student visa',
  ],
  openGraph: {
    title: 'Beyond Borders | Immigration & Study Abroad Consultants',
    description:
      'Expert immigration consultancy and study abroad services. Start your journey today.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
