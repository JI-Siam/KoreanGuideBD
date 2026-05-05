'use client';

import React, { useMemo, useState } from 'react';
import ChecklistModal from '@/components/guides/ChecklistModal';
import { FaCheckCircle, FaCircle, FaFilter } from 'react-icons/fa';

const PRIORITY_TONES = {
  critical: { label: 'Critical', background: 'rgba(220, 38, 38, 0.12)', color: '#B91C1C', border: '#FECACA' },
  high: { label: 'High', background: 'rgba(194, 65, 12, 0.12)', color: '#C2410C', border: '#FDBA74' },
  medium: { label: 'Medium', background: 'rgba(30, 111, 217, 0.12)', color: '#1E6FD9', border: '#BFDBFE' },
  low: { label: 'Low', background: 'rgba(31, 175, 122, 0.12)', color: '#1FAF7A', border: '#A7F3D0' },
};

const FILTERS = ['all', 'critical', 'high', 'medium', 'low'];

function ChecklistRow({ document, completed, onToggleComplete, onOpenDetails }) {
  const tone = PRIORITY_TONES[document.priority] || PRIORITY_TONES.medium;

  return (
    <div
      className="group rounded-[24px] border bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(15,23,42,0.12)]"
      style={{ borderColor: completed ? '#A7F3D0' : '#E2E8F0' }}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => onToggleComplete(document.id)}
          className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CBD5E1] bg-[#F8FBFF] text-[#1E6FD9] transition hover:border-[#1E6FD9] hover:bg-[#EEF4FB]"
          aria-label={`Toggle completion for ${document.name}`}
        >
          {completed ? <FaCheckCircle className="text-[#1FAF7A]" size={18} /> : <FaCircle className="text-[#CBD5E1]" size={18} />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className={`text-lg font-bold tracking-tight ${completed ? 'text-[#15803D] line-through' : 'text-[#0F172A]'}`}>
                {document.name}
              </h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-[#64748B]">
                {document.category}
              </p>
            </div>

            <span
              className="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ backgroundColor: tone.background, color: tone.color, borderColor: tone.border }}
            >
              {tone.label}
            </span>
          </div>

          <p className={`mt-3 leading-7 ${completed ? 'text-[#6B7280] line-through' : 'text-[#475569]'}`}>
            {document.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenDetails(document)}
              className="inline-flex items-center justify-center rounded-full bg-[#1E6FD9] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0E4C97]"
            >
              Open document details
            </button>
            <button
              type="button"
              onClick={() => onToggleComplete(document.id)}
              className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition hover:border-[#1E6FD9] hover:text-[#1E6FD9]"
            >
              {completed ? 'Reset checklist item' : 'Mark as complete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChecklistSection({ documents }) {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [completedMap, setCompletedMap] = useState({});
  const [filterPriority, setFilterPriority] = useState('all');

  const visibleDocuments = useMemo(() => {
    if (filterPriority === 'all') {
      return documents || [];
    }

    return (documents || []).filter((document) => document.priority === filterPriority);
  }, [documents, filterPriority]);

  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const progress = documents && documents.length > 0
    ? Math.round((completedCount / documents.length) * 100)
    : 0;

  const toggleComplete = (id) => {
    setCompletedMap((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7FAFF' }}>
      <section className="px-6 pb-16 pt-32 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#1FAF7A]">
              Application checklist
            </p>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-[#0F172A] md:text-6xl">
              Required documents, tracked in one place.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#475569] md:text-xl">
              Review the original document list, mark items as complete, and open any item for a clean detail view before you submit your visa application.
            </p>
          </div>

          <div className="mt-10 max-w-3xl rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Progress
                </p>
                <p className="mt-2 text-2xl font-extrabold text-[#0F172A] md:text-3xl">
                  {completedCount} of {documents?.length || 0} items complete
                </p>
              </div>
              <div className="rounded-2xl bg-[#F7FAFF] px-4 py-3 text-right">
                <div className="text-sm font-semibold text-[#64748B]">Completion</div>
                <div className="text-3xl font-extrabold text-[#1E6FD9]">{progress}%</div>
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div
                className="h-full rounded-full bg-[#1E6FD9] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <FaFilter className="text-[#64748B]" />
            {FILTERS.map((filter) => {
              const isActive = filterPriority === filter;
              const label = filter === 'all'
                ? 'All documents'
                : `${filter.charAt(0).toUpperCase()}${filter.slice(1)} priority`;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setFilterPriority(filter)}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition"
                  style={{
                    backgroundColor: isActive ? '#1E6FD9' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#0F172A',
                    border: `1px solid ${isActive ? '#1E6FD9' : '#CBD5E1'}`,
                    boxShadow: isActive ? '0 10px 22px rgba(30, 111, 217, 0.18)' : 'none',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-4 md:px-8">
        <div className="mx-auto max-w-5xl space-y-4">
          {visibleDocuments.length > 0 ? (
            visibleDocuments.map((document) => (
              <ChecklistRow
                key={document.id}
                document={document}
                completed={Boolean(completedMap[document.id])}
                onToggleComplete={toggleComplete}
                onOpenDetails={setSelectedDocument}
              />
            ))
          ) : (
            <div className="rounded-[28px] border border-[#E2E8F0] bg-white px-6 py-16 text-center text-[#64748B] shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              No documents were returned from the live data source.
            </div>
          )}
        </div>
      </section>

      {selectedDocument ? (
        <ChecklistModal
          document={selectedDocument}
          completed={Boolean(completedMap[selectedDocument.id])}
          onClose={() => setSelectedDocument(null)}
          onToggleComplete={toggleComplete}
        />
      ) : null}
    </main>
  );
}