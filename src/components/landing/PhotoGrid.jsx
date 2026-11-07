"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1];

const UNIVERSITIES = [
  {
    slug: 'korea-university',
    name: 'Korea University',
    short: 'Korea Univ.',
    city: 'Seoul',
    founded: '1905',
    type: 'Private',
    image: 'https://images.unsplash.com/photo-1728390589073-07e936311aa9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'A private research university in northern Seoul, set on a stone-built Gothic campus. Known for business, law and a very active alumni network that many international students lean on for internships and jobs.',
    highlights: ['Business', 'Law', 'Engineering'],
  },
  {
    slug: 'seoul-national-university',
    name: 'Seoul National University',
    short: 'SNU',
    city: 'Seoul',
    founded: '1946',
    type: 'National',
    image: 'https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      "Korea's flagship national university, on a large hillside campus in Gwanak. Research-heavy and highly competitive, with a broad range of graduate programs and a growing set of English-taught courses.",
    highlights: ['Natural sciences', 'Medicine', 'Engineering'],
  },
  {
    slug: 'yonsei-university',
    name: 'Yonsei University',
    short: 'Yonsei',
    city: 'Seoul',
    founded: '1885',
    type: 'Private',
    image: 'https://images.unsplash.com/photo-1742747215638-0105cbcd2645?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      "One of Korea's oldest institutions, based in the Sinchon student district. Popular with international applicants for its English-taught tracks and its lively campus and city life right outside the gate.",
    highlights: ['International studies', 'Medicine', 'Business'],
  },
  {
    slug: 'kaist',
    name: 'KAIST',
    short: 'KAIST',
    city: 'Daejeon',
    founded: '1971',
    type: 'National',
    image: 'https://images.unsplash.com/photo-1747854828989-5c8408a8f0bc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'A science and technology university in Daejeon, built around research. Most graduate courses are taught in English, and the campus sits inside a city known for its research institutes.',
    highlights: ['Computer science', 'Robotics', 'Engineering'],
  },
];

export default function PhotoGrid() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const count = UNIVERSITIES.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const goTo = (index) => {
    if (!sectionRef.current) return;
    const top = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + index * window.innerHeight + 4,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const current = UNIVERSITIES[active];
  const dur = (s) => (reduceMotion ? 0 : s);

  return (
    <section
      ref={sectionRef}
      aria-label="Featured universities"
      className="relative bg-black"
      style={{ height: `${(count + 1) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden md:flex-row">
        {/* LEFT: images wipe in as you scroll */}
        <div className="relative h-[42%] w-full bg-zinc-900 md:h-full md:w-1/2">
          {UNIVERSITIES.map((u, i) => (
            <motion.div
              key={u.slug}
              className="absolute inset-0"
              style={{ zIndex: i + 1 }}
              initial={false}
              animate={{
                clipPath: i <= active ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
              }}
              transition={{ duration: dur(0.9), ease: EASE }}
            >
              <motion.img
                src={u.image}
                alt={`${u.name} campus`}
                className="h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                initial={false}
                animate={{ scale: i === active ? 1 : 1.1 }}
                transition={{ duration: dur(1.2), ease: [0.16, 1, 0.3, 1] }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"
              />
            </motion.div>
          ))}

          {/* Caption over the photo */}
          <div className="absolute inset-x-0 bottom-0 z-50 flex items-end justify-between p-5 md:p-10">
            <div className="flex items-center gap-3 border border-white/20 bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 bg-[var(--color-accent-green)]" aria-hidden="true" />
              {current.city}, South Korea
            </div>
            <div className="font-mono text-xs font-bold tabular-nums text-white bg-black/70 px-3 py-1.5 border border-white/20">
              {active + 1} / {count}
            </div>
          </div>
        </div>

        {/* RIGHT: text swaps with the image */}
        <div className="relative flex h-[58%] w-full flex-col justify-between bg-black px-6 pb-6 pt-6 md:h-full md:w-1/2 md:px-14 md:pb-12 md:pt-28 lg:px-20 border-l border-white/10">
          {/* Scroll progress line */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-full w-[2px] bg-[var(--color-accent-green)] md:block"
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          />

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: dur(0.4), ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-green)] font-mono">
                  {current.type} university • {current.city}
                </p>

                <h2 className="font-inter mt-3 text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                  {current.name}
                </h2>

                <p className="mt-5 max-w-xl text-sm md:text-base leading-relaxed text-zinc-300">
                  {current.description}
                </p>

                <dl className="mt-6 grid max-w-md grid-cols-3 border-y border-white/15 py-4 md:mt-8 md:py-5">
                  {[
                    ['Founded', current.founded],
                    ['City', current.city],
                    ['Type', current.type],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider">
                        {label}
                      </dt>
                      <dd className="font-inter mt-1 text-base font-extrabold text-white md:text-lg">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 hidden flex-wrap gap-2 md:flex">
                  {current.highlights.map((h) => (
                    <li
                      key={h}
                      className="border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/universities"
                  className="btn btn-primary mt-6 inline-flex items-center px-7 py-3.5 text-sm font-bold tracking-tight focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none md:mt-8"
                >
                  Explore {current.short} →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Jump between universities */}
          <nav aria-label="Choose a university" className="mt-4 grid grid-cols-4 gap-3 border-t border-white/10 pt-4">
            {UNIVERSITIES.map((u, i) => (
              <button
                key={u.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active}
                className="text-left focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <span
                  className={`block h-[2px] w-full transition-colors duration-200 ${
                    i === active ? 'bg-[var(--color-accent-green)]' : 'bg-white/20'
                  }`}
                />
                <span
                  className={`mt-2 block truncate text-xs font-semibold transition-opacity duration-200 ${
                    i === active ? 'text-white opacity-100' : 'text-zinc-400 opacity-60 hover:opacity-100'
                  }`}
                >
                  {u.short}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
