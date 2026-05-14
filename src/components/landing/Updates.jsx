import { updatesData as fallbackUpdates } from '@/lib/fakeData';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export default async function Updates() {
  const res = await fetch(`${API_BASE}/updates`);
  const data = await res.json();
  const updates = Array.isArray(data) ? data : (data && data.updates ? data.updates : fallbackUpdates);

  const priorityBg = {
    high: 'bg-gradient-to-br from-red-50 to-red-100/50 border-l-4 border-red-500',
    medium: 'bg-gradient-to-br from-amber-50 to-amber-100/50 border-l-4 border-amber-500',
    low: 'bg-gradient-to-br from-blue-50 to-blue-100/50 border-l-4 border-blue-500',
  };

  const priorityBadge = {
    high: 'bg-red-100/70 text-red-700 border border-red-200/50',
    medium: 'bg-amber-100/70 text-amber-700 border border-amber-200/50',
    low: 'bg-blue-100/70 text-blue-700 border border-blue-200/50',
  };

  if (!updates || updates.length === 0) {
    return <section className="py-24 bg-gradient-to-b from-white to-[#F7F8FC]"><div className="container mx-auto px-6 text-center text-[#64748B]">No updates found.</div></section>;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#F7F8FC] to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight">Latest Updates</h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            Stay informed about recent changes and announcements
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {updates.map((update) => (
            <div key={update.id} className={`p-8 rounded-2xl shadow-md hover:shadow-lg shadow-blue-100/20 transition-all duration-300 border border-blue-100/50 ${priorityBg[update.priority] || 'bg-white'}`}>
              <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className={`text-xs font-bold px-4 py-2 rounded-full ${priorityBadge[update.priority] || 'bg-slate-100/70 text-slate-700 border border-slate-200/50'}`}>
                      {update.priority?.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-sm font-medium text-[#64748B] flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{update.title}</h3>
                  <p className="text-[#64748B] leading-relaxed text-base">{update.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}