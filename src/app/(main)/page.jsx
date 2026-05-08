import Hero from "@/components/landing/Hero";
import VisaTypes from "@/components/landing/VisaTypes";
import DocumentsChecklist from "@/components/landing/DocumentsChecklist";
import Updates from "@/components/landing/Updates";
import GuidesPreview from "@/components/landing/GuidesPreview";
import FAQ from "@/components/landing/FAQ";
import VisaMarquee from "@/components/landing/VisaMarquee";
import ImageCarousel from "@/components/landing/ImageCarousel";
import AboutStats from "@/components/about/AboutStats";
import Hero1 from "@/components/landing/Hero1";
import UniversityList from "@/components/universities/UniversityList";

export default function Home() {
  const stats = [
  { number: '50K+', label: 'Active Users' },
  { number: '150+', label: 'Guides Published' },
  { number: '30+', label: 'Countries Served' },
  { number: '98%', label: 'Satisfaction Rate' }
];

  return (
    <>
      <Hero1 />
      <VisaMarquee></VisaMarquee>
      <VisaTypes />
      <AboutStats stats={stats}></AboutStats>
      <GuidesPreview />
      <DocumentsChecklist />
      <Updates />
      <FAQ />
    </>
  );
}
