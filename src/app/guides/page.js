import React from 'react';
import Link from 'next/link';
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
    <main className="min-h-screen bg-[var(--color-primary-bg)] text-[var(--color-primary-text)]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-accent-green)]">
              Documentation Library
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight font-inter text-[var(--color-primary-text)]">
              Guides &amp; Regulatory Resources
            </h1>
            <p className="text-base md:text-lg text-[var(--color-secondary-text)] leading-relaxed">
              Standardized, fact-checked operational guides covering South Korean visa procedures, university applications, living standards, and legal compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Matrix */}
      <section className="py-12 px-6 bg-[var(--color-secondary-bg)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Visa Types */}
            <Link
              href="/guides/visa-types"
              className="p-6 border border-[var(--color-border)] bg-[var(--color-card-bg)] transition-colors hover:border-[var(--color-border-strong)] group focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-[var(--color-primary-blue)]">
                  <FaPassport size={22} aria-hidden="true" />
                </div>
                <FaArrowRight className="text-[var(--color-muted-text)] group-hover:translate-x-1 group-hover:text-[var(--color-primary-text)] transition-all" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold mb-2 font-inter text-[var(--color-primary-text)]">
                Visa Directory
              </h2>
              <p className="text-xs md:text-sm text-[var(--color-secondary-text)] leading-relaxed">
                Explore all Korean visa categories with permitted activity scopes and durations.
              </p>
            </Link>

            {/* Checklist Card */}
            <Link
              href="/guides/checklist"
              className="p-6 border border-[var(--color-border)] bg-[var(--color-card-bg)] transition-colors hover:border-[var(--color-border-strong)] group focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-[var(--color-accent-green)]">
                  <FaCheckSquare size={22} aria-hidden="true" />
                </div>
                <FaArrowRight className="text-[var(--color-muted-text)] group-hover:translate-x-1 group-hover:text-[var(--color-primary-text)] transition-all" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold mb-2 font-inter text-[var(--color-primary-text)]">
                Document Checklist
              </h2>
              <p className="text-xs md:text-sm text-[var(--color-secondary-text)] leading-relaxed">
                Prioritized checklist of mandatory documents, bank statements, and apostilles.
              </p>
            </Link>

            {/* Life & Study Card */}
            <Link
              href="/universities"
              className="p-6 border border-[var(--color-border)] bg-[var(--color-card-bg)] transition-colors hover:border-[var(--color-border-strong)] group focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-[var(--color-warning)]">
                  <FaFileAlt size={22} aria-hidden="true" />
                </div>
                <FaArrowRight className="text-[var(--color-muted-text)] group-hover:translate-x-1 group-hover:text-[var(--color-primary-text)] transition-all" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold mb-2 font-inter text-[var(--color-primary-text)]">
                Accredited Universities
              </h2>
              <p className="text-xs md:text-sm text-[var(--color-secondary-text)] leading-relaxed">
                Browse accredited Korean universities with official QS world rankings.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16 px-6" id="guides">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold font-inter text-[var(--color-primary-text)]">
                Available Publications ({guides.length})
              </h2>
              <p className="text-xs font-mono text-[var(--color-muted-text)] mt-1">
                Verified against Ministry of Justice and National Institute for International Education directives.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col justify-between border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 transition-colors duration-150 hover:border-[var(--color-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-blue)] border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-2.5 py-0.5">
                      {guide.category || 'Guide'}
                    </span>
                    <span className="text-xs font-mono text-[var(--color-muted-text)] flex items-center gap-1">
                      <FaClock aria-hidden="true" />
                      {guide.readTime || 5} min read
                    </span>
                  </div>

                  <h3 className="font-inter text-xl font-bold mb-3 text-[var(--color-primary-text)] group-hover:text-[var(--color-accent-green)] transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[var(--color-secondary-text)] line-clamp-3 leading-relaxed mb-6">
                    {guide.summary || guide.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-muted-text)]">
                  <span>
                    {new Date(guide.publishedAt || guide.date || Date.now()).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="font-bold text-[var(--color-primary-text)] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Article <FaArrowRight size={10} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Empty State */}
      {guides.length === 0 && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto text-center border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-12">
            <p className="text-sm font-mono text-[var(--color-muted-text)]">
              No publication records currently active.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
