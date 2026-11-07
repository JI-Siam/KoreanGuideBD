import Link from 'next/link';
import { guidesData as fallbackGuides } from '@/lib/fakeData';

const formatDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

async function getGuides() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005';
    const res = await fetch(`${base}/guides`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Guides request failed: ${res.status}`);
    const data = await res.json();
    const guides = Array.isArray(data) ? data : data?.guides;
    if (Array.isArray(guides)) return guides;
  } catch {
    // API down or unreachable: fall through to local data
  }
  return fallbackGuides;
}

function CategoryTag({ category, onDark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider ${
        onDark ? 'text-zinc-300' : 'text-[var(--color-secondary-text)]'
      }`}
    >
      <span className="h-1.5 w-1.5 bg-[var(--color-accent-green)]" aria-hidden="true" />
      {category}
    </span>
  );
}

export default async function GuidesPreview() {
  const guides = await getGuides();
  const list = guides.slice(0, 4);

  if (list.length === 0) {
    return (
      <section className="bg-[var(--color-primary-bg)] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center text-[var(--color-muted-text)] font-medium">
          No guides available yet.
        </div>
      </section>
    );
  }

  const [featured, ...rest] = list;

  return (
    <section className="bg-[var(--color-primary-bg)] py-24 md:py-32 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-muted-text)] font-mono">
              Knowledge Base
            </div>
            <h2 className="font-inter text-4xl font-black leading-[1.05] tracking-tight md:text-5xl text-[var(--color-primary-text)]">
              Guides for life in Korea
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-secondary-text)]">
              Step-by-step documentation covering visas, university enrollment, living costs, and administrative procedures.
            </p>
          </div>
          <Link
            href="/guides"
            className="btn btn-outline inline-flex w-fit items-center px-7 py-3.5 text-sm font-bold tracking-tight focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            View all guides →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Featured guide (Swiss Poster Card) */}
          <Link
            href={`/guides/${featured.slug}`}
            className="group relative flex flex-col justify-between p-8 transition-colors duration-150 bg-black text-white border border-black lg:col-span-7 lg:min-h-[26rem] lg:p-12 focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-[3px] bg-[var(--color-accent-green)]"
            />

            <div className="flex items-center justify-between gap-3">
              <CategoryTag category={featured.category} onDark />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                Featured
              </span>
            </div>

            <div className="mt-12">
              <h3 className="font-inter text-2xl md:text-4xl font-black leading-tight tracking-tight text-white group-hover:text-[var(--color-accent-green)] transition-colors">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-zinc-300">
                {featured.summary}
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-white/20 pt-5 text-xs text-zinc-400 font-mono">
              <span>{formatDate(featured.publishedAt)}</span>
              <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[var(--color-accent-green)] group-hover:translate-x-1 transition-transform">
                Read guide →
              </span>
            </div>
          </Link>

          {/* Other guides (Grid of crisp Swiss Cards) */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {rest.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group flex flex-1 flex-col justify-between border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 transition-colors duration-150 hover:border-[var(--color-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                <div className="flex items-center justify-between gap-3">
                  <CategoryTag category={guide.category} />
                  <span className="text-xs font-mono text-[var(--color-muted-text)]">
                    {formatDate(guide.publishedAt)}
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="font-inter line-clamp-2 text-lg font-bold leading-snug text-[var(--color-primary-text)] group-hover:text-[var(--color-accent-green)] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs md:text-sm leading-relaxed text-[var(--color-secondary-text)]">
                    {guide.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-blue)] group-hover:translate-x-1 transition-transform inline-block">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
