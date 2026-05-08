import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative bg-[var(--color-primary-bg)] text-[var(--color-secondary-text)] pt-16 pb-10 overflow-hidden">
      
      {/* TOP GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-primary-blue)]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[var(--color-accent-green)]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* BRAND */}
          <div>
            <h4 className="text-2xl font-bold text-[var(--color-primary-text)] mb-3">
             <span className='text-[var(--color-primary-blue)]'>Alvix</span><span className="text-[var(--color-accent-green)]">Education</span>
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Practical guides, updated visa rules, and real insights to help you 
              study, work, and live in Korea with confidence.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h5 className="font-semibold text-[var(--color-primary-text)] mb-3">Explore</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="hover:text-[var(--color-primary-blue)] transition">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/visa" className="hover:text-[var(--color-primary-blue)] transition">
                  Visa Types
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[var(--color-primary-blue)] transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-[var(--color-primary-blue)] transition">
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h5 className="font-semibold text-[var(--color-primary-text)] mb-3">Connect</h5>
            
            <div className="flex gap-4 mb-4">
              {['Twitter', 'YouTube', 'Facebook'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="
                    px-3 py-2 text-sm rounded-lg
                    bg-white/5 border border-[var(--color-border)]
                    hover:bg-[var(--color-secondary-bg)] hover:text-[var(--color-primary-text)]
                    transition-all
                  "
                >
                  {item}
                </a>
              ))}
            </div>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} KoreanGuideBD
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          Built with care for students, travelers, and professionals exploring Korea 🇰🇷
        </div>
      </div>
    </footer>
  );
};

export default Footer;