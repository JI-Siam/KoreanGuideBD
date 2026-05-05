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
          ? "bg-white/80 text-black border-gray-200 backdrop-blur-xl" 
          : "bg-[#0B1A2B]/70 text-white border-white/10 backdrop-blur-xl"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className='flex gap-3 justify-center items-center'>
           <Image src="/logo.png" width={40} height={40} alt='logo' className='rounded-full'/> 
        <Link
          href="/"
          className={`text-xl font-extrabold tracking-tight ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
        Alvix<span className="text-green-400">Education</span>
        </Link>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/"
            className={`transition ${
              scrolled ? "text-gray-700 hover:text-black" : "text-slate-300 hover:text-blue-400"
            }`}
          >
            Home
          </Link>

          

          <Link
            href="/guides"
            className={`transition ${
              scrolled ? "text-gray-700 hover:text-black" : "text-slate-300 hover:text-blue-400"
            }`}
          >
            Guides
          </Link>

          <Link
            href="/about"
            className={`transition ${
              scrolled ? "text-gray-700 hover:text-black" : "text-slate-300 hover:text-blue-400"
            }`}
          >
            About
          </Link>

           <Link
            href="/profile"
            className={`transition ${
              scrolled ? "text-gray-700 hover:text-black" : "text-slate-300 hover:text-blue-400"
            }`}
          >
            Profile
          </Link>
        </nav>

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
                className={`
                  px-4 py-2 text-sm rounded-full transition
                  ${scrolled 
                    ? "bg-gray-100 border border-gray-300 hover:bg-gray-200 text-black"
                    : "bg-white/10 border border-white/10 hover:bg-white/20 text-white"
                  }
                `}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              
              <Link
                href="/login"
                className={`
                  px-4 py-2 text-sm rounded-full border transition
                  ${scrolled
                    ? "border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "border-white/20 text-slate-300 hover:bg-white/10"
                  }
                `}
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
    </header>
  );
};

export default Navbar;