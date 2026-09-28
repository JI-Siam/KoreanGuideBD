'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const BRAND = '#10B981'
const BRAND_DARK = '#059669' // slightly darker green for better contrast on white
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

  // White bar when scrolled (or when the mobile menu is open)
  const solid = scrolled || menuOpen
  const ink = { color: solid ? '#18181b' : '#ffffff' }
  const accent = solid ? BRAND_DARK : BRAND
  const outlineBtn = solid
    ? 'border-zinc-300 hover:bg-zinc-100'
    : 'border-white/25 hover:bg-white/10'

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300  ${solid
        ? 'bg-white/95 border-zinc-200 backdrop-blur-md shadow-sm py-3'
        : 'bg-gradient-to-b from-zinc-950/70 to-transparent border-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image src="/logo.png" fill alt="Alvix Education logo" className="object-cover" />
          </div>
          <span className="hidden sm:inline text-xl font-bold tracking-tight font-outfit" style={ink}>
            Alvix<span style={{ color: accent }}>Education</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {LINKS.map((item) => (
            <Link
              key={item}
              href={hrefFor(item)}
              className={`relative py-1 transition-opacity duration-200 ${isActive(item) ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              style={ink}
            >
              {item}
              {isActive(item) && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full" style={{ background: accent }} />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden md:flex gap-4 items-center">
              <p className="hidden lg:block text-sm opacity-80" style={ink}>
                Hello, <span className="font-semibold">{user.name}</span>
              </p>
              <div
                className={`relative h-8 w-8 overflow-hidden ring-1 ${solid ? 'ring-zinc-300 bg-zinc-100' : 'ring-white/30 bg-zinc-800'
                  }`}
              >
                <Image src={user.image || '/logo.png'} alt="avatar" fill className="object-cover" />
              </div>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 text-sm font-medium border transition-colors ${outlineBtn}`}
                style={ink}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
                style={ink}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:brightness-90"
                style={{ background: solid ? '#18181b' : BRAND, color: '#ffffff' }}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 border transition-colors ${solid ? 'border-zinc-300' : 'border-white/25'
              }`}
            style={ink}
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-5 text-base font-medium">
              {LINKS.map((item) => (
                <Link
                  key={item}
                  href={hrefFor(item)}
                  className={isActive(item) ? 'opacity-100' : 'opacity-70'}
                  style={{ color: isActive(item) ? BRAND_DARK : '#18181b' }}
                >
                  {item}
                </Link>
              ))}

              <div className="pt-5 border-t border-zinc-200 flex flex-col gap-3">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 border border-zinc-300 font-semibold text-center hover:bg-zinc-100 transition-colors"
                    style={{ color: '#18181b' }}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="w-full py-3 border border-zinc-300 font-semibold text-center hover:bg-zinc-100 transition-colors"
                      style={{ color: '#18181b' }}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="w-full py-3 font-semibold text-center"
                      style={{ background: '#18181b', color: '#ffffff' }}
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