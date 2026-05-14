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
    <div className="absolute mt-8 right-4 top-4 z-20 w-65 rounded-2xl border border-blue-200/40 bg-white/90 p-4 shadow-lg shadow-blue-100/20 backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Next Intake</p>
      <p className="mt-2 text-lg font-bold text-[#0F172A]">September</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 px-1.5 py-2.5 text-center border border-blue-100/50">
          <div className="text-base font-extrabold text-blue-700">{pad(days)}</div>
          <div className="text-[9px] uppercase tracking-wide text-blue-600 mt-0.5">Days</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100/50 px-1.5 py-2.5 text-center border border-green-100/50">
          <div className="text-base font-extrabold text-green-700">{pad(hours)}</div>
          <div className="text-[9px] uppercase tracking-wide text-green-600 mt-0.5">Hours</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 px-1.5 py-2.5 text-center border border-blue-100/50">
          <div className="text-base font-extrabold text-blue-700">{pad(minutes)}</div>
          <div className="text-[9px] uppercase tracking-wide text-blue-600 mt-0.5">Min</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100/50 px-1.5 py-2.5 text-center border border-green-100/50">
          <div className="text-base font-extrabold text-green-700">{pad(seconds)}</div>
          <div className="text-[9px] uppercase tracking-wide text-green-600 mt-0.5">Sec</div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7F8FC] via-white to-[#F1F4F9]">
     
       <HeroCountdown />
      {/* BACKGROUND GRADIENTS - Subtle, refined depth */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-blue-200/30 blur-[140px]" />
        <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-green-200/25 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-100/10 to-green-100/10 blur-[160px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        
        {/* BADGE - Premium, subtle */}
        <div className="inline-block mb-8 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-100/80 to-green-100/80 border border-blue-200/50 text-sm font-medium text-blue-700">
          🇰🇷 Study • Work • Travel
        </div>

        {/* TITLE - Hierarchy first, breathing room */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-8">
          <span className='text-[#0F172A]'> Your Gateway to{" "}</span>
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Korea
          </span>
          <span className="ml-3">🇰🇷</span>
        </h1>

        {/* SUBTEXT - Readable, spacious */}
        <p className="text-xl md:text-2xl text-[#64748B] max-w-3xl mx-auto leading-relaxed font-light">
          Complete visa guides, travel insights, and career pathways to help you
          start your journey with confidence
        </p>

        {/* CTA - Confident, refined */}
        <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
          
          <Link
            href="/guides"
            className="
              px-10 py-4 rounded-2xl font-semibold text-lg
              bg-gradient-to-r from-blue-600 to-green-600
              text-white
              hover:shadow-lg hover:shadow-blue-200/40
              hover:scale-105
              transition-all duration-300
              border border-blue-500/20
            "
          >
            Explore Guides →
          </Link>

          <Link
            href="#visa-types"
            className="
              px-10 py-4 rounded-2xl font-semibold text-lg
              border-2 border-blue-200
              text-[#0F172A]
              bg-white hover:bg-blue-50/50
              hover:border-blue-300
              transition-all duration-300
              hover:shadow-md hover:shadow-blue-100/30
            "
          >
            Check Visa Types
          </Link>
        
        </div>

        {/* Trust Indicators - Subtle, spacious */}
        <div className="mt-16 pt-12 border-t border-blue-100/40">
          <p className="text-sm font-medium text-[#64748B] mb-6">Trusted by thousands of applicants</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#0F172A]">10K+</p>
              <p className="text-sm text-[#64748B]">Applications Processed</p>
            </div>
            <div className="h-12 w-px bg-blue-100/50"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#0F172A]">98%</p>
              <p className="text-sm text-[#64748B]">Success Rate</p>
            </div>
            <div className="h-12 w-px bg-blue-100/50"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#0F172A]">50+</p>
              <p className="text-sm text-[#64748B]">Expert Guides</p>
            </div>
          </div>
        </div>
      </div>
        
    </section>
  );
}