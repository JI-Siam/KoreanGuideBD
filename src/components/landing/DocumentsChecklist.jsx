import { documentsData as fallbackDocs } from '@/lib/fakeData';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export default async function DocumentsChecklist() {
  const res = await fetch(`${API_BASE}/documents`, { cache: 'no-store' });
  const data = await res.json();

  const documents = Array.isArray(data)
    ? data
    : data && (data.documents || data.items)
    ? data.documents || data.items
    : fallbackDocs;

  const priorityColor = {
    critical: 'border-red-500/40 bg-red-500/10 text-red-300',
    high: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
    medium: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    low: 'border-green-500/40 bg-green-500/10 text-green-300',
  };

  if (!documents || documents.length === 0) {
    return (
      <section className="py-20 bg-[#0B1A2B] text-center text-slate-300">
        No documents found.
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-[#0B1A2B] to-[#11263C] text-white">
      <div className="container mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Required Documents
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            Track and manage your visa application checklist efficiently.
          </p>
        </div>

        {/* LIST */}
        <div className="max-w-3xl mx-auto space-y-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`
                group relative p-6 rounded-2xl border backdrop-blur-xl
                bg-white/5 border-white/10
                hover:border-blue-400/40
                hover:shadow-[0_0_25px_rgba(30,111,217,0.15)]
                transition-all duration-300
                ${priorityColor[doc.priority]}
              `}
            >
              <div className="flex items-start gap-5">
                
                {/* CHECKBOX */}
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-1 accent-[#26D096] cursor-pointer"
                />

                {/* CONTENT */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white group-hover:text-blue-300 transition">
                    {doc.name}
                  </h3>

                  <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                    {doc.description}
                  </p>

                  {/* TAGS */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10">
                      {doc.category}
                    </span>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-white/10">
                      {doc.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* LEFT ACCENT BAR */}
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-blue-500 to-green-400 opacity-70"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}