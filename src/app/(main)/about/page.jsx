"use client";

import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutStats from '@/components/about/AboutStats';
import AboutMission from '@/components/about/AboutMission';
import AboutValues from '@/components/about/AboutValues';
import AboutTeam from '@/components/about/AboutTeam';
import AboutCTA from '@/components/about/AboutCTA';
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
    <main className="min-h-screen" style={{ backgroundColor: '#F7FAFF' }}>
      <AboutHero
        title="About Korean Guide BD"
        subtitle={`Your trusted companion for exploring Korea, from visa processes to cultural experiences. We're dedicated to making your Korean journey seamless and unforgettable.`}
        ctaHref="/guides"
        ctaLabel="Explore Our Guides"
      />

      <AboutStats stats={stats} />

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

      <AboutValues values={values} />

      <AboutTeam team={team} />

      <AboutCTA
        title="Ready to Explore Korea?"
        body="Start your journey with our comprehensive guides and resources."
        href="/guides"
        label="Browse All Guides"
      />
    </main>
  );
}
