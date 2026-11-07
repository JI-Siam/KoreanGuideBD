const PRIORITY = {
  critical: { label: 'Critical', color: 'var(--color-destructive)' },
  high: { label: 'High', color: 'var(--color-warning)' },
  medium: { label: 'Medium', color: 'var(--color-primary-blue)' },
  low: { label: 'Low', color: 'var(--color-accent-green)' },
};
const ORDER = ['critical', 'high', 'medium', 'low'];
const normalize = (p) => (PRIORITY[p] ? p : 'medium');

async function getDocuments() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005';
    const res = await fetch(`${base}/documents`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Documents request failed: ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.documents || data?.items;
    if (Array.isArray(list)) return list;
  } catch {
    // API down or unreachable: show empty state
  }
  return [];
}

export default async function DocumentsChecklist() {
  const documents = await getDocuments();

  if (documents.length === 0) {
    return (
      <section className="bg-[var(--color-secondary-bg)] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center text-[var(--color-muted-text)] font-medium">
          No documents found.
        </div>
      </section>
    );
  }

  const counts = documents.reduce(
    (acc, doc) => {
      acc[normalize(doc.priority)] += 1;
      return acc;
    },
    { critical: 0, high: 0, medium: 0, low: 0 }
  );
  const total = documents.length;

  return (
    <section className="bg-[var(--color-secondary-bg)] py-24 md:py-32 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 max-w-3xl md:mb-16">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-muted-text)] font-mono">
            Preparation Matrix
          </div>
          <h2 className="font-inter text-4xl font-black leading-[1.05] tracking-tight md:text-5xl text-[var(--color-primary-text)]">
            Documents you&apos;ll need
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-secondary-text)]">
            Verify every requirement item-by-item, starting with critical submissions to guarantee visa approval on your initial filing.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Summary Sidebar (Swiss Monospace Data Panel) */}
          <aside className="relative border border-[var(--color-border)] bg-[var(--color-card-bg)] p-7 lg:sticky lg:top-28 lg:col-span-4">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-[3px] bg-[var(--color-accent-green)]"
            />
            <p className="font-inter text-5xl font-black text-[var(--color-primary-text)] tabular-nums">
              {total}
            </p>
            <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[var(--color-muted-text)]">
              total documents required
            </p>

            {/* Proportion bar */}
            <div aria-hidden="true" className="mt-6 flex h-2 w-full overflow-hidden bg-[var(--color-border-subtle)]">
              {ORDER.map((key) =>
                counts[key] ? (
                  <span
                    key={key}
                    style={{ width: `${(counts[key] / total) * 100}%`, background: PRIORITY[key].color }}
                  />
                ) : null
              )}
            </div>

            <ul className="mt-6">
              {ORDER.map((key) => (
                <li
                  key={key}
                  className="flex items-center justify-between py-3 border-t border-[var(--color-border)]"
                >
                  <span className="inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-secondary-text)]">
                    <span
                      className="h-2 w-2"
                      style={{ background: PRIORITY[key].color }}
                      aria-hidden="true"
                    />
                    {PRIORITY[key].label}
                  </span>
                  <span className="font-inter text-base font-extrabold text-[var(--color-primary-text)] tabular-nums">
                    {counts[key]}
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Checklist Items */}
          <div className="grid gap-4 md:grid-cols-2 lg:col-span-8">
            {documents.map((doc) => {
              const p = PRIORITY[normalize(doc.priority)];
              return (
                <label
                  key={doc.id}
                  className="group relative flex cursor-pointer items-start gap-4 border border-[var(--color-border)] bg-[var(--color-card-bg)] p-5 pl-6 transition-colors duration-150 hover:border-[var(--color-border-strong)] has-[:checked]:bg-[var(--color-surface-hover)] has-[:checked]:border-[var(--color-accent-green)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[3px]"
                    style={{ background: p.color }}
                  />

                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-accent-green)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
                  />

                  <span className="flex-1">
                    <span className="font-inter block text-base font-bold leading-snug text-[var(--color-primary-text)] group-hover:text-[var(--color-accent-green)] transition-colors">
                      {doc.name}
                    </span>
                    {doc.description && (
                      <span className="mt-1.5 block text-xs md:text-sm leading-relaxed text-[var(--color-secondary-text)]">
                        {doc.description}
                      </span>
                    )}
                    <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono font-medium">
                      <span className="inline-flex items-center gap-1.5 uppercase font-bold" style={{ color: p.color }}>
                        <span className="h-1.5 w-1.5" style={{ background: p.color }} aria-hidden="true" />
                        {p.label}
                      </span>
                      {doc.category && <span className="text-[var(--color-muted-text)]">[{doc.category}]</span>}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
