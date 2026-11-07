'use client';

import React, { useMemo, useState } from 'react';
import ChecklistModal from '@/components/guides/ChecklistModal';
import { FaCheckCircle, FaCircle, FaFilter } from 'react-icons/fa';

const PRIORITY_TONES = {
  critical: { label: 'Critical', bg: 'var(--color-destructive-subtle)', color: 'var(--color-destructive)', border: 'var(--color-destructive)' },
  high: { label: 'High', bg: 'var(--color-warning-subtle)', color: 'var(--color-warning)', border: 'var(--color-warning)' },
  medium: { label: 'Medium', bg: 'var(--color-primary-blue-subtle)', color: 'var(--color-primary-blue)', border: 'var(--color-primary-blue)' },
  low: { label: 'Low', bg: 'var(--color-success-subtle)', color: 'var(--color-success)', border: 'var(--color-success)' },
};

const FILTERS = ['all', 'critical', 'high', 'medium', 'low'];

function ChecklistRow({ document, completed, onToggleComplete, onOpenDetails }) {
  const tone = PRIORITY_TONES[document.priority] || PRIORITY_TONES.medium;

  return (
    <article
      className={`group border bg-[var(--color-card-bg)] p-5 transition-colors duration-150 ${
        completed ? 'border-[var(--color-accent-green)] bg-[var(--color-surface-hover)]' : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => onToggleComplete(document.id)}
          className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--color-border)] bg-[var(--color-secondary-bg)] transition-colors hover:border-[var(--color-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          aria-label={`Toggle completion for ${document.name}`}
        >
          {completed ? (
            <FaCheckCircle className="text-[var(--color-accent-green)]" size={16} />
          ) : (
            <FaCircle className="text-[var(--color-border)]" size={16} />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className={`font-inter text-base md:text-lg font-bold tracking-tight ${completed ? 'line-through text-[var(--color-muted-text)]' : 'text-[var(--color-primary-text)]'}`}>
                {document.name}
              </h3>
              <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[var(--color-muted-text)]">
                [{document.category}]
              </p>
            </div>

            <span
              className="px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider border"
              style={{ backgroundColor: tone.bg, color: tone.color, borderColor: tone.border }}
            >
              {tone.label}
            </span>
          </div>

          <p className={`mt-3 text-sm leading-relaxed ${completed ? 'text-[var(--color-muted-text)]' : 'text-[var(--color-secondary-text)]'}`}>
            {document.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenDetails(document)}
              className="btn btn-black px-4 py-2 text-xs font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
            >
              Document details →
            </button>
            <button
              type="button"
              onClick={() => onToggleComplete(document.id)}
              className="btn btn-outline px-4 py-2 text-xs font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
            >
              {completed ? 'Reset status' : 'Mark complete'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ChecklistSection({ documents = [] }) {
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
    <main className="min-h-screen bg-[var(--color-primary-bg)]">
      <section className="px-6 pb-12 pt-32 md:px-8 border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-accent-green)]">
              Verification Pipeline
            </div>
            <h1 className="font-inter text-4xl font-black tracking-tight text-[var(--color-primary-text)] md:text-5xl">
              Document Checklist &amp; Validation
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-[var(--color-secondary-text)]">
              Track and verify every mandatory file, notarization requirement, and financial guarantee prior to embassy appointment.
            </p>
          </div>

          {/* Progress Card (Swiss Metrics Display) */}
          <div className="mt-10 max-w-3xl border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted-text)]">
                  Progress Tracker
                </p>
                <p className="mt-1 text-2xl font-black text-[var(--color-primary-text)] font-inter">
                  {completedCount} <span className="text-sm font-normal text-[var(--color-muted-text)] font-mono">/ {documents?.length || 0} COMPLETED</span>
                </p>
              </div>
              <div className="border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2 text-right">
                <div className="text-[10px] font-mono font-bold uppercase text-[var(--color-muted-text)]">Rate</div>
                <div className="text-2xl font-black font-inter text-[var(--color-primary-blue)]">{progress}%</div>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden bg-[var(--color-border)]">
              <div
                className="h-full bg-[var(--color-accent-green)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Priority Filters */}
      <section className="px-6 py-6 md:px-8 bg-[var(--color-secondary-bg)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[var(--color-muted-text)] mr-2 flex items-center gap-1.5">
              <FaFilter aria-hidden="true" /> Filters:
            </span>
            {FILTERS.map((filter) => {
              const isActive = filterPriority === filter;
              const label = filter === 'all'
                ? 'All Documents'
                : `${filter.toUpperCase()} PRIORITY`;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setFilterPriority(filter)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none border ${
                    isActive
                      ? 'border-[var(--color-primary-black)] bg-[var(--color-primary-black)] text-[var(--color-primary-bg)]'
                      : 'border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-primary-text)] hover:border-[var(--color-border-strong)]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documents List */}
      <section className="px-6 py-12 md:px-8">
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
            <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-12 text-center text-sm font-mono text-[var(--color-muted-text)]">
              No documents currently matching the active filter criteria.
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
