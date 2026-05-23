import React from 'react';
import ChecklistSection from '@/components/guides/ChecklistSection';

async function fetchDocuments() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/documents`, { cache: 'no-store' });

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
