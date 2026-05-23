import { updatesData as fallbackUpdates } from '@/lib/fakeData';

export default async function Updates() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/updates`);
  const data = await res.json();
  const updates = Array.isArray(data) ? data : (data && data.updates ? data.updates : fallbackUpdates);

  const priorityBg = {
    high: 'bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200',
    medium: 'bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200',
    low: 'bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200',
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
        <div className="max-w-5xl mx-auto grid gap-5">
          {updates.map((update, index) => (
            <div key={update.id} className={`rounded-2xl p-6 md:p-7 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 ${priorityBg[update.priority] || 'bg-white border border-[#E2E8F0]'}`}>
              <div className="grid gap-4 md:grid-cols-12 md:items-start">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 md:block">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-sm font-extrabold text-[#0F172A]">{String(index + 1).padStart(2, '0')}</div>
                    <span className="text-xs font-medium text-[#64748B] md:mt-2 block">{new Date(update.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="md:col-span-10">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className={`text-xs font-bold px-4 py-2 rounded-full ${priorityBadge[update.priority] || 'bg-slate-100/70 text-slate-700 border border-slate-200/50'}`}>
                      {update.priority?.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Policy Bulletin</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3">{update.title}</h3>
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