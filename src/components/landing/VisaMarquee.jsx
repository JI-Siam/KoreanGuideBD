import Marquee from "react-fast-marquee";
import { FaPassport, FaPlane, FaFileAlt, FaRegClipboard, FaUniversity, FaGlobeAsia } from "react-icons/fa";

export default function VisaMarquee() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-secondary-bg)] py-3">
      <div className="container mx-auto px-6">
        <Marquee className="py-2 text-[var(--color-primary-text)]" speed={38} pauseOnHover>
          <div className="flex items-center space-x-8">

            <div className="flex items-center space-x-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2">
              <FaPassport className="text-base text-[var(--color-primary-blue)]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Work Visa Guidance</span>
            </div>

            <div className="flex items-center space-x-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2">
              <FaUniversity className="text-base text-[var(--color-accent-green)]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Study in Korea</span>
            </div>

            <div className="flex items-center space-x-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2">
              <FaPlane className="text-base text-[var(--color-primary-blue)]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Tourist Visa Process</span>
            </div>

            <div className="flex items-center space-x-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2">
              <FaFileAlt className="text-base text-[var(--color-accent-green)]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Required Documents</span>
            </div>

            <div className="flex items-center space-x-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2">
              <FaRegClipboard className="text-base text-[var(--color-primary-blue)]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Step-by-Step Guide</span>
            </div>

            <div className="flex items-center space-x-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2">
              <FaGlobeAsia className="text-base text-[var(--color-accent-green)]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Latest Korea Updates</span>
            </div>

          </div>
        </Marquee>
      </div>
    </section>
  );
}
