import { faqsData as fallbackFaqs } from '@/lib/fakeData';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export default async function FAQ() {
  const res = await fetch(`${API_BASE}/faqs`);
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
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details key={faq.id} className="bg-white border-2 border-blue-100/50 text-left shadow-sm hover:shadow-md shadow-blue-100/10 rounded-2xl overflow-hidden group transition-all duration-300">
              <summary className="list-none cursor-pointer w-full p-6 bg-gradient-to-r from-blue-50/50 to-green-50/30 hover:from-blue-50 hover:to-green-50/50 transition-colors flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#0F172A] flex-1">{faq.question}</h3>
                <span className="text-blue-600 transition-transform duration-300 group-open:-rotate-180 bg-gradient-to-br from-blue-100/70 to-green-100/50 rounded-full p-2 ml-4 flex-shrink-0 border border-blue-200/50">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-8 bg-white border-t border-blue-100/30">
                <p className="text-[#64748B] leading-relaxed text-lg border-l-4 border-green-300 pl-6">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}