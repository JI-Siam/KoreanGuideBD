import React from 'react';

const VisaType = ({visa}) => {
    return (
        <div className="h-full">
             <div className="h-full bg-white p-7 rounded-3xl shadow-[0_14px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_50px_rgba(15,23,42,0.14)] transition-all duration-300 border border-[#E2E8F0] group hover:border-blue-200/80 flex flex-col">
              <div className="mb-5 flex items-start justify-between gap-3">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-50 to-blue-100/70 text-blue-700 text-xs font-bold px-4 py-2 border border-blue-200/60">{visa.code}</span>
                <span className="inline-flex items-center rounded-full bg-[#ECFDF5] text-emerald-700 text-[11px] font-semibold px-3 py-1.5 border border-emerald-200/70 uppercase tracking-wide">{visa.category}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors mb-3">{visa.title}</h3>
              <p className="text-[#64748B] mb-8 leading-relaxed text-base flex-grow">{visa.description}</p>

              <div className="mt-auto border-t border-[#E2E8F0] pt-5">
                <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] px-4 py-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p className="text-sm text-[#0F172A]"><strong className="font-semibold">Duration:</strong> <span className="text-[#64748B]">{visa.duration}</span></p>
                </div>
              </div>
            </div>
        </div>
    );
};

export default VisaType;