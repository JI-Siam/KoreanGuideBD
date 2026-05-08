import Link from 'next/link';
import VisaType from './VisaType';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export default async function VisaTypes() {
  const res = await fetch(`${API_BASE}/visaTypes`);
  const data = await res.json();
  const visas = (data?.visaTypes ?? (Array.isArray(data) ? data : [])).slice(0, 3);

  if (!visas || visas.length === 0) {
    return <section id="visa-types" className="py-24 to-white"><div className="container mx-auto px-6 text-center text-slate-500">No visa types available.</div></section>;
  }

  return (
    <section id="visa-types" className="py-24 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold text-navy-900 mb-4 tracking-tight">Korean Visa Types</h2>
          <p className="text-md md:text-lg text-slate-600 max-w-2xl mx-auto">Explore different visa categories and find the one that suits your purpose.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visas.map((visa) => (
               <VisaType key={visa.id} visa={visa}></VisaType>
          ))}
        </div>
      </div>
        <div className="text-center mt-12">
          <Link href="/guides/visa-types" className="inline-flex items-center justify-center px-5 py-3 text-base font-bold  bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30">
           <span className='text-white'> View All Types</span>
          </Link>
        </div>
    </section>
  );
}