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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]">
        <div
          className="flex items-start justify-between gap-6 px-7 py-7 text-white"
          style={{ background: 'linear-gradient(135deg, #1E6FD9 0%, #0E4C97 52%, #1FAF7A 100%)' }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/80">
              Visa details
            </p>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
              {visa.title}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
                {visa.code}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90">
                {visa.category}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close visa details"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="max-h-[calc(92vh-196px)] overflow-y-auto px-7 py-7">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFF] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#64748B]">
                <FaClock className="text-[#1E6FD9]" />
                Duration
              </div>
              <p className="mt-2 text-lg font-bold text-[#0F172A]">
                {visa.duration}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFF] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#64748B]">
                <FaFileAlt className="text-[#1FAF7A]" />
                Category
              </div>
              <p className="mt-2 text-lg font-bold text-[#0F172A]">
                {visa.category}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFF] p-5">
              <div className="text-sm font-semibold text-[#64748B]">Status</div>
              <p className="mt-2 text-lg font-bold text-[#0F172A]">
                Ready for intake review
              </p>
            </div>
          </div>

          <section className="mt-8">
            <h4 className="text-xl font-bold text-[#0F172A] md:text-2xl">
              Overview
            </h4>
            <p className="mt-3 leading-8 text-[#475569]">
              {visa.description}
            </p>
          </section>

          <section className="mt-8">
            <h4 className="text-xl font-bold text-[#0F172A] md:text-2xl">
              Requirements
            </h4>
            <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-[#F7FAFF] p-5">
              {requirementItems.length > 0 ? (
                <ul className="space-y-3">
                  {requirementItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#475569]">
                      <span className="mt-1 text-[#1E6FD9]">•</span>
                      <span className="leading-7">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#475569]">No requirement details available.</p>
              )}
            </div>
          </section>

          {visa.notes ? (
            <section className="mt-8 rounded-2xl border border-[#D6E2F0] bg-[#EEF4FB] p-5">
              <h4 className="text-lg font-bold text-[#0F172A]">Notes</h4>
              <p className="mt-2 leading-7 text-[#475569]">{visa.notes}</p>
            </section>
          ) : null}
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
            className="inline-flex items-center justify-center rounded-full bg-[#1E6FD9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0E4C97]"
          >
            Save visa reference
          </button>
        </div>
      </div>
    </div>
  );
}