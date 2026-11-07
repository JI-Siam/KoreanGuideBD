"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative bg-[var(--color-secondary-bg)] border-t border-[var(--color-border)] text-[var(--color-secondary-text)] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* SWISS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--color-border)]">
          {/* BRAND (col 1-5) */}
          <div className="md:col-span-5">
            <h4 className="text-2xl font-bold text-[var(--color-primary-text)] tracking-tight mb-3 font-inter">
              <span>Alvix</span><span className="text-[var(--color-accent-green)]">Education</span>
            </h4>
            <p className="text-sm text-[var(--color-secondary-text)] leading-relaxed max-w-sm">
              Practical guides, updated visa rules, and verified insights to help you 
              study, work, and live in South Korea with clarity and confidence.
            </p>
          </div>

          {/* QUICK LINKS (col 6-8) */}
          <div className="md:col-span-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-text)] mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/guides"
                  className="text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/visa-types"
                  className="text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
                >
                  Visa Types
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/checklist"
                  className="text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
                >
                  Document Checklist
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL & CONNECT (col 9-12) */}
          <div className="md:col-span-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-text)] mb-4">
              Connect
            </h5>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {['Twitter', 'YouTube', 'Facebook'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-3.5 py-1.5 text-xs font-semibold border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-primary-text)] hover:border-[var(--color-border-strong)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
                >
                  {item}
                </a>
              ))}
            </div>

            <p className="text-xs text-[var(--color-muted-text)] font-mono">
              © {new Date().getFullYear()} KoreanGuideBD • All rights reserved.
            </p>
          </div>
        </div>

        {/* BOTTOM METADATA */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-muted-text)]">
          <p>
            Standardized immigration guidance and educational portal.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--color-primary-text)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--color-primary-text)] transition-colors">Terms</Link>
            <span className="text-[var(--color-border)]">|</span>
            <span>Seoul • Dhaka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
