"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutHero({ title, subtitle, ctaHref, ctaLabel }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,111,217,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(31,175,122,0.14),transparent_45%)]" />

      <motion.div
        className="max-w-7xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1E6FD9] shadow-sm backdrop-blur">
          Why We Built Korean Guide BD
        </span>

        <h1 className="mt-6 text-5xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ color: '#0F172A' }}>
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: '#475569' }}>
          {subtitle}
        </p>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
          <Link
            href={ctaHref}
            className="inline-flex items-center px-8 py-4 rounded-full font-bold text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: '#1E6FD9' }}
          >
            {ctaLabel}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {['Trusted Guides', 'Policy Updates', 'Student Support'].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-[#E2E8F0] bg-white/85 px-5 py-3 text-sm font-medium text-[#475569] shadow-sm"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
