import React from 'react'

export default function AboutValues({ values }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEF4FB' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight" style={{ color: '#0F172A' }}>
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.id}
                className="p-8 rounded-2xl transition-all hover:shadow-lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Icon size={32} style={{ color: '#1E6FD9' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>{value.title}</h3>
                    <p style={{ color: '#475569' }}>{value.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
