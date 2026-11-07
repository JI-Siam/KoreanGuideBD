'use client';

import React, { useMemo, useSyncExternalStore } from 'react';

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

function formatValue(value) {
  return String(value).padStart(2, '0');
}

export default function IntakeCountdown() {
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

  const blocks = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
  ];

  return (
    <div className="mt-10 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-6 md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-primary-blue)]">
            Admission Window Schedule
          </div>
          <h2 className="text-2xl font-black tracking-tight text-[var(--color-primary-text)] md:text-3xl font-inter">
            Next Academic Intake: September
          </h2>
          <p className="mt-2 max-w-2xl text-xs md:text-sm leading-relaxed text-[var(--color-secondary-text)]">
            Prepare required documents, verify notarizations, and schedule apostille processing ahead of the university application deadline.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
          {blocks.map((block) => (
            <div
              key={block.label}
              className="min-w-20 border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-3 text-center"
            >
              <div className="font-inter text-2xl font-black text-[var(--color-primary-text)] tabular-nums md:text-3xl">
                {formatValue(block.value)}
              </div>
              <div className="mt-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-muted-text)]">
                {block.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
