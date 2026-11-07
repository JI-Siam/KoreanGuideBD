"use client";

import React from 'react';

export default function AboutTeam({ team = [] }) {
  return (
    <section className="py-24 px-6 border-b border-[var(--color-border)] bg-[var(--color-primary-bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16 border-b border-[var(--color-border)] pb-6">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-muted-text)] mb-2">
              SECTION 04 // EDITORIAL LEADERSHIP
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight font-inter text-[var(--color-primary-text)]">
              Editorial Governance
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[var(--color-secondary-text)] max-w-md leading-relaxed font-mono">
            Directly overseeing legal accuracy, academic liaisons, and technical platform integrity.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={member.id}
              className="border border-[var(--color-border)] bg-[var(--color-card-bg)] transition-colors duration-150 hover:border-[var(--color-border-strong)] flex flex-col"
            >
              <div className="aspect-square flex items-center justify-center border-b border-[var(--color-border)] bg-[var(--color-secondary-bg)] relative">
                <span className="font-mono text-4xl font-black text-[var(--color-primary-text)] tracking-widest">
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </span>
                <span className="absolute top-3 left-3 text-[10px] font-mono text-[var(--color-muted-text)]">
                  TEAM-0{idx + 1}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold font-inter text-[var(--color-primary-text)]">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[var(--color-accent-green)] font-semibold">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
