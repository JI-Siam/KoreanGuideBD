import Marquee from "react-fast-marquee";
import { FaPassport, FaPlane, FaFileAlt, FaRegClipboard, FaUniversity, FaGlobeAsia } from "react-icons/fa";

export default function VisaMarquee() {
  return (
    <div>
      <Marquee className="bg-linear-to-br from-blue-50 to-green-50 py-6 font-semibold text-indigo-700">
        <div className="flex items-center space-x-20">

          <div className="flex items-center space-x-2">
            <FaPassport className="text-xl text-blue-600" />
            <h1>Work Visa Guidance</h1>
          </div>

          <div className="flex items-center space-x-2">
            <FaUniversity className="text-xl text-blue-600" />
            <h1>Study in Korea</h1>
          </div>

          <div className="flex items-center space-x-2">
            <FaPlane className="text-xl text-blue-600" />
            <h1>Tourist Visa Process</h1>
          </div>

          <div className="flex items-center space-x-2">
            <FaFileAlt className="text-xl text-blue-600" />
            <h1>Required Documents</h1>
          </div>

          <div className="flex items-center space-x-2">
            <FaRegClipboard className="text-xl text-blue-600" />
            <h1>Step-by-Step Guide</h1>
          </div>

          <div className="flex items-center space-x-2">
            <FaGlobeAsia className="text-xl text-blue-600" />
            <h1 className="mr-10">Latest Korea Updates</h1>
          </div>

        </div>
      </Marquee>
    </div>
  );
}