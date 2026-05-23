"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutCTA({ title, body, href, label }) {
  return (
    <section className="relative overflow-hidden py-24 px-6" style={{ backgroundColor: '#1E6FD9' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.25),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(31,175,122,0.35),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-extrabold mb-6 tracking-tight text-white">{title}</h2>
        <p className="text-xl mb-8 text-blue-100">{body}</p>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
          <Link href={href} className="inline-flex items-center px-8 py-4 rounded-full font-bold text-blue-600 transition-all hover:shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
            {label}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
