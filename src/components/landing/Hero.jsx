"use client";

import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';

let clockSnapshot = Date.now();
let clockIntervalId = null;
const clockListeners = new Set();

function subscribeToClock(callback) {
  clockListeners.add(callback);

  if (clockIntervalId === null) {
    clockIntervalId = window.setInterval(() => {
      clockSnapshot = Date.now();
      clockListeners.forEach((listener) => listener());
    }, 1000);
  }

  return () => {
    clockListeners.delete(callback);

    if (clockListeners.size === 0 && clockIntervalId !== null) {
      window.clearInterval(clockIntervalId);
      clockIntervalId = null;
    }
  };
}

function getClockSnapshot() {
  return clockSnapshot;
}

function getNextSeptemberIntake() {
  const now = new Date();
  const intakeYear = now.getMonth() > 8 || (now.getMonth() === 8 && now.getDate() > 1)
    ? now.getFullYear() + 1
    : now.getFullYear();

  return new Date(intakeYear, 8, 1, 9, 0, 0);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function HeroCountdown() {
  const targetDate = useMemo(() => getNextSeptemberIntake(), []);

  const now = useSyncExternalStore(
    subscribeToClock,
    getClockSnapshot,
    getClockSnapshot
  );

  const remainingMs = Math.max(targetDate.getTime() - now, 0);
  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingMs / 1000) % 60);

  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-primary-blue)]">
          Next Intake Window
        </p>
        <span className="text-xs font-bold text-[var(--color-primary-text)]">September</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-2 py-2 text-center">
          <div className="text-base font-black font-inter text-[var(--color-primary-text)]">{pad(days)}</div>
          <div className="text-[9px] font-mono uppercase tracking-wide text-[var(--color-muted-text)]">Days</div>
        </div>
        <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-2 py-2 text-center">
          <div className="text-base font-black font-inter text-[var(--color-primary-text)]">{pad(hours)}</div>
          <div className="text-[9px] font-mono uppercase tracking-wide text-[var(--color-muted-text)]">Hours</div>
        </div>
        <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-2 py-2 text-center">
          <div className="text-base font-black font-inter text-[var(--color-primary-text)]">{pad(minutes)}</div>
          <div className="text-[9px] font-mono uppercase tracking-wide text-[var(--color-muted-text)]">Min</div>
        </div>
        <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-2 py-2 text-center">
          <div className="text-base font-black font-inter text-[var(--color-accent-green)]">{pad(seconds)}</div>
          <div className="text-[9px] font-mono uppercase tracking-wide text-[var(--color-muted-text)]">Sec</div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[var(--color-primary-bg)] border-b border-[var(--color-border)] pt-28 pb-20">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-primary-text)]">
          <span className="h-1.5 w-1.5 bg-[var(--color-accent-green)]" aria-hidden="true" />
          Korea Education &amp; Visa Intelligence
        </div>

        {/* Title */}
        <h1 className="font-inter text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-8 text-[var(--color-primary-text)]">
          Your Direct Pathway
          <br />
          To <span className="text-[var(--color-accent-green)]">South Korea.</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-[var(--color-secondary-text)] max-w-2xl mx-auto leading-relaxed mb-10">
          Complete immigration route maps, accredited university rankings, and document checklists built with Swiss clarity.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/guides"
            className="btn btn-primary px-8 py-4 text-base font-bold tracking-tight focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            Explore Guides →
          </Link>

          <Link
            href="/guides/visa-types"
            className="btn btn-outline px-8 py-4 text-base font-bold tracking-tight focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            Check Visa Types
          </Link>
        </div>

        {/* Countdown Box */}
        <div className="max-w-md mx-auto mb-16">
          <HeroCountdown />
        </div>

        {/* Trust Indicators */}
        <div className="pt-10 border-t border-[var(--color-border)]">
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto text-center">
            <div>
              <p className="font-inter text-3xl font-black text-[var(--color-primary-text)] tabular-nums">10K+</p>
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted-text)] mt-1">Files Processed</p>
            </div>
            <div className="border-x border-[var(--color-border)]">
              <p className="font-inter text-3xl font-black text-[var(--color-primary-text)] tabular-nums">98%</p>
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted-text)] mt-1">Accuracy Rate</p>
            </div>
            <div>
              <p className="font-inter text-3xl font-black text-[var(--color-primary-text)] tabular-nums">50+</p>
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted-text)] mt-1">Detailed Guides</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
