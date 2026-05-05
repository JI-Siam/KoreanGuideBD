import React from 'react'
import Link from 'next/link'

export default function AboutCTA({ title, body, href, label }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#1E6FD9' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6 tracking-tight text-white">{title}</h2>
        <p className="text-xl mb-8 text-blue-100">{body}</p>
        <Link href={href} className="inline-flex items-center px-8 py-4 rounded-full font-bold text-blue-600 transition-all hover:shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
          {label}
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </section>
  )
}
