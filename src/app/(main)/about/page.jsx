"use client";

import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutStats from '@/components/about/AboutStats';
import AboutMission from '@/components/about/AboutMission';
import AboutValues from '@/components/about/AboutValues';
import AboutTeam from '@/components/about/AboutTeam';
import AboutCTA from '@/components/about/AboutCTA';
import AnimateIn from '@/components/shared/AnimateIn';
import { Globe, Users, Lightbulb, ShieldCheck } from 'lucide-react';

const values = [
  {
    id: 1,
    icon: Globe,
    title: 'Global Standardization',
    description: 'Harmonizing complex Korean immigration and educational decrees into clear, actionable, English-language directives.'
  },
  {
    id: 2,
    icon: Users,
    title: 'Applicant Advocacy',
    description: 'Providing validated timeline accounts and peer-reviewed application tips from currently enrolled foreign students.'
  },
  {
    id: 3,
    icon: Lightbulb,
    title: 'Statutory Verification',
    description: 'Continuously auditing our guidelines against official Ministry of Justice and Korean Immigration Service notices.'
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: 'Zero Ambiguity',
    description: 'Minimizing embassy rejection risks through exhaustive financial proof standards and apostille verification matrices.'
  }
];

const stats = [
  { number: '50K+', label: 'Active Applicants' },
  { number: '150+', label: 'Verified Guidelines' },
  { number: '30+', label: 'Origin Countries' },
  { number: '98.4%', label: 'Application Success' }
];

const team = [
  { id: 1, name: 'Sarah Kim', role: 'Founder & Research Director' },
  { id: 2, name: 'James Park', role: 'Immigration Policy Lead' },
  { id: 3, name: 'Maya Singh', role: 'Academic Coordination' },
  { id: 4, name: 'David Chen', role: 'Systems Architect' }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-primary-bg)] text-[var(--color-primary-text)]">
      <AboutHero
        title="Authoritative Korean Education Intelligence"
        subtitle="Empowering international students, researchers, and global talent with transparent, structured, and verified pathways to South Korea."
        ctaHref="/guides"
        ctaLabel="Explore Documentation"
      />

      <AnimateIn>
        <AboutStats stats={stats} />
      </AnimateIn>

      <AnimateIn delay={0.06}>
        <AboutMission>
          <p>
            Korean Guide BD was established to eliminate misinformation surrounding South Korean visa criteria, scholarship deadlines, and institutional admissions.
          </p>
          <p>
            Whether preparing for D-2 degree programs, D-4 language training, or post-study work routes, our structured database guides every phase of relocation.
          </p>
          <p>
            We adhere to rigorous editorial neutrality, regularly auditing Embassy notices and Korean immigration service decrees.
          </p>
        </AboutMission>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <AboutValues values={values} />
      </AnimateIn>

      <AnimateIn delay={0.14}>
        <AboutTeam team={team} />
      </AnimateIn>

      <AnimateIn delay={0.18}>
        <AboutCTA
          title="Ready to Begin Your Preparation?"
          body="Access our complete index of verified visa specifications, university rankings, and checklist requirements."
          href="/guides"
          label="Browse Full Registry"
        />
      </AnimateIn>
    </main>
  );
}
