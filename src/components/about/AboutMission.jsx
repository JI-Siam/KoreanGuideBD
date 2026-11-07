"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Target } from 'lucide-react';

export default function AboutMission({ children }) {
  const points = React.Children.toArray(children);

  return (
    <section className="py-24 px-6 border-b border-[var(--color-border)] bg-[var(--color-primary-bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Mission Mandates */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-muted-text)] mb-3">
              <Target className="h-3.5 w-3.5 text-[var(--color-accent-green)]" aria-hidden="true" />
              <span>SECTION 02 // INSTITUTIONAL MANDATE</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight font-inter text-[var(--color-primary-text)]">
              Our Foundational Mission
            </h2>

            <p className="text-sm md:text-base text-[var(--color-secondary-text)] leading-relaxed mb-8">
              Navigating immigration protocols, apostille notarizations, and admissions deadlines should not depend on unverified social media conjecture.
            </p>

            <div className="space-y-4">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-6 transition-colors hover:border-[var(--color-border-strong)]"
                >
                  <span className="font-mono text-xs font-bold text-[var(--color-accent-green)] bg-[var(--color-card-bg)] border border-[var(--color-border)] px-2.5 py-1 shrink-0">
                    MANDATE 0{index + 1}
                  </span>
                  <div className="text-xs md:text-sm leading-relaxed text-[var(--color-secondary-text)]">
                    {point}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Swiss Architectural Declaration Card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="border border-black bg-black text-white p-8 md:p-10">
              <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-6 text-xs font-mono">
                <span className="text-[var(--color-accent-green)] font-bold tracking-widest uppercase">
                  OPERATIONAL DOCTRINE
                </span>
                <span className="text-zinc-400">DOC-ID: KGBD-2026</span>
              </div>

              <h3 className="font-inter text-2xl md:text-3xl font-black text-white leading-tight mb-4">
                Uncompromising Factuality &amp; Procedural Rigor
              </h3>

              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed mb-8">
                South Korean administrative decree intervals change cyclically between spring and autumn terms. Every guideline on this portal undergoes dual-analyst corroboration before publication.
              </p>

              <div className="space-y-3 border-t border-white/15 pt-6 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">CITATIONS</span>
                  <span className="text-white font-bold">OFFICIAL GAZETTE ONLY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">AUDIT FREQUENCY</span>
                  <span className="text-white font-bold">MONTHLY PROTOCOL REVIEW</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">STUDENT ADVOCACY</span>
                  <span className="text-[var(--color-accent-green)] font-bold">100% INDEPENDENT</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
