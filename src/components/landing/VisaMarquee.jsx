import Marquee from "react-fast-marquee";
import { FaPassport, FaPlane, FaFileAlt, FaRegClipboard, FaUniversity, FaGlobeAsia } from "react-icons/fa";

export default function VisaMarquee() {
  return (
    <div className="bg-gradient-to-r from-blue-50/50 via-white to-green-50/50 border-y border-blue-100/30">
      <Marquee className="py-6 font-medium text-[#0F172A]" speed={40} pauseOnHover={true}>
        <div className="flex items-center space-x-24">

          <div className="flex items-center space-x-3 px-6">
            <FaPassport className="text-2xl text-blue-600" />
            <h1 className="font-semibold whitespace-nowrap">Work Visa Guidance</h1>
          </div>

          <div className="flex items-center space-x-3 px-6">
            <FaUniversity className="text-2xl text-green-600" />
            <h1 className="font-semibold whitespace-nowrap">Study in Korea</h1>
          </div>

          <div className="flex items-center space-x-3 px-6">
            <FaPlane className="text-2xl text-blue-600" />
            <h1 className="font-semibold whitespace-nowrap">Tourist Visa Process</h1>
          </div>

          <div className="flex items-center space-x-3 px-6">
            <FaFileAlt className="text-2xl text-green-600" />
            <h1 className="font-semibold whitespace-nowrap">Required Documents</h1>
          </div>

          <div className="flex items-center space-x-3 px-6">
            <FaRegClipboard className="text-2xl text-blue-600" />
            <h1 className="font-semibold whitespace-nowrap">Step-by-Step Guide</h1>
          </div>

          <div className="flex items-center space-x-3 px-6">
            <FaGlobeAsia className="text-2xl text-green-600" />
            <h1 className="font-semibold whitespace-nowrap">Latest Korea Updates</h1>
          </div>

        </div>
      </Marquee>
    </div>
  );
}