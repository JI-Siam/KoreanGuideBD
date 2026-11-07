import UniversityList from "@/components/universities/UniversityList";

const page = async () => {
  let universities = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/universities`, { next: { revalidate: 60 } });
    if (res.ok) {
      universities = await res.json();
    }
  } catch {
    universities = [];
  }

  const list = Array.isArray(universities) ? universities : universities?.universities || [];

  return (
    <main className="min-h-screen bg-[var(--color-primary-bg)] text-[var(--color-primary-text)]">
      <UniversityList universities={list} />
    </main>
  );
};

export default page;
