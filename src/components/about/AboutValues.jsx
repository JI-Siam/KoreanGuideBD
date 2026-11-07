"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutValues({ values = [] }) {
  return (
    <section className="py-24 px-6 border-b border-[var(--color-border)] bg-[var(--color-secondary-bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16 border-b border-[var(--color-border)] pb-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-muted-text)] mb-2">
              SECTION 03 // ETHICAL PILLARS
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight font-inter text-[var(--color-primary-text)]">
              Our Core Principles
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[var(--color-secondary-text)] max-w-md leading-relaxed font-mono">
            Guiding research rigor, editorial neutrality, and applicant data security across every published resource.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <div
                key={value.id || idx}
                className="border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 transition-colors duration-150 hover:border-[var(--color-border-strong)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-3 text-[var(--color-primary-blue)]">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[var(--color-muted-text)]">
                      PRIN-0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-inter text-[var(--color-primary-text)] mb-2.5">
                    {value.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[var(--color-secondary-text)] leading-relaxed">
                    {value.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-accent-green)]">
                  Active Practice ✓
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
