'use client'

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="min-h-[80vh] pt-36 pb-20 px-6 bg-[var(--color-primary-bg)] text-[var(--color-primary-text)]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-accent-green)] mb-2">
            Applicant Identity
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-inter tracking-tight text-[var(--color-primary-text)]">
            User Profile
          </h1>
        </div>

        <div className="border border-[var(--color-border)] bg-[var(--color-card-bg)] p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] shrink-0 relative overflow-hidden">
              <Image
                src={user?.image || "/logo.png"}
                alt="Profile photo"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary-blue)] border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-2.5 py-0.5">
                Verified Session
              </span>
              <h2 className="text-2xl font-bold font-inter text-[var(--color-primary-text)] mt-3">
                {user?.name || 'Unnamed Applicant'}
              </h2>
              <p className="text-sm font-mono text-[var(--color-secondary-text)] mt-1">
                {user?.email || 'No email attached'}
              </p>
              <div className="mt-4 pt-4 border-t border-[var(--color-border)] text-xs font-mono text-[var(--color-muted-text)]">
                REGISTRATION TIMESTAMP: <span className="text-[var(--color-primary-text)] font-bold">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Current Term'}</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <Link
                href="/profile/update"
                className="btn btn-black px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                Modify Records →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
