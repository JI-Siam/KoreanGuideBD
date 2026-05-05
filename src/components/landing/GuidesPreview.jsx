import Link from 'next/link';
import { guidesData as fallbackGuides } from '@/lib/fakeData';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export default async function GuidesPreview() {
  const res = await fetch(`${API_BASE}/guides`);
  const data = await res.json();
  const guides = Array.isArray(data) ? data : (data && data.guides ? data.guides : fallbackGuides);
  const list = guides.slice(0, 4);

  const categoryColor = {
    travel: 'bg-blue-100 text-blue-800',
    work: 'bg-green-100 text-green-800',
    study: 'bg-purple-100 text-purple-800',
    wellness: 'bg-pink-100 text-pink-800',
  };

  if (!list || list.length === 0) {
    return <section className="py-16"><div className="container mx-auto px-4 text-center">No guides available yet.</div></section>;
  }

  return (
    <section className="py-24 ">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold text-navy-900 mb-4 tracking-tight">Explore Our Guides</h2>
          <p className="text-md md:text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive guides covering travel, work, study, and living in Korea.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {list.map((guide) => (
            <Link
              key={guide.id}
              href={`/guides/${guide.slug}`}
              className="block p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl shadow-green-100 transition-all duration-300 border border-slate-100 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800 flex-1 group-hover:text-blue-600 transition-colors">{guide.title}</h3>
                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full whitespace-nowrap ml-4 ${categoryColor[guide.category] || 'bg-slate-100 text-slate-800'}`}>
                  {guide.category}
                </span>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">{guide.summary}</p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                <span className="text-sm font-medium text-slate-500 flex items-center"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> {new Date(guide.publishedAt).toLocaleDateString()}</span>
                <span className="text-blue-600 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">Read More <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/guides" className="inline-flex items-center justify-center px-5 py-3 text-base font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30">
             <span className='text-white'> View All Guides</span>
          </Link>
        </div>
      </div>
    </section>
  );
}