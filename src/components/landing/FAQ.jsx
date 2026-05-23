import { faqsData as fallbackFaqs } from '@/lib/fakeData';

export default async function FAQ() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/faqs`);
  const data = await res.json();
  const faqs = Array.isArray(data) ? data : (data && data.faqs ? data.faqs : fallbackFaqs);

  if (!faqs || faqs.length === 0) {
    return <section className="py-24 bg-white"><div className="container mx-auto px-6 text-center text-[#64748B]">No FAQs available.</div></section>;
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-[#F7F8FC] to-white">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -ml-36"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-green-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-36"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about visas, travel, and living in Korea
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4 rounded-3xl border border-[#E2E8F0] bg-white p-6 h-fit shadow-[0_16px_42px_rgba(15,23,42,0.08)]">
            <h3 className="text-xl font-bold text-[#0F172A]">Still Need Help?</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B]">Browse these common answers first. If you need detailed support, start from our complete guides section.</p>
            <a href="/guides" className="mt-5 inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white">
              Open Full Guides
            </a>
          </aside>

          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.id} className="bg-white border border-[#E2E8F0] text-left shadow-sm hover:shadow-md rounded-2xl overflow-hidden group transition-all duration-300">
                <summary className="list-none cursor-pointer w-full p-6 bg-[#F8FAFC] hover:bg-[#F1F6FF] transition-colors flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#0F172A] flex-1">{faq.question}</h3>
                  <span className="text-blue-600 transition-transform duration-300 group-open:-rotate-180 rounded-full p-2 ml-4 bg-white border border-blue-100 shrink-0">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="p-6 md:p-7 bg-white border-t border-[#E2E8F0]">
                  <p className="text-[#64748B] leading-relaxed text-base border-l-4 border-emerald-300 pl-5">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}