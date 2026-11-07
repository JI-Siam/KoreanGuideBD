import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield } from 'lucide-react';

const AuthHeader = () => {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-primary-bg)]/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted-text)] hover:text-[var(--color-primary-text)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-[var(--color-primary-text)] font-inter focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
        >
          <div className="relative h-7 w-7 overflow-hidden border border-[var(--color-border)]">
            <Image src="/logo.png" fill alt="Alvix Education logo" className="object-cover" />
          </div>
          <span>
            Alvix<span className="text-[var(--color-accent-green)]">Education</span>
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[var(--color-muted-text)]">
          <Shield className="h-3.5 w-3.5 text-[var(--color-accent-green)]" aria-hidden="true" />
          <span>ENCRYPTED GATEWAY</span>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
