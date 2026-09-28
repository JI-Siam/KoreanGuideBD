"use client";

import { useRef } from 'react';
import CountUp from 'react-countup';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Colors are set inline so global CSS can't override them.
const BRAND = '#10B981';
const WHITE = { color: '#ffffff' };
const LABEL = { color: '#a1a1aa' };

function parseStatValue(value) {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { value: null, suffix: String(value) };
  }
  return { value: Number(match[1]), suffix: match[2] ?? '' };
}

function AnimatedStat({ number, label, shouldStart, delayIndex, reduceMotion }) {
  const parsed = parseStatValue(number);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay: delayIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="border-l-2 border-white/15 p-8 transition-colors duration-300 hover:border-emerald-500 md:p-10"
      style={{ background: '#09090b' }}
    >
      <div
        className="font-outfit text-4xl font-black tracking-tight tabular-nums md:text-6xl"
        style={WHITE}
      >
        {parsed.value === null ? (
          number
        ) : shouldStart ? (
          <CountUp
            end={parsed.value}
            duration={reduceMotion ? 0 : 2}
            decimals={Number.isInteger(parsed.value) ? 0 : 1}
            suffix={parsed.suffix}
          />
        ) : (
          `0${parsed.suffix}`
        )}
      </div>
      <div className="mt-4 text-sm font-medium md:text-base" style={LABEL}>
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutStats({ stats = [] }) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const shouldStart = useInView(sectionRef, { once: true, amount: 0.3 });

  if (!stats || stats.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="px-6 py-24 md:px-8 md:py-32"
      style={{ background: '#09090b' }}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="grid grid-cols-2 gap-px border border-white/15 md:grid-cols-4"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          {stats.map((stat, idx) => (
            <AnimatedStat
              key={stat.label}
              number={stat.number}
              label={stat.label}
              shouldStart={shouldStart}
              delayIndex={idx}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}