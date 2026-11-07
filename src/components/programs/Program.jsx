import React from 'react';
import { BookOpen } from 'lucide-react';

const Program = ({ program }) => {
  return (
    <article className="border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 transition-colors duration-150 hover:border-[var(--color-border-strong)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-blue)] bg-[var(--color-secondary-bg)] px-2.5 py-1 border border-[var(--color-border)]">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {program?.category || 'Academic Track'}
          </span>
          {program?.degree && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-muted-text)]">
              {program.degree}
            </span>
          )}
        </div>

        <h3 className="font-inter text-lg font-bold text-[var(--color-primary-text)] leading-snug">
          {program?.name || program?.title}
        </h3>

        {program?.description && (
          <p className="mt-2 text-xs md:text-sm text-[var(--color-secondary-text)] line-clamp-3 leading-relaxed">
            {program.description}
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-muted-text)]">
        <span>{program?.university || 'Accredited Partner'}</span>
        <span className="text-[var(--color-accent-green)] font-semibold">{program?.duration || 'Full-time'}</span>
      </div>
    </article>
  );
};

export default Program;
