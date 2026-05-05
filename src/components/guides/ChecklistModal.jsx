'use client';

import React from 'react';
import { FaCheckCircle, FaRegTimesCircle, FaTimes } from 'react-icons/fa';

const PRIORITY_TONES = {
  critical: { label: 'Critical priority', tone: '#DC2626', soft: 'rgba(220, 38, 38, 0.12)' },
  high: { label: 'High priority', tone: '#C2410C', soft: 'rgba(194, 65, 12, 0.12)' },
  medium: { label: 'Medium priority', tone: '#1E6FD9', soft: 'rgba(30, 111, 217, 0.12)' },
  low: { label: 'Low priority', tone: '#1FAF7A', soft: 'rgba(31, 175, 122, 0.12)' },
};

export default function ChecklistModal({ document, completed, onClose, onToggleComplete }) {
  if (!document) {
    return null;
  }

  const priorityTone = PRIORITY_TONES[document.priority] || PRIORITY_TONES.medium;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]">
        <div
          className="flex items-start justify-between gap-6 px-7 py-7 text-white"
          style={{ background: 'linear-gradient(135deg, #0E4C97 0%, #1E6FD9 55%, #1FAF7A 100%)' }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/75">
              Document details
            </p>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
              {document.name}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90">
                {document.category}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90">
                {priorityTone.label}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close document details"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="max-h-[calc(92vh-196px)] overflow-y-auto px-7 py-7">
          <section className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFF] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#64748B]">Progress status</p>
                <p className="mt-1 text-lg font-bold text-[#0F172A]">
                  {completed ? 'Marked as complete' : 'Not yet completed'}
                </p>
              </div>
              <div
                className="rounded-full px-4 py-2 text-sm font-bold"
                style={{ backgroundColor: priorityTone.soft, color: priorityTone.tone }}
              >
                {priorityTone.label}
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h4 className="text-xl font-bold text-[#0F172A] md:text-2xl">
              What to prepare
            </h4>
            <p className="mt-3 leading-8 text-[#475569]">
              {document.description}
            </p>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFF] p-5">
              <div className="text-sm font-semibold text-[#64748B]">Category</div>
              <p className="mt-2 text-lg font-bold text-[#0F172A]">{document.category}</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFF] p-5">
              <div className="text-sm font-semibold text-[#64748B]">Priority</div>
              <p className="mt-2 text-lg font-bold" style={{ color: priorityTone.tone }}>
                {priorityTone.label}
              </p>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[#D6E2F0] bg-[#EEF4FB] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
              {completed ? <FaCheckCircle className="text-[#1FAF7A]" /> : <FaRegTimesCircle className="text-[#DC2626]" />}
              Quick reminder
            </div>
            <p className="mt-2 leading-7 text-[#475569]">
              Keep a scanned copy of this document ready before your appointment and verify any notarization or apostille requirements in advance.
            </p>
          </section>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E2E8F0] bg-[#F8FBFF] px-7 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#0F172A] transition hover:border-[#1E6FD9] hover:text-[#1E6FD9]"
          >
            Close details
          </button>
          <button
            type="button"
            onClick={() => onToggleComplete(document.id)}
            className="inline-flex items-center justify-center rounded-full bg-[#1E6FD9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0E4C97]"
          >
            {completed ? 'Mark as incomplete' : 'Mark as complete'}
          </button>
        </div>
      </div>
    </div>
  );
}