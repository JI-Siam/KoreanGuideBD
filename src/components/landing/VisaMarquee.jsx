import Marquee from "react-fast-marquee";
import { FaPassport, FaPlane, FaFileAlt, FaRegClipboard, FaUniversity, FaGlobeAsia } from "react-icons/fa";

export default function VisaMarquee() {
  return (
    <section className="border-y border-[#E2E8F0] bg-white/90 backdrop-blur">
      <div className="container mx-auto px-6">
        <Marquee className="py-5 font-medium text-[#0F172A]" speed={38} pauseOnHover>
          <div className="flex items-center space-x-14">

            <div className="flex items-center space-x-3 rounded-full bg-[#EEF4FB] px-5 py-2">
              <FaPassport className="text-lg text-blue-600" />
              <h1 className="text-sm font-semibold whitespace-nowrap">Work Visa Guidance</h1>
            </div>

            <div className="flex items-center space-x-3 rounded-full bg-[#EEF4FB] px-5 py-2">
              <FaUniversity className="text-lg text-emerald-600" />
              <h1 className="text-sm font-semibold whitespace-nowrap">Study in Korea</h1>
            </div>

            <div className="flex items-center space-x-3 rounded-full bg-[#EEF4FB] px-5 py-2">
              <FaPlane className="text-lg text-blue-600" />
              <h1 className="text-sm font-semibold whitespace-nowrap">Tourist Visa Process</h1>
            </div>

            <div className="flex items-center space-x-3 rounded-full bg-[#EEF4FB] px-5 py-2">
              <FaFileAlt className="text-lg text-emerald-600" />
              <h1 className="text-sm font-semibold whitespace-nowrap">Required Documents</h1>
            </div>

            <div className="flex items-center space-x-3 rounded-full bg-[#EEF4FB] px-5 py-2">
              <FaRegClipboard className="text-lg text-blue-600" />
              <h1 className="text-sm font-semibold whitespace-nowrap">Step-by-Step Guide</h1>
            </div>

            <div className="flex items-center space-x-3 rounded-full bg-[#EEF4FB] px-5 py-2">
              <FaGlobeAsia className="text-lg text-emerald-600" />
              <h1 className="text-sm font-semibold whitespace-nowrap">Latest Korea Updates</h1>
            </div>

          </div>
        </Marquee>
      </div>
    </section>
  );
}