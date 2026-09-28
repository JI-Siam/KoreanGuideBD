import Link from 'next/link';
import VisaType from './VisaType';

// Colors are set inline so global CSS (h2, p, a rules) can't override them.
const BRAND = '#10B981';
const INK = { color: '#18181b' };
const BODY = { color: '#52525b' };
const SOFT = { color: '#71717a' };

async function getVisas() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005';
    const res = await fetch(`${base}/visaTypes`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Visa types request failed: ${res.status}`);
    const data = await res.json();
    const list = data?.visaTypes ?? (Array.isArray(data) ? data : []);
    return Array.isArray(list) ? list : [];
  } catch {
    // API down or unreachable: show the empty state
    return [];
  }
}

export default async function VisaTypes() {
  const visas = (await getVisas()).slice(0, 3);

  if (visas.length === 0) {
    return (
      <section id="visa-types" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center font-medium" style={SOFT}>
          No visa types available.
        </div>
      </section>
    );
  }

  return (
    <section
      id="visa-types"
      className="bg-white py-24 md:py-32"
      style={{ borderBottom: '1px solid #f4f4f5' }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              className="font-outfit text-4xl font-black leading-[1.05] tracking-tight md:text-6xl"
              style={INK}
            >
              Choose the right Korean visa
            </h2>
            <p className="mt-5 text-lg leading-relaxed" style={BODY}>
              Compare visa options by purpose and length of stay, then see what each one requires.
            </p>
          </div>

          <Link
            href="/guides/visa-types"
            className="group inline-flex w-fit items-center gap-3 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-zinc-800"
            style={{ background: '#18181b', color: '#ffffff' }}
          >
            View all visa types
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke={BRAND}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {visas.map((visa) => (
            <VisaType key={visa.id} visa={visa} />
          ))}
        </div>
      </div>
    </section>
  );
}