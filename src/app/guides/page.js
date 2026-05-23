import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { guidesData as fallbackGuides } from '@/lib/fakeData';
import { FaClock, FaArrowRight, FaFileAlt, FaPassport, FaCheckSquare } from 'react-icons/fa';

export const metadata = {
  title: 'Guides - Korean Guide BD',
  description: 'Practical travel and immigration guides for Korea.'
};

async function fetchGuides() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/guides`, { cache: 'no-store' });
    if (!res.ok) return fallbackGuides;
    const data = await res.json();
    return Array.isArray(data) ? data : (data && data.guides ? data.guides : fallbackGuides);
  } catch {
    return fallbackGuides;
  }
}

export default async function GuidesPage() {
  const guides = await fetchGuides();
  return (
    <main style={{ backgroundColor: '#F7FAFF', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ color: '#0F172A' }}>
            Guides & Resources
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto" style={{ color: '#475569' }}>
            Everything you need to know about traveling, studying, and working in Korea. Detailed guides to help you prepare for every step of your journey.
          </p>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 px-6 bg-white border-b" style={{ borderColor: '#E2E8F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center" style={{ color: '#0F172A' }}>
            Quick Access
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Visa Types Card */}
            <Link
              href="/guides/visa-types"
              className="p-8 rounded-2xl transition-all hover:shadow-xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: 'rgba(30, 111, 217, 0.1)' }}
                >
                  <FaPassport size={28} style={{ color: '#1E6FD9' }} />
                </div>
                <FaArrowRight style={{ color: '#1E6FD9' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>
                Visa Types
              </h3>
              <p style={{ color: '#475569' }}>
                Explore all Korean visa categories with detailed requirements and benefits.
              </p>
            </Link>

            {/* Checklist Card */}
            <Link
              href="/guides/checklist"
              className="p-8 rounded-2xl transition-all hover:shadow-xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: 'rgba(31, 175, 122, 0.1)' }}
                >
                  <FaCheckSquare size={28} style={{ color: '#1FAF7A' }} />
                </div>
                <FaArrowRight style={{ color: '#1FAF7A' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>
                Document Checklist
              </h3>
              <p style={{ color: '#475569' }}>
                Organized checklist of all required documents for your application.
              </p>
            </Link>

            {/* Comprehensive Guides Card */}
            <Link
              href="#guides"
              className="p-8 rounded-2xl transition-all hover:shadow-xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)' }}
                >
                  <FaFileAlt size={28} style={{ color: '#B45309' }} />
                </div>
                <FaArrowRight style={{ color: '#B45309' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>
                Comprehensive Guides
              </h3>
              <p style={{ color: '#475569' }}>
                In-depth guides on living, working, and studying in Korea.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16 px-6" id="guides">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12" style={{ color: '#0F172A' }}>
            Featured Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group"
              >
                <div
                  className="h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br" style={{ backgroundImage: 'linear-gradient(135deg, #1E6FD9, #1FAF7A)' }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: 'rgba(30, 111, 217, 0.1)', color: '#1E6FD9' }}
                      >
                        {guide.category || 'Guide'}
                      </span>
                      <span className="text-xs font-medium" style={{ color: '#64748B' }}>
                        <FaClock className="inline mr-1" />
                        {guide.readTime || 5} min
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors" style={{ color: '#0F172A' }}>
                      {guide.title}
                    </h2>

                    {/* Description */}
                    <p className="mb-6 line-clamp-3 leading-relaxed" style={{ color: '#475569' }}>
                      {guide.summary || guide.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: '#E2E8F0' }}>
                      <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                        {new Date(guide.publishedAt || guide.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="text-blue-600 font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                        Read <FaArrowRight className="ml-2 text-sm" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Empty State */}
      {guides.length === 0 && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p style={{ color: '#64748B' }} className="text-lg">
              No guides available at the moment.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
