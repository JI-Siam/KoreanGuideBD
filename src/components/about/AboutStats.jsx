"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';

function parseStatValue(value) {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return { target: null, suffix: String(value) };
  }

  return {
    target: Number(match[1]),
    suffix: match[2] ?? '',
  };
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

function AnimatedStat({ number, label, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');
  const statRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { target, suffix } = useMemo(() => parseStatValue(number), [number]);

  useEffect(() => {
    const element = statRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    if (target === null || prefersReducedMotion) {
      const animationFrameId = window.requestAnimationFrame(() => {
        setDisplayValue(String(number));
      });

      return () => window.cancelAnimationFrame(animationFrameId);
    }

    const duration = 1400;
    const startTime = performance.now();
    let animationFrameId = 0;

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(target * easedProgress);

      setDisplayValue(`${currentValue}${suffix}`);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isVisible, number, prefersReducedMotion, suffix, target]);

  return (
    <div
      ref={statRef}
      className={`rounded-3xl border border-white/70 bg-white/70 px-6 py-8 text-center shadow-[0_20px_60px_rgba(30,111,217,0.08)] backdrop-blur-sm transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="mb-2 text-3xl font-extrabold tracking-tight md:text-4xl"
        style={{ color: '#1E6FD9' }}
      >
        {displayValue}
      </div>
      <div className="text-sm font-medium md:text-base" style={{ color: '#475569' }}>
        {label}
      </div>
    </div>
  );
}

export default function AboutStats({ stats }) {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#EEF4FB' }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              number={stat.number}
              label={stat.label}
              delay={index * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
