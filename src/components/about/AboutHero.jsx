"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Compass } from 'lucide-react';

export default function AboutHero({ title, subtitle, ctaHref, ctaLabel }) {
  return (
    <section className="relative pt-36 pb-20 px-6 border-b border-[var(--color-border)] bg-[var(--color-primary-bg)]">
      <div className="max-w-7xl mx-auto">
        {/* Monospace System Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4 mb-12 text-xs font-mono text-[var(--color-muted-text)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[var(--color-accent-green)]" aria-hidden="true" />
            <span className="font-bold text-[var(--color-primary-text)] uppercase tracking-wider">SECTION 01 // EDITORIAL CHARTER</span>
          </div>
          <span className="text-[11px] uppercase">KOREAN IMMIGRATION &amp; ADMISSION STANDARDS</span>
        </div>

        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-accent-green)] mb-6">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            Independent Education Intelligence
          </div>

          <h1 className="text-4xl md:text-6xl xl:text-7xl font-black mb-6 tracking-tight font-inter text-[var(--color-primary-text)] leading-[1.05]">
            {title}
          </h1>

          <p className="text-base md:text-xl mb-10 max-w-3xl text-[var(--color-secondary-text)] leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={ctaHref}
              className="btn btn-primary px-8 py-4 text-sm font-bold tracking-tight inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/guides/visa-types"
              className="btn btn-outline px-8 py-4 text-sm font-bold tracking-tight focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
            >
              Statutory Visa Classifications
            </Link>
          </div>
        </motion.div>

        {/* 3-Pillar Swiss Framework Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-[var(--color-border)]">
          {[
            {
              code: 'PIL-01',
              title: 'Statutory Verification',
              desc: 'Every document guideline is corroborated with Korean Ministry of Justice directives.'
            },
            {
              code: 'PIL-02',
              title: 'Academic Accreditation',
              desc: 'Official ranking indexes, English-taught curricula, and direct admissions department links.'
            },
            {
              code: 'PIL-03',
              title: 'Zero Ambiguity',
              desc: 'Rigorous checklist requirements, financial proof intervals, and notarization standards.'
            }
          ].map((item) => (
            <div
              key={item.code}
              className="border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 transition-colors hover:border-[var(--color-border-strong)]"
            >
              <span className="font-mono text-xs font-bold text-[var(--color-accent-green)] block mb-2">
                {item.code} //
              </span>
              <h3 className="font-inter text-base font-bold text-[var(--color-primary-text)] mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-[var(--color-secondary-text)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
