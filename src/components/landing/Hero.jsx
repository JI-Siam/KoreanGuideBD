"use client";

import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';

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
    (callback) => {
      const intervalId = setInterval(callback, 1000);
      return () => clearInterval(intervalId);
    },
    () => Date.now(),
    () => Date.now()
  );

  const remainingMs = Math.max(targetDate.getTime() - now, 0);
  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingMs / 1000) % 60);

  return (
    <div className="absolute mt-8 right-4 top-4 z-20 w-[260px] rounded-2xl border border-white/20 bg-[#071527]/80 p-3 shadow-lg backdrop-blur md:right-8 md:top-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-300">Next Intake</p>
      <p className="mt-1 text-sm font-bold text-white">September</p>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        <div className="rounded-lg bg-white/10 px-1.5 py-2 text-center">
          <div className="text-base font-extrabold text-white">{pad(days)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-slate-300">Days</div>
        </div>
        <div className="rounded-lg bg-white/10 px-1.5 py-2 text-center">
          <div className="text-base font-extrabold text-white">{pad(hours)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-slate-300">Hours</div>
        </div>
        <div className="rounded-lg bg-white/10 px-1.5 py-2 text-center">
          <div className="text-base font-extrabold text-white">{pad(minutes)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-slate-300">Min</div>
        </div>
        <div className="rounded-lg bg-white/10 px-1.5 py-2 text-center">
          <div className="text-base font-extrabold text-white">{pad(seconds)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-slate-300">Sec</div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1A2B] text-white">
     
       <HeroCountdown />
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px]" />
      </div>

      {/* GRID PATTERN (optional subtle texture) */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle,_white_1px,_transparent_1px)] [background-size:20px_20px]" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        
        {/* BADGE */}
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-slate-300 backdrop-blur">
          🇰🇷 Study • Work • Travel
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto ">
         <span className='text-white'> Your Gateway to{" "}</span>
          <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Korea
          </span>
          🇰🇷
        </h1>

        {/* SUBTEXT */}
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Complete visa guides, travel insights, and career pathways to help you
          start your journey in Korea with confidence.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          
          <Link
            href="/guides"
            className="
              px-8 py-4 rounded-full font-semibold
              bg-gradient-to-r from-blue-600 to-green-500
              hover:from-blue-500 hover:to-green-400
              shadow-lg shadow-blue-900/30
              transition-all duration-300
            "
          >
            <span className='text-white'>Explore Guides →</span>
             </Link>

          <Link
            href="#visa-types"
            className="
              px-8 py-4 rounded-full font-semibold
              border border-white/20
              text-slate-300
              hover:bg-white/10
              backdrop-blur
              transition-all duration-300
            "
          >
            Check Visa Types
          </Link>
        
        </div>
      </div>
        
    </section>
  );
}