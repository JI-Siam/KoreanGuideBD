import Hero from "@/components/landing/Hero";
import VisaTypes from "@/components/landing/VisaTypes";
import DocumentsChecklist from "@/components/landing/DocumentsChecklist";
import Updates from "@/components/landing/Updates";
import GuidesPreview from "@/components/landing/GuidesPreview";
import FAQ from "@/components/landing/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <VisaTypes />
      <GuidesPreview />
      <DocumentsChecklist />
      <Updates />
      <FAQ />
    </>
  );
}
