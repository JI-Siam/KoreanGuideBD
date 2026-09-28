import { updatesData as fallbackUpdates } from '@/lib/fakeData';

// Colors are set inline so global CSS (h2, h3, p rules) can't override them.
const INK = { color: '#18181b' };
const BODY = { color: '#52525b' };
const SOFT = { color: '#71717a' };

const PRIORITY = {
  high: { label: 'High priority', color: '#dc2626' },
  medium: { label: 'Medium priority', color: '#d97706' },
  low: { label: 'Low priority', color: '#2563eb' },
};
const FALLBACK_PRIORITY = { label: 'Update', color: '#a1a1aa' };

const formatDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

async function getUpdates() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005';
    const res = await fetch(`${base}/updates`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Updates request failed: ${res.status}`);
    const data = await res.json();
    const updates = Array.isArray(data) ? data : data?.updates;
    if (Array.isArray(updates)) return updates;
  } catch {
    // API down or unreachable: fall through to the local data
  }
  return fallbackUpdates;
}

export default async function Updates() {
  const updates = await getUpdates();

  if (!updates || updates.length === 0) {
    return (
      <section className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center" style={SOFT}>
          No updates found.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-zinc-50 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-12 lg:gap-16">
        {/* Heading stays in view while the list scrolls */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2
              className="font-outfit text-4xl font-black leading-[1.05] tracking-tight md:text-6xl"
              style={INK}
            >
              Latest updates
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed" style={BODY}>
              Recent changes to visa rules, intake dates and requirements that could affect your plans.
            </p>
          </div>
        </div>

        <ul className="lg:col-span-8" style={{ borderBottom: '1px solid #d4d4d8' }}>
          {updates.map((update) => {
            const p = PRIORITY[update.priority] || FALLBACK_PRIORITY;
            return (
              <li
                key={update.id}
                className="relative grid gap-3 py-8 pl-6 md:grid-cols-12 md:gap-8 md:py-10 md:pl-8"
                style={{ borderTop: '1px solid #d4d4d8' }}
              >
                {/* Priority marker */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-[3px]"
                  style={{ background: p.color }}
                />

                <div className="md:col-span-3">
                  <p className="text-sm font-semibold" style={INK}>
                    {formatDate(update.date)}
                  </p>
                  <p
                    className="mt-1.5 inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: p.color }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                    {p.label}
                  </p>
                </div>

                <div className="md:col-span-9">
                  <h3
                    className="font-outfit text-xl font-extrabold leading-snug md:text-2xl"
                    style={INK}
                  >
                    {update.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed" style={BODY}>
                    {update.content}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}