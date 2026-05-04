import React from 'react';
import Link from 'next/link';
import { guidesData as fallbackGuides } from '@/lib/fakeData';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

export const metadata = {
  title: 'Guides - Korean Guide BD',
  description: 'Practical travel and immigration guides for Korea.'
};

async function fetchGuides() {
  try {
    const res = await fetch(`${API_BASE}/guides`, { cache: 'no-store' });
    if (!res.ok) return fallbackGuides;
    const data = await res.json();
    return Array.isArray(data) ? data : (data && data.guides ? data.guides : fallbackGuides);
  } catch {
    return fallbackGuides;
  }
}

export default async function GuidesPage() {
  const guides = await fetchGuides();
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Guides</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((g) => (
          <Link key={g.id} href={`/guides/${g.slug}`} className="block p-4 border rounded hover:shadow">
            <h2 className="text-xl font-semibold">{g.title}</h2>
            <p className="text-sm text-gray-600">{g.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
