'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Reviews', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const immigrationLinks = [
  { label: 'PR Visa', href: '/services/immigration' },
  { label: 'Work Visa', href: '/services/immigration' },
  { label: 'Tourist Visa', href: '/services/immigration' },
  { label: 'Family Visa', href: '/services/immigration' },
];

const studyAbroadLinks = [
  { label: 'Countries', href: '/countries/canada' },
  { label: 'Admissions Help', href: '/services/study-abroad' },
  { label: 'SOP / LOR', href: '/services/study-abroad' },
  { label: 'Education Loan', href: '/services/loans' },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', abbr: 'f' },
  { label: 'Instagram', href: 'https://instagram.com', abbr: 'in' },
  { label: 'LinkedIn', href: 'https://linkedin.com', abbr: 'li' },
  { label: 'Twitter / X', href: 'https://twitter.com', abbr: 'x' },
];

function FooterLinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className="text-sm text-orange-200 hover:text-white transition-colors duration-150">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <>
      <footer style={{ background: 'linear-gradient(135deg, #1a3faa 0%, #122d80 100%)' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Logo + tagline + social */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #e8321a 0%, #f97316 100%)' }}>
                  <span className="text-white font-black text-sm">BB</span>
                </div>
                <div className="leading-none">
                  <span className="font-black text-white">BEYOND</span>
                  <span className="font-black text-orange-300 ml-1">BORDERS</span>
                </div>
              </Link>
              <p className="text-sm text-blue-200 leading-relaxed">
                Your trusted partner for immigration and study abroad. Turning dreams into destinations since 2014.
              </p>
              <div className="flex items-center gap-2 pt-1">
                {socialLinks.map(({ label, href, abbr }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase text-white transition-opacity hover:opacity-80"
                    style={{ background: 'linear-gradient(135deg, #e8321a 0%, #f97316 100%)' }}>
                    {abbr}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
              <FooterLinkList links={quickLinks} />
            </div>

            {/* Col 3: Services */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Immigration</h3>
                <FooterLinkList links={immigrationLinks} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Study Abroad</h3>
                <FooterLinkList links={studyAbroadLinks} />
              </div>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+919876543210" className="flex items-start gap-3 text-sm text-blue-200 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0 text-orange-400" />
                    <span>+91-9876543210</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@beyondborders.in" className="flex items-start gap-3 text-sm text-blue-200 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 mt-0.5 shrink-0 text-orange-400" />
                    <span>info@beyondborders.in</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-sm text-blue-200">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-orange-400" />
                    <span>123, Connaught Place,<br />New Delhi, India – 110001</span>
                  </div>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/assessment"
                  className="inline-block px-4 py-2 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #e8321a 0%, #f97316 100%)' }}>
                  Free Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-blue-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-blue-300">&copy; {new Date().getFullYear()} Beyond Borders. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-xs text-blue-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-blue-300 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110">
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Call Now Float */}
      <a href="tel:+919876543210" aria-label="Call Now"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 text-white rounded-full shadow-lg transition-transform hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #e8321a 0%, #f97316 100%)' }}>
        <Phone className="w-5 h-5" />
        <span className="text-sm font-semibold hidden sm:inline">Call Now</span>
      </a>
    </>
  );
}
