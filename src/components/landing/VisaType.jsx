import React from 'react';

const VisaType = ({visa}) => {
    return (
        <div>
             <div className=" bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg shadow-base-200 transition-all duration-300 border border-slate-100 group">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{visa.title}</h3>
                <span className="bg-blue-50 text-blue-700  text-sm font-bold px-3 py-1 rounded-full">{visa.code}</span>
              </div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-4">{visa.category}</p>
              <p className="text-slate-600 mb-6 leading-relaxed">{visa.description}</p>
              <div className="border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p className="text-sm text-slate-700"><strong className="text-slate-900">Duration:</strong> {visa.duration}</p>
                </div>
               
              </div>
            </div>
        </div>
    );
};

export default VisaType;