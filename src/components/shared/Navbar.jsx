'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

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
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#0B1A2B]/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-extrabold text-white tracking-tight">
          KoreanGuide<span className="text-green-400">BD</span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className="text-slate-300 hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/guides" className="text-slate-300 hover:text-blue-400 transition">
            Guides
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-blue-400 transition">
            About
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          
          {user ? (
            <div className="flex items-center gap-3">
              
              {/* USER NAME */}
              <span className="text-sm text-slate-300 hidden sm:block">
                Hi, <span className="text-white font-semibold">{user.name}</span>
              </span>

              {/* AVATAR */}
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20">
                {user?.image && (
                  <Image
                    src={user.image}
                    alt="avatar"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                )}
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="
                  px-4 py-2 text-sm rounded-full
                  bg-white/10 border border-white/10
                  hover:bg-white/20
                  transition
                "
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              
              <Link
                href="/login"
                className="
                  px-4 py-2 text-sm rounded-full
                  border border-white/20
                  text-slate-300
                  hover:bg-white/10
                  transition
                "
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="
                  px-5 py-2 text-sm font-semibold rounded-full
                  bg-gradient-to-r from-blue-600 to-green-500
                  hover:from-blue-500 hover:to-green-400
                  text-white
                  transition
                "
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;