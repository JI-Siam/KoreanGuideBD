"use client";

import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

function parseStatValue(value) {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { value: null, suffix: String(value) };
  }
  return { value: Number(match[1]), suffix: match[2] ?? '' };
}

function AnimatedStat({ number, label, shouldStart }) {
  const parsed = parseStatValue(number);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: 0 }}
      whileHover={{ y: -5 }}
      className="rounded-3xl border border-white/70 bg-white/70 px-6 py-8 text-center shadow-[0_20px_60px_rgba(30,111,217,0.08)] backdrop-blur-sm"
    >
      <div
        className="mb-2 text-3xl font-extrabold tracking-tight md:text-4xl"
        style={{ color: '#1E6FD9' }}
      >
        {parsed.value === null ? (
          number
        ) : (
          shouldStart ? (
            <CountUp
              end={parsed.value}
              duration={1.5}
              suffix={parsed.suffix}
            />
          ) : (
            `0${parsed.suffix}`
          )
        )}
      </div>
      <div className="text-sm font-medium md:text-base" style={{ color: '#475569' }}>
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutStats({ stats }) {
  const sectionRef = useRef(null);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || shouldStart) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [shouldStart]);

  return (
    <section ref={sectionRef} className="py-16 px-6" style={{ backgroundColor: '#EEF4FB' }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              number={stat.number}
              label={stat.label}
              shouldStart={shouldStart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
