import React from 'react'

export default function AboutMission({ children }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-6 tracking-tight" style={{ color: '#0F172A' }}>
              Our Mission
            </h2>
            <div className="space-y-4 text-lg" style={{ color: '#475569' }}>{children}</div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div className="aspect-video bg-gradient-to-br" style={{ backgroundImage: 'linear-gradient(135deg, #1E6FD9, #1FAF7A)' }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
