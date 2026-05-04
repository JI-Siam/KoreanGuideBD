import { updatesData as fallbackUpdates } from '@/lib/fakeData';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export default async function Updates() {
  const res = await fetch(`${API_BASE}/updates`);
  const data = await res.json();
  const updates = Array.isArray(data) ? data : (data && data.updates ? data.updates : fallbackUpdates);

  const priorityBg = {
    high: 'bg-red-50 border-l-4 border-red-500',
    medium: 'bg-yellow-50 border-l-4 border-yellow-500',
    low: 'bg-blue-50 border-l-4 border-blue-500',
  };

  const priorityBadge = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800',
  };

  if (!updates || updates.length === 0) {
    return <section className="py-24 bg-gradient-to-b from-sky-50 to-white"><div className="container mx-auto px-6 text-center text-slate-500">No updates found.</div></section>;
  }

  return (
    <section className="py-24 bg-gradient-to-br from-sky-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold text-navy-900 mb-4 tracking-tight">Latest Updates</h2>
          <p className="text-md md:text-lg text-slate-600 max-w-2xl mx-auto">Stay informed about recent changes and announcements.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {updates.map((update) => (
            <div key={update.id} className={`p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 ${priorityBg[update.priority] || 'bg-white'}`}>
              <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${priorityBadge[update.priority] || 'bg-slate-100 text-slate-700'}`}>
                      {update.priority?.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-sm font-medium text-slate-400 flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{update.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{update.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}