// Colors are set inline so global CSS (h2, h3, p rules) can't override them.
const BRAND = '#10B981';
const INK = { color: '#18181b' };
const BODY = { color: '#52525b' };
const SOFT = { color: '#71717a' };

const PRIORITY = {
  critical: { label: 'Critical', color: '#dc2626' },
  high: { label: 'High', color: '#ea580c' },
  medium: { label: 'Medium', color: '#2563eb' },
  low: { label: 'Low', color: '#059669' },
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
    // API down or unreachable: show the empty state
  }
  return [];
}

export default async function DocumentsChecklist() {
  const documents = await getDocuments();

  if (documents.length === 0) {
    return (
      <section className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center" style={SOFT}>
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
    <section className="bg-zinc-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 max-w-3xl md:mb-16">
          <h2
            className="font-outfit text-4xl font-black leading-[1.05] tracking-tight md:text-6xl"
            style={INK}
          >
            Documents you'll need
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={BODY}>
            Tick each one off as you collect it, starting with the critical items, so your visa file is complete on the first try.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Summary */}
          <aside
            className="relative border bg-white p-7 lg:sticky lg:top-28 lg:col-span-4"
            style={{ borderColor: '#e4e4e7' }}
          >
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-[3px]"
              style={{ background: BRAND }}
            />
            <p className="font-outfit text-5xl font-black" style={INK}>
              {total}
            </p>
            <p className="mt-1 text-sm font-medium" style={SOFT}>
              documents to prepare
            </p>

            {/* Proportion bar */}
            <div aria-hidden className="mt-6 flex h-2 w-full overflow-hidden" style={{ background: '#e4e4e7' }}>
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
                  className="flex items-center justify-between py-3"
                  style={{ borderTop: '1px solid #e4e4e7' }}
                >
                  <span className="inline-flex items-center gap-3 text-sm font-medium" style={BODY}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: PRIORITY[key].color }} />
                    {PRIORITY[key].label}
                  </span>
                  <span className="font-outfit text-lg font-extrabold" style={INK}>
                    {counts[key]}
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Checklist */}
          <div className="grid gap-4 md:grid-cols-2 lg:col-span-8">
            {documents.map((doc) => {
              const p = PRIORITY[normalize(doc.priority)];
              return (
                <label
                  key={doc.id}
                  className="group relative flex cursor-pointer items-start gap-4 border bg-white p-5 pl-6 transition-colors duration-300 hover:border-emerald-500 has-[:checked]:bg-emerald-50"
                  style={{ borderColor: '#e4e4e7' }}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[3px]"
                    style={{ background: p.color }}
                  />

                  <input
                    type="checkbox"
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer"
                    style={{ accentColor: '#059669' }}
                  />

                  <span className="flex-1">
                    <span
                      className="font-outfit block text-base font-extrabold leading-snug"
                      style={INK}
                    >
                      {doc.name}
                    </span>
                    {doc.description && (
                      <span className="mt-1.5 block text-sm leading-relaxed" style={BODY}>
                        {doc.description}
                      </span>
                    )}
                    <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium">
                      <span className="inline-flex items-center gap-1.5" style={{ color: p.color }}>
                        <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                        {p.label}
                      </span>
                      {doc.category && <span style={SOFT}>{doc.category}</span>}
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