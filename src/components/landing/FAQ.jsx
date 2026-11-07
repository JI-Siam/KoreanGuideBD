import { faqsData as fallbackFaqs } from '@/lib/fakeData';
import Link from 'next/link';

async function getFaqs() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005';
    const res = await fetch(`${base}/faqs`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`FAQ request failed: ${res.status}`);
    const data = await res.json();
    const faqs = Array.isArray(data) ? data : data?.faqs;
    if (Array.isArray(faqs)) return faqs;
  } catch {
    // API down or unreachable: fall through to local data
  }
  return fallbackFaqs;
}

export default async function FAQ() {
  const faqs = await getFaqs();

  if (!faqs || faqs.length === 0) {
    return (
      <section className="bg-[var(--color-primary-bg)] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center text-[var(--color-muted-text)] font-medium">
          No FAQs available.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--color-primary-bg)] py-24 md:py-32 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 max-w-3xl md:mb-16">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-muted-text)] font-mono">
            Support &amp; Inquiries
          </div>
          <h2 className="font-inter text-4xl font-black leading-[1.05] tracking-tight md:text-5xl text-[var(--color-primary-text)]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-secondary-text)]">
            Verified answers to common queries regarding immigration procedures, academic calendar timelines, and living standards.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Questions (Swiss Accordion List) */}
          <div className="lg:col-span-8 border-b border-[var(--color-border)]">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group border-t border-[var(--color-border)]"
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 transition-colors hover:bg-[var(--color-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none md:px-4"
                >
                  <h3 className="font-inter flex-1 text-base md:text-lg font-bold leading-snug text-[var(--color-primary-text)]">
                    {faq.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--color-border)] text-[var(--color-primary-text)] transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>

                <div className="pb-8 md:px-4">
                  <p className="max-w-2xl border-l-2 border-l-[var(--color-accent-green)] pl-5 text-sm md:text-base leading-relaxed text-[var(--color-secondary-text)]">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Help card (Swiss Poster Aside) */}
          <aside className="lg:col-span-4">
            <div className="relative p-8 bg-black text-white border border-black lg:sticky lg:top-28">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-[3px] bg-[var(--color-accent-green)]"
              />
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2">
                Assistance
              </div>
              <h3 className="font-inter text-2xl font-black leading-tight text-white">
                Can&apos;t find your answer?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                Our in-depth guides go step by step through visas, required forms, and local bank account setup.
              </p>
              <Link
                href="/guides"
                className="btn btn-primary mt-6 inline-flex items-center px-6 py-3 text-xs font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Open the guides →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
