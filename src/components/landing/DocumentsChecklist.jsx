const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export default async function DocumentsChecklist() {
  const res = await fetch(`${API_BASE}/documents`, { cache: 'no-store' });
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

  return (
    <section className="py-24 bg-gradient-to-b from-white via-amber-50 to-[#F7F8FC]">
      <div className="container mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Required Documents
          </h2>
          <p className="text-base text-[#475569] max-w-2xl mx-auto mt-3">
            Track and manage your visa application checklist efficiently.
          </p>
        </div>

        {/* 2-COLUMN GRID */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="group relative p-5 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#BFDBFE] shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_15px_35px_rgba(15,23,42,0.12)] transition-all duration-300"
            >
              {/* LEFT ACCENT BAR */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${priorityAccent[doc.priority] || priorityAccent.medium}`}
              ></div>

              <div className="flex items-start gap-4 pl-2">
                
                {/* CHECKBOX */}
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 border-[#E2E8F0] rounded accent-[#1FAF7A] cursor-pointer transition-colors"
                />

                {/* CONTENT */}
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-[#1E6FD9] transition-colors leading-tight">
                    {doc.name}
                  </h3>

                  <p className="text-[#64748B] mt-1.5 text-xs leading-relaxed">
                    {doc.description}
                  </p>

                  {/* TAGS */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {/* Category Tag */}
                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#EEF4FB] text-[#475569] border border-[#E2E8F0]">
                      {doc.category}
                    </span>

                    {/* Priority Tag */}
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
    </section>
  );
}