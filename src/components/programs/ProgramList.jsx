import React from 'react';
import Program from './Program';
import { BookOpen } from 'lucide-react';

const ProgramList = async () => {
  let programs = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/programs`, { next: { revalidate: 60 } });
    if (res.ok) {
      programs = await res.json();
    }
  } catch {
    programs = [];
  }

  const list = Array.isArray(programs) ? programs : programs?.programs || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-primary-blue)]">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          <span>Curriculum &amp; Degrees</span>
        </div>

        <h1 className="text-4xl font-black leading-tight tracking-tight text-[var(--color-primary-text)] md:text-5xl font-inter">
          Academic Programs in Korea
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-secondary-text)] md:text-lg">
          Explore English-taught Bachelor&apos;s, Master&apos;s, and intensive Korean language institute programs across certified universities.
        </p>

        <div className="mt-4 text-xs font-mono text-[var(--color-muted-text)]">
          CATALOG COUNT: <span className="font-bold text-[var(--color-primary-text)]">{list.length}</span> listed programs
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {list.map((prg) => (
          <Program key={prg.id || prg.name} program={prg} />
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-8 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-12 text-center text-[var(--color-secondary-text)] font-mono text-sm">
          No academic programs currently loaded. Please start json-server or check back soon.
        </div>
      )}
    </div>
  );
};

export default ProgramList;
