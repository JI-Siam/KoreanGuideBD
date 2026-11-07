'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = ['Home', 'Universities', 'Programs', 'Guides', 'About', 'Profile']
const hrefFor = (item) => (item === 'Home' ? '/' : `/${item.toLowerCase()}`)

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = authClient.useSession()
  const user = session?.user

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname])

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push('/login') },
    })
  }

  const isActive = (item) =>
    item === 'Home' ? pathname === '/' : pathname?.startsWith(hrefFor(item))

  // Non-home pages don't have the dark hero backdrop, so use solid style by default
  const isHome = pathname === '/'
  const solid = !isHome || scrolled || menuOpen

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 border-b ${
        solid
          ? 'bg-[var(--color-primary-bg)]/95 border-[var(--color-border)] text-[var(--color-primary-text)] backdrop-blur-md py-3.5 shadow-sm'
          : 'bg-gradient-to-b from-black/80 to-transparent border-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
        >
          <div className="relative h-9 w-9 overflow-hidden border border-[var(--color-border)] transition-transform duration-200 group-hover:scale-105">
            <Image src="/logo.png" fill alt="Alvix Education logo" className="object-cover" />
          </div>
          <span className="hidden sm:inline text-xl font-bold tracking-tight font-inter">
            Alvix<span className="text-[var(--color-accent-green)]">Education</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Main Navigation">
          {LINKS.map((item) => (
            <Link
              key={item}
              href={hrefFor(item)}
              className={`relative py-1 tracking-tight transition-opacity duration-150 focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none ${
                isActive(item) ? 'opacity-100 font-semibold' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {item}
              {isActive(item) && (
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-[var(--color-accent-green)]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden md:flex gap-4 items-center">
              <p className="hidden lg:block text-sm opacity-80">
                Hello, <span className="font-semibold">{user.name}</span>
              </p>
              <div
                className={`relative h-8 w-8 overflow-hidden border ${
                  solid ? 'border-[var(--color-border)] bg-[var(--color-secondary-bg)]' : 'border-white/30 bg-zinc-800'
                }`}
              >
                <Image src={user.image || '/logo.png'} alt="User avatar" fill className="object-cover" />
              </div>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 text-sm font-semibold border transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none ${
                  solid
                    ? 'border-[var(--color-border)] text-[var(--color-primary-text)] hover:bg-[var(--color-secondary-bg)]'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold opacity-80 hover:opacity-100 transition-opacity focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="btn btn-black px-6 py-2.5 text-sm font-bold tracking-tight transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 border transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none ${
              solid ? 'border-[var(--color-border)] text-[var(--color-primary-text)]' : 'border-white/25 text-white'
            }`}
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-[var(--color-card-bg)] border-b border-[var(--color-border)] shadow-md text-[var(--color-primary-text)]"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-base font-medium">
              {LINKS.map((item) => (
                <Link
                  key={item}
                  href={hrefFor(item)}
                  className={`py-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none ${
                    isActive(item)
                      ? 'text-[var(--color-accent-green)] font-bold'
                      : 'text-[var(--color-primary-text)] opacity-80 hover:opacity-100'
                  }`}
                >
                  {item}
                </Link>
              ))}

              <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-3">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 border border-[var(--color-border)] font-semibold text-center hover:bg-[var(--color-secondary-bg)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="w-full py-3 border border-[var(--color-border)] font-semibold text-center hover:bg-[var(--color-secondary-bg)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="btn btn-black w-full py-3 font-semibold text-center focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
