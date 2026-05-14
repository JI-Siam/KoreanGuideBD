import Link from 'next/link';
import VisaType from './VisaType';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export default async function VisaTypes() {
  const res = await fetch(`${API_BASE}/visaTypes`);
  const data = await res.json();
  const visas = (data?.visaTypes ?? (Array.isArray(data) ? data : [])).slice(0, 3);

  if (!visas || visas.length === 0) {
    return <section id="visa-types" className="py-24 bg-white"><div className="container mx-auto px-6 text-center text-[#64748B]">No visa types available.</div></section>;
  }

  return (
    <section id="visa-types" className="py-24 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight">Korean Visa Types</h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            Explore different visa categories and find the perfect fit for your journey to Korea
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {visas.map((visa) => (
               <VisaType key={visa.id} visa={visa}></VisaType>
          ))}
        </div>
        <div className="text-center">
          <Link 
            href="/guides/visa-types" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl hover:shadow-lg hover:shadow-blue-200/40 transition-all duration-300 hover:scale-105 border border-blue-500/20"
          >
            <span className='text-white'>View All Types →</span>
          </Link>
        </div>
        </div>
    </section>
  );
}
