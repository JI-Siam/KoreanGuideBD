"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutTeam({ team }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center mb-16 tracking-tight"
          style={{ color: '#0F172A' }}
        >
          Meet Our Team
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6 }}
              className="text-center rounded-2xl overflow-hidden transition-all hover:shadow-lg"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0'
              }}
            >
              <div className="aspect-square flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(135deg, #1E6FD9, #1FAF7A)' }}>
                <span className="text-6xl font-black text-white/90 tracking-tight">
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0F172A' }}>{member.name}</h3>
                <p className="text-sm" style={{ color: '#1FAF7A' }}>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
