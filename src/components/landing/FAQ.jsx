import { faqsData as fallbackFaqs } from '@/lib/fakeData';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export default async function FAQ() {
  const res = await fetch(`${API_BASE}/faqs`);
  const data = await res.json();
  const faqs = Array.isArray(data) ? data : (data && data.faqs ? data.faqs : fallbackFaqs);

  if (!faqs || faqs.length === 0) {
    return <section className="py-24 bg-white"><div className="container mx-auto px-6 text-center text-slate-500">No FAQs available.</div></section>;
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 -ml-32"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">Find answers to common questions about visas, travel, and living in Korea.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details key={faq.id} className="bg-white border text-left border-slate-100 shadow-sm rounded-2xl overflow-hidden group">
              <summary className="list-none cursor-pointer w-full p-6 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">{faq.question}</h3>
                <span className="text-blue-500 transition-transform duration-300 group-open:-rotate-180 bg-blue-50 rounded-full p-2 ml-4 flex-shrink-0">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-6 bg-white">
                <p className="text-slate-600 leading-relaxed border-l-2 border-blue-200 pl-4">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}