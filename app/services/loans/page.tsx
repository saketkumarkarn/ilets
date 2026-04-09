import Link from 'next/link';
import {
  Building2,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  FileText,
  Phone,
  Landmark,
} from 'lucide-react';
import EmiCalculator from './EmiCalculator';

// ─── Data ────────────────────────────────────────────────────────────────────

const loanTypes = [
  {
    type: 'With Collateral',
    maxAmount: '₹1.5 Crore',
    interestRange: '8.5% – 11%',
    tenure: 'Up to 15 years',
    highlight: 'Lower interest rates with secured collateral',
    color: 'bg-blue-700',
    features: [
      'Secured against property / fixed deposits / insurance',
      'Higher loan amounts — up to ₹1.5 Cr',
      'Lower interest rates (8.5% – 11% p.a.)',
      'Extended repayment tenure up to 15 years',
      'Moratorium period: course duration + 6–12 months',
      'Full tuition + living expenses covered',
      'Available from all major PSU & private banks',
    ],
  },
  {
    type: 'Without Collateral',
    maxAmount: '₹50 Lakhs',
    interestRange: '10% – 14%',
    tenure: 'Up to 10 years',
    highlight: 'No security required — ideal for eligible profiles',
    color: 'bg-indigo-600',
    features: [
      'No property or asset collateral required',
      'Loan amount up to ₹50 L (select NBFCs offer more)',
      'Based on co-borrower income & credit profile',
      'Processing within 7–14 working days',
      'Moratorium period during course duration',
      'Covers tuition, accommodation, travel & misc.',
      'Available for top-ranked institutions worldwide',
    ],
  },
];

const partnerBanks = [
  { name: 'State Bank of India', short: 'SBI', type: 'PSU Bank' },
  { name: 'HDFC Bank', short: 'HDFC', type: 'Private Bank' },
  { name: 'Axis Bank', short: 'AXIS', type: 'Private Bank' },
  { name: 'ICICI Bank', short: 'ICICI', type: 'Private Bank' },
  { name: 'Bank of Baroda', short: 'BOB', type: 'PSU Bank' },
  { name: 'Punjab National Bank', short: 'PNB', type: 'PSU Bank' },
  { name: 'IDFC First Bank', short: 'IDFC', type: 'Private Bank' },
  { name: 'Union Bank', short: 'UBI', type: 'PSU Bank' },
];

const eligibilityCriteria = [
  'Indian citizen enrolled or seeking admission in a recognised foreign university',
  'Course must be a full-time degree/diploma programme',
  'Co-applicant (parent/guardian) with stable income required',
  'Minimum academic score: 50–60% in qualifying examinations',
  'Age: 18–35 years at the time of application',
  'Valid offer letter / conditional admission from the institution',
  'CIBIL score of co-applicant: preferably 700 and above',
  'No existing loan defaults on the applicant or co-applicant',
];

const requiredDocuments = [
  'Completed loan application form',
  'Recent passport-size photographs',
  'Passport copy (applicant & co-applicant)',
  'Offer / Admission letter from the university',
  'Academic certificates (10th, 12th, UG/PG mark sheets)',
  'IELTS / TOEFL / PTE score card',
  'Income proof of co-applicant (salary slips / ITR)',
  'Bank statements — last 6–12 months',
  'Collateral documents (if secured loan)',
  'Fee schedule / cost breakdown from the university',
  'Scholarship letter (if applicable)',
  'Property documents / Fixed deposit receipts (for collateral loan)',
];

// ─── Page ─────────────────────────────────────────────────────────────────────

import { getContent } from '@/lib/content'

export default async function LoansServicesPage() {
  type CmsLoan = { type?: string; maxAmount?: string; interestRange?: string; tenure?: string; highlight?: string; features?: string[] }
  type CmsContent = { loanTypes?: CmsLoan[]; eligibilityCriteria?: string[]; requiredDocuments?: string[] }

  const cms = await getContent<CmsContent>('service-loans', {})

  const mergedLoanTypes = loanTypes.map((loan, i) => ({ ...loan, ...(cms.loanTypes?.[i] || {}), color: loan.color }))
  const mergedEligibility = cms.eligibilityCriteria ?? eligibilityCriteria
  const mergedDocuments = cms.requiredDocuments ?? requiredDocuments
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
            Partnered with 8+ Leading Banks
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto">
            Study Abroad{' '}
            <span className="text-yellow-300">Loan Assistance</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Don&apos;t let finances hold back your dreams. We connect you with the best education loan options — secured and unsecured — with fast approvals and full documentation support.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/loan-assistance"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-blue-900 shadow-lg hover:bg-blue-50 transition-colors"
            >
              Apply for Loan <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Talk to Loan Expert
            </Link>
          </div>

          {/* Key metrics */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/20 rounded-2xl overflow-hidden max-w-3xl mx-auto">
            {[
              { value: '₹1.5 Cr', label: 'Max Loan Amount' },
              { value: '8.5%', label: 'Lowest Interest Rate' },
              { value: '15 Yrs', label: 'Max Repayment Tenure' },
              { value: '7 Days', label: 'Avg. Approval Time' },
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
            <Link href="/services" className="hover:text-blue-700 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Loan Services</span>
          </nav>
        </div>
      </div>

      {/* ── Loan Types ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Loan Options
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Two Flexible Loan Types
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Choose the loan type that best fits your financial profile and funding requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mergedLoanTypes.map(({ type, maxAmount, interestRange, tenure, highlight, color, features }) => (
              <div
                key={type}
                className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
              >
                <div className={`${color} p-7 text-white`}>
                  <h3 className="text-2xl font-extrabold mb-1">{type}</h3>
                  <p className="text-white/80 text-sm">{highlight}</p>
                  <div className="mt-5 grid grid-cols-3 gap-4">
                    {[
                      { label: 'Max Amount', value: maxAmount },
                      { label: 'Interest Rate', value: interestRange },
                      { label: 'Max Tenure', value: tenure },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-xl bg-white/15 px-3 py-3 text-center">
                        <p className="text-lg font-bold">{value}</p>
                        <p className="text-white/70 text-xs mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 p-7">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                    Key Features
                  </p>
                  <ul className="space-y-2.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-7 pb-7">
                  <Link
                    href="/loan-assistance"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
                  >
                    Apply for {type} Loan <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMI Calculator ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Plan Your Finances
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Education Loan EMI Calculator
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Estimate your monthly EMI by adjusting the loan amount, tenure, and interest rate.
            </p>
          </div>
          <EmiCalculator />
        </div>
      </section>

      {/* ── Eligibility ── */}
      <section className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Eligibility */}
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
                Who Can Apply
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 mb-6">
                Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {mergedEligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required documents */}
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
                Documents Needed
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 mb-6">
                Required Documents
              </h2>
              <ul className="space-y-3">
                {mergedDocuments.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partner Banks ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Our Network
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Partner Banks & Financial Institutions
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              We work with India&apos;s leading banks to secure the best loan terms for our students.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {partnerBanks.map(({ name, short, type }) => (
              <div
                key={short}
                className="flex flex-col items-center justify-center text-center rounded-2xl border-2 border-slate-100 bg-slate-50 p-6 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-700 text-white text-xl font-extrabold mb-3">
                  {short}
                </div>
                <p className="font-bold text-slate-900 text-sm">{name}</p>
                <p className="text-xs text-blue-600 font-medium mt-0.5">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose Beyond Borders ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Our Advantage
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why Get Your Loan Through Beyond Borders?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Building2,
                title: 'Bank Tie-Ups',
                desc: 'Direct relationships with 8+ banks — faster processing, preferential rates.',
              },
              {
                icon: Zap,
                title: 'Fast Approvals',
                desc: 'Streamlined process with complete documentation support for quicker disbursal.',
              },
              {
                icon: Shield,
                title: 'No Hidden Charges',
                desc: 'Transparent fee structure. We tell you every cost upfront — no surprises.',
              },
              {
                icon: Phone,
                title: 'Dedicated Advisor',
                desc: 'A dedicated loan specialist handles your case from application to disbursal.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm text-center flex flex-col items-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-700 text-white mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Loan Process ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Simple Steps
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Loan Approval Process
            </h2>
          </div>
          <ol className="relative border-l-2 border-blue-200 ml-6 space-y-10 max-w-3xl mx-auto">
            {[
              {
                step: '1',
                title: 'Loan Enquiry & Profile Assessment',
                desc: 'Share your profile, offer letter, and loan requirement. We assess eligibility and recommend the best bank and loan product.',
              },
              {
                step: '2',
                title: 'Document Collection',
                desc: 'We provide a precise document checklist and help you gather, organise, and verify every required document.',
              },
              {
                step: '3',
                title: 'Bank Application Submission',
                desc: 'We submit a complete, error-free application to our partner bank on your behalf, ensuring faster processing.',
              },
              {
                step: '4',
                title: 'Bank Verification & Approval',
                desc: 'The bank verifies your documents and profile. Our team follows up proactively to address any queries.',
              },
              {
                step: '5',
                title: 'Loan Sanction & Disbursal',
                desc: 'Receive your sanction letter and loan disbursal — directly to the university or your account, as required.',
              },
            ].map(({ step, title, desc }) => (
              <li key={step} className="ml-8">
                <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-white text-sm font-bold shadow">
                  {step}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="text-slate-500 text-sm mt-1 leading-relaxed">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Fund Your Education?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Start your loan enquiry today. Our advisors will get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/loan-assistance"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold text-blue-900 shadow-xl hover:bg-blue-50 transition-colors"
            >
              Apply for Education Loan <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-10 py-4 text-base font-bold text-white hover:bg-white/10 transition-colors"
            >
              Talk to a Loan Advisor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
