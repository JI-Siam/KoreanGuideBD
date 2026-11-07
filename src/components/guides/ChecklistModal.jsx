'use client';

import React from 'react';
import { FaCheckCircle, FaRegTimesCircle, FaTimes } from 'react-icons/fa';

const PRIORITY_TONES = {
  critical: { label: 'Critical priority', color: 'var(--color-destructive)' },
  high: { label: 'High priority', color: 'var(--color-warning)' },
  medium: { label: 'Medium priority', color: 'var(--color-primary-blue)' },
  low: { label: 'Low priority', color: 'var(--color-success)' },
};

export default function ChecklistModal({ document, completed, onClose, onToggleComplete }) {
  if (!document) {
    return null;
  }

  const priorityTone = PRIORITY_TONES[document.priority] || PRIORITY_TONES.medium;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-card-bg)] text-[var(--color-primary-text)] shadow-xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-6 px-7 py-6 border-b border-[var(--color-border)] bg-[var(--color-secondary-bg)]">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[var(--color-muted-text)]">
              Document Specifications
            </p>
            <h2 id="modal-title" className="mt-1 font-inter text-2xl md:text-3xl font-black tracking-tight text-[var(--color-primary-text)]">
              {document.name}
            </h2>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span className="border border-[var(--color-border)] bg-[var(--color-card-bg)] px-2.5 py-0.5 text-xs font-mono font-bold uppercase text-[var(--color-secondary-text)]">
                {document.category}
              </span>
              <span
                className="border px-2.5 py-0.5 text-xs font-mono font-bold uppercase"
                style={{ borderColor: priorityTone.color, color: priorityTone.color }}
              >
                {priorityTone.label}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close document details"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-primary-text)] transition-colors hover:border-[var(--color-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto px-7 py-6 space-y-6">
          <section className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted-text)]">Completion Status</p>
                <p className="mt-1 text-base font-bold text-[var(--color-primary-text)] font-inter">
                  {completed ? 'Marked as Complete' : 'Pending Action'}
                </p>
              </div>
              <div
                className="border px-3 py-1 text-xs font-mono font-bold uppercase"
                style={{ borderColor: priorityTone.color, color: priorityTone.color }}
              >
                {priorityTone.label}
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[var(--color-muted-text)]">
              Instructions &amp; Requirements
            </h3>
            <p className="mt-2 text-sm md:text-base leading-relaxed text-[var(--color-secondary-text)]">
              {document.description}
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-4">
              <div className="text-[10px] font-mono uppercase text-[var(--color-muted-text)]">Category Class</div>
              <p className="mt-1 text-sm font-bold text-[var(--color-primary-text)] font-mono">{document.category}</p>
            </div>
            <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-4">
              <div className="text-[10px] font-mono uppercase text-[var(--color-muted-text)]">Submission Urgency</div>
              <p className="mt-1 text-sm font-bold font-mono" style={{ color: priorityTone.color }}>
                {priorityTone.label}
              </p>
            </div>
          </section>

          <section className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-4 border-l-4 border-l-[var(--color-primary-blue)]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-primary-text)] uppercase tracking-wider">
              {completed ? <FaCheckCircle className="text-[var(--color-accent-green)]" /> : <FaRegTimesCircle className="text-[var(--color-destructive)]" />}
              Compliance Notice
            </div>
            <p className="mt-2 text-xs md:text-sm leading-relaxed text-[var(--color-secondary-text)]">
              Keep original notarized papers separate from certified copies. Ensure bank balance certificates match strict embassy currency date intervals.
            </p>
          </section>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col gap-3 border-t border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-7 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline px-5 py-2.5 text-xs font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onToggleComplete(document.id)}
            className="btn btn-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            {completed ? 'Reset checklist item' : 'Mark as complete'}
          </button>
        </div>
      </div>
    </div>
  );
}
