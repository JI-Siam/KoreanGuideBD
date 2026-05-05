import Hero from "@/components/landing/Hero";
import VisaTypes from "@/components/landing/VisaTypes";
import DocumentsChecklist from "@/components/landing/DocumentsChecklist";
import Updates from "@/components/landing/Updates";
import GuidesPreview from "@/components/landing/GuidesPreview";
import FAQ from "@/components/landing/FAQ";
import VisaMarquee from "@/components/landing/VisaMarquee";
import ImageCarousel from "@/components/landing/ImageCarousel";

export default function Home() {
  return (
    <>
      <Hero />
      <VisaMarquee></VisaMarquee>
      <VisaTypes />
      <GuidesPreview />
      <DocumentsChecklist />
      <Updates />
      <FAQ />
    </>
  );
}
