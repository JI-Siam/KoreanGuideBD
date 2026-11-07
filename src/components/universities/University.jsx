import Link from 'next/link';
import { MapPin, Globe, GraduationCap, ArrowUpRight } from 'lucide-react';

const University = ({ university }) => {
  return (
    <article className="group relative border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 transition-colors duration-150 hover:border-[var(--color-border-strong)] flex flex-col justify-between">
      <div>
        {/* Top Section */}
        <div className="flex items-start justify-between gap-4">
          {/* University Info */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-[var(--color-primary-blue)]">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-primary-text)] leading-snug font-inter">
                {university?.universityName}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-muted-text)] font-mono">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{university?.location}</span>
              </div>
            </div>
          </div>

          {/* Ranking Badge (Swiss Metric Box) */}
          <div className="shrink-0 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-3 py-1.5 text-center font-mono">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-muted-text)]">
              QS Rank
            </p>
            <p className="text-base font-black text-[var(--color-primary-text)]">
              #{university?.qsRanking}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-[var(--color-border)]" />

      {/* Bottom Section */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-secondary-text)]">
          <Globe className="h-3.5 w-3.5 text-[var(--color-accent-green)] shrink-0" aria-hidden="true" />
          <span className="font-mono text-[11px] truncate">Official Portal</span>
        </div>

        <Link
          href={university?.officialWebsiteLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 border border-[var(--color-border)] bg-[var(--color-card-bg)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary-text)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-primary-text)] hover:text-[var(--color-primary-bg)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
        >
          <span>Visit</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default University;
