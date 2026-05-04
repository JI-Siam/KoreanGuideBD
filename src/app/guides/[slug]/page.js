import React from 'react';
import { guidesData as fallbackGuides } from '@/lib/fakeData';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE}/guides`);
    const data = await res.json();
    const guides = Array.isArray(data) ? data : (data && data.guides ? data.guides : fallbackGuides);
    return guides.map((g) => ({ slug: g.slug }));
  } catch {
    return fallbackGuides.map((g) => ({ slug: g.slug }));
  }
}

async function fetchGuide(slug) {
  try {
    const res = await fetch(`${API_BASE}/guides`, { cache: 'no-store' });
    const data = await res.json();
    const guides = Array.isArray(data) ? data : (data && data.guides ? data.guides : fallbackGuides);
    return guides.find((g) => g.slug === slug) || null;
  } catch {
    return fallbackGuides.find((g) => g.slug === slug) || null;
  }
}

export default async function GuidePage({ params }) {
  const guide = await fetchGuide(params.slug);
  if (!guide) return <div className="container mx-auto p-6">Guide not found.</div>;
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{guide.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: guide.content }} />
    </main>
  );
}
