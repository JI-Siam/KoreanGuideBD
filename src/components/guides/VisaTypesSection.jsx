'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import IntakeCountdown from '@/components/guides/IntakeCountdown';
import VisaTypeModal from '@/components/guides/VisaTypeModal';
import { FaArrowRight, FaPassport, FaRegFileAlt } from 'react-icons/fa';

function VisaCard({ visa, onOpen }) {
  return (
    <article className="group flex h-full flex-col border border-[var(--color-border)] bg-[var(--color-card-bg)] transition-colors duration-150 hover:border-[var(--color-border-strong)]">
      {/* Code Banner */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-6 py-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-muted-text)]">
            Visa Code
          </span>
          <h3 className="text-2xl font-black font-mono text-[var(--color-primary-text)] tracking-tight">
            {visa.code}
          </h3>
        </div>
        <div className="border border-[var(--color-border)] bg-[var(--color-card-bg)] p-2.5 text-[var(--color-primary-blue)]">
          <FaPassport size={20} aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="inline-block border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-secondary-text)]">
              {visa.category}
            </span>
            <h4 className="mt-3 font-inter text-xl font-bold tracking-tight text-[var(--color-primary-text)] group-hover:text-[var(--color-accent-green)] transition-colors">
              {visa.title}
            </h4>
          </div>

          <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-3 py-1.5 text-right font-mono">
            <p className="text-[10px] uppercase text-[var(--color-muted-text)]">Duration</p>
            <p className="text-xs font-bold text-[var(--color-primary-text)]">{visa.duration}</p>
          </div>
        </div>

        <p className="mt-4 flex-1 text-xs md:text-sm leading-relaxed text-[var(--color-secondary-text)]">
          {visa.description}
        </p>

        <div className="mt-6 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--color-primary-blue)]">
            <FaRegFileAlt aria-hidden="true" />
            <span>Requirements Outline</span>
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--color-secondary-text)]">
            {visa.requirements}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpen(visa)}
          className="btn btn-black mt-6 w-full py-3 text-xs font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
        >
          View Full Specifications
          <FaArrowRight className="ml-2 text-xs" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default function VisaTypesSection({ visas = [] }) {
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const rawCategories = (visas || [])
      .map((visa) => visa?.category)
      .filter(Boolean);

    return ['all', ...Array.from(new Set(rawCategories))];
  }, [visas]);

  const filteredVisas = useMemo(() => {
    if (selectedCategory === 'all') {
      return [...(visas || [])];
    }

    return (visas || []).filter((visa) => visa?.category === selectedCategory);
  }, [visas, selectedCategory]);

  return (
    <main className="min-h-screen bg-[var(--color-primary-bg)]">
      <section className="px-6 pb-12 pt-32 md:px-8 border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-accent-green)]">
              Immigration Framework
            </div>
            <h1 className="font-inter text-4xl font-black tracking-tight text-[var(--color-primary-text)] md:text-5xl">
              Korean Visa Directory
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-[var(--color-secondary-text)]">
              Categorized database of South Korean visas with statutory stay limits, eligibility matrices, and document requirements.
            </p>
          </div>

          <IntakeCountdown />
        </div>
      </section>

      <section className="px-6 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-inter text-2xl font-bold tracking-tight text-[var(--color-primary-text)]">
                Classifications ({filteredVisas.length})
              </h2>
              <p className="mt-1 text-xs text-[var(--color-muted-text)] font-mono">
                Select any visa classification to inspect specific statutory requirements.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-card-bg)] px-3.5 py-2 text-xs font-mono font-bold text-[var(--color-primary-text)]">
                <span className="text-[var(--color-muted-text)]">FILTER:</span>
                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="bg-transparent font-bold uppercase text-[var(--color-primary-text)] outline-none cursor-pointer"
                  aria-label="Filter visa types by category"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-[var(--color-card-bg)]">
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </label>

              <Link
                href="/guides"
                className="btn btn-outline px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                Guides index →
              </Link>
            </div>
          </div>

          {filteredVisas.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVisas.map((visa) => (
                <VisaCard key={visa.id} visa={visa} onOpen={setSelectedVisa} />
              ))}
            </div>
          ) : (
            <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-12 text-center text-sm font-mono text-[var(--color-muted-text)]">
              No visa types match the selected filter category.
            </div>
          )}
        </div>
      </section>

      {selectedVisa ? (
        <VisaTypeModal visa={selectedVisa} onClose={() => setSelectedVisa(null)} />
      ) : null}
    </main>
  );
}
