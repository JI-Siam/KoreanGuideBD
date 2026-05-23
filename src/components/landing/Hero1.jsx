"use client";
 
import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
 
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
    <div className="relative mt-6 mx-auto w-full max-w-xs rounded-2xl border border-[var(--color-border)] bg-white/90 p-3 shadow-lg backdrop-blur md:absolute md:right-8 md:top-8 md:mt-10 md:w-80 z-20">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary-text)]">Next Intake</p>
      <p className="mt-1 text-sm font-bold text-[var(--color-primary-text)]">September</p>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="rounded-lg bg-blue-100 px-2 py-2 text-center">
          <div className="text-lg md:text-xl font-extrabold text-[var(--color-primary-blue)]">{pad(days)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-secondary-text)]">Days</div>
        </div>
        <div className="rounded-lg bg-blue-100 px-2 py-2 text-center">
          <div className="text-lg md:text-xl font-extrabold text-[var(--color-primary-blue)]">{pad(hours)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-secondary-text)]">Hours</div>
        </div>
        <div className="rounded-lg bg-blue-100 px-2 py-2 text-center">
          <div className="text-lg md:text-xl font-extrabold text-[var(--color-primary-blue)]">{pad(minutes)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-secondary-text)]">Min</div>
        </div>
        <div className="rounded-lg bg-blue-100 px-2 py-2 text-center">
          <div className="text-lg md:text-xl font-extrabold text-[var(--color-primary-blue)]">{pad(seconds)}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-secondary-text)]">Sec</div>
        </div>
      </div>
    </div>
  );
}
 
export default function Hero1() {
  return (
    <section
      className="relative overflow-hidden pt-24 md:pt-28"
      style={{
        backgroundImage: "url('/var4.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <HeroCountdown />

      <div aria-hidden className="absolute inset-0 bg-[#061327]/65" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(30,111,217,0.45),transparent_42%),radial-gradient(circle_at_80%_30%,rgba(31,175,122,0.35),transparent_45%)]" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 pb-16 md:px-8 md:pb-24"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Korea Study, Work and Travel
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-left text-5xl font-black leading-[1.02] tracking-tight text-white md:text-7xl"
            >
<span className='text-slate-100'>
  Your Elegant
</span>

<span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
  Korea Journey Desk
</span>
           
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white md:text-lg"
            >
      <span className='text-white'>        Practical visa routes, trusted document checklists, and life-in-Korea guidance in one refined platform designed for students, travelers, and professionals.</span>
            </motion.p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="/guides" className="inline-flex items-center rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[#0F172A] shadow-lg transition hover:-translate-y-0.5">
                  Explore Guidelines
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="/about" className="inline-flex items-center rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                  Why Choose Us
                </Link>
              </motion.div>
            </div>

  
          </div>

        
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="relative z-10 mx-auto mb-10 flex w-11/12 max-w-xs items-center gap-4 rounded-full bg-white p-3 shadow-xl md:absolute md:right-8 md:bottom-10 md:mb-0 md:mx-0"
      >
        <div className="flex -space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-xs font-bold text-white">SK</div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-xs font-bold text-white">JP</div>
        </div>
        <div className="text-left">
          <div className="text-lg font-bold text-[#0F172A]">12K+</div>
          <div className="text-xs text-[#64748B]">Active explorers</div>
        </div>
      </motion.div>
 
    </section>
  );
}
 