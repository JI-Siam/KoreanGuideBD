import React from 'react';
import Program from './Program';

const ProgramList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/programs`);
 const programs = await res.json() ;
    return (
        <div className="container mx-auto px-4 md:px-6 py-24">
              <div className="mb-16 text-center">

    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-elevated)] px-5 py-2 text-sm font-medium text-[var(--color-primary-blue)] shadow-sm">
      🎓 Top Study Destinations
    </div>

    <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight tracking-tight text-[var(--color-primary-text)] md:text-6xl">
      Explore Top Korean Universities
    </h2>

    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-secondary-text)] md:text-lg">
      Discover globally recognized universities in South Korea,
      explore QS rankings, locations, and official information —
      all in one modern platform.
    </p>

             </div>

             <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    {programs.map((prg) => (
      <Program
        key={prg.id}
        program={prg}
      />
    ))}
  </div>
        </div>
    );
};

export default ProgramList;