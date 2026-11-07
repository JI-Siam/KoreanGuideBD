import ProgramList from '@/components/programs/ProgramList';
import React from 'react';

const page = () => {
  return (
    <main className="min-h-screen bg-[var(--color-primary-bg)] text-[var(--color-primary-text)]">
      <ProgramList />
    </main>
  );
};

export default page;
