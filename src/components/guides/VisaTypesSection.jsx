'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import IntakeCountdown from '@/components/guides/IntakeCountdown';
import VisaTypeModal from '@/components/guides/VisaTypeModal';
import { FaArrowRight, FaPassport, FaRegFileAlt } from 'react-icons/fa';

function getCategoryTone(category) {
  const normalized = String(category || '').toLowerCase();

  if (normalized.includes('study')) {
    return {
      badge: 'rgba(31, 175, 122, 0.12)',
      badgeText: '#0F766E',
    };
  }

  if (normalized.includes('family') || normalized.includes('residence')) {
    return {
      badge: 'rgba(217, 119, 6, 0.12)',
      badgeText: '#B45309',
    };
  }

  if (normalized.includes('business') || normalized.includes('medical')) {
    return {
      badge: 'rgba(14, 165, 233, 0.12)',
      badgeText: '#0369A1',
    };
  }

  return {
    badge: 'rgba(30, 111, 217, 0.12)',
    badgeText: '#1E6FD9',
  };
}

function VisaCard({ visa, onOpen }) {
  const tone = getCategoryTone(visa.category);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
      <div
        className="flex min-h-44 items-center justify-between gap-4 px-6 py-6 text-white"
        style={{ background: 'linear-gradient(135deg, #1E6FD9 0%, #0E4C97 55%, #1FAF7A 100%)' }}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/75">Visa code</p>
          <h3 className="mt-2 text-2xl font-extrabold leading-tight md:text-3xl">{visa.code}</h3>
        </div>
        <div className="rounded-full bg-white/15 p-4 text-white/90">
          <FaPassport size={24} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.22em]"
              style={{ backgroundColor: tone.badge, color: tone.badgeText }}
            >
              {visa.category}
            </span>
            <h4 className="mt-4 text-2xl font-bold tracking-tight text-[#0F172A]">
              {visa.title}
            </h4>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFF] px-3 py-2 text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">Duration</p>
            <p className="mt-1 text-sm font-bold text-[#0F172A]">{visa.duration}</p>
          </div>
        </div>

        <p className="mt-5 flex-1 leading-7 text-[#475569]">
          {visa.description}
        </p>

        <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-[#F7FAFF] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#64748B]">
            <FaRegFileAlt className="text-[#1E6FD9]" />
            Requirements preview
          </div>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#475569]">
            {visa.requirements}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpen(visa)}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1E6FD9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0E4C97]"
        >
          Open visa details
          <FaArrowRight className="ml-2 text-xs" />
        </button>
      </div>
    </article>
  );
}

export default function VisaTypesSection({ visas }) {
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
    <main className="min-h-screen" style={{ backgroundColor: '#F7FAFF' }}>
      <section className="px-6 pb-16 pt-32 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl text-center md:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#1E6FD9]">
              Visa guidance
            </p>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-[#0F172A] md:text-7xl">
              Korean visa types, organized for fast decisions.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#475569] md:text-xl">
              Browse the original visa dataset, open a detailed card for each category, and keep your intake timeline in view before the September deadline.
            </p>
          </div>

          <IntakeCountdown />
        </div>
      </section>

      <section className="px-6 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
                All visa types
              </h2>
              <p className="mt-2 text-[#475569]">
                Click any card to open the detail panel.
              </p>
            </div>
            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <label className="flex items-center gap-2 rounded-full border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-[#0F172A]">
                <span>Category</span>
                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="bg-transparent text-sm font-semibold text-[#0F172A] outline-none"
                  aria-label="Filter visa types by category"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All categories' : category}
                    </option>
                  ))}
                </select>
              </label>

              <Link
                href="/guides"
                className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#0F172A] transition hover:border-[#1E6FD9] hover:text-[#1E6FD9]"
              >
                Back to guides
              </Link>
            </div>
          </div>

          {filteredVisas.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredVisas.map((visa) => (
                <VisaCard key={visa.id} visa={visa} onOpen={setSelectedVisa} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#E2E8F0] bg-white px-6 py-16 text-center text-[#64748B] shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              No visa types match the selected category.
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