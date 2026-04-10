import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Education Loan Assistance – Overseas Study Loans',
  description: 'Beyond Borders helps you secure education loans up to ₹75 lakhs for studying abroad with or without collateral. Fast approvals, 15+ banking partners.',
  alternates: { canonical: 'https://beyondbordersimmigration.in/loan-assistance' },
  openGraph: {
    title: 'Loan Assistance | Beyond Borders',
    description: 'Education loans up to ₹75 lakhs for studying abroad. Collateral-free options available.',
    url: 'https://beyondbordersimmigration.in/loan-assistance',
  },
};
import {
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Phone,
  FileText,
  Landmark,
  TrendingUp,
  Clock,
  Star,
  Building2,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const whyChooseUs = [
  {
    icon: Landmark,
    title: 'Direct Bank Tie-Ups',
    desc: 'We have established relationships with 8+ leading banks and NBFCs, giving you access to preferential interest rates and faster processing.',
  },
  {
    icon: Shield,
    title: 'No Hidden Charges',
    desc: 'Complete transparency in our fee structure. What we quote is what you pay — no surprises at any stage of the process.',
  },
  {
    icon: Zap,
    title: 'Fast-Track Approvals',
    desc: 'Our streamlined application process and pre-verified documentation ensures loan approvals in as little as 7 working days.',
  },
  {
    icon: Users,
    title: 'Dedicated Loan Specialist',
    desc: 'Every applicant is assigned a personal loan advisor who handles your case from enquiry to disbursal.',
  },
  {
    icon: TrendingUp,
    title: 'Maximum Loan Coverage',
    desc: 'We help you maximise your loan eligibility — covering tuition, living costs, airfare, insurance, and other education expenses.',
  },
  {
    icon: Phone,
    title: '24/7 Support',
    desc: 'Questions at any hour? Our loan support team is available via phone, WhatsApp, and email throughout your loan journey.',
  },
];

const partnerBanks = [
  { name: 'State Bank of India', short: 'SBI', type: 'PSU Bank', highlight: 'Lowest rates for government schemes' },
  { name: 'HDFC Bank', short: 'HDFC', type: 'Private Bank', highlight: 'Fast processing, unsecured up to ₹45 L' },
  { name: 'Axis Bank', short: 'AXIS', type: 'Private Bank', highlight: 'Flexible repayment options' },
  { name: 'ICICI Bank', short: 'ICICI', type: 'Private Bank', highlight: 'Zero margin money for select courses' },
  { name: 'Bank of Baroda', short: 'BOB', type: 'PSU Bank', highlight: 'Vidyasaarathi scheme partner' },
  { name: 'Punjab National Bank', short: 'PNB', type: 'PSU Bank', highlight: 'PM Vidyalaxmi scheme' },
  { name: 'IDFC First Bank', short: 'IDFC', type: 'Private Bank', highlight: 'Collateral-free up to ₹50 L' },
  { name: 'Union Bank of India', short: 'UBI', type: 'PSU Bank', highlight: 'Union Education Loan scheme' },
];

const approvalSteps = [
  {
    step: '01',
    title: 'Free Loan Enquiry',
    desc: 'Fill in our enquiry form with your details, destination country, and loan requirement. Our advisor will call you within 24 hours.',
  },
  {
    step: '02',
    title: 'Profile & Eligibility Check',
    desc: 'We review your academic profile, co-borrower income, and credit history to recommend the best loan product and bank.',
  },
  {
    step: '03',
    title: 'Document Collection & Verification',
    desc: 'We provide a complete document checklist and help you gather, verify, and organise every document needed.',
  },
  {
    step: '04',
    title: 'Bank Application Filing',
    desc: 'We file a complete, error-free application with our partner bank on your behalf and follow up proactively.',
  },
  {
    step: '05',
    title: 'Bank Processing & Sanction',
    desc: 'The bank verifies your application, conducts property valuation (if collateral), and issues the sanction letter.',
  },
  {
    step: '06',
    title: 'Loan Disbursal',
    desc: 'Loan is disbursed directly to your university account or your account as per your preference and the bank\'s policy.',
  },
];

const requiredDocuments = {
  'Applicant Documents': [
    'Completed loan application form with photographs',
    'Valid passport copy',
    'Aadhaar card and PAN card',
    'Academic certificates: 10th, 12th, UG/PG mark sheets and degree',
    'IELTS / TOEFL / PTE / GMAT / GRE score card',
    'Offer letter / Conditional Admission letter from the university',
    'Fee schedule / cost breakdown from the institution',
  ],
  'Co-Applicant (Parent/Guardian) Documents': [
    'PAN card and Aadhaar card',
    'Last 3 months salary slips (salaried)',
    'Last 2 years ITR with computation (self-employed)',
    'Bank statements — last 12 months',
    'Form 16 (for salaried applicants)',
    'Business proof (self-employed — GST registration, etc.)',
  ],
  'Collateral Documents (Secured Loans)': [
    'Title deed of the property offered as collateral',
    'Encumbrance certificate',
    'Property valuation report from bank-approved valuer',
    'Fixed deposit receipts (if FD offered as security)',
    'Insurance policy documents (if applicable)',
    'Latest property tax receipts',
  ],
  'Additional Documents': [
    'Scholarship letter (if any)',
    'Education loan from other institution (if any prior loan)',
    'Visa copy (if already received)',
    'Travel insurance documents',
    'Forex/remittance plan from bank',
  ],
};

// ─── Form data type ───────────────────────────────────────────────────────────

// Note: Form is a static HTML form — server component. For live submission, connect to an API route.

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoanAssistancePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600 opacity-20 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          <span className="inline-block mb-4 rounded-full bg-white/10 px-4 py-1 text-sm font-medium tracking-wide uppercase">
            Education Loan Assistance
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto">
            Fund Your Dream —{' '}
            <span className="text-yellow-300">Study Abroad Loans</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Beyond Borders partners with India&apos;s leading banks to get you the best education loan terms. We handle paperwork, follow-ups, and everything in between.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-blue-900 shadow-lg hover:bg-blue-50 transition-colors"
            >
              Apply for Loan <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/loans"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Loan Details & EMI Calculator
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/20 rounded-2xl overflow-hidden max-w-3xl mx-auto">
            {[
              { value: '₹1.5 Cr', label: 'Max Loan Amount' },
              { value: '8.5%', label: 'Starting Interest Rate' },
              { value: '8+', label: 'Partner Banks' },
              { value: '1,200+', label: 'Loans Facilitated' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm px-4 py-5">
                <p className="text-2xl font-extrabold text-yellow-300">{s.value}</p>
                <p className="text-xs text-blue-100 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-700 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Loan Assistance</span>
          </nav>
        </div>
      </div>

      {/* ── Why Choose Our Loan Service ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Our Advantage
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why Choose Beyond Borders for Your Education Loan?
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              We don&apos;t just refer you to a bank — we become your loan partner, ensuring the best terms and fastest approval.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-7 hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1.5">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Banks ── */}
      <section className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Bank Network
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our Partner Banks & Institutions
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              We are empanelled with India&apos;s leading PSU banks, private banks, and NBFCs for education loans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerBanks.map(({ name, short, type, highlight }) => (
              <div
                key={short}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-700 text-white text-xl font-extrabold mb-4">
                  {short}
                </div>
                <p className="font-bold text-slate-900 text-sm">{name}</p>
                <p className="text-xs text-blue-600 font-medium mt-0.5 mb-3">{type}</p>
                <div className="flex items-start gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500">{highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Loan Approval Process ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Step-by-Step
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Loan Approval Process
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Our 6-step process is designed to be simple, transparent, and fast — getting your funds disbursed when you need them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvalSteps.map(({ step, title, desc }) => (
              <div
                key={step}
                className="relative bg-slate-50 rounded-2xl border border-slate-100 p-7 hover:shadow-md transition-shadow"
              >
                <span className="absolute top-6 right-6 text-4xl font-extrabold text-blue-100 select-none">
                  {step}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white text-sm font-extrabold mb-4">
                  {step}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Required Documents Checklist ── */}
      <section className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Be Prepared
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Required Documents Checklist
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Having your documents ready in advance significantly speeds up approval. Here&apos;s everything you&apos;ll need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(requiredDocuments).map(([category, items]) => (
              <div key={category} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                <div className="flex items-center gap-3 mb-5">
                  <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900">{category}</h3>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-blue-700 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-yellow-300 shrink-0" />
              <p className="font-semibold">
                Not sure which documents you need? Our advisors will send you a tailored checklist.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Get Custom Checklist <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Loan Enquiry Form ── */}
      <section id="enquiry-form" className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Get Started
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Loan Enquiry Form
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Fill in the form below and our loan specialist will call you within 24 hours.
            </p>
          </div>

          <form
            action="/api/loan-enquiry"
            method="POST"
            className="bg-slate-50 rounded-3xl border border-slate-100 shadow-sm p-8 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Loan Amount */}
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Loan Amount Required <span className="text-red-500">*</span>
                </label>
                <select
                  id="loanAmount"
                  name="loanAmount"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select amount range</option>
                  <option value="up-to-10L">Up to ₹10 Lakhs</option>
                  <option value="10L-25L">₹10 L – ₹25 Lakhs</option>
                  <option value="25L-50L">₹25 L – ₹50 Lakhs</option>
                  <option value="50L-1Cr">₹50 L – ₹1 Crore</option>
                  <option value="above-1Cr">Above ₹1 Crore</option>
                </select>
              </div>

              {/* Destination Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Destination Country <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select country</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="uk">United Kingdom</option>
                  <option value="new-zealand">New Zealand</option>
                  <option value="usa">USA</option>
                  <option value="europe">Europe</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Loan Purpose */}
              <div>
                <label htmlFor="purpose" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Loan Purpose
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select purpose</option>
                  <option value="undergraduate">Undergraduate Studies</option>
                  <option value="postgraduate">Postgraduate / Masters</option>
                  <option value="phd">PhD / Doctoral</option>
                  <option value="diploma">Diploma / Certificate Course</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Collateral */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">
                Do you have collateral to offer?
              </p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="collateral" value="yes" className="accent-blue-700" />
                  <span className="text-sm text-slate-700">Yes — I have collateral</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="collateral" value="no" className="accent-blue-700" />
                  <span className="text-sm text-slate-700">No — looking for collateral-free loan</span>
                </label>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your course, university, intake date, or any specific requirements..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-2.5">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                className="mt-0.5 accent-blue-700"
              />
              <label htmlFor="consent" className="text-xs text-slate-500 leading-relaxed">
                I consent to Beyond Borders contacting me via phone, email, or WhatsApp regarding my loan enquiry.
                I understand this does not obligate me to any loan product.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-8 py-4 text-base font-bold text-white shadow-md hover:bg-blue-800 transition-colors"
            >
              Submit Loan Enquiry <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-slate-400 text-center">
              Our loan advisor will contact you within 24 business hours. Your data is secure and never shared with third parties without your consent.
            </p>
          </form>
        </div>
      </section>

      {/* ── Document Support Section ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
                We Handle Everything
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
                Complete Document Support
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                One of the biggest challenges in getting an education loan is gathering and organising the right documents. Our team provides end-to-end document support — from identifying what you need to verifying everything before submission.
              </p>
              <ul className="space-y-3">
                {[
                  'Customised document checklist based on your profile and chosen bank',
                  'Document gap analysis — we identify what you\'re missing',
                  'Verification of academic and income documents',
                  'Assistance with property valuation coordination (secured loans)',
                  'Notarisation and attestation guidance',
                  'Digital document submission to bank portals',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action Card */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-10 text-white text-center">
              <FileText className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
              <h3 className="text-2xl font-extrabold mb-3">Need a Document Checklist?</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">
                Tell us your profile and we&apos;ll send you a personalised, bank-specific document checklist within 2 hours.
              </p>
              <div className="space-y-3">
                <a
                  href="#enquiry-form"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  Get My Custom Checklist <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Talk to Loan Advisor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Don&apos;t Let Finances Stop Your Dream
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Start your loan enquiry today and get a response within 24 hours. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold text-blue-900 shadow-xl hover:bg-blue-50 transition-colors"
            >
              Apply for Education Loan <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/services/loans"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-10 py-4 text-base font-bold text-white hover:bg-white/10 transition-colors"
            >
              EMI Calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
