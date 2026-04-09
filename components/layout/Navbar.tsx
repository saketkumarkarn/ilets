'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

interface DropdownItem { label: string; href: string; }
interface NavItem { label: string; href?: string; dropdown?: DropdownItem[]; }

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    dropdown: [
      { label: 'Immigration', href: '/services/immigration' },
      { label: 'Study Abroad', href: '/services/study-abroad' },
      { label: 'Loan Assistance', href: '/services/loans' },
    ],
  },
  {
    label: 'Countries',
    dropdown: [
      { label: '🇨🇦 Canada', href: '/countries/canada' },
      { label: '🇦🇺 Australia', href: '/countries/australia' },
      { label: '🇬🇧 UK', href: '/countries/uk' },
      { label: '🇳🇿 New Zealand', href: '/countries/new-zealand' },
      { label: '🇺🇸 USA', href: '/countries/usa' },
      { label: '🇪🇺 Europe', href: '/countries/europe' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Reviews', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e8321a 0%, #f97316 100%)' }}>
              <span className="text-white font-black text-sm">BB</span>
            </div>
            <div className="leading-none">
              <span className="text-lg font-black text-[#1a3faa]">BEYOND</span>
              <span className="text-lg font-black text-[#e8321a] ml-1">BORDERS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}>
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#1a3faa] rounded-md hover:bg-orange-50 transition-colors duration-150"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-orange-100 py-2 z-50">
                      {item.dropdown.map((sub) => (
                        <Link key={sub.href} href={sub.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#1a3faa] transition-colors duration-150">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.label} href={item.href!}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#1a3faa] rounded-md hover:bg-orange-50 transition-colors duration-150">
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/assessment"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-sm transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #e8321a 0%, #f97316 100%)' }}>
              Free Assessment
            </Link>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-md text-slate-700 hover:text-[#1a3faa] hover:bg-orange-50 transition-colors duration-150"
              aria-label="Toggle navigation menu">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} bg-white border-t border-orange-100`}>
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.label}>
                <button
                  onClick={() => setMobileExpanded((prev) => prev === item.label ? null : item.label)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#1a3faa] hover:bg-orange-50 rounded-md transition-colors duration-150">
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === item.label && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-orange-200 pl-3">
                    {item.dropdown.map((sub) => (
                      <Link key={sub.href} href={sub.href} onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-600 hover:text-[#1a3faa] hover:bg-orange-50 rounded-md transition-colors duration-150">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} href={item.href!} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#1a3faa] hover:bg-orange-50 rounded-md transition-colors duration-150">
                {item.label}
              </Link>
            )
          )}
          <div className="pt-2">
            <Link href="/assessment" onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #e8321a 0%, #f97316 100%)' }}>
              Free Assessment
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
