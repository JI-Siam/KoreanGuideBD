import VisaTypes from "@/components/landing/VisaTypes";
import DocumentsChecklist from "@/components/landing/DocumentsChecklist";
import Updates from "@/components/landing/Updates";
import GuidesPreview from "@/components/landing/GuidesPreview";
import FAQ from "@/components/landing/FAQ";
import VisaMarquee from "@/components/landing/VisaMarquee";
import AboutStats from "@/components/about/AboutStats";
import Hero1 from "@/components/landing/Hero1";
import AnimateIn from '@/components/shared/AnimateIn';

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
      <AnimateIn>
        <VisaMarquee></VisaMarquee>
      </AnimateIn>
      <AnimateIn delay={0.05}>
        <VisaTypes />
      </AnimateIn>
      <AnimateIn delay={0.08}>
        <AboutStats stats={stats}></AboutStats>
      </AnimateIn>
      <AnimateIn delay={0.12}>
        <GuidesPreview />
      </AnimateIn>
      <AnimateIn delay={0.16}>
        <DocumentsChecklist />
      </AnimateIn>
      <AnimateIn delay={0.2}>
        <Updates />
      </AnimateIn>
      <AnimateIn delay={0.24}>
        <FAQ />
      </AnimateIn>
    </>
  );
}
