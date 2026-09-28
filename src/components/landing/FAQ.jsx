import { faqsData as fallbackFaqs } from '@/lib/fakeData';
import Link from 'next/link';

// Colors are set inline so global CSS (h2, h3, p, a rules) can't override them.
const BRAND = '#10B981';
const INK = { color: '#18181b' };
const BODY = { color: '#52525b' };
const SOFT = { color: '#71717a' };
const WHITE = { color: '#ffffff' };
const MUTED_ON_DARK = { color: '#d4d4d8' };

async function getFaqs() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005';
    const res = await fetch(`${base}/faqs`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`FAQ request failed: ${res.status}`);
    const data = await res.json();
    const faqs = Array.isArray(data) ? data : data?.faqs;
    if (Array.isArray(faqs)) return faqs;
  } catch {
    // API down or unreachable: fall through to the local data
  }
  return fallbackFaqs;
}

export default async function FAQ() {
  const faqs = await getFaqs();

  if (!faqs || faqs.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 text-center" style={SOFT}>
          No FAQs available.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 max-w-3xl md:mb-16">
          <h2
            className="font-outfit text-4xl font-black leading-[1.05] tracking-tight md:text-6xl"
            style={INK}
          >
            Questions we hear most
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={BODY}>
            Quick answers about visas, travel and living in Korea.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Questions */}
          <div className="lg:col-span-8" style={{ borderBottom: '1px solid #d4d4d8' }}>
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group"
                style={{ borderTop: '1px solid #d4d4d8' }}
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] [&::-webkit-details-marker]:hidden md:px-4"
                  style={{ outlineColor: BRAND }}
                >
                  <h3
                    className="font-outfit flex-1 text-lg font-bold leading-snug md:text-xl"
                    style={INK}
                  >
                    {faq.question}
                  </h3>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center border transition-transform duration-300 group-open:rotate-45"
                    style={{ borderColor: '#d4d4d8', color: '#18181b' }}
                  >
                    <svg
                      width="16"
                      height="16"
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
                  <p
                    className="max-w-2xl border-l-[3px] pl-5 text-base leading-relaxed"
                    style={{ ...BODY, borderColor: BRAND }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Help card */}
          <aside className="lg:col-span-4">
            <div
              className="relative p-8 lg:sticky lg:top-28"
              style={{ background: '#09090b' }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-[3px]"
                style={{ background: BRAND }}
              />
              <h3 className="font-outfit text-2xl font-black leading-tight" style={WHITE}>
                Can't find your answer?
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={MUTED_ON_DARK}>
                Our guides go step by step through visas, documents and settling in.
              </p>
              <Link
                href="/guides"
                className="mt-6 inline-flex items-center px-6 py-3 text-sm font-semibold transition-all hover:brightness-90"
                style={{ background: BRAND, color: '#ffffff' }}
              >
                Open the guides
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}