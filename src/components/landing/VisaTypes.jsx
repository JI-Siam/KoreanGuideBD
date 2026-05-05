import Link from 'next/link';

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
            <div key={visa.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg shadow-green-200 transition-all duration-300 border border-slate-100 group">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{visa.title}</h3>
                <span className="bg-blue-50 text-blue-700  text-sm font-bold px-3 py-1 rounded-full">{visa.code}</span>
              </div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-4">{visa.category}</p>
              <p className="text-slate-600 mb-6 leading-relaxed">{visa.description}</p>
              <div className="border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p className="text-sm text-slate-700"><strong className="text-slate-900">Duration:</strong> {visa.duration}</p>
                </div>
               
              </div>
            </div>
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