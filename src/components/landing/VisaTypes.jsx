import Link from 'next/link';
import VisaType from './VisaType';

export default async function VisaTypes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/visaTypes`);
  const data = await res.json();
  const visas = (data?.visaTypes ?? (Array.isArray(data) ? data : [])).slice(0, 3);

  if (!visas || visas.length === 0) {
    return <section id="visa-types" className="py-24 bg-white"><div className="container mx-auto px-6 text-center text-[#64748B]">No visa types available.</div></section>;
  }

  return (
    <section id="visa-types" className="py-24 bg-gradient-to-b from-white via-[#F4F8FF] to-white">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end mb-14">
          <div className="lg:col-span-7">
            <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1E6FD9]">Visa Planner</span>
            <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">Choose The Right Korean Visa</h2>
            <p className="mt-4 text-lg text-[#64748B] max-w-3xl leading-relaxed">
              Compare visa options with clear categories, validity details, and practical direction based on your purpose.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#64748B]">At A Glance</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-[#EEF4FB] px-3 py-3"><span className="font-bold text-[#0F172A]">Fast Compare</span><p className="text-[#64748B] mt-1">Type, purpose and duration</p></div>
                <div className="rounded-xl bg-[#EEF4FB] px-3 py-3"><span className="font-bold text-[#0F172A]">Clear Priorities</span><p className="text-[#64748B] mt-1">Work, study, travel focus</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
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
