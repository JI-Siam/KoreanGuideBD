import React from 'react';

const VisaType = ({visa}) => {
    return (
        <div>
             <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl shadow-blue-100/20 transition-all duration-300 border border-blue-100/50 group hover:border-blue-200/70 h-full flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors mb-3">{visa.title}</h3>
                <span className="inline-block bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 text-xs font-bold px-4 py-2 rounded-full border border-blue-200/50">{visa.code}</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-4">{visa.category}</p>
              <p className="text-[#64748B] mb-8 leading-relaxed text-base flex-grow">{visa.description}</p>
              <div className="border-t border-blue-100/40 pt-6 mt-auto">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p className="text-sm text-[#0F172A]"><strong className="font-semibold">Duration:</strong> <span className="text-[#64748B]">{visa.duration}</span></p>
                </div>
              </div>
            </div>
        </div>
    );
};

export default VisaType;