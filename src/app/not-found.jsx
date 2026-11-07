import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-[var(--color-primary-bg)] text-[var(--color-primary-text)]">
      <div className="w-full max-w-md border border-[var(--color-border)] bg-[var(--color-card-bg)] p-10 text-center shadow-xs">
        <div className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[var(--color-destructive)] mb-3">
          Status 404 • Not Found
        </div>
        <h1 className="text-5xl font-black font-inter tracking-tight text-[var(--color-primary-text)] mb-4">
          404
        </h1>
        <p className="text-sm text-[var(--color-secondary-text)] leading-relaxed mb-8">
          The requested uniform resource locator does not match any route in the application directory.
        </p>
        <Link
          href="/"
          className="btn btn-black px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
        >
          Return to Primary Index →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
