import React from 'react'

export default function AboutStats({ stats }) {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#EEF4FB' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: '#1E6FD9' }}>
                {stat.number}
              </div>
              <div className="text-sm md:text-base font-medium" style={{ color: '#475569' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
