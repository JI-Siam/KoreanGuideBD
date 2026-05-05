import React from 'react'
import Image from 'next/image'

export default function AboutTeam({ team }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight" style={{ color: '#0F172A' }}>
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="text-center rounded-2xl overflow-hidden transition-all hover:shadow-lg"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0'
              }}
            >
              <div className="aspect-square bg-gradient-to-br" style={{ backgroundImage: 'linear-gradient(135deg, #1E6FD9, #1FAF7A)' }}></div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0F172A' }}>{member.name}</h3>
                <p className="text-sm" style={{ color: '#1FAF7A' }}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
