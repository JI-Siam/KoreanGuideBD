import React from 'react';
import VisaTypesSection from '@/components/guides/VisaTypesSection';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

async function fetchVisaTypes() {
  try {
    const res = await fetch(`${API_BASE}/visaTypes`, { cache: 'no-store' });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : data?.visaTypes ?? [];
  } catch {
    return [];
  }
}

export default async function VisaTypesPage() {
  const visas = await fetchVisaTypes();

  return <VisaTypesSection visas={visas} />;
}
