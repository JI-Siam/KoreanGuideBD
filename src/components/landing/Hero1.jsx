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
    <div className="absolute mt-8 right-4 top-4 z-20 w-64 rounded-2xl border border-[var(--color-border)] bg-white/50 p-3 shadow-lg backdrop-blur md:right-8 md:top-8 md:w-80">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary-text)]">Next Intake</p>
      <p className="mt-1 text-sm font-bold text-[var(--color-primary-text)]">September</p>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        <div className="rounded-lg bg-blue-100 px-1.5 py-2 text-center">
          <div className="text-base font-extrabold text-[var(--color-primary-blue)]">{pad(days)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-secondary-text)]">Days</div>
        </div>
        <div className="rounded-lg bg-blue-100 px-1.5 py-2 text-center">
          <div className="text-base font-extrabold text-[var(--color-primary-blue)]">{pad(hours)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-secondary-text)]">Hours</div>
        </div>
        <div className="rounded-lg bg-blue-100 px-1.5 py-2 text-center">
          <div className="text-base font-extrabold text-[var(--color-primary-blue)]">{pad(minutes)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-secondary-text)]">Min</div>
        </div>
        <div className="rounded-lg bg-blue-100 px-1.5 py-2 text-center">
          <div className="text-base font-extrabold text-[var(--color-primary-blue)]">{pad(seconds)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-secondary-text)]">Sec</div>
        </div>
      </div>
    </div>
  );
}
 
export default function Hero1() {
  return (
    <section
      className="relative min-h-screen overflow-hidden pt-20 md:pt-24"
      style={{
        backgroundImage: "url('/var4.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <HeroCountdown />

      {/* Dim overlay to soften background image */}
      <div aria-hidden className="absolute inset-0 bg-black/40" />

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-6 py-18">
        <div className="max-w-3xl">
          <div className="mb-6 inline-block rounded-full bg-[var(--color-card-bg)]/80 px-4 py-2 text-sm text-[var(--color-secondary-text)] backdrop-blur">
              🇰🇷 Study • Work • Travel
          </div>
 
          {/* Decorative script initial */}
          <div className="relative">
            <span className="absolute -left-12 -top-20 text-[96px] md:text-[140px] font-serif italic text-blue-500 opacity-90 select-none pointer-events-none">A</span>
 
            <h1 className="relative text-left text-5xl md:text-8xl lg:text-9xl font-serif leading-none tracking-tight text-[var(--color-primary-text)]">
              <span className="block font-extralight text-6xl md:text-[140px]  text-white/80 leading-none">LVIX</span>
              <span className="block mt-2 font-bold text-5xl text-white/80 md:text-[88px]">EDUCATION</span>
            </h1>
          </div>
 
          <p className="mt-6 max-w-xl text-white"><span className='text-white'>Complete visa guides, travel insights, and career pathways to help you
          start your journey in Korea with confidence.</span></p>
 
          <div className="mt-10 flex items-center gap-6">
 
            <Link href="/guides" className="btn px-6 py-3 border border-[var(--color-border)] bg-[var(--color-card-bg)]/80 text-[var(--color-primary-text)]">
              Explore Our Guidelines
            </Link>
          </div>
        </div>
      </div>
 

      {/* Product card bottom-left (absolute on md+, stacked on sm) */}
     

 
      {/* Map / routes card centered bottom - meaningful content */}
    
      {/* Stats bottom-right */}
      <div className="md:absolute md:right-8 md:bottom-12 z-20 flex items-center gap-4 rounded-full bg-[var(--color-card-bg)] p-3 shadow mx-auto md:mx-0 w-11/12 max-w-xs mt-4 md:mt-0">
        <div className="flex -space-x-2">
          <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="a" className="h-9 w-9 rounded-full border-2 border-white" />
          <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="b" className="h-9 w-9 rounded-full border-2 border-white" />
        </div>
        <div className="text-left">
          <div className="text-lg font-bold text-[var(--color-primary-text)]">12K+</div>
          <div className="text-xs text-[var(--color-muted-text)]">Active explorers</div>
        </div>
      </div>
 
    </section>
  );
}
 