import Link from 'next/link';
import { guidesData as fallbackGuides } from '@/lib/fakeData';

export default async function GuidesPreview() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/guides`);
  const data = await res.json();
  const guides = Array.isArray(data) ? data : (data && data.guides ? data.guides : fallbackGuides);
  const list = guides.slice(0, 4);

  const categoryColor = {
    travel: 'bg-blue-100/70 text-blue-700 border border-blue-200/50',
    work: 'bg-green-100/70 text-green-700 border border-green-200/50',
    study: 'bg-purple-100/70 text-purple-700 border border-purple-200/50',
    wellness: 'bg-pink-100/70 text-pink-700 border border-pink-200/50',
  };

  if (!list || list.length === 0) {
    return <section className="py-16"><div className="container mx-auto px-4 text-center text-[#64748B]">No guides available yet.</div></section>;
  }

  const [featured, ...rest] = list;

  return (
    <section className="py-24 bg-gradient-to-b from-white via-emerald-50/50 to-[#F7F8FC]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight">Explore Our Guides</h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            Comprehensive guides covering travel, work, study, and living in Korea
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 mb-14">
          <Link
            key={featured.id}
            href={`/guides/${featured.slug}`}
            className="lg:col-span-7 block p-8 bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 border border-[#E2E8F0] group hover:border-blue-200"
          >
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full ${categoryColor[featured.category] || 'bg-slate-100/70 text-slate-700 border border-slate-200/50'}`}>
                {featured.category}
              </span>
              <span className="text-sm font-medium text-[#64748B]">Featured Guide</span>
            </div>
            <h3 className="text-3xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">{featured.title}</h3>
            <p className="text-[#64748B] mt-4 mb-8 leading-relaxed text-base">{featured.summary}</p>
            <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-5">
              <span className="text-sm font-medium text-[#64748B]">{new Date(featured.publishedAt).toLocaleDateString()}</span>
              <span className="text-blue-600 font-semibold text-sm flex items-center group-hover:translate-x-1.5 transition-transform">Read Guide <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></span>
            </div>
          </Link>

          <div className="lg:col-span-5 grid gap-4">
            {rest.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="block p-5 bg-white rounded-2xl shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-300 border border-[#E2E8F0] group hover:border-blue-200"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors line-clamp-2">{guide.title}</h3>
                  <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full whitespace-nowrap ${categoryColor[guide.category] || 'bg-slate-100/70 text-slate-700 border border-slate-200/50'}`}>
                    {guide.category}
                  </span>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed line-clamp-2">{guide.summary}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/guides" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl hover:shadow-lg hover:shadow-blue-200/40 transition-all duration-300 hover:scale-105 border border-blue-500/20"
          >
            <span className='text-white'>View All Guides →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}