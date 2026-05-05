import React from 'react'
import Link from 'next/link'

export default function AboutHero({ title, subtitle, ctaHref, ctaLabel }) {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ color: '#0F172A' }}>
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: '#475569' }}>
          {subtitle}
        </p>
        <Link
          href={ctaHref}
          className="inline-flex items-center px-8 py-4 rounded-full font-bold text-white transition-all hover:shadow-lg"
          style={{ backgroundColor: '#1E6FD9' }}
        >
          {ctaLabel}
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </section>
  )
}
