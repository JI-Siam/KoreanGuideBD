"use client";

import { useRef } from 'react';
import CountUp from 'react-countup';
import { motion, useInView, useReducedMotion } from 'framer-motion';

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
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: delayIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="border-l-2 border-l-[var(--color-accent-green)] border-y border-r border-[var(--color-border)] bg-[var(--color-card-bg)] p-8 md:p-10 transition-colors duration-150 hover:border-l-[var(--color-primary-text)]"
    >
      <div className="font-inter text-4xl font-black tracking-tight tabular-nums md:text-6xl text-[var(--color-primary-text)]">
        {parsed.value === null ? (
          number
        ) : shouldStart ? (
          <CountUp
            end={parsed.value}
            duration={reduceMotion ? 0 : 1.8}
            decimals={Number.isInteger(parsed.value) ? 0 : 1}
            suffix={parsed.suffix}
          />
        ) : (
          `0${parsed.suffix}`
        )}
      </div>
      <div className="mt-3 text-xs md:text-sm font-mono uppercase tracking-wider text-[var(--color-muted-text)]">
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
      className="px-6 py-20 md:px-8 md:py-28 bg-[var(--color-secondary-bg)] border-b border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-muted-text)]">
          System Verification &amp; Metrics
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
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
