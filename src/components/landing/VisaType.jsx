import React from 'react';

const VisaType = ({ visa }) => {
  return (
    <div className="h-full">
      <div className="h-full bg-[var(--color-card-bg)] p-8 border border-[var(--color-border)] transition-colors duration-150 hover:border-[var(--color-border-strong)] flex flex-col group">
        <div className="mb-6 flex items-start justify-between gap-3">
          <span className="inline-flex items-center bg-[var(--color-primary-black)] text-[var(--color-primary-bg)] text-xs font-mono font-bold px-3 py-1">
            {visa.code}
          </span>
          <span className="inline-flex items-center text-[var(--color-muted-text)] text-[10px] font-bold uppercase tracking-[0.18em]">
            {visa.category}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-[var(--color-primary-text)] mb-3 font-inter tracking-tight">
          {visa.title}
        </h3>
        <p className="text-[var(--color-secondary-text)] mb-6 leading-relaxed text-sm flex-grow">
          {visa.description}
        </p>

        <div className="mt-auto border-t border-[var(--color-border)] pt-4">
          <div className="flex items-center gap-2.5 text-xs text-[var(--color-primary-text)]">
            <svg
              className="w-4 h-4 text-[var(--color-accent-green)] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              <strong className="font-semibold uppercase tracking-wider text-[10px] text-[var(--color-muted-text)] mr-1">Duration:</strong>
              <span className="font-medium text-[var(--color-secondary-text)]">{visa.duration}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaType;
