'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageSquare,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  BookOpen,
  DollarSign,
  Building,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = 'immigration' | 'student' | 'loan';

interface FormField {
  name: string;
  value: string;
}

// ─── Immigration Form ─────────────────────────────────────────────────────────

function ImmigrationForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    currentCountry: '',
    destinationCountry: '',
    visaType: '',
    educationLevel: '',
    workExperience: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'immigration', ...form }),
      });
      if (!res.ok) throw new Error('Submission failed. Please try again.');
      setStatus('success');
      setForm({
        fullName: '',
        email: '',
        phone: '',
        nationality: '',
        currentCountry: '',
        destinationCountry: '',
        visaType: '',
        educationLevel: '',
        workExperience: '',
        message: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const inputCls =
    'w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'success' && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>Thank you! Your immigration assessment request has been submitted. We'll contact you within 24 hours.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+91 98765 43210"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              required
              placeholder="e.g. Indian"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Country *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="currentCountry"
              value={form.currentCountry}
              onChange={handleChange}
              required
              placeholder="e.g. India"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination Country *</label>
          <select
            name="destinationCountry"
            value={form.destinationCountry}
            onChange={handleChange}
            required
            className={inputCls}
          >
            <option value="">Select destination</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="UK">United Kingdom</option>
            <option value="New Zealand">New Zealand</option>
            <option value="USA">USA</option>
            <option value="Europe">Europe</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type *</label>
          <select
            name="visaType"
            value={form.visaType}
            onChange={handleChange}
            required
            className={inputCls}
          >
            <option value="">Select visa type</option>
            <option value="PR">Permanent Residency (PR)</option>
            <option value="Work">Work Visa</option>
            <option value="Tourist">Tourist Visa</option>
            <option value="Family">Family Visa</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Education Level *</label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="educationLevel"
              value={form.educationLevel}
              onChange={handleChange}
              required
              placeholder="e.g. Bachelor's Degree"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Experience (years) *</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              name="workExperience"
              value={form.workExperience}
              onChange={handleChange}
              required
              min="0"
              max="50"
              placeholder="e.g. 5"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us more about your immigration goals..."
            className={`${inputCls} pl-10 resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting...
          </>
        ) : (
          <>Submit Immigration Assessment <ChevronRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}

// ─── Student Visa Form ────────────────────────────────────────────────────────

function StudentVisaForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    desiredCountry: '',
    courseLevel: '',
    fieldOfStudy: '',
    ieltsPteScore: '',
    budgetRange: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'student', ...form }),
      });
      if (!res.ok) throw new Error('Submission failed. Please try again.');
      setStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        nationality: '',
        desiredCountry: '',
        courseLevel: '',
        fieldOfStudy: '',
        ieltsPteScore: '',
        budgetRange: '',
        message: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const inputCls =
    'w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'success' && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>Thank you! Your student visa assessment has been submitted. Our team will reach out shortly.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@email.com"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+91 98765 43210"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              required
              placeholder="e.g. Indian"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Desired Country *</label>
          <select
            name="desiredCountry"
            value={form.desiredCountry}
            onChange={handleChange}
            required
            className={inputCls}
          >
            <option value="">Select country</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="UK">United Kingdom</option>
            <option value="New Zealand">New Zealand</option>
            <option value="USA">USA</option>
            <option value="Europe">Europe</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Level *</label>
          <select
            name="courseLevel"
            value={form.courseLevel}
            onChange={handleChange}
            required
            className={inputCls}
          >
            <option value="">Select level</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="PhD">PhD / Doctorate</option>
            <option value="Diploma">Diploma / Certificate</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study *</label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="fieldOfStudy"
              value={form.fieldOfStudy}
              onChange={handleChange}
              required
              placeholder="e.g. Computer Science"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IELTS / PTE Score</label>
          <input
            type="text"
            name="ieltsPteScore"
            value={form.ieltsPteScore}
            onChange={handleChange}
            placeholder="e.g. IELTS 7.0 / PTE 65"
            className={inputCls}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range (Annual) *</label>
          <select
            name="budgetRange"
            value={form.budgetRange}
            onChange={handleChange}
            required
            className={inputCls}
          >
            <option value="">Select budget range</option>
            <option value="Under $10,000">Under $10,000</option>
            <option value="$10,000 - $20,000">$10,000 – $20,000</option>
            <option value="$20,000 - $35,000">$20,000 – $35,000</option>
            <option value="$35,000 - $50,000">$35,000 – $50,000</option>
            <option value="Above $50,000">Above $50,000</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Any specific questions or requirements?"
            className={`${inputCls} pl-10 resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting...
          </>
        ) : (
          <>Submit Student Visa Assessment <ChevronRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}

// ─── Loan Form ────────────────────────────────────────────────────────────────

function LoanForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    studyCountry: '',
    course: '',
    university: '',
    loanAmount: '',
    annualIncome: '',
    collateralAvailable: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'loan', ...form }),
      });
      if (!res.ok) throw new Error('Submission failed. Please try again.');
      setStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        studyCountry: '',
        course: '',
        university: '',
        loanAmount: '',
        annualIncome: '',
        collateralAvailable: '',
        message: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const inputCls =
    'w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'success' && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>Thank you! Your education loan inquiry has been submitted. A loan advisor will contact you within 24 hours.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@email.com"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+91 98765 43210"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Study Country *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="studyCountry"
              value={form.studyCountry}
              onChange={handleChange}
              required
              placeholder="e.g. Canada"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course / Program *</label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              placeholder="e.g. MBA, Computer Science"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">University *</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="university"
              value={form.university}
              onChange={handleChange}
              required
              placeholder="University name"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount Needed *</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="loanAmount"
              value={form.loanAmount}
              onChange={handleChange}
              required
              placeholder="e.g. ₹25,00,000"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Family Income *</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="annualIncome"
              value={form.annualIncome}
              onChange={handleChange}
              required
              placeholder="e.g. ₹8,00,000"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Collateral Available? *</label>
          <div className="flex gap-6">
            {(['Yes', 'No'] as const).map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="collateralAvailable"
                  value={opt}
                  checked={form.collateralAvailable === opt}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 text-blue-600 accent-blue-700"
                />
                <span className="text-sm text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Any specific questions about the loan process?"
            className={`${inputCls} pl-10 resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting...
          </>
        ) : (
          <>Submit Loan Inquiry <ChevronRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}

// ─── Tab Config ───────────────────────────────────────────────────────────────

const tabs: { id: TabId; label: string; description: string }[] = [
  {
    id: 'immigration',
    label: 'Immigration',
    description: 'PR, Work Visa & More',
  },
  {
    id: 'student',
    label: 'Student Visa',
    description: 'Study Abroad Assessment',
  },
  {
    id: 'loan',
    label: 'Education Loan',
    description: 'Funding Your Future',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const [activeTab, setActiveTab] = useState<TabId>('immigration');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">
            Free Evaluation
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Get Your Free Assessment</h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
            Fill out the form below and our certified consultants will evaluate your profile and
            get back to you within 24 hours — completely free.
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {['10,000+ Successful Cases', '15+ Years Experience', 'RCIC Certified Consultants', 'Free Initial Consultation'].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-700 text-white shadow'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div>{tab.label}</div>
              <div
                className={`text-xs font-normal mt-0.5 ${
                  activeTab === tab.id ? 'text-blue-200' : 'text-gray-400'
                }`}
              >
                {tab.description}
              </div>
            </button>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {activeTab === 'immigration' && 'Immigration Assessment Form'}
            {activeTab === 'student' && 'Student Visa Assessment Form'}
            {activeTab === 'loan' && 'Education Loan Enquiry Form'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Fields marked with * are required. We typically respond within 24 hours.
          </p>

          {activeTab === 'immigration' && <ImmigrationForm />}
          {activeTab === 'student' && <StudentVisaForm />}
          {activeTab === 'loan' && <LoanForm />}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By submitting this form you agree to our{' '}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          . Your information is secure and will never be shared.
        </p>
      </section>
    </main>
  );
}
