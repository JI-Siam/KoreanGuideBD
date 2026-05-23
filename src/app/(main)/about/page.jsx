"use client";

import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutStats from '@/components/about/AboutStats';
import AboutMission from '@/components/about/AboutMission';
import AboutValues from '@/components/about/AboutValues';
import AboutTeam from '@/components/about/AboutTeam';
import AboutCTA from '@/components/about/AboutCTA';
import AnimateIn from '@/components/shared/AnimateIn';
import { FaGlobe, FaUsers, FaLightbulb, FaHeartbeat } from 'react-icons/fa';

const values = [
  {
    id: 1,
    icon: FaGlobe,
    title: 'Global Perspective',
    description: 'Connecting people worldwide with comprehensive Korean travel and immigration information.'
  },
  {
    id: 2,
    icon: FaUsers,
    title: 'Community Focused',
    description: 'Building a supportive community of travelers, students, and professionals.'
  },
  {
    id: 3,
    icon: FaLightbulb,
    title: 'Innovation',
    description: 'Continuously updating our resources with the latest policies and insights.'
  },
  {
    id: 4,
    icon: FaHeartbeat,
    title: 'User Wellness',
    description: 'Ensuring your journey to Korea is smooth, informed, and enjoyable.'
  }
];

const stats = [
  { number: '50K+', label: 'Active Users' },
  { number: '150+', label: 'Guides Published' },
  { number: '30+', label: 'Countries Served' },
  { number: '98%', label: 'Satisfaction Rate' }
];

const team = [
  { id: 1, name: 'Sarah Kim', role: 'Founder & CEO' },
  { id: 2, name: 'James Park', role: 'Content Director' },
  { id: 3, name: 'Maya Singh', role: 'Community Manager' },
  { id: 4, name: 'David Chen', role: 'Tech Lead' }
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#F7FAFF' }}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(30,111,217,0.08),transparent_35%),radial-gradient(circle_at_85%_45%,rgba(31,175,122,0.08),transparent_35%)]" />

      <AboutHero
        title="About Korean Guide BD"
        subtitle={`Your trusted companion for exploring Korea, from visa processes to cultural experiences. We're dedicated to making your Korean journey seamless and unforgettable.`}
        ctaHref="/guides"
        ctaLabel="Explore Our Guides"
      />

      <AnimateIn>
        <AboutStats stats={stats} />
      </AnimateIn>

      <AnimateIn delay={0.06}>
        <AboutMission>
          <p>
            Korean Guide BD was founded with a simple yet powerful mission: to empower travelers, students, and professionals with accurate, up-to-date information about Korea.
          </p>
          <p>
            Whether you're planning a short vacation, pursuing higher education, or relocating for work, we provide comprehensive guides that cover everything from visa requirements to cultural etiquette.
          </p>
          <p>
            Our commitment is to make your transition to Korea as smooth as possible, ensuring you're well-informed and confident every step of the way.
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
          title="Ready to Explore Korea?"
          body="Start your journey with our comprehensive guides and resources."
          href="/guides"
          label="Browse All Guides"
        />
      </AnimateIn>
    </main>
  );
}
