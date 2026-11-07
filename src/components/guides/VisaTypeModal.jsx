'use client';

import React from 'react';
import { FaClock, FaFileAlt, FaTimes } from 'react-icons/fa';

function buildRequirementItems(requirements) {
  if (!requirements) {
    return [];
  }

  return String(requirements)
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function VisaTypeModal({ visa, onClose }) {
  if (!visa) {
    return null;
  }

  const requirementItems = buildRequirementItems(visa.requirements);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="visa-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
    >
      <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-card-bg)] text-[var(--color-primary-text)] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 px-7 py-6 border-b border-[var(--color-border)] bg-[var(--color-secondary-bg)]">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[var(--color-muted-text)]">
              Official Visa Classification
            </p>
            <h2 id="visa-modal-title" className="mt-1 font-inter text-2xl md:text-3xl font-black tracking-tight text-[var(--color-primary-text)]">
              {visa.title}
            </h2>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span className="border border-[var(--color-border)] bg-[var(--color-primary-black)] text-[var(--color-primary-bg)] px-2.5 py-0.5 text-xs font-mono font-bold">
                {visa.code}
              </span>
              <span className="border border-[var(--color-border)] bg-[var(--color-card-bg)] px-2.5 py-0.5 text-xs font-mono font-bold uppercase text-[var(--color-secondary-text)]">
                {visa.category}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close visa details"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-primary-text)] transition-colors hover:border-[var(--color-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-7 py-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted-text)]">
                <FaClock className="text-[var(--color-primary-blue)]" aria-hidden="true" />
                <span>Allowed Stay</span>
              </div>
              <p className="mt-1 text-base font-bold text-[var(--color-primary-text)] font-mono">
                {visa.duration}
              </p>
            </div>

            <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted-text)]">
                <FaFileAlt className="text-[var(--color-accent-green)]" aria-hidden="true" />
                <span>Category</span>
              </div>
              <p className="mt-1 text-base font-bold text-[var(--color-primary-text)] font-mono">
                {visa.category}
              </p>
            </div>

            <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-4">
              <div className="text-xs font-mono text-[var(--color-muted-text)]">Review Phase</div>
              <p className="mt-1 text-base font-bold text-[var(--color-primary-text)] font-mono">
                Pre-Intake
              </p>
            </div>
          </div>

          <section>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted-text)]">
              Scope of Permitted Activity
            </h3>
            <p className="mt-2 text-sm md:text-base leading-relaxed text-[var(--color-secondary-text)]">
              {visa.description}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted-text)]">
              Statutory Documentation Checklist
            </h3>
            <div className="mt-2 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-5">
              {requirementItems.length > 0 ? (
                <ul className="space-y-2.5">
                  {requirementItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--color-secondary-text)]">
                      <span className="text-[var(--color-accent-green)] font-mono font-bold">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[var(--color-muted-text)] font-mono">No specific prerequisites specified.</p>
              )}
            </div>
          </section>

          {visa.notes ? (
            <section className="border-l-4 border-l-[var(--color-warning)] border-y border-r border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)]">Special Notes</h4>
              <p className="mt-1 text-xs md:text-sm leading-relaxed text-[var(--color-secondary-text)]">{visa.notes}</p>
            </section>
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-3 border-t border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-7 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
