'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b
        ${scrolled 
          ? "bg-white/90 text-[var(--color-primary-text)] border-[var(--color-border)] backdrop-blur-xl" 
          : "bg-[var(--color-primary-bg)]/70 text-[var(--color-primary-text)] border-[var(--color-border)] backdrop-blur-xl"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className='flex gap-3 justify-center items-center'>
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={(e) => {
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                e.preventDefault();
                setMenuOpen((s) => !s);
              }
            }}
          >
            <Image src="/logo.png" width={40} height={40} alt='logo' className='rounded-full' />
            <span className="hidden sm:inline text-xl font-extrabold tracking-tight text-[var(--color-primary-blue)]">
              Alvix<span className="text-[var(--color-accent-green)]">Education</span>
            </span>
          </Link>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/"
            className="transition text-[var(--color-secondary-text)] hover:text-[var(--color-primary-blue)]"
          >
            Home
          </Link>

            <Link
            href="/universities"
            className="transition text-[var(--color-secondary-text)] hover:text-[var(--color-primary-blue)]"
          >
            Universities
          </Link>

           <Link
            href="/programs"
            className="transition text-[var(--color-secondary-text)] hover:text-[var(--color-primary-blue)]"
          >
            Programs
          </Link>

          <Link
            href="/guides"
            className="transition text-[var(--color-secondary-text)] hover:text-[var(--color-primary-blue)]"
          >
            Guides
          </Link>

          <Link
            href="/about"
            className="transition text-[var(--color-secondary-text)] hover:text-[var(--color-primary-blue)]"
          >
            About
          </Link>

           <Link
            href="/profile"
            className="transition text-[var(--color-secondary-text)] hover:text-[var(--color-primary-blue)]"
          >
            Profile
          </Link>
        </nav>

        {/* Mobile menu is toggled by tapping the logo on small screens */}
        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          
          {user ? (
            <div className='flex gap-3 items-center'>
            <p>Hello, <span className='font-bold'>{user.name}</span></p>
              <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-5 rounded-full ring-2 ring-offset-2">
              <img src={user.image} alt="avatar" />
            </div>
          </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-full transition bg-[var(--color-secondary-bg)] border border-[var(--color-border)] hover:bg-[var(--color-elevated)] text-[var(--color-primary-text)]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              
              <Link
                href="/login"
                className="px-4 py-2 text-sm rounded-full border border-[var(--color-border)] text-[var(--color-secondary-text)] hover:bg-[var(--color-elevated)] transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="
                  px-5 py-2 text-sm font-semibold rounded-full
                  bg-gradient-to-r from-blue-600 to-green-500
                  hover:from-blue-500 hover:to-green-400
                  text-white transition
                "
              >
               <span className='text-white' > Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} w-full absolute top-full left-0 z-40`}>
        <div className={`w-full border-t border-[var(--color-border)] bg-[var(--color-primary-bg)]/95 backdrop-blur`}>
          <div className="px-6 py-4 flex flex-col gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-[var(--color-primary-text)]">Home</Link>
            <Link href="/guides" onClick={() => setMenuOpen(false)} className="text-[var(--color-primary-text)]">Guides</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-[var(--color-primary-text)]">About</Link>
            <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-[var(--color-primary-text)]">Profile</Link>

            <Link
            href="/universities"
            className="transition text-[var(--color-secondary-text)] hover:text-[var(--color-primary-blue)]"
          >
            Universities
          </Link>

           <Link
            href="/programs"
            className="transition text-[var(--color-secondary-text)] hover:text-[var(--color-primary-blue)]"
          >
            Programs
          </Link>
            <div className="pt-2 border-t border-[var(--color-border)] mt-2 flex gap-2">
              <Link href="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded border border-[var(--color-border)] text-[var(--color-secondary-text)]">Login</Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded bg-gradient-to-r from-blue-600 to-green-500 text-white">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;