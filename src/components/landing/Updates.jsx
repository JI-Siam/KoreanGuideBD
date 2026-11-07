import { updatesData as fallbackUpdates } from '@/lib/fakeData';

const PRIORITY = {
  high: { label: 'High priority', color: 'var(--color-destructive)' },
  medium: { label: 'Medium priority', color: 'var(--color-warning)' },
  low: { label: 'Low priority', color: 'var(--color-primary-blue)' },
};
const FALLBACK_PRIORITY = { label: 'Update', color: 'var(--color-muted-text)' };

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
    // API down or unreachable: fall through to local data
  }
  return fallbackUpdates;
}

export default async function Updates() {
  const updates = await getUpdates();

  if (!updates || updates.length === 0) {
    return (
      <section className="bg-[var(--color-secondary-bg)] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center text-[var(--color-muted-text)] font-medium">
          No updates found.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--color-secondary-bg)] py-24 md:py-32 border-b border-[var(--color-border)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-12 lg:gap-16">
        {/* Heading column (Sticky Swiss sidebar) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-muted-text)] font-mono">
              Policy &amp; Schedule
            </div>
            <h2 className="font-inter text-4xl font-black leading-[1.05] tracking-tight md:text-5xl text-[var(--color-primary-text)]">
              Latest updates
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-[var(--color-secondary-text)]">
              Official regulatory changes, Korean embassy guidelines, and university intake deadlines that impact applicant status.
            </p>
          </div>
        </div>

        {/* Updates Feed */}
        <ul className="lg:col-span-8 border-b border-[var(--color-border)]">
          {updates.map((update) => {
            const p = PRIORITY[update.priority] || FALLBACK_PRIORITY;
            return (
              <li
                key={update.id}
                className="relative grid gap-3 py-8 pl-6 md:grid-cols-12 md:gap-8 md:py-10 md:pl-8 border-t border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors"
              >
                {/* Priority line indicator */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[3px]"
                  style={{ background: p.color }}
                />

                <div className="md:col-span-3">
                  <p className="text-xs font-mono font-bold text-[var(--color-primary-text)]">
                    {formatDate(update.date)}
                  </p>
                  <p
                    className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider"
                    style={{ color: p.color }}
                  >
                    <span className="h-1.5 w-1.5" style={{ background: p.color }} aria-hidden="true" />
                    {p.label}
                  </p>
                </div>

                <div className="md:col-span-9">
                  <h3 className="font-inter text-xl font-bold leading-snug text-[var(--color-primary-text)]">
                    {update.title}
                  </h3>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[var(--color-secondary-text)]">
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
