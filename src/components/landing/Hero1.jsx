"use client";

import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';

const WHITE = { color: '#ffffff' };
const MUTED = { color: '#d4d4d8' };
const LABEL = { color: '#a1a1aa' };
const BRAND = '#10B981';

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
const getServerSnapshot = () => null; // avoids hydration mismatch

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
    ['Days', ms === null ? '--' : pad(Math.floor(ms / 86400000))],
    ['Hours', ms === null ? '--' : pad(Math.floor((ms / 3600000) % 24))],
    ['Min', ms === null ? '--' : pad(Math.floor((ms / 60000) % 60))],
    ['Sec', ms === null ? '--' : pad(Math.floor((ms / 1000) % 60))],
  ];

  return (
    <div className="w-full max-w-sm border border-white/15 bg-zinc-950/70 backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={LABEL}>
            Next Intake
          </p>
          <p className="mt-1 text-lg font-extrabold font-outfit" style={WHITE}>
            September
          </p>
        </div>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: BRAND }} />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: BRAND }} />
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {parts.map(([label, value]) => (
          <div key={label} className="text-center">
            <div className="text-2xl font-black font-outfit tabular-nums" style={WHITE}>
              {value}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider mt-1" style={LABEL}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero1() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 min-h-[92vh] flex items-center bg-zinc-950">
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: "url('/var4.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Readability overlays: strong on the left (text), lighter on the right (photo) */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-zinc-950/30" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-zinc-950/80 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: copy */}
          <div className="lg:col-span-8">
            <div
              className="mb-8 inline-flex items-center gap-3 border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm"
              style={WHITE}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND }} />
              Korea Study, Work &amp; Travel
            </div>

            <h1
              className="font-outfit text-left text-5xl font-black leading-[1.05] tracking-tight md:text-7xl xl:text-[5.5rem]"
              style={WHITE}
            >
              Your Gateway
              <br />
              To <span style={{ color: BRAND }}>South Korea.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl font-medium" style={MUTED}>
              Practical visa routes, trusted document checklists, and life-in-Korea guidance in one
              highly refined platform designed for students, travelers, and professionals.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/guides"
                className="px-8 py-4 text-base font-semibold tracking-wide transition-colors hover:brightness-90"
                style={{ background: BRAND, color: '#ffffff' }}
              >
                Explore Guidelines
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 text-base font-semibold tracking-wide border border-white/40 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/15"
                style={WHITE}
              >
                Why Choose Us
              </Link>
            </div>
          </div>

          {/* Right: countdown + social proof */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
            <HeroCountdown />

            <div className="flex w-full max-w-sm items-center gap-5 border border-white/15 bg-zinc-950/70 backdrop-blur-md p-4">
              <div className="flex -space-x-3">
                {['SK', 'JP', 'BD'].map((c, i) => (
                  <div
                    key={c}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-700 text-xs font-bold"
                    style={{ ...WHITE, zIndex: 3 - i }}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-xl font-black font-outfit" style={WHITE}>12K+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest mt-1" style={LABEL}>
                  Active explorers
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}