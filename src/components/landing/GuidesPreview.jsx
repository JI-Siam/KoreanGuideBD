import Link from 'next/link';
import { guidesData as fallbackGuides } from '@/lib/fakeData';

// Colors are set inline so global CSS (h2, h3, p, a rules) can't override them.
const BRAND = '#10B981';
const BRAND_DARK = '#059669';
const INK = { color: '#18181b' };
const BODY = { color: '#52525b' };
const SOFT = { color: '#71717a' };
const WHITE = { color: '#ffffff' };
const MUTED_ON_DARK = { color: '#d4d4d8' };

const CATEGORY_DOT = {
  travel: '#3b82f6',
  work: '#10B981',
  study: '#8b5cf6',
  wellness: '#ec4899',
};

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
    // API down or unreachable: fall through to the local data
  }
  return fallbackGuides;
}

function CategoryTag({ category, onDark = false }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-sm font-semibold capitalize"
      style={onDark ? MUTED_ON_DARK : BODY}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: CATEGORY_DOT[category] || '#a1a1aa' }}
      />
      {category}
    </span>
  );
}

export default async function GuidesPreview() {
  const guides = await getGuides();
  const list = guides.slice(0, 4);

  if (list.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 text-center" style={SOFT}>
          No guides available yet.
        </div>
      </section>
    );
  }

  const [featured, ...rest] = list;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              className="font-outfit text-4xl font-black leading-[1.05] tracking-tight md:text-6xl"
              style={INK}
            >
              Guides for life in Korea
            </h2>
            <p className="mt-5 text-lg leading-relaxed" style={BODY}>
              Step-by-step help with visas, study, work and settling in, written for people making the move.
            </p>
          </div>
          <Link
            href="/guides"
            className="inline-flex w-fit items-center border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-zinc-100"
            style={{ ...INK, borderColor: '#d4d4d8' }}
          >
            View all guides
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Featured guide */}
          <Link
            href={`/guides/${featured.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden p-8 transition-colors lg:col-span-7 lg:min-h-[26rem] lg:p-12"
            style={{ background: '#09090b' }}
          >
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-[3px]"
              style={{ background: BRAND }}
            />

            <div className="flex items-center justify-between gap-3">
              <CategoryTag category={featured.category} onDark />
              <span className="text-sm font-medium" style={{ color: '#a1a1aa' }}>
                Featured
              </span>
            </div>

            <div className="mt-12">
              <h3
                className="font-outfit text-3xl font-black leading-tight tracking-tight md:text-4xl"
                style={WHITE}
              >
                {featured.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed" style={MUTED_ON_DARK}>
                {featured.summary}
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-5">
              <span className="text-sm" style={{ color: '#a1a1aa' }}>
                {formatDate(featured.publishedAt)}
              </span>
              <span
                className="inline-flex items-center gap-2 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: BRAND }}
              >
                Read guide
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Other guides */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {rest.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group flex flex-1 flex-col justify-between border p-6 transition-colors duration-300 hover:border-emerald-500"
                style={{ borderColor: '#e4e4e7', background: '#ffffff' }}
              >
                <div className="flex items-center justify-between gap-3">
                  <CategoryTag category={guide.category} />
                  <span className="text-sm" style={SOFT}>
                    {formatDate(guide.publishedAt)}
                  </span>
                </div>

                <div className="mt-6">
                  <h3
                    className="font-outfit line-clamp-2 text-xl font-extrabold leading-snug transition-colors duration-300 group-hover:!text-emerald-600"
                    style={INK}
                  >
                    {guide.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={BODY}>
                    {guide.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}