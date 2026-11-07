"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutCTA({ title, body, href, label }) {
  return (
    <section className="py-24 px-6 bg-black text-white border-t border-[var(--color-border)]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-accent-green)] mb-6">
          Initiate Preparation
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-white font-inter">
          {title}
        </h2>
        <p className="text-base md:text-lg mb-10 text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {body}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={href}
            className="btn btn-primary px-8 py-4 text-sm font-bold tracking-tight inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            {label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/guides/checklist"
            className="btn btn-outline px-8 py-4 text-sm font-bold tracking-tight border-white/40 text-white hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            Access Document Checklist
          </Link>
        </div>
      </div>
    </section>
  );
}
