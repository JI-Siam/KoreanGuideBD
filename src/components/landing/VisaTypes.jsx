import Link from 'next/link';
import VisaType from './VisaType';

async function getVisas() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005';
    const res = await fetch(`${base}/visaTypes`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Visa types request failed: ${res.status}`);
    const data = await res.json();
    const list = data?.visaTypes ?? (Array.isArray(data) ? data : []);
    return Array.isArray(list) ? list : [];
  } catch {
    // API down or unreachable: show empty state
    return [];
  }
}

export default async function VisaTypes() {
  const visas = (await getVisas()).slice(0, 3);

  if (visas.length === 0) {
    return (
      <section id="visa-types" className="bg-[var(--color-primary-bg)] py-24">
        <div className="mx-auto max-w-7xl px-6 text-center font-medium text-[var(--color-muted-text)]">
          No visa types available.
        </div>
      </section>
    );
  }

  return (
    <section
      id="visa-types"
      className="bg-[var(--color-primary-bg)] py-24 md:py-32 border-b border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-muted-text)] font-mono">
              Visa Categories
            </div>
            <h2 className="font-inter text-4xl font-black leading-[1.05] tracking-tight md:text-5xl text-[var(--color-primary-text)]">
              Choose the right <span className="text-[var(--color-accent-green)]">Korean</span> visa
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-secondary-text)]">
              Compare visa options by purpose and permitted length of stay, then examine strict entry requirements.
            </p>
          </div>

          <Link
            href="/guides/visa-types"
            className="btn btn-black group inline-flex w-fit items-center gap-3 px-7 py-3.5 text-sm font-bold tracking-tight focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
          >
            View all visa types
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {visas.map((visa) => (
            <VisaType key={visa.id} visa={visa} />
          ))}
        </div>
      </div>
    </section>
  );
}
