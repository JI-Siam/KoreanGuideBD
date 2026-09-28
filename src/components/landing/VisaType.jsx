import React from 'react';

const VisaType = ({ visa }) => {
  return (
    <div className="h-full">
      <div className="h-full bg-white p-8 border border-zinc-200 transition-colors duration-200 hover:border-black flex flex-col group">
        <div className="mb-8 flex items-start justify-between gap-3">
          <span className="inline-flex items-center bg-emerald-600 text-white text-xs font-bold px-3 py-1.5">{visa.code}</span>
          <span className="inline-flex items-center text-zinc-500 text-[10px] font-bold uppercase tracking-[0.15em]">{visa.category}</span>
        </div>

        <h3 className="text-2xl font-bold text-black mb-4 font-outfit">{visa.title}</h3>
        <p className="text-zinc-500 mb-5 leading-relaxed text-base flex-grow">{visa.description}</p>

        <div className="mt-auto border-t border-zinc-100 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p className="text-sm text-black"><strong className="font-semibold">Duration:</strong> <span className="text-zinc-500 ml-1">{visa.duration}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaType;