import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full bg-[var(--color-primary-bg)]">
      <div className="flex flex-col items-center gap-4 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-8">
        <div className="h-6 w-6 border-2 border-[var(--color-border)] border-t-[var(--color-primary-text)] animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-secondary-text)]">
          Synchronizing Registry Data...
        </p>
      </div>
    </div>
  );
};

export default Loading;
