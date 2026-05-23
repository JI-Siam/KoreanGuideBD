"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutMission({ children }) {
  const points = React.Children.toArray(children);

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-4xl font-extrabold mb-6 tracking-tight" style={{ color: '#0F172A' }}>
              Our Mission
            </h2>
            <div className="space-y-4 text-lg" style={{ color: '#475569' }}>
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-xl border border-[#E2E8F0] bg-white/90 p-4 shadow-sm"
                >
                  {point}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl overflow-hidden shadow-lg"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}
          >
            <div className="relative aspect-video" style={{ backgroundImage: 'linear-gradient(135deg, #1E6FD9, #1FAF7A)' }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.2),transparent_50%)]" />
              <div className="absolute left-6 right-6 bottom-6 rounded-xl bg-white/90 p-4 backdrop-blur">
                <h3 className="text-lg font-bold text-[#0F172A]">Reliable Guidance</h3>
                <p className="text-sm text-[#475569] mt-1">We turn complex immigration and study information into practical, step-by-step decisions.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
