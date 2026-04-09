'use client'

import Link from 'next/link'

const testimonials = [
  { name: 'Priya Sharma', destination: '🇨🇦 Canada', service: 'Canada PR Visa', rating: 5, date: 'March 2024', review: 'Beyond Borders made my Canada PR journey completely stress-free. Their team guided me through every step of Express Entry and I got my ITA within 4 months. Highly recommend!' },
  { name: 'Rahul Verma', destination: '🇦🇺 Australia', service: 'Study Abroad', rating: 5, date: 'February 2024', review: 'I got admission to the University of Melbourne with full scholarship guidance from Beyond Borders. Their SOP counselling was exceptional and the visa got approved in 3 weeks.' },
  { name: 'Ananya Singh', destination: '🇬🇧 UK', service: 'Work Visa', rating: 5, date: 'January 2024', review: 'Got my UK Skilled Worker visa without any hassle. The team was very professional, responsive and the documentation support was top-notch. I am now working in London!' },
  { name: 'Karan Patel', destination: '🇳🇿 New Zealand', service: 'NZ PR Visa', rating: 4, date: 'December 2023', review: 'Beyond Borders helped me get my New Zealand PR through the Skilled Migrant Category. The process took exactly as long as they estimated. Great communication throughout.' },
  { name: 'Meera Iyer', destination: '🇦🇺 Australia', service: 'Education Loan', rating: 5, date: 'November 2023', review: 'Got an education loan of ₹35 lakhs without collateral for my Master\'s in Australia. Beyond Borders\'s banking relationships made all the difference. Entire process took 3 weeks.' },
  { name: 'Suresh Kumar', destination: '🇨🇦 Canada', service: 'Family Visa', rating: 5, date: 'October 2023', review: 'Brought my parents to Canada on a Super Visa with Beyond Borders\'s help. They handled all the paperwork and my parents got the visa approved in just 8 weeks. Excellent service!' },
  { name: 'Divya Nair', destination: '🇺🇸 USA', service: 'Work Visa', rating: 5, date: 'September 2023', review: 'My H-1B visa was successfully processed through Beyond Borders. They have deep expertise in US immigration law and kept me updated at every stage. Very happy with the outcome.' },
  { name: 'Arun Mehta', destination: '🇦🇺 Australia', service: 'Study Abroad', rating: 4, date: 'August 2023', review: 'Applied to 5 universities in Australia and got offers from 3! Beyond Borders\'s course counselling helped me pick the right program. Visa was approved on the first attempt.' },
  { name: 'Neha Gupta', destination: '🇨🇦 Canada', service: 'Study Abroad', rating: 5, date: 'July 2023', review: 'From shortlisting universities to arriving in Toronto, Beyond Borders supported me at every step. The pre-departure orientation was incredibly helpful. Best decision I made!' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16 text-white text-center">
        <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">Client Stories</p>
        <h1 className="text-4xl font-bold mb-3">Success Stories</h1>
        <p className="text-blue-100 max-w-xl mx-auto">Real people, real results. See how Beyond Borders changed lives across the globe.</p>
      </section>

      {/* Google Reviews Badge */}
      <section className="py-10 px-4 bg-blue-50">
        <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-md p-6 flex items-center gap-5">
          <div className="text-4xl font-bold text-blue-800">G</div>
          <div>
            <p className="font-bold text-gray-800">Google Reviews</p>
            <div className="flex items-center gap-2 my-1">
              <span className="text-2xl font-bold text-yellow-500">4.9</span>
              <StarRating rating={5} />
            </div>
            <p className="text-sm text-gray-500">Based on 500+ reviews</p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.destination}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded-full shrink-0 ml-2">{t.service}</span>
                </div>
                <StarRating rating={t.rating} />
                <p className="text-gray-700 text-sm leading-relaxed flex-1">&ldquo;{t.review}&rdquo;</p>
                <p className="text-xs text-gray-400">{t.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to Write Your Success Story?</h2>
        <p className="text-blue-100 mb-8 max-w-xl mx-auto">Join thousands of happy clients who trusted Beyond Borders for their immigration journey.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/assessment" className="bg-white text-blue-800 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Get Free Assessment
          </Link>
          <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-blue-800 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
