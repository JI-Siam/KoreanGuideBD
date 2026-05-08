import Link from 'next/link';
import { MapPin, Globe, GraduationCap, ArrowUpRight } from 'lucide-react';

const University = ({ university }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card-bg)] shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

      {/* Top Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-blue)]/5 via-transparent to-[var(--color-accent-green)]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

      {/* Decorative Blur */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--color-accent-green)]/10 blur-3xl"></div>

      <div className="relative p-6">

        {/* Top Section */}
        <div className="flex items-start justify-between gap-4">

          {/* University Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary-blue)]/10">
                <GraduationCap className="h-5 w-5 text-[var(--color-primary-blue)]" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[var(--color-primary-text)] leading-tight">
                  {university?.universityName}
                </h2>

                <div className="mt-1 flex items-center gap-1 text-sm text-[var(--color-secondary-text)]">
                  <MapPin className="h-4 w-4" />
                  <span>{university?.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ranking Badge */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-primary-blue)]/5 px-4 py-2 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-secondary-text)]">
              QS Rank
            </p>

            <h3 className="text-lg font-bold text-[var(--color-primary-blue)]">
              #{university?.qsRanking}
            </h3>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-sm text-[var(--color-secondary-text)]">
            <Globe className="h-4 w-4 text-[var(--color-accent-green)]" />
            <span>Official Website</span>
          </div>

          <Link
            href={university?.officialWebsiteLink || '#'}
            target="_blank"
            className="group/btn  inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary-blue)] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[var(--color-darker-blue)]"
          >
            <span className='text-white'>Visit</span>
            <ArrowUpRight className="h-4 w-4 transition-transform text-white duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default University;