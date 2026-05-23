export default async function DocumentsChecklist() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/documents`, { cache: 'no-store' });
  const data = await res.json();

  const documents = Array.isArray(data)
    ? data
    : data && (data.documents || data.items)
    ? data.documents || data.items
    : [];

  // Light theme badge styles for priority
  const priorityBadge = {
    critical: 'bg-red-50 text-red-700 border-red-200',
    high: 'bg-orange-50 text-orange-700 border-orange-200',
    medium: 'bg-blue-50 text-blue-700 border-blue-200',
    low: 'bg-green-50 text-green-700 border-green-200',
  };

  // Accent bar colors mapping
  const priorityAccent = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-[#1E6FD9]', // Brand Blue
    low: 'bg-[#1FAF7A]',    // Brand Green
  };

  if (!documents || documents.length === 0) {
    return (
      <section className="py-20 bg-[#F7FAFF] text-center text-[#64748B]">
        No documents found.
      </section>
    );
  }

  const priorityCount = documents.reduce(
    (acc, doc) => {
      const key = doc.priority || 'medium';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    { critical: 0, high: 0, medium: 0, low: 0 }
  );

  return (
    <section className="py-24 bg-gradient-to-b from-white via-amber-50/50 to-[#F7F8FC]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Required Documents
          </h2>
          <p className="text-base md:text-lg text-[#475569] max-w-2xl mx-auto mt-3">
            A practical checklist designed to reduce mistakes and keep your visa file complete.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <aside className="lg:col-span-4 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] lg:sticky lg:top-28">
            <h3 className="text-lg font-bold text-[#0F172A]">Checklist Overview</h3>
            <p className="mt-2 text-sm text-[#64748B]">Review by priority before preparing your final submission.</p>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-3">
                <span className="text-sm font-medium text-[#475569]">Critical</span>
                <span className="text-sm font-bold text-red-600">{priorityCount.critical}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-3">
                <span className="text-sm font-medium text-[#475569]">High</span>
                <span className="text-sm font-bold text-orange-600">{priorityCount.high}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-3">
                <span className="text-sm font-medium text-[#475569]">Medium</span>
                <span className="text-sm font-bold text-blue-600">{priorityCount.medium}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-3">
                <span className="text-sm font-medium text-[#475569]">Low</span>
                <span className="text-sm font-bold text-emerald-600">{priorityCount.low}</span>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="group relative p-5 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#BFDBFE] shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_15px_35px_rgba(15,23,42,0.12)] transition-all duration-300"
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${priorityAccent[doc.priority] || priorityAccent.medium}`}
                ></div>

                <div className="flex items-start gap-4 pl-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-1 border-[#E2E8F0] rounded accent-[#1FAF7A] cursor-pointer transition-colors"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-[#1E6FD9] transition-colors leading-tight">
                      {doc.name}
                    </h3>

                    <p className="text-[#64748B] mt-1.5 text-xs leading-relaxed">
                      {doc.description}
                    </p>

                    <div className="flex gap-2 mt-3 flex-wrap">
                      <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#EEF4FB] text-[#475569] border border-[#E2E8F0]">
                        {doc.category}
                      </span>

                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${priorityBadge[doc.priority] || priorityBadge.medium}`}>
                        {doc.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}