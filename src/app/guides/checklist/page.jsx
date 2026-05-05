import React from 'react';
import ChecklistSection from '@/components/guides/ChecklistSection';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3004';

async function fetchDocuments() {
  try {
    const res = await fetch(`${API_BASE}/documents`, { cache: 'no-store' });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : data?.documents ?? data?.items ?? [];
  } catch {
    return [];
  }
}

export default async function ChecklistPage() {
  const documents = await fetchDocuments();

  return <ChecklistSection documents={documents} />;
}
