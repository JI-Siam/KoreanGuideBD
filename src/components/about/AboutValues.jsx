"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutValues({ values }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEF4FB' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center mb-16 tracking-tight"
          style={{ color: '#0F172A' }}
        >
          Our Core Values
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.id}
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -5, boxShadow: '0 24px 50px rgba(15,23,42,0.12)' }}
                className="p-8 rounded-2xl transition-all hover:shadow-lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-xl bg-[#EEF4FB] p-3">
                    <Icon size={32} style={{ color: '#1E6FD9' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>{value.title}</h3>
                    <p style={{ color: '#475569' }}>{value.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
