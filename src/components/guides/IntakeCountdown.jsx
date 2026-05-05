'use client';

import React, { useMemo, useSyncExternalStore } from 'react';

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

  const blocks = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
  ];

  return (
    <div className="mt-10 rounded-3xl border border-[#D6E2F0] bg-white/90 p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E6FD9]">
            Next intake window
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0F172A] md:text-3xl">
            September intake starts soon
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#475569] md:text-base">
            Keep your visa documents ready now so you can move quickly when the next student and language-program intake opens in September.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {blocks.map((block) => (
            <div
              key={block.label}
              className="min-w-[84px] rounded-2xl border border-[#E2E8F0] bg-[#F7FAFF] px-4 py-4 text-center"
            >
              <div className="text-2xl font-extrabold text-[#0F172A] md:text-3xl">
                {formatValue(block.value)}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                {block.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}