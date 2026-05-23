import React from 'react';
import Link from 'next/link';
import { guidesData as fallbackGuides } from '@/lib/fakeData';
import { FaArrowLeft, FaClock, FaShare } from 'react-icons/fa';

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/guides`);
    const data = await res.json();
    const guides = Array.isArray(data) ? data : (data && data.guides ? data.guides : fallbackGuides);
    return guides.map((g) => ({ slug: g.slug }));
  } catch {
    return fallbackGuides.map((g) => ({ slug: g.slug }));
  }
}

async function fetchGuide(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/guides`, { cache: 'no-store' });
    const data = await res.json();
    const guides = Array.isArray(data) ? data : (data && data.guides ? data.guides : fallbackGuides);
    return guides.find((g) => g.slug === slug) || null;
  } catch {
    return fallbackGuides.find((g) => g.slug === slug) || null;
  }
}

export default async function GuidePage({ params }) {
  const guide = await fetchGuide(params.slug);
  
  if (!guide) {
    return (
      <main style={{ backgroundColor: '#F7FAFF', minHeight: '100vh' }} className="pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/guides"
            className="inline-flex items-center mb-8 font-semibold transition-colors"
            style={{ color: '#1E6FD9' }}
          >
            <FaArrowLeft className="mr-2" />
            Back to Guides
          </Link>
          <div className="text-center py-24">
            <h1 className="text-3xl font-bold mb-4" style={{ color: '#0F172A' }}>
              Guide not found
            </h1>
            <p style={{ color: '#475569' }}>
              Sorry, the guide you are looking for does not exist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#F7FAFF', minHeight: '100vh' }}>
      {/* Hero/Header Section */}
      <section className="pt-32 pb-12 px-6" style={{ backgroundColor: '#EEF4FB' }}>
        <div className="max-w-4xl mx-auto">
          <Link
            href="/guides"
            className="inline-flex items-center mb-8 font-semibold transition-colors hover:translate-x-1"
            style={{ color: '#1E6FD9' }}
          >
            <FaArrowLeft className="mr-2" />
            Back to Guides
          </Link>

          <div className="mb-8">
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(30, 111, 217, 0.1)', color: '#1E6FD9' }}
            >
              {guide.category || 'Guide'}
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight" style={{ color: '#0F172A' }}>
              {guide.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-6">
              <div className="flex items-center gap-2" style={{ color: '#64748B' }}>
                <FaClock />
                <span className="text-sm font-medium">
                  {guide.readTime || 5} min read
                </span>
              </div>
              <div className="text-sm font-medium" style={{ color: '#64748B' }}>
                {guide.publishedAt || guide.date ? `Published on ${new Date(guide.publishedAt || guide.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}` : 'Recently published'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <article
            className="prose prose-lg max-w-none"
            style={{
              color: '#0F172A'
            }}
          >
            {/* Hero Image */}
            <div
              className="rounded-2xl overflow-hidden mb-12 h-96 bg-gradient-to-br"
              style={{ backgroundImage: 'linear-gradient(135deg, #1E6FD9, #1FAF7A)' }}
            ></div>

            {/* HTML Content */}
            <div
              className="guide-content"
              dangerouslySetInnerHTML={{ __html: guide.content }}
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}
            />
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#EEF4FB' }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="p-8 rounded-2xl text-center"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0'
            }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0F172A' }}>
              Found this guide helpful?
            </h2>
            <p className="mb-6" style={{ color: '#475569' }}>
              Share it with others who might be interested in visiting Korea.
            </p>
            <button
              className="inline-flex items-center px-8 py-3 rounded-full font-bold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: '#1E6FD9' }}
            >
              <FaShare className="mr-2" />
              Share Guide
            </button>
          </div>
        </div>
      </section>

      {/* Related Guides Navigation */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link
              href="/guides"
              className="inline-flex items-center px-6 py-3 rounded-full font-semibold transition-all"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#1E6FD9',
                border: '2px solid #1E6FD9'
              }}
            >
              <FaArrowLeft className="mr-2" />
              All Guides
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: '#1E6FD9' }}
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
