"use client";

import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Compass, ShieldCheck } from 'lucide-react';

let clockSnapshot = Date.now();
let clockIntervalId = null;
const clockListeners = new Set();

function subscribeToClock(callback) {
  clockListeners.add(callback);
  if (clockIntervalId === null) {
    clockIntervalId = window.setInterval(() => {
      clockSnapshot = Date.now();
      clockListeners.forEach((l) => l());
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

const getClientSnapshot = () => clockSnapshot;
const getServerSnapshot = () => null;

function getNextSeptemberIntake() {
  const now = new Date();
  const year =
    now.getMonth() > 8 || (now.getMonth() === 8 && now.getDate() > 1)
      ? now.getFullYear() + 1
      : now.getFullYear();
  return new Date(year, 8, 1, 9, 0, 0);
}

const pad = (v) => String(v).padStart(2, '0');

function HeroCountdown() {
  const target = useMemo(() => getNextSeptemberIntake(), []);
  const now = useSyncExternalStore(subscribeToClock, getClientSnapshot, getServerSnapshot);

  const ms = now === null ? null : Math.max(target.getTime() - now, 0);
  const parts = [
    ['DAYS', ms === null ? '--' : pad(Math.floor(ms / 86400000))],
    ['HOURS', ms === null ? '--' : pad(Math.floor((ms / 3600000) % 24))],
    ['MIN', ms === null ? '--' : pad(Math.floor((ms / 60000) % 60))],
    ['SEC', ms === null ? '--' : pad(Math.floor((ms / 1000) % 60))],
  ];

  return (
    <div className="w-full border border-white/20 bg-black/85 backdrop-blur-md p-6">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 block">
            Application Window
          </span>
          <span className="text-base font-black font-inter tracking-tight text-white mt-0.5 block">
            September Autumn Intake
          </span>
        </div>
        <div className="flex items-center gap-2 border border-white/20 px-2.5 py-1 text-[10px] font-mono font-bold uppercase text-[var(--color-accent-green)] bg-white/5">
          <span className="h-1.5 w-1.5 bg-[var(--color-accent-green)] animate-pulse" aria-hidden="true" />
          Active Countdown
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {parts.map(([label, value]) => (
          <div key={label} className="border border-white/10 bg-white/5 p-2.5 text-center">
            <div className="text-2xl md:text-3xl font-black font-inter tabular-nums text-white">
              {value}
            </div>
            <div className="text-[9px] font-mono font-bold uppercase tracking-wider mt-1 text-zinc-400">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero1() {
  const visaCategories = [
    { code: 'D-2', name: 'Degree Studies' },
    { code: 'D-4', name: 'Korean Language' },
    { code: 'E-7', name: 'Specialized Work' },
    { code: 'C-3', name: 'Short-Term Entry' },
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-16 min-h-[94vh] flex flex-col justify-between bg-black text-white border-b border-white/15">
      {/* Background Architectural Crop with Controlled Scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-45 pointer-events-none"
        style={{
          backgroundImage: "url('/var4.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/50 pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Main Swiss Grid Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 pt-8">
        {/* Top Operational Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4 mb-10 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="border border-white/20 bg-white/10 px-2.5 py-1 text-white font-bold tracking-widest text-[10px]">
              KGBD-SYSTEM
            </span>
            <span className="hidden sm:inline">SOUTH KOREA EDUCATION &amp; VISA INTELLIGENCE</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>LAT 37.5665° N / SEOUL</span>
            <span className="text-white/30">•</span>
            <span className="text-[var(--color-accent-green)] font-bold">STATUS: OPERATIONAL</span>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Asymmetric Bold Typography */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="mb-6 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-[0.2em] backdrop-blur-xs text-white">
              <Compass className="h-3.5 w-3.5 text-[var(--color-accent-green)]" aria-hidden="true" />
              Verified Immigration Documentation
            </div>

            <h1 className="font-inter text-left text-5xl font-black leading-[1.0] tracking-tight md:text-7xl xl:text-[5.5rem] text-white">
              Your Direct Gateway
              <br />
              To <span className="text-[var(--color-accent-green)]">South Korea.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-zinc-300 font-normal">
              Structured visa routes, verified university catalogues, and strict document checklists. 
              Engineered with Swiss clarity for prospective students, researchers, and global talent.
            </p>

            {/* Quick Visa Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 mr-2">PRIMARY TRACKS:</span>
              {visaCategories.map((visa) => (
                <Link
                  key={visa.code}
                  href="/guides/visa-types"
                  className="border border-white/20 bg-white/5 hover:border-white/50 px-3 py-1 text-xs font-mono text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  <span className="text-[var(--color-accent-green)] font-bold mr-1.5">{visa.code}</span>
                  {visa.name}
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/guides"
                className="btn btn-primary px-8 py-4 text-sm font-bold tracking-tight inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Explore Guidelines
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/guides/checklist"
                className="btn btn-outline px-8 py-4 text-sm font-bold tracking-tight border-white/40 text-white hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Document Checklist
              </Link>
            </div>
          </div>

          {/* Right Column: Precision Countdown & Credibility */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
            <HeroCountdown />

            {/* Verified Metrics Pod */}
            <div className="border border-white/20 bg-black/85 backdrop-blur-md p-5">
              <div className="flex items-center justify-between text-xs font-mono uppercase text-zinc-400 border-b border-white/15 pb-3 mb-3">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <ShieldCheck className="h-4 w-4 text-[var(--color-accent-green)]" aria-hidden="true" />
                  Applicant Confidence
                </span>
                <span className="text-[var(--color-accent-green)]">VERIFIED</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-black font-inter text-white tabular-nums">12,400+</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">Files Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-inter text-white tabular-nums">98.4%</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">Filing Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Structural Swiss Metadata Ribbon */}
      <div className="relative z-10 border-t border-white/15 bg-black/90 mt-16">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent-green)] font-bold">01 /</span>
              <div>
                <span className="text-white font-bold block uppercase">Statutory Accuracy</span>
                <span className="text-zinc-400 text-[11px]">Directly harmonized with Korean Ministry of Justice decrees.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-6">
              <span className="text-[var(--color-accent-green)] font-bold">02 /</span>
              <div>
                <span className="text-white font-bold block uppercase">Accredited Catalog</span>
                <span className="text-zinc-400 text-[11px]">QS-ranked Korean universities, English-taught degree maps.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-6">
              <span className="text-[var(--color-accent-green)] font-bold">03 /</span>
              <div>
                <span className="text-white font-bold block uppercase">Zero Ambiguity</span>
                <span className="text-zinc-400 text-[11px]">Exhaustive apostille and financial proof check matrices.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
