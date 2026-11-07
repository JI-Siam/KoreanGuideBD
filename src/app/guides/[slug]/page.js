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
      <main className="min-h-screen bg-[var(--color-primary-bg)] text-[var(--color-primary-text)] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/guides"
            className="inline-flex items-center mb-8 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-blue)] hover:underline"
          >
            <FaArrowLeft className="mr-2" aria-hidden="true" />
            Back to Guides
          </Link>
          <div className="text-center py-20 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-12">
            <h1 className="text-3xl font-black mb-3 font-inter text-[var(--color-primary-text)]">
              Publication Not Found
            </h1>
            <p className="text-sm text-[var(--color-secondary-text)]">
              The requested guide slug does not correspond to an active article in the registry.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-primary-bg)] text-[var(--color-primary-text)]">
      {/* Header Section */}
      <section className="pt-32 pb-12 px-6 bg-[var(--color-secondary-bg)] border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/guides"
            className="inline-flex items-center mb-6 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-blue)] hover:underline focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            <FaArrowLeft className="mr-2" aria-hidden="true" />
            All Documentation
          </Link>

          <div>
            <span className="inline-block border border-[var(--color-border)] bg-[var(--color-card-bg)] px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-primary-text)] mb-4">
              {guide.category || 'Guide'}
            </span>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-inter text-[var(--color-primary-text)]">
              {guide.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-[var(--color-border)] text-xs font-mono text-[var(--color-muted-text)]">
              <div className="flex items-center gap-2">
                <FaClock aria-hidden="true" />
                <span>{guide.readTime || 5} MIN ESTIMATED READ</span>
              </div>
              <div>
                PUBLISHED: {guide.publishedAt || guide.date ? new Date(guide.publishedAt || guide.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }).toUpperCase() : 'CURRENT STANDARD'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <article className="guide-content">
            <div
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />
          </article>
        </div>
      </section>

      {/* Footer Share & Actions */}
      <section className="py-12 px-6 bg-[var(--color-secondary-bg)] border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="border border-[var(--color-border)] bg-[var(--color-card-bg)] p-8 text-center">
            <h2 className="text-xl font-bold font-inter text-[var(--color-primary-text)] mb-2">
              Found this documentation helpful?
            </h2>
            <p className="text-sm text-[var(--color-secondary-text)] mb-6 max-w-md mx-auto">
              Share verified guidelines with prospective students, researchers, and professionals preparing their relocation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/guides"
                className="btn btn-outline px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                <FaArrowLeft className="mr-2" aria-hidden="true" />
                Return to Library
              </Link>
              <Link
                href="/about"
                className="btn btn-black px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                Learn More About Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
