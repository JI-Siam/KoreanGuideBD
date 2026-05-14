import Link from 'next/link';
import { guidesData as fallbackGuides } from '@/lib/fakeData';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export default async function GuidesPreview() {
  const res = await fetch(`${API_BASE}/guides`);
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

  return (
    <section className="py-24  bg-gradient-to-b from-white-100 via-emerald-50 to-[#F7F8FC]">
      <div className="container mx-auto px-6 ">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight">Explore Our Guides</h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            Comprehensive guides covering travel, work, study, and living in Korea
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 ">
          {list.map((guide) => (
            <Link
              key={guide.id}
              href={`/guides/${guide.slug}`}
              className="block p-8 bg-white rounded-2xl shadow-md hover:shadow-xl shadow-blue-100/20 transition-all duration-300 border border-blue-100/50 group hover:border-blue-200"
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#0F172A] flex-1 group-hover:text-blue-600 transition-colors">{guide.title}</h3>
                <span className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full whitespace-nowrap ml-4 flex-shrink-0 ${categoryColor[guide.category] || 'bg-slate-100/70 text-slate-700 border border-slate-200/50'}`}>
                  {guide.category}
                </span>
              </div>
              <p className="text-[#64748B] mb-8 leading-relaxed text-base">{guide.summary}</p>
              <div className="flex items-center justify-between border-t border-blue-100/40 pt-6">
                <span className="text-sm font-medium text-[#64748B] flex items-center"><svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> {new Date(guide.publishedAt).toLocaleDateString()}</span>
                <span className="text-blue-600 font-semibold text-sm flex items-center group-hover:translate-x-1.5 transition-transform">Read More <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></span>
              </div>
            </Link>
          ))}
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